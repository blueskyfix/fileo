export type PdfFileStatus = "validating" | "ready" | "error";

export interface PdfFileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  pageCount: number | null;
  status: PdfFileStatus;
  errorMessage: string | null;
}