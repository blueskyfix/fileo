// scripts/test-pdf-to-word/test-convert.mjs
//
// Script de test isolé — valide la qualité de conversion PDF -> DOCX
// via l'API CloudConvert, AVANT toute intégration dans l'app Next.js.
//
// Usage :
//   node test-convert.mjs chemin/vers/mon-fichier.pdf
//
// Utilise par défaut la clé SANDBOX (ne consomme aucun vrai crédit).
// Passer --live en second argument pour tester avec de vrais crédits :
//   node test-convert.mjs chemin/vers/mon-fichier.pdf --live

import { readFile, writeFile } from "node:fs/promises";
import { basename, extname, resolve } from "node:path";
import { config } from "dotenv";
import FormData from "form-data";

// Charge .env.local depuis la racine du projet Fileo (2 niveaux au-dessus de scripts/test-pdf-to-word/)
config({ path: resolve(process.cwd(), "../../.env.local") });

const useLive = process.argv.includes("--live");
const apiKey = useLive
  ? process.env.CLOUDCONVERT_API_KEY_LIVE
  : process.env.CLOUDCONVERT_API_KEY_SANDBOX;

if (!apiKey) {
  console.error(
    `Erreur : clé API manquante. Vérifie que ${
      useLive ? "CLOUDCONVERT_API_KEY_LIVE" : "CLOUDCONVERT_API_KEY_SANDBOX"
    } est bien défini dans .env.local à la racine du projet.`
  );
  process.exit(1);
}

const inputPath = process.argv[2];
if (!inputPath) {
  console.error("Erreur : indique le chemin du PDF à convertir.");
  console.error("Usage : node test-convert.mjs chemin/vers/fichier.pdf [--live]");
  process.exit(1);
}

const BASE_URL = useLive
  ? "https://api.cloudconvert.com/v2"
  : "https://api.sandbox.cloudconvert.com/v2";

async function cloudConvertFetch(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `CloudConvert API error (${response.status}) sur ${path} : ${JSON.stringify(
        data,
        null,
        2
      )}`
    );
  }

  return data;
}

async function main() {
  console.log(`Mode : ${useLive ? "LIVE (consomme de vrais crédits)" : "SANDBOX (gratuit, illimité)"}`);
  console.log(`Fichier source : ${inputPath}`);

  // 1. Créer un job avec 3 tâches : import (upload), convert, export (url)
  console.log("\n[1/5] Création du job CloudConvert...");
  const job = await cloudConvertFetch("/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tasks: {
        "import-file": {
          operation: "import/upload",
        },
        "convert-file": {
          operation: "convert",
          input: "import-file",
          input_format: "pdf",
          output_format: "docx",
        },
        "export-file": {
          operation: "export/url",
          input: "convert-file",
        },
      },
    }),
  });

  const importTask = job.data.tasks.find((t) => t.name === "import-file");
  const uploadUrl = importTask.result.form.url;
  const uploadParams = importTask.result.form.parameters;

  // 2. Uploader le fichier PDF vers l'URL fournie par CloudConvert
  console.log("[2/5] Upload du fichier PDF...");
  const fileBuffer = await readFile(inputPath);
  const form = new FormData();
  for (const [key, value] of Object.entries(uploadParams)) {
    form.append(key, value);
  }
  form.append("file", fileBuffer, basename(inputPath));

  await new Promise((resolvePromise, rejectPromise) => {
    form.submit(uploadUrl, (err, res) => {
      if (err) return rejectPromise(err);

      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        if (res.statusCode >= 400) {
          rejectPromise(
            new Error(
              `Upload échoué (HTTP ${res.statusCode}) : ${body || "(réponse vide)"}`
            )
          );
        } else {
          resolvePromise();
        }
      });
    });
  });

  // 3. Attendre que le job se termine (polling)
  console.log("[3/5] Conversion en cours...");
  let finishedJob;
  const jobId = job.data.id;

  while (true) {
    await new Promise((r) => setTimeout(r, 2000));
    const status = await cloudConvertFetch(`/jobs/${jobId}`);
    const allDone = status.data.tasks.every(
      (t) => t.status === "finished" || t.status === "error"
    );

    if (allDone) {
      finishedJob = status.data;
      break;
    }
    process.stdout.write(".");
  }
  console.log("");

  console.log("\nÉtat de toutes les tâches du job :");
  for (const t of finishedJob.tasks) {
    console.log(`  - ${t.name} (${t.operation}) : ${t.status}${t.message ? ` — ${t.message}` : ""}`);
  }

  const failedTasks = finishedJob.tasks.filter((t) => t.status === "error");
  if (failedTasks.length > 0) {
    console.error("\nDétail complet des tâches en erreur :");
    for (const t of failedTasks) {
      console.error(JSON.stringify(t, null, 2));
    }
    process.exit(1);
  }

  // 4. Récupérer l'URL du fichier converti
  console.log("[4/5] Récupération du fichier converti...");
  const exportTask = finishedJob.tasks.find((t) => t.name === "export-file");
  const fileInfo = exportTask.result.files[0];

  // 5. Télécharger et sauvegarder le .docx
  console.log("[5/5] Téléchargement...");
  const fileResponse = await fetch(fileInfo.url);
  const arrayBuffer = await fileResponse.arrayBuffer();

  const outputName = basename(inputPath, extname(inputPath)) + ".docx";
  const outputPath = resolve(process.cwd(), outputName);
  await writeFile(outputPath, Buffer.from(arrayBuffer));

  console.log(`\n✅ Terminé. Fichier sauvegardé : ${outputPath}`);
  console.log("Ouvre-le dans Word et évalue la fidélité de mise en page.");
}

main().catch((err) => {
  console.error("\n❌ Erreur :", err.message);
  if (err.cause) {
    console.error("Cause détaillée :", err.cause);
  }
  process.exit(1);
});