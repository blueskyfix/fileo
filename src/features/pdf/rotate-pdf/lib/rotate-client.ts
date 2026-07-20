import type {
  RotateWorkerInput,
  RotateWorkerSuccess,
  RotateWorkerError,
} from "../worker/rotate.worker";

export function rotatePdf(
  fileBuffer: ArrayBuffer,
  rotations: Record<number, number>
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      new URL("../worker/rotate.worker.ts", import.meta.url)
    );

    worker.onmessage = (
      event: MessageEvent<RotateWorkerSuccess | RotateWorkerError>
    ) => {
      if (event.data.type === "success") {
        resolve(new Blob([event.data.pdfBuffer], { type: "application/pdf" }));
      } else {
        reject(new Error(event.data.message));
      }
      worker.terminate();
    };

    worker.onerror = (error) => {
      reject(new Error(error.message || "Erreur du worker."));
      worker.terminate();
    };

    const payload: RotateWorkerInput = { pdfBuffer: fileBuffer, rotations };
    worker.postMessage(payload, [fileBuffer]);
  });
}