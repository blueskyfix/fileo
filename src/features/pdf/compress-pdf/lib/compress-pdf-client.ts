import type { CompressPdfWorkerInput, CompressPdfWorkerMessage } from "./types";

export interface CompressPdfResult {
  blob: Blob;
  imagesRecompressed: number;
  reachedTarget: boolean;
}

export async function compressPdf(
  file: File,
  levelIndex: number,
  targetBytes: number | null,
  onProgress: (value: number) => void,
): Promise<CompressPdfResult> {
  const fileBuffer = await file.arrayBuffer();

  return new Promise<CompressPdfResult>((resolve, reject) => {
    const worker = new Worker(new URL("../worker/compress-pdf.worker.ts", import.meta.url));

    worker.onmessage = (event: MessageEvent<CompressPdfWorkerMessage>) => {
      const message = event.data;
      if (message.type === "progress") {
        onProgress(message.value);
        return;
      }
      worker.terminate();
      if (message.type === "success") {
        resolve({
          blob: new Blob([message.pdfBuffer], { type: "application/pdf" }),
          imagesRecompressed: message.imagesRecompressed,
          reachedTarget: message.reachedTarget,
        });
      } else {
        reject(new Error(message.message));
      }
    };

    worker.onerror = (error) => {
      worker.terminate();
      reject(new Error(error.message || "Erreur du worker de compression."));
    };

    const payload: CompressPdfWorkerInput = { fileBuffer, levelIndex, targetBytes };
    worker.postMessage(payload, [fileBuffer]);
  });
}
