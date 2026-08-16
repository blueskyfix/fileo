export type WordToPdfStatus = "idle" | "converting" | "done" | "error";

export interface WordToPdfState {
  status: WordToPdfStatus;
  file: File | null;
  pdfBlob: Blob | null;
  pageCount: number | null;
  error: string | null;
}

export type WordToPdfAction =
  | { type: "SET_FILE"; file: File }
  | { type: "CONVERT_START" }
  | { type: "CONVERT_SUCCESS"; pdfBlob: Blob; pageCount: number }
  | { type: "CONVERT_ERROR"; message: string }
  | { type: "RESET" };

export const initialWordToPdfState: WordToPdfState = {
  status: "idle",
  file: null,
  pdfBlob: null,
  pageCount: null,
  error: null,
};

export function wordToPdfReducer(
  state: WordToPdfState,
  action: WordToPdfAction
): WordToPdfState {
  switch (action.type) {
    case "SET_FILE":
      return { ...initialWordToPdfState, file: action.file };
    case "CONVERT_START":
      return { ...state, status: "converting", error: null };
    case "CONVERT_SUCCESS":
      return {
        ...state,
        status: "done",
        pdfBlob: action.pdfBlob,
        pageCount: action.pageCount,
      };
    case "CONVERT_ERROR":
      return { ...state, status: "error", error: action.message };
    case "RESET":
      return initialWordToPdfState;
    default:
      return state;
  }
}