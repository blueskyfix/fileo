"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import { initialSplitState, splitReducer } from "../store";
import { loadPdfPages } from "@/features/pdf/shared/lib/load-pdf-pages";
import { splitPdf } from "../lib/split-client";
import { trackEvent } from "@/core/config/analytics";
import type { SplitMode } from "../lib/types";

export function useSplit() {
  const [state, dispatch] = useReducer(splitReducer, initialSplitState);
  const objectUrlsRef = useRef<string[]>([]);

  const revokeAllUrls = useCallback(() => {
    objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    objectUrlsRef.current = [];
  }, []);

  const setFile = useCallback(
    (file: File) => {
      revokeAllUrls();
      dispatch({ type: "SET_FILE", file });
    },
    [revokeAllUrls],
  );

  useEffect(() => {
    if (state.status !== "loading" || !state.file) return;
    let cancelled = false;

    loadPdfPages(state.file)
      .then((pages) => {
        if (cancelled) return;
        objectUrlsRef.current = pages.map((p) => p.thumbnailUrl);
        dispatch({ type: "PAGES_LOADED", pages });
      })
      .catch((error) => {
        if (cancelled) return;
        dispatch({
          type: "LOAD_ERROR",
          error:
            error instanceof Error
              ? error.message
              : "Impossible de lire ce fichier PDF.",
        });
      });

    return () => {
      cancelled = true;
    };
  }, [state.status, state.file]);

  const togglePage = useCallback((pageNumber: number) => {
    dispatch({ type: "TOGGLE_PAGE", pageNumber });
  }, []);

  const selectAll = useCallback(() => dispatch({ type: "SELECT_ALL" }), []);
  const deselectAll = useCallback(() => dispatch({ type: "DESELECT_ALL" }), []);

  const setMode = useCallback((mode: SplitMode) => {
    dispatch({ type: "SET_MODE", mode });
  }, []);

  const reset = useCallback(() => {
    revokeAllUrls();
    if (state.resultUrl) URL.revokeObjectURL(state.resultUrl);
    dispatch({ type: "RESET" });
  }, [revokeAllUrls, state.resultUrl]);

  const split = useCallback(async () => {
    if (!state.file) return;
    const selectedPageNumbers = state.pages.filter((p) => p.selected).map((p) => p.pageNumber);
    if (selectedPageNumbers.length === 0) return;

    dispatch({ type: "START_SPLITTING" });

    try {
      const { blob, filename } = await splitPdf(state.file, selectedPageNumbers, state.mode);
      const resultUrl = URL.createObjectURL(blob);
      dispatch({ type: "SPLITTING_SUCCESS", resultUrl, resultFilename: filename });
      trackEvent("split_pdf_completed", {
        mode: state.mode,
        pageCount: String(selectedPageNumbers.length),
      });
    } catch (error) {
      dispatch({
        type: "SPLITTING_ERROR",
        error:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue pendant le split.",
      });
    }
  }, [state.file, state.pages, state.mode]);

  const downloadResult = useCallback(() => {
    if (!state.resultUrl || !state.resultFilename) return;
    const link = document.createElement("a");
    link.href = state.resultUrl;
    link.download = state.resultFilename;
    link.click();
  }, [state.resultUrl, state.resultFilename]);

  return {
    state,
    setFile,
    togglePage,
    selectAll,
    deselectAll,
    setMode,
    reset,
    split,
    downloadResult,
  };
}