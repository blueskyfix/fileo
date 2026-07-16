export type PdfToWordStatus =
  | "idle"
  | "extracting"
  | "scanned-warning"
  | "ready"
  | "converting"
  | "done"
  | "error";

export type LineKind = "heading1" | "heading2" | "bullet" | "normal";

export interface ExtractedLine {
  text: string;
  kind: LineKind;
  fontSize: number;
  y: number;
}

export interface ExtractedPage {
  pageNumber: number;
  lines: ExtractedLine[];
  charCount: number;
}

export interface ExtractionResult {
  pages: ExtractedPage[];
  totalCharCount: number;
  isProbablyScanned: boolean;
}

export interface PdfToWordState {
  status: PdfToWordStatus;
  file: File | null;
  extraction: ExtractionResult | null;
  resultBlob: Blob | null;
  resultFileName: string | null;
  errorMessage: string | null;
}

export type PdfToWordAction =
  | { type: "FILE_SELECTED"; file: File }
  | { type: "EXTRACTION_STARTED" }
  | { type: "EXTRACTION_SUCCEEDED"; result: ExtractionResult }
  | { type: "EXTRACTION_FAILED"; message: string }
  | { type: "USER_CONFIRMED_DESPITE_WARNING" }
  | { type: "CONVERSION_STARTED" }
  | { type: "CONVERSION_SUCCEEDED"; blob: Blob; fileName: string }
  | { type: "CONVERSION_FAILED"; message: string }
  | { type: "RESET" };