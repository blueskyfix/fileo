import type { PdfPageInfo } from "@/features/pdf/shared/types";

export type RotateStatus =
  | "idle"
  | "loading"
  | "ready"
  | "rotating"
  | "done"
  | "error";

export type RotateMode = "all" | "selection";

export interface RotateState {
  file: File | null;
  pages: PdfPageInfo[];
  rotations: Record<number, number>; // pageNumber -> 0 | 90 | 180 | 270
  mode: RotateMode;
  selectedPages: Record<number, boolean>;
  status: RotateStatus;
  error: string | null;
  resultBlob: Blob | null;
}

export const initialRotateState: RotateState = {
  file: null,
  pages: [],
  rotations: {},
  mode: "all",
  selectedPages: {},
  status: "idle",
  error: null,
  resultBlob: null,
};

export type RotateAction =
  | { type: "SET_FILE"; file: File }
  | { type: "PAGES_LOADED"; pages: PdfPageInfo[] }
  | { type: "LOAD_ERROR"; message: string }
  | { type: "ROTATE_PAGE"; pageNumber: number }
  | { type: "ROTATE_TARGET"; delta: number } // applique selon le mode courant
  | { type: "RESET_ROTATIONS" }
  | { type: "SET_MODE"; mode: RotateMode }
  | { type: "TOGGLE_PAGE_SELECTION"; pageNumber: number }
  | { type: "SELECT_ALL" }
  | { type: "DESELECT_ALL" }
  | { type: "START_ROTATE" }
  | { type: "ROTATE_SUCCESS"; blob: Blob }
  | { type: "ROTATE_ERROR"; message: string }
  | { type: "RESET" };

function normalize(angle: number): number {
  return ((angle % 360) + 360) % 360;
}

export function rotateReducer(
  state: RotateState,
  action: RotateAction
): RotateState {
  switch (action.type) {
    case "SET_FILE":
      return {
        ...initialRotateState,
        file: action.file,
        status: "loading",
      };
    case "PAGES_LOADED":
      return { ...state, pages: action.pages, status: "ready" };
    case "LOAD_ERROR":
      return { ...state, status: "error", error: action.message };
    case "ROTATE_PAGE": {
      const current = state.rotations[action.pageNumber] ?? 0;
      return {
        ...state,
        rotations: {
          ...state.rotations,
          [action.pageNumber]: normalize(current + 90),
        },
      };
    }
    case "ROTATE_TARGET": {
      const targetPages =
        state.mode === "all"
          ? state.pages.map((p) => p.pageNumber)
          : state.pages
              .map((p) => p.pageNumber)
              .filter((n) => state.selectedPages[n]);

      if (targetPages.length === 0) return state;

      const next = { ...state.rotations };
      for (const pageNumber of targetPages) {
        const current = next[pageNumber] ?? 0;
        next[pageNumber] = normalize(current + action.delta);
      }
      return { ...state, rotations: next };
    }
    case "RESET_ROTATIONS":
      return { ...state, rotations: {} };
    case "SET_MODE":
      return {
        ...state,
        mode: action.mode,
        selectedPages: action.mode === "all" ? {} : state.selectedPages,
      };
    case "TOGGLE_PAGE_SELECTION": {
      const isSelected = !state.selectedPages[action.pageNumber];
      return {
        ...state,
        selectedPages: {
          ...state.selectedPages,
          [action.pageNumber]: isSelected,
        },
      };
    }
    case "SELECT_ALL": {
      const all: Record<number, boolean> = {};
      for (const page of state.pages) all[page.pageNumber] = true;
      return { ...state, selectedPages: all };
    }
    case "DESELECT_ALL":
      return { ...state, selectedPages: {} };
    case "START_ROTATE":
      return { ...state, status: "rotating", error: null };
    case "ROTATE_SUCCESS":
      return { ...state, status: "done", resultBlob: action.blob };
    case "ROTATE_ERROR":
      return { ...state, status: "error", error: action.message };
    case "RESET":
      return initialRotateState;
    default:
      return state;
  }
}