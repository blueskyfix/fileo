// src/core/cloudconvert/client.ts
//
// Client CloudConvert partagé entre toutes les routes de conversion backend
// (PDF -> Word, Word -> PDF, et futurs outils si besoin).
// Centralise : sélection Sandbox/Live, vérification de crédits, appels API
// typés, polling. Les routes ne doivent plus dupliquer cette logique.
//
// Important : PDF->Word et Word->PDF partagent le MÊME pool de crédits
// CloudConvert (10 crédits/jour en gratuit). checkRemainingCredits() est donc
// le garde-fou commun aux deux outils — décision prise pour ne pas bloquer
// le lancement de Word->PDF derrière un plan payant.

export const MIN_CREDITS_RESERVE = 2;
export const POLL_INTERVAL_MS = 1500;
export const POLL_TIMEOUT_MS = 45_000;

export interface CloudConvertTask {
  id: string;
  name: string;
  status: "waiting" | "processing" | "finished" | "error";
  message?: string;
  result?: {
    form?: { url: string; parameters: Record<string, string> };
    files?: { url: string; filename: string }[];
  };
}

export interface CloudConvertJob {
  id: string;
  tasks: CloudConvertTask[];
}

export class QuotaExceededError extends Error {
  constructor() {
    super("Quota de conversions atteint pour le moment. Réessayez plus tard.");
    this.name = "QuotaExceededError";
  }
}

export function getCloudConvertConfig() {
  const isProduction = process.env.NODE_ENV === "production";

  const apiKey = isProduction
    ? process.env.CLOUDCONVERT_API_KEY_LIVE
    : process.env.CLOUDCONVERT_API_KEY_SANDBOX;

  const baseUrl = isProduction
    ? "https://api.cloudconvert.com/v2"
    : "https://api.sandbox.cloudconvert.com/v2";

  return { apiKey, baseUrl, isSandbox: !isProduction };
}

export async function cloudConvertFetch<T>(
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

/**
 * Vérifie le solde de crédits CloudConvert AVANT de lancer une conversion.
 * Partagé par tous les outils backend (PDF->Word, Word->PDF, ...) car ils
 * consomment le même pool quotidien de crédits Live.
 */
export async function checkRemainingCredits(
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

/**
 * Poll un job CloudConvert jusqu'à ce que toutes ses tâches soient
 * terminées (finished ou error), ou jusqu'au timeout.
 */
export async function pollJobUntilDone(
  baseUrl: string,
  apiKey: string,
  jobId: string
): Promise<CloudConvertJob> {
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

    if (allDone) return status.data;
  }
}