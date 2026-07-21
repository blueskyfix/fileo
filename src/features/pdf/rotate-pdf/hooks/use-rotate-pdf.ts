import { useEffect, useReducer, useRef } from "react";
import { loadPdfPages } from "@/features/pdf/shared/lib/load-pdf-pages";
import { trackEvent } from "@/core/config/analytics";
import { rotatePdf } from "../lib/rotate-client";
import {
  initialRotateState,
  rotateReducer,
  type RotateMode,
} from "../store/rotate-store";

export function useRotatePdf() {
  const [state, dispatch] = useReducer(rotateReducer, initialRotateState);
  const objectUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    if (state.status !== "loading" || !state.file) return;

    let cancelled = false;
    loadPdfPages(state.file)
      .then((pages) => {
        if (cancelled) return;
        objectUrlsRef.current = pages.map((p) => p.thumbnailUrl);
        dispatch({ type: "PAGES_LOADED", pages });
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        dispatch({
          type: "LOAD_ERROR",
          message:
            error instanceof Error
              ? error.message
              : "Impossible de lire ce PDF.",
        });
      });

    return () => {
      cancelled = true;
    };
  }, [state.status, state.file]);

  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  function setFile(file: File) {
    dispatch({ type: "SET_FILE", file });
  }

  function rotatePage(pageNumber: number) {
    dispatch({ type: "ROTATE_PAGE", pageNumber });
  }

  function rotateTargetLeft() {
    dispatch({ type: "ROTATE_TARGET", delta: -90 });
  }

  function rotateTargetRight() {
    dispatch({ type: "ROTATE_TARGET", delta: 90 });
  }

  function resetRotations() {
    dispatch({ type: "RESET_ROTATIONS" });
  }

  function setMode(mode: RotateMode) {
    dispatch({ type: "SET_MODE", mode });
  }

  function togglePageSelection(pageNumber: number) {
    dispatch({ type: "TOGGLE_PAGE_SELECTION", pageNumber });
  }

  function selectAll() {
    dispatch({ type: "SELECT_ALL" });
  }

  function deselectAll() {
    dispatch({ type: "DESELECT_ALL" });
  }

  async function applyRotation() {
    if (!state.file) return;
    const hasChanges = Object.values(state.rotations).some((v) => v !== 0);
    if (!hasChanges) return;

    dispatch({ type: "START_ROTATE" });
    try {
      const buffer = await state.file.arrayBuffer();
      const blob = await rotatePdf(buffer, state.rotations);
      dispatch({ type: "ROTATE_SUCCESS", blob });
      trackEvent("rotate_pdf_completed", {
        pages_rotated: String(
          Object.values(state.rotations).filter((v) => v !== 0).length
        ),
        mode: state.mode,
      });
    } catch (error) {
      dispatch({
        type: "ROTATE_ERROR",
        message:
          error instanceof Error ? error.message : "Erreur lors de la rotation.",
      });
    }
  }

  function downloadResult() {
    if (!state.resultBlob || !state.file) return;
    const url = URL.createObjectURL(state.resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = state.file.name.replace(/\.pdf$/i, "") + "-rotated.pdf";
    a.click();
    URL.revokeObjectURL(url);
  }

  function reset() {
    dispatch({ type: "RESET" });
  }

  return {
    state,
    setFile,
    rotatePage,
    rotateTargetLeft,
    rotateTargetRight,
    resetRotations,
    setMode,
    togglePageSelection,
    selectAll,
    deselectAll,
    applyRotation,
    downloadResult,
    reset,
  };
}