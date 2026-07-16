import type { PdfPageInfo } from "@/features/pdf/shared/types";
import type { RemovePagesStatus } from "./lib/types";

export interface RemovePagesState {
  file: File | null;
  pages: PdfPageInfo[];
  status: RemovePagesStatus;
  error: string | null;
  resultUrl: string | null;
  resultFilename: string | null;
}

export type RemovePagesAction =
  | { type: "SET_FILE"; file: File }
  | { type: "PAGES_LOADED"; pages: PdfPageInfo[] }
  | { type: "LOAD_ERROR"; error: string }
  | { type: "TOGGLE_PAGE"; pageNumber: number }
  | { type: "SELECT_ALL" }
  | { type: "DESELECT_ALL" }
  | { type: "START_REMOVING" }
  | { type: "REMOVING_SUCCESS"; resultUrl: string; resultFilename: string }
  | { type: "REMOVING_ERROR"; error: string }
  | { type: "RESET" };

export const initialRemovePagesState: RemovePagesState = {
  file: null,
  pages: [],
  status: "idle",
  error: null,
  resultUrl: null,
  resultFilename: null,
};

export function removePagesReducer(
  state: RemovePagesState,
  action: RemovePagesAction,
): RemovePagesState {
  switch (action.type) {
    case "SET_FILE":
      return { ...initialRemovePagesState, file: action.file, status: "loading" };
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
    case "START_REMOVING":
      return { ...state, status: "removing", error: null };
    case "REMOVING_SUCCESS":
      return {
        ...state,
        status: "done",
        resultUrl: action.resultUrl,
        resultFilename: action.resultFilename,
      };
    case "REMOVING_ERROR":
      return { ...state, status: "error", error: action.error };
    case "RESET":
      return initialRemovePagesState;
    default:
      return state;
  }
}