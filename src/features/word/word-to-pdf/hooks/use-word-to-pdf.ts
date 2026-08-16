"use client";

import { useCallback, useReducer } from "react";
import {
  initialWordToPdfState,
  wordToPdfReducer,
} from "../store/word-to-pdf-store";
import { convertWordToPdf } from "../lib/word-to-pdf-client";
import { trackEvent } from "@/core/config/analytics";
import { sanitizeFilename } from "@/core/utils/sanitize-filename";

export function useWordToPdf() {
  const [state, dispatch] = useReducer(wordToPdfReducer, initialWordToPdfState);

  const setFile = useCallback((file: File) => {
    dispatch({ type: "SET_FILE", file });
  }, []);

  const convert = useCallback(async () => {
    if (!state.file) return;

    dispatch({ type: "CONVERT_START" });

    try {
      const { pdfBlob, pageCount } = await convertWordToPdf(state.file);
      dispatch({ type: "CONVERT_SUCCESS", pdfBlob, pageCount });
      trackEvent("word_to_pdf_completed", { pageCount: String(pageCount) });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de la conversion.";
      dispatch({ type: "CONVERT_ERROR", message });
    }
  }, [state.file]);

  const downloadResult = useCallback(() => {
    if (!state.pdfBlob || !state.file) return;

    const filename = sanitizeFilename(state.file.name, {
      fallback: "document",
      extension: "pdf",
    });
    const url = URL.createObjectURL(state.pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }, [state.pdfBlob, state.file]);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  return { state, setFile, convert, downloadResult, reset };
}