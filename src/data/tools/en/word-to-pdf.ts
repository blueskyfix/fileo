// src/data/tools/en/word-to-pdf.ts
import type { ContentItem, FaqItem, HowItWorksStep } from "@/features/pdf/shared/types";

export const wordToPdfMeta = {
  metaTitle: "Convert Word to PDF for Free | FileoPDF",
  metaDescription:
    "Convert your Word document into a PDF in seconds, with the layout preserved. Free, no account needed, no limit.",
  canonicalSlug: "/word/word-to-pdf",
  ogTitle: "Convert Word to PDF for Free",
  ogDescription:
    "A Word document turned into a PDF ready to share, with its original formatting intact.",
};

export const wordToPdfHero = {
  title: "Convert Word to PDF",
  subtitle:
    "Turn your Word document into a PDF, ready to share or archive, with the layout preserved.",
};

const wordToPdfSteps: HowItWorksStep[] = [
  {
    title: "Drop your Word document",
    description: "Drag your .docx file in or select it from your device.",
  },
  {
    title: "Start the conversion",
    description: "The document is converted while keeping its original formatting.",
  },
  {
    title: "Download the PDF",
    description: "Get your PDF file, ready to send or print.",
  },
];

export const wordToPdfHowItWorks = {
  title: "How to convert a Word document to PDF",
  steps: wordToPdfSteps,
};

const wordToPdfBenefitsItems: ContentItem[] = [
  {
    title: "Faithful layout",
    description: "Colors, tables and formatting are preserved in the final PDF.",
  },
  {
    title: "Ready to share",
    description: "A stable PDF that looks the same on any device.",
  },
  {
    title: "Fast and account-free",
    description: "No sign-up required, no daily conversion limit.",
  },
];

export const wordToPdfBenefits = {
  title: "Why convert your Word document with FileoPDF",
  intro: "A PDF that matches your original document, with no unnecessary steps.",
  items: wordToPdfBenefitsItems,
};

const wordToPdfUseCasesItems: ContentItem[] = [
  {
    title: "Sending a locked document",
    description: "Share a report or proposal without the risk of it being edited.",
  },
  {
    title: "Archiving a final document",
    description: "Keep a stable PDF version of an approved Word document.",
  },
  {
    title: "Preparing a document for print",
    description: "Get a faithful PDF render before printing, with no layout surprises.",
  },
];

export const wordToPdfUseCases = {
  title: "Common use cases",
  intro: "A few situations where this tool saves real time.",
  cases: wordToPdfUseCasesItems,
};

export const wordToPdfFaq: FaqItem[] = [
  {
    question: "Will my document's layout be preserved?",
    answer:
      "Yes. Colors, tables, images and formatting are faithfully rebuilt in the final PDF, even for documents with distinctive branding.",
  },
  {
    question: "Is my file kept after conversion?",
    answer:
      "No. The file is deleted from the conversion service once the PDF is generated.",
  },
  {
    question: "Is there a size or usage limit?",
    answer:
      "Very large files may be rejected past a certain size. During high demand, the tool may temporarily ask you to try again a little later.",
  },
  {
    question: "Which file formats are supported?",
    answer:
      "This tool accepts .docx files (Word 2007 and later). Older .doc files must first be saved in .docx format.",
  },
];

export const wordToPdfSummary = {
  text: "Convert your Word document into a PDF for free, with the layout preserved, no account and no conversion limit.",
};