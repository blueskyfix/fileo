import type { ContentItem, FaqItem } from "@/features/pdf/shared/types";

export const wordToPdfMeta = {
  metaTitle: "Convert Word to PDF online, free, no sign-up",
  metaDescription:
    "Convert your Word documents (.docx) to PDF right in your browser. Your files are never uploaded to a server. Free, fast, no account needed.",
  ogTitle: "Convert Word to PDF — processed locally, nothing uploaded",
  ogDescription:
    "Turn a Word document (.docx) into a PDF in one click, right in your browser.",
  canonicalSlug: "/word/word-to-pdf",
};

export const wordToPdfHero = {
  eyebrow: "Word Tool",
  title: "Convert a Word document to PDF",
  subtitle:
    "Add your Word file (.docx), run the conversion, then download the resulting PDF. Everything runs in your browser — your document is never sent to a server to be converted.",
};

export const wordToPdfTrustBlock: { title: string; intro: string; points: ContentItem[] } = {
  title: "Your document stays on your device",
  intro:
    "Conversion happens right in your browser, using your own device's processing power. Your Word file is never sent to a server to be turned into a PDF.",
  points: [
    {
      title: "Local conversion",
      description:
        "The document is turned into a PDF directly in your browser — none of it touches our servers.",
    },
    {
      title: "No file is stored",
      description:
        "FileoPDF doesn't keep a copy of your document: nothing is queued or archived server-side.",
    },
    {
      title: "Close the tab, it's gone",
      description:
        "Once you close the tab or reload the page, the loaded Word file and the generated PDF are no longer accessible anywhere.",
    },
  ],
};

export const wordToPdfHowItWorks: { title: string; intro: string; steps: ContentItem[] } = {
  title: "How to convert Word to PDF with FileoPDF",
  intro:
    "Three steps are all it takes to turn a Word document into a PDF, with nothing to install.",
  steps: [
    {
      title: "1. Add your Word file",
      description:
        "Drag and drop your .docx document or pick it from your device.",
    },
    {
      title: "2. Run the conversion",
      description:
        "The document is turned into a PDF directly in your browser, in a matter of seconds.",
    },
    {
      title: "3. Download the PDF",
      description:
        "Get your PDF file, ready to share or print.",
    },
  ],
};

export const wordToPdfBenefits: { title: string; intro: string; items: ContentItem[] } = {
  title: "Why use FileoPDF's Word to PDF tool",
  intro: "Converting a Word document to PDF shouldn't require dedicated software or a new account.",
  items: [
    {
      title: "Simple and direct",
      description: "Drop a file, click a button, download a PDF.",
    },
    {
      title: "No sign-up",
      description: "The tool works right away, with no account to create and no email address to hand over.",
    },
    {
      title: "Fixed, reliable rendering",
      description: "A PDF looks the same no matter what device or software is used to open it.",
    },
    {
      title: "Fast",
      description: "No server wait — conversion runs directly on your machine.",
    },
    {
      title: "Local processing",
      description: "Conversion runs in your browser rather than on a remote server, which limits your documents' exposure.",
    },
    {
      title: "Free, no artificial limits",
      description: "No hidden paywall for a basic feature like converting Word to PDF.",
    },
  ],
};

export const wordToPdfUseCases: { title: string; intro: string; cases: ContentItem[] } = {
  title: "When to use Word to PDF",
  intro: "A few real situations where converting a Word document to PDF makes things easier.",
  cases: [
    {
      title: "Send a locked-down document",
      description: "Share a résumé, a cover letter, or a report without risking it being edited by the recipient.",
    },
    {
      title: "Archive a document for the long term",
      description: "Guarantee the same rendering over time, independent of future versions of your word processor.",
    },
    {
      title: "Prepare a document for printing",
      description: "Get a print-ready PDF with stable formatting no matter which device is used.",
    },
    {
      title: "Submit an administrative file",
      description: "Convert a Word document to PDF to meet the format often required for online applications.",
    },
    {
      title: "Share a report or a memo",
      description: "Distribute an internal document in a format readable on any device, without depending on Word.",
    },
  ],
};

export const wordToPdfFaq: FaqItem[] = [
  {
    question: "Is my Word file uploaded to a server to be converted?",
    answer: "No. Conversion runs entirely in your browser — your document never leaves your computer.",
  },
  {
    question: "Is FileoPDF's Word to PDF tool really free?",
    answer: "Yes. Converting Word to PDF is free and doesn't require any sign-up or personal information.",
  },
  {
    question: "What Word formats are supported?",
    answer: "Only the .docx format (Word 2007 and later) is supported.",
  },
  {
    question: "Is the formatting perfectly preserved?",
    answer: "Simple layouts (text, headings, lists, images) convert faithfully. Documents with very complex formatting (multiple columns, advanced headers) may show small differences.",
  },
  {
    question: "Is the text in the resulting PDF selectable and copyable?",
    answer: "The generated PDF visually reproduces your document, but its text isn't selectable or copyable in this version — each page is rendered as an image that faithfully matches the original layout.",
  },
  {
    question: "Can I convert several Word files in a row?",
    answer: "Yes, you can convert as many documents as you like, one after another, with no artificial limit.",
  },
  {
    question: "Can I convert a Word file from my phone or tablet?",
    answer: "Yes, the tool works on mobile and tablet in any modern browser. Adding a file uses your device's file picker instead of drag-and-drop.",
  },
  {
    question: "What happens if my Word file is corrupted or in an unsupported format?",
    answer: "A damaged file or one in a format other than .docx may not be readable by the tool. If that happens, an error message appears — check the format or re-save the file before trying again.",
  },
];

export const wordToPdfSummary = {
  text: "Converting a Word document to PDF with FileoPDF takes no account and no install. The .docx file is turned into a PDF right in your browser, ready to download in seconds.",
};