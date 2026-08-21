import type { ContentItem, FaqItem } from "@/features/pdf/shared/types";

export const removePagesMeta = {
  metaTitle: "Remove pages from a PDF online, free, no sign-up",
  metaDescription:
    "Remove specific pages from a PDF right in your browser. Your PDF is never uploaded to a server. Free, fast, no account needed.",
  ogTitle: "Remove pages from a PDF — processed locally, nothing uploaded",
  ogDescription:
    "Select and remove the pages you no longer need from a PDF. It all happens right in your browser.",
  canonicalSlug: "/pdf/remove-pages",
};

export const removePagesHero = {
  eyebrow: "PDF Tool",
  title: "Remove pages from a PDF",
  subtitle:
    "Select the pages to remove from your PDF and download the trimmed-down document. Everything runs in your browser — your PDF is never sent to a server to be edited.",
};

export const removePagesTrustBlock: { title: string; intro: string; points: ContentItem[] } = {
  title: "Your PDF stays on your device",
  intro:
    "Removing pages happens right in your browser, using your own device's processing power. Your PDF is never sent to a server to be edited.",
  points: [
    {
      title: "Local processing",
      description:
        "Pages are removed and the new document rebuilt directly in your browser — none of it touches our servers.",
    },
    {
      title: "No file is stored",
      description:
        "FileoPDF doesn't keep a copy of your files: nothing is queued or archived server-side.",
    },
    {
      title: "Close the tab, it's gone",
      description:
        "Once you close the tab or reload the page, the loaded file and the result are no longer accessible anywhere.",
    },
  ],
};

export const removePagesHowItWorks: { title: string; intro: string; steps: ContentItem[] } = {
  title: "How to remove pages from a PDF with FileoPDF",
  intro:
    "Three steps are all it takes to remove pages from a PDF, with nothing to install.",
  steps: [
    {
      title: "1. Add your PDF",
      description:
        "Drag and drop your file or pick it from your device. A preview of every page shows up right away.",
    },
    {
      title: "2. Select the pages to remove",
      description:
        "Check the pages you no longer need in the preview.",
    },
    {
      title: "3. Download the trimmed PDF",
      description:
        "The final document, without the selected pages, is generated in your browser and ready to download.",
    },
  ],
};

export const removePagesBenefits: { title: string; intro: string; items: ContentItem[] } = {
  title: "Why use FileoPDF's Remove Pages tool",
  intro: "Removing pages from a PDF shouldn't require dedicated software or a new account.",
  items: [
    {
      title: "Simple and direct",
      description: "A visual preview of every page so you can select exactly what to remove.",
    },
    {
      title: "No sign-up",
      description: "The tool works right away, with no account to create and no email address to hand over.",
    },
    {
      title: "Local processing",
      description: "Removal runs in your browser rather than on a remote server, which limits your document's exposure.",
    },
    {
      title: "Quality preserved",
      description: "The pages you keep aren't recompressed: text, images, and layout stay identical to the original.",
    },
    {
      title: "Fits both work and personal use",
      description: "Contracts, reports, admin paperwork — the tool works just as well for a one-off edit as for regular use.",
    },
    {
      title: "Free, no artificial limits",
      description: "No hidden paywall for a basic feature like removing pages.",
    },
  ],
};

export const removePagesUseCases: { title: string; intro: string; cases: ContentItem[] } = {
  title: "When to use Remove Pages",
  intro: "A few real situations where removing pages from a PDF makes things easier.",
  cases: [
    {
      title: "Remove a blank page or a draft",
      description: "Clean up a scanned PDF that has a blank page or a test page added by mistake.",
    },
    {
      title: "Trim a document before sending it",
      description: "Remove irrelevant appendix pages before passing a file on to a client or colleague.",
    },
    {
      title: "Pull a contract out of its appendices",
      description: "Remove the appendix pages to keep only the main body of a contract.",
    },
    {
      title: "Fix a report before sharing it",
      description: "Remove an outdated or confidential section from a report before sharing it more widely.",
    },
  ],
};

export const removePagesFaq: FaqItem[] = [
  {
    question: "Is my PDF uploaded to a server to remove pages?",
    answer: "No. Processing runs entirely in your browser — your PDF is never sent to a server. The final document is generated locally, on your device.",
  },
  {
    question: "Is FileoPDF's Remove Pages tool really free?",
    answer: "Yes. Removing pages is free and doesn't require any sign-up or personal information.",
  },
  {
    question: "Can I remove several pages at once?",
    answer: "Yes, you can select as many pages as you need and remove them in a single operation.",
  },
  {
    question: "Can I remove every page from a PDF?",
    answer: "No, a document must keep at least one page. If you select every page, a message asks you to deselect at least one.",
  },
  {
    question: "Does this affect the quality of the pages I keep?",
    answer: "No, the pages you keep aren't recompressed: their content (text, images, layout) stays identical to the original file.",
  },
  {
    question: "Can I use the tool from my phone or tablet?",
    answer: "Yes, the tool works on mobile and tablet in any modern browser. Adding a file uses your device's file picker instead of drag-and-drop.",
  },
  {
    question: "What happens if my PDF is password-protected or corrupted?",
    answer: "A password-protected or damaged file may not be readable by the tool. If that happens, an error message flags the problem — remove the protection before trying again.",
  },
];

export const removePagesSummary = {
  text: "Removing pages from a PDF with FileoPDF takes no account and no install. Pages are removed right in your browser, and the final document is ready to download in seconds.",
};