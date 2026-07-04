import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";

GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export interface PdfMetadata {
  pageCount: number;
}

export async function readPdfMetadata(file: File): Promise<PdfMetadata> {
  const buffer = await file.arrayBuffer();
  const loadingTask = getDocument({ data: buffer });

  try {
    const document = await loadingTask.promise;
    return { pageCount: document.numPages };
  } finally {
    await loadingTask.destroy();
  }
}