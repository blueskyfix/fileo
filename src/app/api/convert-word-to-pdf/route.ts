// src/app/api/convert-word-to-pdf/route.ts
//
// Route serveur pour la conversion DOCX -> PDF via l'API CloudConvert.
// Exception architecturale au même titre que /api/convert-pdf-to-word :
// le rendu 100% client-side (mammoth + html2canvas + jsPDF) a été testé
// et écarté, car il casse la mise en forme visuelle du document Word
// (couleurs de marque, tableaux stylés, mise en page) — inacceptable pour
// l'usage réel visé (cahiers des charges, propositions, CV...).
//
// Partage le même pool de crédits CloudConvert que /api/convert-pdf-to-word
// (10 crédits/jour gratuits) — voir core/cloudconvert/client.ts.

import { NextRequest, NextResponse } from "next/server";
import {
  getCloudConvertConfig,
  cloudConvertFetch,
  checkRemainingCredits,
  pollJobUntilDone,
  QuotaExceededError,
  type CloudConvertJob,
} from "@/core/cloudconvert/client";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024; // 20 Mo, cohérent avec convert-pdf-to-word
const WORD_MIME_TYPE =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export async function POST(request: NextRequest) {
  const { apiKey, baseUrl, isSandbox } = getCloudConvertConfig();

  if (!apiKey) {
    console.error("CloudConvert : clé API manquante côté serveur.");
    return NextResponse.json(
      { error: "Configuration serveur incomplète." },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Aucun fichier Word reçu." },
        { status: 400 }
      );
    }

    if (file.type !== WORD_MIME_TYPE) {
      return NextResponse.json(
        { error: "Le fichier doit être un document Word (.docx)." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Le fichier dépasse la taille maximale autorisée (20 Mo)." },
        { status: 413 }
      );
    }

    // 1. Vérifier le solde de crédits AVANT de consommer des ressources CloudConvert.
    //    Ce solde est PARTAGÉ avec convert-pdf-to-word.
    await checkRemainingCredits(baseUrl, apiKey, isSandbox);

    // 2. Créer le job (import + convert + export)
    const job = await cloudConvertFetch<{ data: CloudConvertJob }>(
      baseUrl,
      apiKey,
      "/jobs",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tasks: {
            "import-file": { operation: "import/upload" },
            "convert-file": {
              operation: "convert",
              input: "import-file",
              input_format: "docx",
              output_format: "pdf",
              // Ne pas forcer engine:"office" — laisser CloudConvert
              // auto-sélectionner (leçon apprise sur convert-pdf-to-word :
              // un engine forcé peut casser silencieusement la conversion).
            },
            "export-file": {
              operation: "export/url",
              input: "convert-file",
            },
          },
        }),
      }
    );

    const importTask = job.data.tasks.find((t) => t.name === "import-file");
    if (!importTask?.result?.form) {
      throw new Error("Tâche d'import introuvable dans la réponse CloudConvert.");
    }

    const { url: uploadUrl, parameters: uploadParams } = importTask.result.form;

    // 3. Uploader le fichier vers CloudConvert (FormData natif, aucune dépendance externe)
    const uploadForm = new FormData();
    for (const [key, value] of Object.entries(uploadParams)) {
      uploadForm.append(key, value);
    }
    uploadForm.append("file", file, file.name);

    const uploadResponse = await fetch(uploadUrl, {
      method: "POST",
      body: uploadForm,
    });

    if (!uploadResponse.ok) {
      const body = await uploadResponse.text();
      throw new Error(
        `Échec de l'upload vers CloudConvert (HTTP ${uploadResponse.status}) : ${body}`
      );
    }

    // 4. Attendre la fin du job (polling, factorisé dans le client partagé)
    const finishedJob = await pollJobUntilDone(baseUrl, apiKey, job.data.id);

    const failedTasks = finishedJob.tasks.filter((t) => t.status === "error");
    if (failedTasks.length > 0) {
      console.error("CloudConvert : tâche(s) en erreur", failedTasks);
      throw new Error(
        "La conversion a échoué. Le fichier est peut-être corrompu ou dans un format non supporté."
      );
    }

    // 5. Récupérer et renvoyer le fichier converti
    const exportTask = finishedJob.tasks.find((t) => t.name === "export-file");
    const fileInfo = exportTask?.result?.files?.[0];

    if (!fileInfo) {
      throw new Error("Aucun fichier de sortie retourné par CloudConvert.");
    }

    const fileResponse = await fetch(fileInfo.url);
    const arrayBuffer = await fileResponse.arrayBuffer();

    const outputName = file.name.replace(/\.docx$/i, "") + ".pdf";

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${encodeURIComponent(outputName)}"`,
      },
    });
  } catch (error) {
    if (error instanceof QuotaExceededError) {
      return NextResponse.json({ error: error.message }, { status: 429 });
    }

    console.error("Erreur de conversion Word vers PDF :", error);
    return NextResponse.json(
      { error: "La conversion a échoué. Réessayez dans quelques instants." },
      { status: 500 }
    );
  }
}