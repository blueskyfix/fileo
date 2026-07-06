"use client";

import { useCallback } from "react";
import { useMergeStore } from "@/features/pdf/merge/store/merge-store";
import { mergePdfFiles } from "@/features/pdf/merge/lib/merge-client";
import { validatePdfFile } from "@/core/pdf/validate-pdf";
import { readPdfMetadata } from "@/core/pdf/read-pdf-metadata";
import { sanitizeFilename } from "@/features/pdf/shared/utils/sanitize-filename";
import type { PdfFileItem } from "@/features/pdf/shared/types/pdf-file-item";
import { trackEvent } from "@/core/config/analytics";

export function useMergeFiles() {
  const files = useMergeStore((s) => s.files);
  const mergeStatus = useMergeStore((s) => s.mergeStatus);
  const mergeErrorMessage = useMergeStore((s) => s.mergeErrorMessage);
  const resultBlob = useMergeStore((s) => s.resultBlob);

  const addFiles = useMergeStore((s) => s.addFiles);
  const updateFile = useMergeStore((s) => s.updateFile);
  const removeFile = useMergeStore((s) => s.removeFile);
  const reorderFiles = useMergeStore((s) => s.reorderFiles);
  const setMergeStatus = useMergeStore((s) => s.setMergeStatus);
  const setMergeError = useMergeStore((s) => s.setMergeError);
  const setResult = useMergeStore((s) => s.setResult);
  const reset = useMergeStore((s) => s.reset);

  const isProcessing = mergeStatus === "processing";

  const handleFilesAdded = useCallback(
    async (incomingFiles: File[]) => {
      const pendingItems: PdfFileItem[] = incomingFiles.map((file) => ({
        id: crypto.randomUUID(),
        file,
        name: file.name,
        size: file.size,
        pageCount: null,
        status: "validating",
        errorMessage: null,
      }));

      addFiles(pendingItems);

      await Promise.all(
        pendingItems.map(async (item) => {
          const validation = await validatePdfFile(item.file);

          if (!validation.valid) {
            updateFile(item.id, {
              status: "error",
              errorMessage: validation.error.message,
            });
            return;
          }

          try {
            const metadata = await readPdfMetadata(item.file);
            updateFile(item.id, {
              status: "ready",
              pageCount: metadata.pageCount,
            });
          } catch {
            updateFile(item.id, {
              status: "error",
              errorMessage: "Impossible de lire ce PDF.",
            });
          }
        }),
      );
    },
    [addFiles, updateFile],
  );

    const runMerge = useCallback(
      async (outputName: string) => {
        const readyFiles = files.filter((f) => f.status === "ready");

        if (readyFiles.length === 0) {
          setMergeError("Aucun fichier valide à fusionner.");
          return;
        }

        setMergeStatus("processing");

        try {
          const blob = await mergePdfFiles(
            readyFiles.map((f) => ({ id: f.id, name: f.name, file: f.file })),
            {
              onFileError: (id, message) => {
                updateFile(id, { status: "error", errorMessage: message });
              },
            },
          );

          setResult(blob);
          trackEvent("merge_completed", { fileCount: String(readyFiles.length) });
          void outputName; // consommé par le composant de téléchargement, pas ici
        } catch (err) {
          setMergeError((err as Error).message);
        }
      },
      [files, setMergeStatus, setResult, setMergeError, updateFile],
    );

  const readyCount = files.filter((f) => f.status === "ready").length;
  const canMerge = readyCount >= 2 && !isProcessing;

  return {
    files,
    mergeStatus,
    mergeErrorMessage,
    resultBlob,
    isProcessing,
    canMerge,
    readyCount,
    handleFilesAdded,
    removeFile,
    reorderFiles,
    runMerge,
    reset,
    sanitizeFilename,
  };
}