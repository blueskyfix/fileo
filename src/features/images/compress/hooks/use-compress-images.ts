"use client";

import { useReducer, useRef, useCallback } from "react";
import JSZip from "jszip";
import { compressReducer, initialCompressState } from "../store/compress-store";
import { compressImage } from "../lib/compress-client";
import { trackEvent } from "@/core/config/analytics";
import { sanitizeFilename } from "@/core/utils/sanitize-filename";
import type { ImageFileInfo, SupportedImageMime } from "@/features/images/shared/types";

let nextId = 0;

export function useCompressImages() {
  const [state, dispatch] = useReducer(compressReducer, initialCompressState);
  const objectUrlsRef = useRef<string[]>([]);

  const addFiles = useCallback(
    (newFiles: File[]) => {
      const entries: ImageFileInfo[] = newFiles.map((file) => {
        const previewUrl = URL.createObjectURL(file);
        objectUrlsRef.current.push(previewUrl);

        return {
          id: `img-${nextId++}`,
          file,
          previewUrl,
          originalSize: file.size,
          outputFormat: state.outputFormat,
          status: "idle",
        };
      });

      dispatch({ type: "ADD_FILES", files: entries });
    },
    [state.outputFormat]
  );

  const removeFile = useCallback((id: string) => {
    dispatch({ type: "REMOVE_FILE", id });
  }, []);

  const setQuality = useCallback((quality: number) => {
    dispatch({ type: "SET_QUALITY", quality });
  }, []);

  const setOutputFormat = useCallback((format: SupportedImageMime) => {
    dispatch({ type: "SET_OUTPUT_FORMAT", format });
  }, []);

  const compressAll = useCallback(async () => {
    for (const fileInfo of state.files) {
      if (fileInfo.status === "done") continue;

      dispatch({ type: "SET_STATUS", id: fileInfo.id, status: "compressing" });

      try {
        const fileBuffer = await fileInfo.file.arrayBuffer();

        const result = await compressImage({
          id: fileInfo.id,
          fileBuffer,
          mimeType: fileInfo.file.type,
          quality: state.quality,
          outputFormat: state.outputFormat,
        });

        dispatch({
          type: "SET_RESULT",
          id: fileInfo.id,
          compressedBlob: result.blob,
          compressedSize: result.blob.size,
        });

        trackEvent("compress_image_completed", {
          format: state.outputFormat,
          quality: String(state.quality),
        });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          id: fileInfo.id,
          message: error instanceof Error ? error.message : "Erreur inconnue.",
        });
      }
    }
  }, [state.files, state.quality, state.outputFormat]);

  const downloadZip = useCallback(async () => {
    const zip = new JSZip();
    const extension =
      state.outputFormat === "image/jpeg" ? "jpg" : state.outputFormat === "image/png" ? "png" : "webp";

    state.files
      .filter((f) => f.status === "done" && f.compressedBlob)
      .forEach((f) => {
        const baseName = sanitizeFilename(f.file.name.replace(/\.[^/.]+$/, ""));
        zip.file(`${baseName}-compressed.${extension}`, f.compressedBlob as Blob);
      });

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "images-compressees.zip";
    link.click();

    URL.revokeObjectURL(url);
  }, [state.files, state.outputFormat]);

  const reset = useCallback(() => {
    objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    objectUrlsRef.current = [];
    dispatch({ type: "RESET" });
  }, []);

  return {
    files: state.files,
    quality: state.quality,
    outputFormat: state.outputFormat,
    addFiles,
    removeFile,
    setQuality,
    setOutputFormat,
    compressAll,
    downloadZip,
    reset,
  };
}