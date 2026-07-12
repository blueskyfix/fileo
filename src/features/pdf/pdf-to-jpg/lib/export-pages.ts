const TARGET_MAX_DIMENSION = 2000;
const BASE_SCALE = 2;
const JPEG_QUALITY = 0.9;

type PdfDocumentProxy = Awaited<ReturnType<typeof import("pdfjs-dist").getDocument>["promise"]>;

export interface ExportResult {
  blob: Blob;
  filename: string;
}

function padNumber(num: number, totalDigits: number): string {
  return String(num).padStart(totalDigits, "0");
}

async function renderPageToJpegBlob(
  pdf: PdfDocumentProxy,
  pageNumber: number,
): Promise<Blob> {
  const page = await pdf.getPage(pageNumber);
  const unscaledViewport = page.getViewport({ scale: 1 });
  const maxDim = Math.max(unscaledViewport.width, unscaledViewport.height);
  const scale = Math.min(BASE_SCALE, TARGET_MAX_DIMENSION / maxDim);
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement("canvas");
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas non supporté");

  await page.render({ canvasContext: context, canvas, viewport }).promise;

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY),
  );

  if (!blob) throw new Error(`Échec d'export de la page ${pageNumber}`);
  return blob;
}

export async function exportSelectedPages(
  file: File,
  pageNumbers: number[],
): Promise<ExportResult> {
  const { GlobalWorkerOptions, getDocument } = await import("pdfjs-dist");
  GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();

  const buffer = await file.arrayBuffer();
  const loadingTask = getDocument({ data: buffer });
  const pdf = await loadingTask.promise;

  const totalDigits = String(Math.max(...pageNumbers)).length;

  try {
    if (pageNumbers.length === 1) {
      const [onlyPage] = pageNumbers;
      if (onlyPage === undefined) throw new Error("Aucune page sélectionnée.");
      const blob = await renderPageToJpegBlob(pdf, onlyPage);
      return { blob, filename: `fileopdf-page-${onlyPage}.jpg` };
    }

    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();

    for (const pageNumber of pageNumbers) {
      const blob = await renderPageToJpegBlob(pdf, pageNumber);
      zip.file(`page-${padNumber(pageNumber, totalDigits)}.jpg`, blob);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    return { blob: zipBlob, filename: "fileopdf-pages.zip" };
  } finally {
    await loadingTask.destroy();
  }
}