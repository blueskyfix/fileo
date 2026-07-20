import { PDFDocument, degrees } from "pdf-lib";

export interface RotateWorkerInput {
  pdfBuffer: ArrayBuffer;
  rotations: Record<number, number>; // pageNumber (1-indexed) -> degrés à ajouter
}

export interface RotateWorkerSuccess {
  type: "success";
  pdfBuffer: ArrayBuffer;
}

export interface RotateWorkerError {
  type: "error";
  message: string;
}

self.onmessage = async (event: MessageEvent<RotateWorkerInput>) => {
  try {
    const { pdfBuffer, rotations } = event.data;
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const pages = pdfDoc.getPages();

    for (const [pageNumberStr, delta] of Object.entries(rotations)) {
      if (!delta) continue;
      const pageIndex = Number(pageNumberStr) - 1;
      const page = pages[pageIndex];
      if (!page) continue;
      const currentAngle = page.getRotation().angle;
      page.setRotation(degrees((currentAngle + delta) % 360));
    }

    const outputBytes = await pdfDoc.save();
    const outputBuffer = outputBytes.buffer.slice(
      outputBytes.byteOffset,
      outputBytes.byteOffset + outputBytes.byteLength
    ) as ArrayBuffer;

    const response: RotateWorkerSuccess = {
      type: "success",
      pdfBuffer: outputBuffer,
    };
    self.postMessage(response, [outputBuffer]);
  } catch (error) {
    const response: RotateWorkerError = {
      type: "error",
      message:
        error instanceof Error ? error.message : "Erreur lors de la rotation du PDF.",
    };
    self.postMessage(response);
  }
};