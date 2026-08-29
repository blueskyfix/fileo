// src/features/pdf-to-word/store/pdf-to-word-store.ts

export type PdfToWordStatus = "idle" | "ready" | "converting" | "done" | "error";

export interface PdfToWordState {
  status: PdfToWordStatus;
  file: File | null;
  resultBlob: Blob | null;
  resultFilename: string | null;
  errorMessage: string | null;
}

export const initialPdfToWordState: PdfToWordState = {
  status: "idle",
  file: null,
  resultBlob: null,
  resultFilename: null,
  errorMessage: null,
};

export type PdfToWordAction =
  | { type: "SET_FILE"; file: File }
  | { type: "START_CONVERT" }
  | { type: "CONVERT_SUCCESS"; blob: Blob; filename: string }
  | { type: "CONVERT_ERROR"; message: string }
  | { type: "RESET" };

export function pdfToWordReducer(
  state: PdfToWordState,
  action: PdfToWordAction
): PdfToWordState {
  switch (action.type) {
    case "SET_FILE":
      return {
        ...initialPdfToWordState,
        status: "ready",
        file: action.file,
      };
    case "START_CONVERT":
      return { ...state, status: "converting", errorMessage: null };
    case "CONVERT_SUCCESS":
      return {
        ...state,
        status: "done",
        resultBlob: action.blob,
        resultFilename: action.filename,
      };
    case "CONVERT_ERROR":
      return { ...state, status: "error", errorMessage: action.message };
    case "RESET":
      return initialPdfToWordState;
    default:
      return state;
  }
}