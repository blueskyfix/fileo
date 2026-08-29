// src/data/tools/en/pdf-to-word.ts
import type { ContentItem, FaqItem, HowItWorksStep } from "@/features/pdf/shared/types";

export const pdfToWordMeta = {
  title: "Convert PDF to Word for Free | FileoPDF",
  description:
    "Convert your PDF into an editable Word document in seconds. Free, no account needed, no conversion limit.",
  canonicalSlug: "/pdf/pdf-to-word",
};

export const pdfToWordHero = {
  title: "Convert PDF to Word",
  description:
    "Turn your PDF into an editable Word file, ready to correct or complete. Processing runs through a dedicated secure service, and your file is deleted right after conversion.",
  highlights: [
    "Text, headings and layout rebuilt automatically",
    "No sign-up, no software to install",
    "Original file deleted after conversion",
  ],
};

export const pdfToWordHowItWorks: HowItWorksStep[] = [
  {
    title: "Drop your PDF",
    description: "Drag your file in or select it from your device.",
  },
  {
    title: "Start the conversion",
    description: "The document is analyzed and rebuilt as a Word file.",
  },
  {
    title: "Download the result",
    description: "Get your .docx file, ready to edit in Word.",
  },
];

export const pdfToWordBenefits: ContentItem[] = [
  {
    title: "Editable text right away",
    description: "Correct, complete or reuse the content without retyping it.",
  },
  {
    title: "Layout preserved",
    description: "Paragraphs, headings and text hierarchy are rebuilt faithfully.",
  },
  {
    title: "Fast and account-free",
    description: "No sign-up required, no daily conversion limit.",
  },
];

export const pdfToWordUseCases: ContentItem[] = [
  {
    title: "Editing a report received as a PDF",
    description: "Jump straight into edits without retyping the content.",
  },
  {
    title: "Reusing an old document",
    description: "Bring a text locked in a PDF back into an editable Word file.",
  },
  {
    title: "Adapting an existing template",
    description: "Edit a contract, resume or letter template received as a PDF.",
  },
];

export const pdfToWordFaq: FaqItem[] = [
  {
    question: "Will the result match the original PDF exactly?",
    answer:
      "Text, headings and paragraphs are rebuilt faithfully for standard text documents. Very complex layouts, like multiple columns or nested tables, may need a few manual adjustments in Word.",
  },
  {
    question: "Is my file kept after conversion?",
    answer:
      "No. The file is deleted from the conversion service once the Word document is generated.",
  },
  {
    question: "Is there a size or usage limit?",
    answer:
      "Very large files may be rejected past a certain size. During high demand, the tool may temporarily ask you to try again a little later.",
  },
  {
    question: "Can I convert a scanned PDF, like an image?",
    answer:
      "This tool is optimized for PDFs containing native text. A scanned document made of images may produce a lower-quality result.",
  },
];

export const pdfToWordSummary = {
  text: "Convert your PDF into an editable Word document for free, with no account and no conversion limit.",
};