"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import { initialRemovePagesState, removePagesReducer } from "../store";
import { loadPdfPages } from "@/features/pdf/shared/lib/load-pdf-pages";
import { removePagesFromPdf } from "../lib/remove-pages-client";
import { trackEvent } from "@/core/config/analytics";

export function useRemovePages() {
  const [state, dispatch] = useReducer(removePagesReducer, initialRemovePagesState);
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

  const removePages = useCallback(async () => {
    if (!state.file) return;

    const pageNumbersToRemove = state.pages.filter((p) => p.selected).map((p) => p.pageNumber);
    if (pageNumbersToRemove.length === 0) return;

    if (pageNumbersToRemove.length === state.pages.length) {
      dispatch({
        type: "REMOVING_ERROR",
        error:
          "Impossible de supprimer toutes les pages : le document doit contenir au moins une page.",
      });
      return;
    }

    dispatch({ type: "START_REMOVING" });

    try {
      const { blob, filename } = await removePagesFromPdf(state.file, pageNumbersToRemove);
      const resultUrl = URL.createObjectURL(blob);
      dispatch({ type: "REMOVING_SUCCESS", resultUrl, resultFilename: filename });
      trackEvent("remove_pages_completed", {
        pageCount: String(pageNumbersToRemove.length),
      });
    } catch (error) {
      dispatch({
        type: "REMOVING_ERROR",
        error:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue pendant la suppression des pages.",
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
    removePages,
    downloadResult,
  };
}