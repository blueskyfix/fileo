"use client";

import { useCallback, useReducer } from "react";
import { initialJpgToPdfState, jpgToPdfReducer } from "../store";
import { resizeImageIfNeeded } from "../lib/resize-image";
import { convertImagesToPdf } from "../lib/jpg-to-pdf-client";
import { trackEvent } from "@/core/config/analytics";
import type { JpgToPdfImage } from "../lib/types";

function createImageId() {
  return `img-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useJpgToPdf() {
  const [state, dispatch] = useReducer(jpgToPdfReducer, initialJpgToPdfState);

  const addFiles = useCallback((files: File[]) => {
    const newImages: JpgToPdfImage[] = files.map((file) => ({
      id: createImageId(),
      file,
      name: file.name,
      size: file.size,
      previewUrl: URL.createObjectURL(file),
      width: null,
      height: null,
    }));
    dispatch({ type: "ADD_IMAGES", images: newImages });
  }, []);

  const removeImage = useCallback((id: string) => {
    dispatch({ type: "REMOVE_IMAGE", id });
  }, []);

  const reorderImages = useCallback((images: JpgToPdfImage[]) => {
    dispatch({ type: "REORDER_IMAGES", images });
  }, []);

  const reset = useCallback(() => {
    state.images.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    dispatch({ type: "RESET" });
  }, [state.images]);

  const convert = useCallback(async () => {
    if (state.images.length === 0) return;
    dispatch({ type: "START_CONVERTING" });

    try {
      const resized = await Promise.all(
        state.images.map((image) => resizeImageIfNeeded(image.file)),
      );
      const pdfBuffer = await convertImagesToPdf(resized);
      const blob = new Blob([pdfBuffer], { type: "application/pdf" });
      const resultUrl = URL.createObjectURL(blob);
      dispatch({ type: "CONVERTING_SUCCESS", resultUrl });
      trackEvent("jpg_to_pdf_completed", { imageCount: String(state.images.length) });
    } catch (error) {
      dispatch({
        type: "CONVERTING_ERROR",
        error:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue pendant la conversion.",
      });
    }
  }, [state.images]);

  const downloadResult = useCallback(() => {
    if (!state.resultUrl) return;
    const link = document.createElement("a");
    link.href = state.resultUrl;
    link.download = "fileopdf-images.pdf";
    link.click();
  }, [state.resultUrl]);

  return { state, addFiles, removeImage, reorderImages, reset, convert, downloadResult };
}