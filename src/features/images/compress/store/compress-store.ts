import type { ImageFileInfo, SupportedImageMime } from "@/features/images/shared/types";
import type { CompressionLevel } from "../lib/compression-levels";

export interface CompressState {
  files: ImageFileInfo[];
  level: CompressionLevel;
  outputFormat: SupportedImageMime;
}

export type CompressAction =
  | { type: "ADD_FILES"; files: ImageFileInfo[] }
  | { type: "REMOVE_FILE"; id: string }
  | { type: "SET_LEVEL"; level: CompressionLevel }
  | { type: "SET_OUTPUT_FORMAT"; format: SupportedImageMime }
  | { type: "SET_STATUS"; id: string; status: ImageFileInfo["status"] }
  | { type: "SET_RESULT"; id: string; compressedBlob: Blob; compressedSize: number }
  | { type: "SET_ERROR"; id: string; message: string }
  | { type: "RESET" };

export const initialCompressState: CompressState = {
  files: [],
  level: "balanced",
  outputFormat: "image/jpeg",
};

export function compressReducer(state: CompressState, action: CompressAction): CompressState {
  switch (action.type) {
    case "ADD_FILES":
      return { ...state, files: [...state.files, ...action.files] };

    case "REMOVE_FILE":
      return { ...state, files: state.files.filter((f) => f.id !== action.id) };

    case "SET_LEVEL":
      return { ...state, level: action.level };

    case "SET_OUTPUT_FORMAT":
      return { ...state, outputFormat: action.format };

    case "SET_STATUS":
      return {
        ...state,
        files: state.files.map((f) => (f.id === action.id ? { ...f, status: action.status } : f)),
      };

    case "SET_RESULT":
      return {
        ...state,
        files: state.files.map((f) =>
          f.id === action.id
            ? { ...f, status: "done", compressedBlob: action.compressedBlob, compressedSize: action.compressedSize }
            : f
        ),
      };

    case "SET_ERROR":
      return {
        ...state,
        files: state.files.map((f) =>
          f.id === action.id ? { ...f, status: "error", errorMessage: action.message } : f
        ),
      };

    case "RESET":
      return initialCompressState;

    default:
      return state;
  }
}