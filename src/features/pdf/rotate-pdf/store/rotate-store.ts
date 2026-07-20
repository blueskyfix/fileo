import type { PdfPageInfo } from "@/features/pdf/shared/types";

export type RotateStatus =
  | "idle"
  | "loading"
  | "ready"
  | "rotating"
  | "done"
  | "error";

export interface RotateState {
  file: File | null;
  pages: PdfPageInfo[];
  rotations: Record<number, number>; // pageNumber -> 0 | 90 | 180 | 270
  status: RotateStatus;
  error: string | null;
  resultBlob: Blob | null;
}

export const initialRotateState: RotateState = {
  file: null,
  pages: [],
  rotations: {},
  status: "idle",
  error: null,
  resultBlob: null,
};

export type RotateAction =
  | { type: "SET_FILE"; file: File }
  | { type: "PAGES_LOADED"; pages: PdfPageInfo[] }
  | { type: "LOAD_ERROR"; message: string }
  | { type: "ROTATE_PAGE"; pageNumber: number }
  | { type: "ROTATE_ALL"; delta: number }
  | { type: "RESET_ROTATIONS" }
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
    case "ROTATE_ALL": {
      const next: Record<number, number> = {};
      for (const page of state.pages) {
        const current = state.rotations[page.pageNumber] ?? 0;
        next[page.pageNumber] = normalize(current + action.delta);
      }
      return { ...state, rotations: next };
    }
    case "RESET_ROTATIONS":
      return { ...state, rotations: {} };
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