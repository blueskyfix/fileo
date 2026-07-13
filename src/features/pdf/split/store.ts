import type { PdfPageInfo } from "@/features/pdf/shared/types";
import type { SplitMode, SplitStatus } from "./lib/types";

export interface SplitState {
  file: File | null;
  pages: PdfPageInfo[];
  mode: SplitMode;
  status: SplitStatus;
  error: string | null;
  resultUrl: string | null;
  resultFilename: string | null;
}

export type SplitAction =
  | { type: "SET_FILE"; file: File }
  | { type: "PAGES_LOADED"; pages: PdfPageInfo[] }
  | { type: "LOAD_ERROR"; error: string }
  | { type: "TOGGLE_PAGE"; pageNumber: number }
  | { type: "SELECT_ALL" }
  | { type: "DESELECT_ALL" }
  | { type: "SET_MODE"; mode: SplitMode }
  | { type: "START_SPLITTING" }
  | { type: "SPLITTING_SUCCESS"; resultUrl: string; resultFilename: string }
  | { type: "SPLITTING_ERROR"; error: string }
  | { type: "RESET" };

export const initialSplitState: SplitState = {
  file: null,
  pages: [],
  mode: "extract",
  status: "idle",
  error: null,
  resultUrl: null,
  resultFilename: null,
};

export function splitReducer(state: SplitState, action: SplitAction): SplitState {
  switch (action.type) {
    case "SET_FILE":
      return { ...initialSplitState, file: action.file, status: "loading" };
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
    case "SET_MODE":
      return { ...state, mode: action.mode };
    case "START_SPLITTING":
      return { ...state, status: "splitting", error: null };
    case "SPLITTING_SUCCESS":
      return {
        ...state,
        status: "done",
        resultUrl: action.resultUrl,
        resultFilename: action.resultFilename,
      };
    case "SPLITTING_ERROR":
      return { ...state, status: "error", error: action.error };
    case "RESET":
      return initialSplitState;
    default:
      return state;
  }
}