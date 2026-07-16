import {
  Document,
  Packer,
  Paragraph,
  PageBreak,
  TextRun,
  HeadingLevel,
} from "docx";
import type { ExtractionResult, LineKind } from "../types";

export async function generateDocxFromExtraction(
  extraction: ExtractionResult
): Promise<Blob> {
  const children: Paragraph[] = [];

  extraction.pages.forEach((page, pageIndex) => {
    const isLastPage = pageIndex === extraction.pages.length - 1;

    if (page.lines.length === 0) {
      children.push(new Paragraph({ text: "" }));
    }

    page.lines.forEach((line) => {
      children.push(buildParagraph(line.text, line.kind));
    });

    if (!isLastPage) {
      children.push(new Paragraph({ children: [new PageBreak()] }));
    }
  });

  const document = new Document({
    sections: [
      {
        properties: {},
        children,
      },
    ],
  });

  return Packer.toBlob(document);
}

function buildParagraph(text: string, kind: LineKind): Paragraph {
  if (kind === "heading1") {
    return new Paragraph({ text, heading: HeadingLevel.HEADING_1 });
  }

  if (kind === "heading2") {
    return new Paragraph({ text, heading: HeadingLevel.HEADING_2 });
  }

  if (kind === "bullet") {
    const cleanedText = text.replace(/^[•\-*▪‣●◦]\s+/, "");
    return new Paragraph({ text: cleanedText, bullet: { level: 0 } });
  }

  return new Paragraph({ children: [new TextRun(text)] });
}

export function buildDocxFileName(originalFileName: string): string {
  const withoutExtension = originalFileName.replace(/\.pdf$/i, "");
  return `${withoutExtension}.docx`;
}