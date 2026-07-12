export interface PdfPageInfo {
  pageNumber: number;
  thumbnailUrl: string;
  selected: boolean;
}

export type PdfToJpgStatus =
  | "idle"
  | "loading"
  | "ready"
  | "converting"
  | "done"
  | "error";