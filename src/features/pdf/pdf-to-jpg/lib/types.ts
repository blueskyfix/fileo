export type { PdfPageInfo } from "@/features/pdf/shared/types";

export type PdfToJpgStatus =
  | "idle"
  | "loading"
  | "ready"
  | "converting"
  | "done"
  | "error";