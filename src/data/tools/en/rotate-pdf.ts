import type { ContentItem, FaqItem } from "@/features/pdf/shared/types";

export const rotatePdfMeta = {
  metaTitle: "Rotate a PDF online, free, no sign-up",
  metaDescription:
    "Rotate the pages of your PDF by 90°, 180°, or 270°, right in your browser. Your PDF is never uploaded to a server. Free, fast, no account needed.",
  ogTitle: "Rotate a PDF's pages — processed locally, nothing uploaded",
  ogDescription:
    "Fix the orientation of your PDF pages, one at a time or all at once. It all happens right in your browser.",
  canonicalSlug: "/pdf/rotate-pdf",
};

export const rotatePdfHero = {
  eyebrow: "PDF Tool",
  title: "Rotate a PDF's pages",
  subtitle:
    "Add your PDF, pick the pages to rotate and the angle you need, then download the corrected document. Everything runs in your browser — your PDF is never sent to a server to be edited.",
};

export const rotatePdfTrustBlock: { title: string; intro: string; points: ContentItem[] } = {
  title: "Your PDF stays on your device",
  intro:
    "Rotation happens right in your browser, using your own device's processing power. Your PDF is never sent to a server to be edited.",
  points: [
    {
      title: "Local processing",
      description:
        "Rotating pages and rebuilding the document happens directly in your browser — none of it touches our servers.",
    },
    {
      title: "No file is stored",
      description:
        "FileoPDF doesn't keep a copy of your file: nothing is queued or archived server-side.",
    },
    {
      title: "Close the tab, it's gone",
      description:
        "Once you close the tab or reload the page, the loaded PDF and the generated document are no longer accessible anywhere.",
    },
  ],
};

export const rotatePdfHowItWorks: { title: string; intro: string; steps: ContentItem[] } = {
  title: "How to rotate a PDF with FileoPDF",
  intro:
    "Three steps are all it takes to fix the orientation of a PDF's pages, with nothing to install.",
  steps: [
    {
      title: "1. Add your PDF",
      description:
        "Drag and drop your file or pick it from your device. A preview of every page shows up right away.",
    },
    {
      title: "2. Choose the rotation",
      description:
        "Rotate a single page by 90°, 180°, or 270°, or apply the same rotation to the whole document in one click.",
    },
    {
      title: "3. Download the result",
      description:
        "The corrected PDF is generated in your browser and ready to download in seconds.",
    },
  ],
};

export const rotatePdfBenefits: { title: string; intro: string; items: ContentItem[] } = {
  title: "Why use FileoPDF's Rotate PDF tool",
  intro: "Fixing a PDF's orientation shouldn't require dedicated software or a new account.",
  items: [
    {
      title: "Rotate one page or all of them",
      description: "Fix a single misaligned page, or apply the rotation to the entire document in one click.",
    },
    {
      title: "No sign-up",
      description: "The tool works right away, with no account to create and no email address to hand over.",
    },
    {
      title: "Visual preview before you commit",
      description: "Every page shows up as a thumbnail, so you can check the orientation before downloading.",
    },
    {
      title: "No file size limit",
      description: "Handle large documents with no paywall or artificial restriction.",
    },
    {
      title: "Local processing",
      description: "Rotation runs in your browser rather than on a remote server, which limits your documents' exposure.",
    },
    {
      title: "Quality preserved",
      description: "Pages aren't recompressed — only the orientation changes, the content stays identical to the original.",
    },
  ],
};

export const rotatePdfUseCases: { title: string; intro: string; cases: ContentItem[] } = {
  title: "When to use Rotate PDF",
  intro: "A few real situations where fixing a PDF's orientation makes things easier.",
  cases: [
    {
      title: "Fix an upside-down scanned document",
      description: "Straighten out one or several pages from a scanner that misoriented some sheets.",
    },
    {
      title: "Standardize a PDF mixing portrait and landscape",
      description: "Get every page facing the same way before sharing or printing a document.",
    },
    {
      title: "Reposition photos imported as a PDF",
      description: "Fix the orientation of pages made from photos taken vertically or horizontally by mistake.",
    },
    {
      title: "Prepare a document before printing",
      description: "Make sure every page faces the right way to avoid an unreadable or crooked print.",
    },
    {
      title: "Tidy up a file before archiving",
      description: "Standardize the orientation of an admin file's pages before filing it away for good.",
    },
  ],
};

export const rotatePdfFaq: FaqItem[] = [
  {
    question: "Is my PDF uploaded to a server to be rotated?",
    answer: "No. Rotation runs entirely in your browser — your PDF is never sent to a server. The final document is generated locally, on your device.",
  },
  {
    question: "Is FileoPDF's Rotate PDF tool really free?",
    answer: "Yes. Rotating a PDF is free and doesn't require any sign-up or personal information.",
  },
  {
    question: "Can I rotate a single page without touching the others?",
    answer: "Yes, each page can be rotated individually by 90°, 180°, or 270°, independently of the rest of the document.",
  },
  {
    question: "Can I apply the same rotation to the whole document?",
    answer: "Yes, a mode lets you apply the same rotation to every page in a single action.",
  },
  {
    question: "Does rotating affect PDF quality?",
    answer: "No, only the page orientation changes. Text, images, and layout stay identical to the original, with no recompression.",
  },
  {
    question: "Is there a size limit for the file I want to rotate?",
    answer: "No artificial limit is enforced. The practical limit mostly depends on your device's memory and processing power for very large files.",
  },
  {
    question: "Can I rotate a PDF from my phone or tablet?",
    answer: "Yes, the tool works on mobile and tablet in any modern browser. Adding a file uses your device's file picker instead of drag-and-drop.",
  },
  {
    question: "What happens if my PDF is password-protected or corrupted?",
    answer: "A password-protected or damaged file may not be readable by the tool. If that happens, an error message appears — unlock the file before trying again.",
  },
];

export const rotatePdfSummary = {
  text: "Rotating a PDF with FileoPDF takes no account and no install. Fix the orientation of a single page or the whole document right in your browser, and download the result in seconds.",
};