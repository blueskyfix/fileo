import { PDFDocument } from "pdf-lib";

export type SplitWorkerMode = "extract" | "divide";

export interface SplitWorkerInput {
  fileBuffer: ArrayBuffer;
  pageNumbers: number[];
  mode: SplitWorkerMode;
}

export interface SplitWorkerExtractSuccess {
  type: "success";
  mode: "extract";
  pdfBuffer: ArrayBuffer;
}

export interface SplitWorkerDivideSuccess {
  type: "success";
  mode: "divide";
  pdfBuffers: { pageNumber: number; buffer: ArrayBuffer }[];
}

export type SplitWorkerSuccess = SplitWorkerExtractSuccess | SplitWorkerDivideSuccess;

export interface SplitWorkerError {
  type: "error";
  message: string;
}

self.onmessage = async (event: MessageEvent<SplitWorkerInput>) => {
  try {
    const { fileBuffer, pageNumbers, mode } = event.data;
    const sourcePdf = await PDFDocument.load(fileBuffer);

    if (mode === "extract") {
      const outputPdf = await PDFDocument.create();
      const copiedPages = await outputPdf.copyPages(
        sourcePdf,
        pageNumbers.map((n) => n - 1),
      );
      copiedPages.forEach((page) => outputPdf.addPage(page));

      const bytes = await outputPdf.save();
      const pdfBuffer = bytes.buffer.slice(
        bytes.byteOffset,
        bytes.byteOffset + bytes.byteLength,
      ) as ArrayBuffer;

      const response: SplitWorkerExtractSuccess = {
        type: "success",
        mode: "extract",
        pdfBuffer,
      };
      // @ts-expect-error self est un DedicatedWorkerGlobalScope à l'exécution
      self.postMessage(response, [pdfBuffer]);
      return;
    }

    const pdfBuffers: { pageNumber: number; buffer: ArrayBuffer }[] = [];
    const transferList: ArrayBuffer[] = [];

    for (const pageNumber of pageNumbers) {
      const outputPdf = await PDFDocument.create();
      const [copiedPage] = await outputPdf.copyPages(sourcePdf, [pageNumber - 1]);
      outputPdf.addPage(copiedPage);

      const bytes = await outputPdf.save();
      const buffer = bytes.buffer.slice(
        bytes.byteOffset,
        bytes.byteOffset + bytes.byteLength,
      ) as ArrayBuffer;

      pdfBuffers.push({ pageNumber, buffer });
      transferList.push(buffer);
    }

    const response: SplitWorkerDivideSuccess = {
      type: "success",
      mode: "divide",
      pdfBuffers,
    };
    // @ts-expect-error self est un DedicatedWorkerGlobalScope à l'exécution
    self.postMessage(response, transferList);
  } catch (error) {
    const response: SplitWorkerError = {
      type: "error",
      message: error instanceof Error ? error.message : "Erreur inconnue lors du split.",
    };
    self.postMessage(response);
  }
};