import type { JpgToPdfImage, JpgToPdfStatus } from "./lib/types";

export interface JpgToPdfState {
  images: JpgToPdfImage[];
  status: JpgToPdfStatus;
  error: string | null;
  resultUrl: string | null;
}

export type JpgToPdfAction =
  | { type: "ADD_IMAGES"; images: JpgToPdfImage[] }
  | { type: "REMOVE_IMAGE"; id: string }
  | { type: "REORDER_IMAGES"; images: JpgToPdfImage[] }
  | { type: "START_CONVERTING" }
  | { type: "CONVERTING_SUCCESS"; resultUrl: string }
  | { type: "CONVERTING_ERROR"; error: string }
  | { type: "RESET" };

export const initialJpgToPdfState: JpgToPdfState = {
  images: [],
  status: "idle",
  error: null,
  resultUrl: null,
};

export function jpgToPdfReducer(
  state: JpgToPdfState,
  action: JpgToPdfAction,
): JpgToPdfState {
  switch (action.type) {
    case "ADD_IMAGES":
      return {
        ...state,
        images: [...state.images, ...action.images],
        status: "idle",
        error: null,
      };
    case "REMOVE_IMAGE":
      return { ...state, images: state.images.filter((img) => img.id !== action.id) };
    case "REORDER_IMAGES":
      return { ...state, images: action.images };
    case "START_CONVERTING":
      return { ...state, status: "converting", error: null };
    case "CONVERTING_SUCCESS":
      return { ...state, status: "done", resultUrl: action.resultUrl };
    case "CONVERTING_ERROR":
      return { ...state, status: "error", error: action.error };
    case "RESET":
      return initialJpgToPdfState;
    default:
      return state;
  }
}