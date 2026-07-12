import { PDFDocument } from "pdf-lib";

export interface JpgToPdfWorkerImage {
  arrayBuffer: ArrayBuffer;
  mimeType: "image/jpeg" | "image/png";
  width: number;
  height: number;
}

export interface JpgToPdfWorkerInput {
  images: JpgToPdfWorkerImage[];
}

export interface JpgToPdfWorkerSuccess {
  type: "success";
  pdfBuffer: ArrayBuffer;
}

export interface JpgToPdfWorkerError {
  type: "error";
  message: string;
}

self.onmessage = async (event: MessageEvent<JpgToPdfWorkerInput>) => {
  try {
    const { images } = event.data;
    const pdfDoc = await PDFDocument.create();

    for (const image of images) {
      const embeddedImage =
        image.mimeType === "image/png"
          ? await pdfDoc.embedPng(image.arrayBuffer)
          : await pdfDoc.embedJpg(image.arrayBuffer);

      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(embeddedImage, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
    }

    const pdfBytes = await pdfDoc.save();
    const pdfBuffer = pdfBytes.buffer.slice(
      pdfBytes.byteOffset,
      pdfBytes.byteOffset + pdfBytes.byteLength,
    ) as ArrayBuffer;

    const response: JpgToPdfWorkerSuccess = { type: "success", pdfBuffer };
    // @ts-expect-error self est un DedicatedWorkerGlobalScope à l'exécution
    self.postMessage(response, [pdfBuffer]);
  } catch (error) {
    const response: JpgToPdfWorkerError = {
      type: "error",
      message:
        error instanceof Error ? error.message : "Erreur inconnue lors de la conversion.",
    };
    self.postMessage(response);
  }
};