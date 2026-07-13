import type {
  SplitWorkerInput,
  SplitWorkerSuccess,
  SplitWorkerError,
  SplitWorkerMode,
} from "../worker/split.worker";

export interface SplitResult {
  blob: Blob;
  filename: string;
}

function padNumber(num: number, totalDigits: number): string {
  return String(num).padStart(totalDigits, "0");
}

export async function splitPdf(
  file: File,
  pageNumbers: number[],
  mode: SplitWorkerMode,
): Promise<SplitResult> {
  const fileBuffer = await file.arrayBuffer();

  const workerResult = await new Promise<SplitWorkerSuccess>((resolve, reject) => {
    const worker = new Worker(new URL("../worker/split.worker.ts", import.meta.url));

    worker.onmessage = (event: MessageEvent<SplitWorkerSuccess | SplitWorkerError>) => {
      if (event.data.type === "success") {
        resolve(event.data);
      } else {
        reject(new Error(event.data.message));
      }
      worker.terminate();
    };

    worker.onerror = (error) => {
      reject(new Error(error.message || "Erreur du worker de split."));
      worker.terminate();
    };

    const payload: SplitWorkerInput = { fileBuffer, pageNumbers, mode };
    worker.postMessage(payload, [fileBuffer]);
  });

  if (workerResult.mode === "extract") {
    return {
      blob: new Blob([workerResult.pdfBuffer], { type: "application/pdf" }),
      filename: "fileopdf-extrait.pdf",
    };
  }

  if (workerResult.pdfBuffers.length === 1) {
    const [only] = workerResult.pdfBuffers;
    if (!only) throw new Error("Aucune page générée.");
    return {
      blob: new Blob([only.buffer], { type: "application/pdf" }),
      filename: `fileopdf-page-${only.pageNumber}.pdf`,
    };
  }

  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();
  const totalDigits = String(
    Math.max(...workerResult.pdfBuffers.map((p) => p.pageNumber)),
  ).length;

  for (const { pageNumber, buffer } of workerResult.pdfBuffers) {
    zip.file(`page-${padNumber(pageNumber, totalDigits)}.pdf`, buffer);
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });
  return { blob: zipBlob, filename: "fileopdf-pages.zip" };
}