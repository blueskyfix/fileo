/// <reference lib="webworker" />
import { PDFDocument } from "pdf-lib";
import type {
  RemovePagesWorkerInput,
  RemovePagesWorkerSuccess,
  RemovePagesWorkerError,
} from "../lib/types";

self.onmessage = async (event: MessageEvent<RemovePagesWorkerInput>) => {
  const { fileBuffer, pageNumbersToRemove } = event.data;

  try {
    const pdfDoc = await PDFDocument.load(fileBuffer);
    const totalPages = pdfDoc.getPageCount();

    // Suppression en ordre décroissant pour ne pas décaler les index
    // des pages restantes au fil des suppressions.
    const sortedDescending = [...pageNumbersToRemove].sort((a, b) => b - a);

    for (const pageNumber of sortedDescending) {
      const pageIndex = pageNumber - 1;
      if (pageIndex < 0 || pageIndex >= totalPages) continue;
      pdfDoc.removePage(pageIndex);
    }

    if (pdfDoc.getPageCount() === 0) {
      const errorMessage: RemovePagesWorkerError = {
        type: "error",
        message:
          "Impossible de supprimer toutes les pages : le document doit contenir au moins une page.",
      };
      self.postMessage(errorMessage);
      return;
    }

    const pdfBytes = await pdfDoc.save();
    const pdfBuffer = pdfBytes.buffer.slice(
      pdfBytes.byteOffset,
      pdfBytes.byteOffset + pdfBytes.byteLength
    ) as ArrayBuffer;

    const successMessage: RemovePagesWorkerSuccess = { type: "success", pdfBuffer };
    self.postMessage(successMessage, [pdfBuffer]);
  } catch (error) {
    const errorMessage: RemovePagesWorkerError = {
      type: "error",
      message:
        error instanceof Error ? error.message : "Erreur lors de la suppression des pages.",
    };
    self.postMessage(errorMessage);
  }
};