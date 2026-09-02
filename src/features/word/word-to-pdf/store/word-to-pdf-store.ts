// src/features/word/word-to-pdf/store/word-to-pdf-store.ts

export type WordToPdfStatus = "idle" | "ready" | "converting" | "done" | "error";

export interface WordToPdfState {
  status: WordToPdfStatus;
  file: File | null;
  resultBlob: Blob | null;
  resultFilename: string | null;
  errorMessage: string | null;
}

export const initialWordToPdfState: WordToPdfState = {
  status: "idle",
  file: null,
  resultBlob: null,
  resultFilename: null,
  errorMessage: null,
};

export type WordToPdfAction =
  | { type: "SET_FILE"; file: File }
  | { type: "START_CONVERT" }
  | { type: "CONVERT_SUCCESS"; blob: Blob; filename: string }
  | { type: "CONVERT_ERROR"; message: string }
  | { type: "RESET" };

export function wordToPdfReducer(
  state: WordToPdfState,
  action: WordToPdfAction
): WordToPdfState {
  switch (action.type) {
    case "SET_FILE":
      return {
        ...initialWordToPdfState,
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
      return initialWordToPdfState;
    default:
      return state;
  }
}