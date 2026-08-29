// src/features/pdf-to-word/hooks/use-pdf-to-word.ts
"use client";

import { useCallback, useReducer, useRef } from "react";
import { trackEvent } from "@/core/config/analytics";
import { convertPdfToWord } from "../lib/pdf-to-word-client";
import {
  initialPdfToWordState,
  pdfToWordReducer,
} from "../store/pdf-to-word-store";

export function usePdfToWord() {
  const [state, dispatch] = useReducer(pdfToWordReducer, initialPdfToWordState);
  const objectUrlRef = useRef<string | null>(null);

  const setFile = useCallback((file: File) => {
    dispatch({ type: "SET_FILE", file });
  }, []);

  const convert = useCallback(async () => {
    if (!state.file) return;

    dispatch({ type: "START_CONVERT" });

    try {
      const { blob, filename } = await convertPdfToWord(state.file);
      dispatch({ type: "CONVERT_SUCCESS", blob, filename });
      trackEvent("pdf_to_word_completed");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "La conversion a échoué. Réessayez dans quelques instants.";
      dispatch({ type: "CONVERT_ERROR", message });
    }
  }, [state.file]);

  const downloadResult = useCallback(() => {
    if (!state.resultBlob || !state.resultFilename) return;

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    const url = URL.createObjectURL(state.resultBlob);
    objectUrlRef.current = url;

    const link = document.createElement("a");
    link.href = url;
    link.download = state.resultFilename;
    link.click();
  }, [state.resultBlob, state.resultFilename]);

  const reset = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    dispatch({ type: "RESET" });
  }, []);

  return {
    status: state.status,
    file: state.file,
    errorMessage: state.errorMessage,
    resultFilename: state.resultFilename,
    setFile,
    convert,
    downloadResult,
    reset,
  };
}