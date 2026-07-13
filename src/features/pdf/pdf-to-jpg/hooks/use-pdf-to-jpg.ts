"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import { initialPdfToJpgState, pdfToJpgReducer } from "../store";
import { loadPdfPages } from "../lib/load-pdf-pages";
import { exportSelectedPages } from "../lib/export-pages";
import { trackEvent } from "@/core/config/analytics";

export function usePdfToJpg() {
  const [state, dispatch] = useReducer(pdfToJpgReducer, initialPdfToJpgState);
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

  const reset = useCallback(() => {
    revokeAllUrls();
    if (state.resultUrl) URL.revokeObjectURL(state.resultUrl);
    dispatch({ type: "RESET" });
  }, [revokeAllUrls, state.resultUrl]);

  const convert = useCallback(async () => {
    if (!state.file) return;
    const selectedPageNumbers = state.pages.filter((p) => p.selected).map((p) => p.pageNumber);
    if (selectedPageNumbers.length === 0) return;

    dispatch({ type: "START_CONVERTING" });

    try {
      const { blob, filename } = await exportSelectedPages(state.file, selectedPageNumbers);
      const resultUrl = URL.createObjectURL(blob);
      dispatch({ type: "CONVERTING_SUCCESS", resultUrl, resultFilename: filename });
      trackEvent("pdf_to_jpg_completed", {
        pageCount: String(selectedPageNumbers.length),
        exportType: selectedPageNumbers.length === 1 ? "single" : "zip",
      });
    } catch (error) {
      dispatch({
        type: "CONVERTING_ERROR",
        error:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue pendant l'export.",
      });
    }
  }, [state.file, state.pages]);

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
    reset,
    convert,
    downloadResult,
  };
}