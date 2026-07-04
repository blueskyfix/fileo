import type { PdfValidationResult } from "./types";

export const MAX_PDF_FILE_SIZE_BYTES = 100 * 1024 * 1024; // 100 Mo par fichier

const PDF_MAGIC_BYTES = "%PDF-";

export async function validatePdfFile(
  file: File,
): Promise<PdfValidationResult> {
  if (file.size === 0) {
    return {
      valid: false,
      error: { code: "empty", message: "Le fichier est vide." },
    };
  }

  if (file.size > MAX_PDF_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: {
        code: "too-large",
        message: `Le fichier dépasse la taille maximale autorisée (${
          MAX_PDF_FILE_SIZE_BYTES / (1024 * 1024)
        } Mo).`,
      },
    };
  }

  const looksLikePdf =
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf");

  if (!looksLikePdf) {
    return {
      valid: false,
      error: { code: "invalid-type", message: "Le fichier n'est pas un PDF." },
    };
  }

  const header = await readFileHeader(file, PDF_MAGIC_BYTES.length);
  if (header !== PDF_MAGIC_BYTES) {
    return {
      valid: false,
      error: {
        code: "corrupted",
        message: "Le fichier ne semble pas être un PDF valide.",
      },
    };
  }

  return { valid: true };
}

async function readFileHeader(file: File, length: number): Promise<string> {
  const buffer = await file.slice(0, length).arrayBuffer();
  return new TextDecoder("ascii").decode(buffer);
}