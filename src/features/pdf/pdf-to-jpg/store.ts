import type { PdfPageInfo, PdfToJpgStatus } from "./lib/types";

export interface PdfToJpgState {
  file: File | null;
  pages: PdfPageInfo[];
  status: PdfToJpgStatus;
  error: string | null;
  resultUrl: string | null;
  resultFilename: string | null;
}

export type PdfToJpgAction =
  | { type: "SET_FILE"; file: File }
  | { type: "PAGES_LOADED"; pages: PdfPageInfo[] }
  | { type: "LOAD_ERROR"; error: string }
  | { type: "TOGGLE_PAGE"; pageNumber: number }
  | { type: "SELECT_ALL" }
  | { type: "DESELECT_ALL" }
  | { type: "START_CONVERTING" }
  | { type: "CONVERTING_SUCCESS"; resultUrl: string; resultFilename: string }
  | { type: "CONVERTING_ERROR"; error: string }
  | { type: "RESET" };

export const initialPdfToJpgState: PdfToJpgState = {
  file: null,
  pages: [],
  status: "idle",
  error: null,
  resultUrl: null,
  resultFilename: null,
};

export function pdfToJpgReducer(
  state: PdfToJpgState,
  action: PdfToJpgAction,
): PdfToJpgState {
  switch (action.type) {
    case "SET_FILE":
      return { ...initialPdfToJpgState, file: action.file, status: "loading" };
    case "PAGES_LOADED":
      return { ...state, pages: action.pages, status: "ready" };
    case "LOAD_ERROR":
      return { ...state, status: "error", error: action.error };
    case "TOGGLE_PAGE":
      return {
        ...state,
        pages: state.pages.map((p) =>
          p.pageNumber === action.pageNumber ? { ...p, selected: !p.selected } : p,
        ),
      };
    case "SELECT_ALL":
      return { ...state, pages: state.pages.map((p) => ({ ...p, selected: true })) };
    case "DESELECT_ALL":
      return { ...state, pages: state.pages.map((p) => ({ ...p, selected: false })) };
    case "START_CONVERTING":
      return { ...state, status: "converting", error: null };
    case "CONVERTING_SUCCESS":
      return {
        ...state,
        status: "done",
        resultUrl: action.resultUrl,
        resultFilename: action.resultFilename,
      };
    case "CONVERTING_ERROR":
      return { ...state, status: "error", error: action.error };
    case "RESET":
      return initialPdfToJpgState;
    default:
      return state;
  }
}