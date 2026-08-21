import type { ContentItem, FaqItem } from "@/features/pdf/shared/types";

export const splitPdfMeta = {
  metaTitle: "Split a PDF online, free, no sign-up",
  metaDescription:
    "Extract pages or split a PDF into multiple files, right in your browser. Your files are never uploaded to a server. Free, fast, no account needed.",
  ogTitle: "Split a PDF — processed locally, nothing uploaded",
  ogDescription:
    "Pull out a selection of pages into one PDF, or split your document into separate files. It all happens right in your browser.",
  canonicalSlug: "/pdf/split-pdf",
};

export const splitPdfHero = {
  eyebrow: "PDF Tool",
  title: "Split a PDF or extract pages",
  subtitle:
    "Add your PDF, pick the pages you need, then choose to pull your selection into a single document or split the file into separate ones. Everything runs in your browser — your PDF is never sent to a server.",
};

export const splitPdfTrustBlock: { title: string; intro: string; points: ContentItem[] } = {
  title: "Your PDF stays on your device",
  intro:
    "Splitting happens right in your browser, using your own device's processing power. Your PDF is never sent to a server to be divided.",
  points: [
    {
      title: "Local processing",
      description:
        "Extracting or splitting the document happens in your browser — none of it touches our servers.",
    },
    {
      title: "No file is stored",
      description:
        "FileoPDF doesn't keep a copy of your file: nothing is queued or archived server-side.",
    },
    {
      title: "Close the tab, it's gone",
      description:
        "Once you close the tab or reload the page, the loaded PDF and the files it generated are no longer accessible anywhere.",
    },
  ],
};

export const splitPdfHowItWorks: { title: string; intro: string; steps: ContentItem[] } = {
  title: "How to split a PDF with FileoPDF",
  intro:
    "A few steps are all it takes to extract or split the pages of a PDF, with nothing to install.",
  steps: [
    {
      title: "1. Add your PDF",
      description:
        "Drag and drop your file or pick it from your device. A preview of every page shows up right away.",
    },
    {
      title: "2. Select your pages",
      description:
        "Every page is checked by default. Uncheck the ones you don't want to include.",
    },
    {
      title: "3. Choose a mode",
      description:
        "Pull your selection into a single PDF, or split it into separate files, one per page.",
    },
    {
      title: "4. Download the result",
      description:
        "A single file downloads right away; multiple files are bundled into a ZIP archive.",
    },
  ],
};

export const splitPdfBenefits: { title: string; intro: string; items: ContentItem[] } = {
  title: "Why use FileoPDF's Split PDF tool",
  intro: "Splitting or extracting pages from a PDF shouldn't require dedicated software or a new account.",
  items: [
    {
      title: "Two modes in one tool",
      description: "Extract a selection into one document, or split into separate files — whichever fits what you need.",
    },
    {
      title: "No sign-up",
      description: "The tool works right away, with no account to create and no email address to hand over.",
    },
    {
      title: "Visual page selection",
      description: "A preview of every page lets you pick exactly what to keep, no guessing page numbers.",
    },
    {
      title: "Bundled downloads",
      description: "Multi-file splits are automatically packaged into a ZIP archive, ready to download.",
    },
    {
      title: "Local processing",
      description: "Splitting runs in your browser rather than on a remote server, which limits your documents' exposure.",
    },
    {
      title: "Free, no artificial limits",
      description: "No hidden paywall for a basic feature like splitting a PDF.",
    },
  ],
};

export const splitPdfUseCases: { title: string; intro: string; cases: ContentItem[] } = {
  title: "When to use Split PDF",
  intro: "A few real situations where extracting or splitting a PDF makes things easier.",
  cases: [
    {
      title: "Pull out a chapter or section",
      description: "Isolate a few pages of a report or book to share, without sending the whole document.",
    },
    {
      title: "Separate a batch of scanned documents",
      description: "Split a multi-document scan into individual files, one per original document.",
    },
    {
      title: "Remove a confidential part before sending",
      description: "Extract only the relevant pages of a contract or file before passing it on to someone else.",
    },
    {
      title: "Shrink a PDF that's too large",
      description: "Split a document into several lighter files that are easier to send by email.",
    },
    {
      title: "Reorganize an administrative file",
      description: "Separate the pages of a PDF that bundles several documents so they can be filed individually.",
    },
  ],
};

export const splitPdfFaq: FaqItem[] = [
  {
    question: "Is my PDF uploaded to a server to be split?",
    answer: "No. Splitting runs entirely in your browser — your PDF is never sent to a server. The output files are generated locally, on your device.",
  },
  {
    question: "Is FileoPDF's Split PDF tool really free?",
    answer: "Yes. Extracting and splitting PDFs is free and doesn't require any sign-up or personal information.",
  },
  {
    question: "What's the difference between extracting and splitting?",
    answer: "Extracting gathers the selected pages into a single PDF. Splitting creates a separate PDF file for each selected page.",
  },
  {
    question: "How are files downloaded in split mode?",
    answer: "If you select a single page, the PDF downloads directly. If you select several pages, the files are automatically bundled into a ZIP archive.",
  },
  {
    question: "Can I choose exactly which pages to keep?",
    answer: "Yes — every page is checked by default with a visual preview, and you can uncheck the ones you don't want before running the tool.",
  },
  {
    question: "Does splitting affect PDF quality?",
    answer: "No, pages are copied as-is from the original document, with no recompression or loss of quality.",
  },
  {
    question: "Can I split a PDF from my phone or tablet?",
    answer: "Yes, the tool works on mobile and tablet in any modern browser. Adding a file uses your device's file picker instead of drag-and-drop.",
  },
  {
    question: "What happens if my PDF is password-protected or corrupted?",
    answer: "A password-protected or damaged file may not be readable by the tool. If that happens, an error message appears — unlock the file before trying again.",
  },
];

export const splitPdfSummary = {
  text: "Splitting a PDF with FileoPDF takes no account and no install. Pick your pages, pull them into one file or split them into separate documents, right in your browser.",
};