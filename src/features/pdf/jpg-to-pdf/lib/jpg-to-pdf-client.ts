import type {
  JpgToPdfWorkerImage,
  JpgToPdfWorkerInput,
  JpgToPdfWorkerSuccess,
  JpgToPdfWorkerError,
} from "../worker/jpg-to-pdf.worker";

export async function convertImagesToPdf(
  images: JpgToPdfWorkerImage[],
): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      new URL("../worker/jpg-to-pdf.worker.ts", import.meta.url),
    );

    const transferList = images.map((image) => image.arrayBuffer);

    worker.onmessage = (
      event: MessageEvent<JpgToPdfWorkerSuccess | JpgToPdfWorkerError>,
    ) => {
      if (event.data.type === "success") {
        resolve(event.data.pdfBuffer);
      } else {
        reject(new Error(event.data.message));
      }
      worker.terminate();
    };

    worker.onerror = (error) => {
      reject(new Error(error.message || "Erreur du worker de conversion."));
      worker.terminate();
    };

    const payload: JpgToPdfWorkerInput = { images };
    worker.postMessage(payload, transferList);
  });
}