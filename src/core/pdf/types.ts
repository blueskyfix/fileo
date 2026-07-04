export type PdfValidationErrorCode =
  | "invalid-type"
  | "too-large"
  | "corrupted"
  | "empty";

export interface PdfValidationError {
  code: PdfValidationErrorCode;
  message: string;
}

export type PdfValidationResult =
  | { valid: true }
  | { valid: false; error: PdfValidationError };