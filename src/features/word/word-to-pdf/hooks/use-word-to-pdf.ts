// src/features/word/word-to-pdf/hooks/use-word-to-pdf.ts
//
// ⚠️ Inféré du pattern confirmé sur use-split.ts / use-remove-pages.ts
// (voir Fileo_Reference_Composants_Patterns.md), pas copié d'un fichier
// pdf-to-word équivalent (non fourni). À comparer avec use-pdf-to-word.ts
// si Nathan le retrouve, pour vérifier la cohérence des noms d'event
// trackEvent notamment.

"use client";

import { useCallback, useReducer, useRef } from "react";
import { trackEvent } from "@/core/config/analytics";
import {
  initialWordToPdfState,
  wordToPdfReducer,
} from "../store/word-to-pdf-store";
import { convertWordToPdf } from "../lib/word-to-pdf-client";

export function useWordToPdf() {
  const [state, dispatch] = useReducer(wordToPdfReducer, initialWordToPdfState);
  const objectUrlsRef = useRef<string[]>([]);

  const setFile = useCallback((file: File) => {
    dispatch({ type: "SET_FILE", file });
  }, []);

  const convert = useCallback(async () => {
    if (!state.file) return;

    dispatch({ type: "START_CONVERT" });

    try {
      const { blob, filename } = await convertWordToPdf(state.file);
      dispatch({ type: "CONVERT_SUCCESS", blob, filename });
      trackEvent("word_to_pdf_completed", {
        fileSize: String(state.file.size),
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "La conversion a échoué. Réessayez dans quelques instants.";

      dispatch({ type: "CONVERT_ERROR", message });

      // Signal dédié pour suivre la consommation du quota CloudConvert
      // partagé avec PDF->Word (décision : observer avant de passer payant).
      if (message.toLowerCase().includes("quota")) {
        trackEvent("cloudconvert_quota_exceeded", { tool: "word-to-pdf" });
      }
    }
  }, [state.file]);

  const downloadResult = useCallback(() => {
    if (!state.resultBlob || !state.resultFilename) return;

    const url = URL.createObjectURL(state.resultBlob);
    objectUrlsRef.current.push(url);

    const link = document.createElement("a");
    link.href = url;
    link.download = state.resultFilename;
    link.click();
  }, [state.resultBlob, state.resultFilename]);

  const reset = useCallback(() => {
    objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    objectUrlsRef.current = [];
    dispatch({ type: "RESET" });
  }, []);

  return {
    status: state.status,
    file: state.file,
    errorMessage: state.errorMessage,
    setFile,
    convert,
    downloadResult,
    reset,
  };
}