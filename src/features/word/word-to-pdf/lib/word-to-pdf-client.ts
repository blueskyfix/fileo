// src/features/word/word-to-pdf/lib/word-to-pdf-client.ts

export interface ConvertWordToPdfResult {
  blob: Blob;
  filename: string;
}

export async function convertWordToPdf(
  file: File
): Promise<ConvertWordToPdfResult> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/convert-word-to-pdf", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    let message = "La conversion a échoué. Réessayez dans quelques instants.";
    try {
      const data = (await response.json()) as { error?: string };
      if (data.error) {
        message = data.error;
      }
    } catch {
      // Réponse non-JSON (ex. timeout serveur) : on garde le message par défaut.
    }
    throw new Error(message);
  }

  const blob = await response.blob();

  const disposition = response.headers.get("Content-Disposition") ?? "";
  const match = /filename\*?=(?:UTF-8'')?"?([^";]+)"?/i.exec(disposition);
  const filename = match?.[1]
    ? decodeURIComponent(match[1])
    : file.name.replace(/\.docx$/i, "") + ".pdf";

  return { blob, filename };
}