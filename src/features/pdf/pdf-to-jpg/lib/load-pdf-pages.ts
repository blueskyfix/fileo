import type { PdfPageInfo } from "./types";

export async function loadPdfPages(file: File): Promise<PdfPageInfo[]> {
  const { GlobalWorkerOptions, getDocument } = await import("pdfjs-dist");
  GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();

  const buffer = await file.arrayBuffer();
  const loadingTask = getDocument({ data: buffer });
  const pdf = await loadingTask.promise;

  const pages: PdfPageInfo[] = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 0.3 });

    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas non supporté");

    await page.render({ canvasContext: context, canvas, viewport }).promise;

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/png"),
    );

    if (!blob) throw new Error(`Échec de génération de la miniature page ${pageNumber}`);

    pages.push({
      pageNumber,
      thumbnailUrl: URL.createObjectURL(blob),
      selected: true, // toutes les pages pré-cochées par défaut
    });
  }

  await loadingTask.destroy();
  return pages;
}