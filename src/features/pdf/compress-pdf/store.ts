import type { SelectableLevel } from "./lib/levels";
import type { CompressPdfStatus } from "./lib/types";

export interface CompressPdfResultInfo {
  url: string;
  filename: string;
  size: number;
  imagesRecompressed: number;
  reachedTarget: boolean;
}

export interface CompressPdfState {
  file: File | null;
  level: SelectableLevel;
  /** Saisie brute de la taille cible en Mo ("" = pas de cible). */
  targetMb: string;
  status: CompressPdfStatus;
  progress: number;
  error: string | null;
  result: CompressPdfResultInfo | null;
}

export type CompressPdfAction =
  | { type: "SET_FILE"; file: File }
  | { type: "SET_LEVEL"; level: SelectableLevel }
  | { type: "SET_TARGET"; targetMb: string }
  | { type: "START" }
  | { type: "PROGRESS"; value: number }
  | { type: "SUCCESS"; result: CompressPdfResultInfo }
  | { type: "NO_GAIN" }
  | { type: "ERROR"; error: string }
  | { type: "RESET" };

export const initialCompressPdfState: CompressPdfState = {
  file: null,
  level: "balanced",
  targetMb: "",
  status: "idle",
  progress: 0,
  error: null,
  result: null,
};

export function compressPdfReducer(
  state: CompressPdfState,
  action: CompressPdfAction,
): CompressPdfState {
  switch (action.type) {
    case "SET_FILE":
      return { ...initialCompressPdfState, file: action.file, status: "ready" };
    case "SET_LEVEL":
      return { ...state, level: action.level };
    case "SET_TARGET":
      return { ...state, targetMb: action.targetMb };
    case "START":
      return { ...state, status: "compressing", progress: 0, error: null, result: null };
    case "PROGRESS":
      return { ...state, progress: action.value };
    case "SUCCESS":
      return { ...state, status: "done", result: action.result };
    case "NO_GAIN":
      return { ...state, status: "no-gain" };
    case "ERROR":
      return { ...state, status: "error", error: action.error };
    case "RESET":
      return initialCompressPdfState;
    default:
      return state;
  }
}
