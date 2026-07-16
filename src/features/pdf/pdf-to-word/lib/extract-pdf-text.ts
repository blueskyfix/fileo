import type { ExtractedLine, ExtractedPage, ExtractionResult, LineKind } from "../types";

const SCANNED_AVG_CHARS_PER_PAGE_THRESHOLD = 20;
const BULLET_CHAR_PATTERN = /^[•\-*▪‣●◦]\s+/;
const LINE_Y_TOLERANCE = 2;

interface RawTextItem {
  str: string;
  transform: number[];
}

export async function extractPdfText(file: File): Promise<ExtractionResult> {
  // Import dynamique obligatoire : pdfjs-dist casse en SSR (DOMMatrix indisponible).
  const pdfjsLib = await import("pdfjs-dist");

  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdfDocument = await loadingTask.promise;

  const allFontSizes: number[] = [];
  const rawPages: { pageNumber: number; items: RawTextItem[] }[] = [];

  for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber += 1) {
    const page = await pdfDocument.getPage(pageNumber);
    const textContent = await page.getTextContent();

    const items: RawTextItem[] = textContent.items
      .filter((item): item is RawTextItem => "str" in item && "transform" in item)
      .map((item) => ({ str: item.str, transform: item.transform }));

    items.forEach((item) => {
      if (item.str.trim().length > 0) {
        const fontSize = Math.hypot(item.transform[2], item.transform[3]);
        allFontSizes.push(fontSize);
      }
    });

    rawPages.push({ pageNumber, items });
    page.cleanup();
  }

  const bodyFontSize = computeMedian(allFontSizes) || 12;

  const pages: ExtractedPage[] = [];
  let totalCharCount = 0;

  for (const { pageNumber, items } of rawPages) {
    const lines = groupItemsIntoLines(items, bodyFontSize);
    const pageCharCount = lines.reduce((sum, line) => sum + line.text.length, 0);

    pages.push({ pageNumber, lines, charCount: pageCharCount });
    totalCharCount += pageCharCount;
  }

  if (pages.length === 0) {
    return { pages, totalCharCount, isProbablyScanned: true };
  }

  const avgCharsPerPage = totalCharCount / pages.length;
  const isProbablyScanned = avgCharsPerPage < SCANNED_AVG_CHARS_PER_PAGE_THRESHOLD;

  return { pages, totalCharCount, isProbablyScanned };
}

function groupItemsIntoLines(items: RawTextItem[], bodyFontSize: number): ExtractedLine[] {
  const lines: ExtractedLine[] = [];
  let currentLineItems: RawTextItem[] = [];
  let currentY: number | null = null;

  const flushLine = () => {
    if (currentLineItems.length === 0) return;

    const text = currentLineItems
      .map((item) => item.str)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    const [firstItem] = currentLineItems;
    currentLineItems = [];

    if (!text || !firstItem) return;

    const fontSize = Math.hypot(firstItem.transform[2], firstItem.transform[3]) || bodyFontSize;
    const y = firstItem.transform[5];

    lines.push({
      text,
      kind: classifyLine(text, fontSize, bodyFontSize),
      fontSize,
      y,
    });
  };

  for (const item of items) {
    if (!item.str.trim()) continue;

    const y = item.transform[5];

    if (currentY !== null && Math.abs(y - currentY) > LINE_Y_TOLERANCE) {
      flushLine();
    }

    currentLineItems.push(item);
    currentY = y;
  }

  flushLine();

  return lines;
}

function classifyLine(text: string, fontSize: number, bodyFontSize: number): LineKind {
  if (BULLET_CHAR_PATTERN.test(text)) {
    return "bullet";
  }

  const ratio = fontSize / bodyFontSize;

  if (ratio >= 1.6) {
    return "heading1";
  }

  if (ratio >= 1.25) {
    return "heading2";
  }

  return "normal";
}

function computeMedian(values: number[]): number {
  if (values.length === 0) return 0;

  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  const midValue = sorted[middle];

  if (sorted.length % 2 !== 0) {
    return midValue ?? 0;
  }

  const prevValue = sorted[middle - 1];
  if (midValue === undefined || prevValue === undefined) return 0;

  return (prevValue + midValue) / 2;
}