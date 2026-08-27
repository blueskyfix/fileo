import type { ToolLabel } from "@/data/tools/tools";

export const toolLabelsEn: Record<string, ToolLabel> = {
  "merge-pdf": {
    name: "Merge PDF",
    description: "Merge multiple PDF files into one, in the order you choose.",
  },
  "split-pdf": {
    name: "Split PDF",
    description: "Extract pages or split a PDF into several files.",
  },
  "jpg-to-pdf": {
    name: "JPG to PDF",
    description: "Convert your JPG or PNG images into a single PDF file.",
  },
  "pdf-to-jpg": {
    name: "PDF to JPG",
    description:
      "Convert PDF pages into JPG images, individually or all at once.",
  },
  "pdf-to-word": {
    name: "PDF to Word",
    description: "Convert your PDF into an editable Word document.",
  },
  "remove-pages": {
    name: "Remove PDF Pages",
    description: "Remove specific pages from a PDF without reprocessing the whole file.",
  },
  "rotate-pdf": {
    name: "Rotate PDF",
    description: "Rotate the pages of your PDF by 90°, 180°, or 270°.",
  },
  "compress-image": {
    name: "Compress Image",
    description:
      "Reduce the size of your JPEG, PNG, and WebP images with no visible quality loss.",
  },
  "word-to-pdf": {
    name: "Word to PDF",
    description:
      "Convert your Word document (.docx) to PDF, directly in your browser.",
  },
};