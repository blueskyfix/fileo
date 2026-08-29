// src/app/api/convert-pdf-to-word/route.ts
//
// Route serveur pour la conversion PDF -> DOCX via l'API CloudConvert.
// La clé API ne doit JAMAIS être exposée au client : tout se passe ici.
//
// Sécurité :
// - Validation stricte du type et de la taille du fichier reçu.
// - Vérification du solde de crédits CloudConvert avant de lancer une conversion,
//   pour éviter un échec en cours de route si le compte est à sec.
// - Bascule automatiquement sur le mode Sandbox hors production (aucune conversion
//   n'aboutit avec un fichier arbitraire en Sandbox, sauf fichier dont le MD5 est
//   whitelisté depuis le dashboard CloudConvert, section "Sandbox").

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60; // les conversions observées prennent quelques secondes, marge de sécurité

const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024; // 20 Mo — à ajuster selon la limite de payload de ton hébergeur
const MIN_CREDITS_RESERVE = 2; // ne jamais descendre en dessous, pour éviter un échec en pleine conversion
const POLL_INTERVAL_MS = 1500;
const POLL_TIMEOUT_MS = 45_000;

interface CloudConvertTask {
  id: string;
  name: string;
  status: "waiting" | "processing" | "finished" | "error";
  message?: string;
  result?: {
    form?: { url: string; parameters: Record<string, string> };
    files?: { url: string; filename: string }[];
  };
}

interface CloudConvertJob {
  id: string;
  tasks: CloudConvertTask[];
}

class QuotaExceededError extends Error {
  constructor() {
    super("Quota de conversions atteint pour le moment. Réessayez plus tard.");
    this.name = "QuotaExceededError";
  }
}

function getCloudConvertConfig() {
  const isProduction = process.env.NODE_ENV === "production";

  const apiKey = isProduction
    ? process.env.CLOUDCONVERT_API_KEY_LIVE
    : process.env.CLOUDCONVERT_API_KEY_SANDBOX;

  const baseUrl = isProduction
    ? "https://api.cloudconvert.com/v2"
    : "https://api.sandbox.cloudconvert.com/v2";

  return { apiKey, baseUrl, isSandbox: !isProduction };
}

async function cloudConvertFetch<T>(
  baseUrl: string,
  apiKey: string,
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `CloudConvert API error (${response.status}) sur ${path} : ${JSON.stringify(data)}`
    );
  }

  return data as T;
}

async function checkRemainingCredits(
  baseUrl: string,
  apiKey: string,
  isSandbox: boolean
): Promise<void> {
  // Le mode Sandbox ne consomme jamais de crédits réels : rien à vérifier.
  if (isSandbox) return;

  const data = await cloudConvertFetch<{ data: { credits: number } }>(
    baseUrl,
    apiKey,
    "/users/me"
  );

  if (data.data.credits < MIN_CREDITS_RESERVE) {
    throw new QuotaExceededError();
  }
}

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
        { error: "Aucun fichier PDF reçu." },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Le fichier doit être un PDF." },
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
              input_format: "pdf",
              output_format: "docx",
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

    // 4. Attendre la fin du job (polling)
    const jobId = job.data.id;
    let finishedJob: CloudConvertJob | undefined;
    const startTime = Date.now();

    while (true) {
      if (Date.now() - startTime > POLL_TIMEOUT_MS) {
        throw new Error("La conversion a dépassé le délai maximal autorisé.");
      }

      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));

      const status = await cloudConvertFetch<{ data: CloudConvertJob }>(
        baseUrl,
        apiKey,
        `/jobs/${jobId}`
      );

      const allDone = status.data.tasks.every(
        (t) => t.status === "finished" || t.status === "error"
      );

      if (allDone) {
        finishedJob = status.data;
        break;
      }
    }

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

    const outputName = file.name.replace(/\.pdf$/i, "") + ".docx";

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${encodeURIComponent(outputName)}"`,
      },
    });
  } catch (error) {
    if (error instanceof QuotaExceededError) {
      return NextResponse.json({ error: error.message }, { status: 429 });
    }

    console.error("Erreur de conversion PDF vers Word :", error);
    return NextResponse.json(
      { error: "La conversion a échoué. Réessayez dans quelques instants." },
      { status: 500 }
    );
  }
}