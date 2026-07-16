import type {
  RemovePagesWorkerInput,
  RemovePagesWorkerSuccess,
  RemovePagesWorkerError,
} from "./types";

export interface RemovePagesResult {
  blob: Blob;
  filename: string;
}

export async function removePagesFromPdf(
  file: File,
  pageNumbersToRemove: number[],
): Promise<RemovePagesResult> {
  const fileBuffer = await file.arrayBuffer();

  const workerResult = await new Promise<RemovePagesWorkerSuccess>((resolve, reject) => {
    const worker = new Worker(new URL("../worker/remove-pages.worker.ts", import.meta.url));

    worker.onmessage = (
      event: MessageEvent<RemovePagesWorkerSuccess | RemovePagesWorkerError>,
    ) => {
      if (event.data.type === "success") {
        resolve(event.data);
      } else {
        reject(new Error(event.data.message));
      }
      worker.terminate();
    };

    worker.onerror = (error) => {
      reject(new Error(error.message || "Erreur du worker de suppression de pages."));
      worker.terminate();
    };

    const payload: RemovePagesWorkerInput = { fileBuffer, pageNumbersToRemove };
    worker.postMessage(payload, [fileBuffer]);
  });

  return {
    blob: new Blob([workerResult.pdfBuffer], { type: "application/pdf" }),
    filename: "fileopdf-sans-pages.pdf",
  };
}