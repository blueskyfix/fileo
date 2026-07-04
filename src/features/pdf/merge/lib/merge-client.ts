import type {
  MergeWorkerRequest,
  MergeWorkerResponse,
} from "@/features/pdf/merge/worker/merge.worker";

export interface MergeClientFile {
  id: string;
  name: string;
  file: File;
}

export interface MergeClientCallbacks {
  onProgress?: (completedCount: number, totalCount: number) => void;
  onFileError?: (fileId: string, message: string) => void;
}

export async function mergePdfFiles(
  files: MergeClientFile[],
  callbacks: MergeClientCallbacks = {},
): Promise<Blob> {
  const worker = new Worker(
    new URL("../worker/merge.worker.ts", import.meta.url),
    { type: "module" },
  );

  const buffers = await Promise.all(
    files.map(async (f) => ({
      id: f.id,
      name: f.name,
      buffer: await f.file.arrayBuffer(),
    })),
  );

  return new Promise<Blob>((resolve, reject) => {
    worker.onmessage = (event: MessageEvent<MergeWorkerResponse>) => {
      const message = event.data;

      switch (message.type) {
        case "progress":
          callbacks.onProgress?.(message.completedCount, message.totalCount);
          break;
        case "file-error":
          callbacks.onFileError?.(message.fileId, message.message);
          break;
        case "success":
          resolve(new Blob([message.buffer], { type: "application/pdf" }));
          worker.terminate();
          break;
        case "fatal-error":
          reject(new Error(message.message));
          worker.terminate();
          break;
      }
    };

    worker.onerror = (event) => {
      reject(new Error(event.message || "Erreur inattendue du worker."));
      worker.terminate();
    };

    const request: MergeWorkerRequest = { type: "merge", files: buffers };
    const transferables = buffers.map((b) => b.buffer);

    worker.postMessage(request, transferables);
  });
}