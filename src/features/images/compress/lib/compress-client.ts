import type { CompressError, CompressInput, CompressSuccess } from "../worker/compress.worker";

export function compressImage(input: CompressInput): Promise<CompressSuccess> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL("../worker/compress.worker.ts", import.meta.url));

    worker.onmessage = (event: MessageEvent<CompressSuccess | CompressError>) => {
      if (event.data.type === "success") {
        resolve(event.data);
      } else {
        reject(new Error(event.data.message));
      }
      worker.terminate();
    };

    worker.onerror = (error) => {
      reject(new Error(error.message || "Erreur du worker de compression."));
      worker.terminate();
    };

    worker.postMessage(input, [input.fileBuffer]);
  });
}