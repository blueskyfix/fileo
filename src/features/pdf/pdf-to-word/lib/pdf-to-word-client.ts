// src/features/pdf-to-word/lib/pdf-to-word-client.ts

export interface ConvertPdfToWordResult {
  blob: Blob;
  filename: string;
}

export async function convertPdfToWord(
  file: File
): Promise<ConvertPdfToWordResult> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/convert-pdf-to-word", {
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
    : file.name.replace(/\.pdf$/i, "") + ".docx";

  return { blob, filename };
}