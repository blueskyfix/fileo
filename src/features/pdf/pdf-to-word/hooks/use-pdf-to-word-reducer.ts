import { useReducer } from "react";
import type { PdfToWordAction, PdfToWordState } from "../types";

const initialState: PdfToWordState = {
  status: "idle",
  file: null,
  extraction: null,
  resultBlob: null,
  resultFileName: null,
  errorMessage: null,
};

function pdfToWordReducer(
  state: PdfToWordState,
  action: PdfToWordAction
): PdfToWordState {
  switch (action.type) {
    case "FILE_SELECTED":
      return {
        ...initialState,
        file: action.file,
      };

    case "EXTRACTION_STARTED":
      return {
        ...state,
        status: "extracting",
        errorMessage: null,
      };

    case "EXTRACTION_SUCCEEDED":
      return {
        ...state,
        status: action.result.isProbablyScanned ? "scanned-warning" : "ready",
        extraction: action.result,
      };

    case "EXTRACTION_FAILED":
      return {
        ...state,
        status: "error",
        errorMessage: action.message,
      };

    case "USER_CONFIRMED_DESPITE_WARNING":
      return {
        ...state,
        status: "ready",
      };

    case "CONVERSION_STARTED":
      return {
        ...state,
        status: "converting",
        errorMessage: null,
      };

    case "CONVERSION_SUCCEEDED":
      return {
        ...state,
        status: "done",
        resultBlob: action.blob,
        resultFileName: action.fileName,
      };

    case "CONVERSION_FAILED":
      return {
        ...state,
        status: "error",
        errorMessage: action.message,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

export function usePdfToWordReducer() {
  return useReducer(pdfToWordReducer, initialState);
}