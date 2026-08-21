import type { ContentItem, FaqItem } from "@/features/pdf/shared/types";

export const pdfToJpgMeta = {
  metaTitle: "Convert PDF to JPG online, free, no sign-up",
  metaDescription:
    "Convert the pages of your PDF into JPG images, right in your browser. Your PDF is never uploaded to a server. Free, fast, no account needed.",
  ogTitle: "Convert a PDF to JPG images — processed locally, nothing uploaded",
  ogDescription:
    "Turn your PDF's pages into JPG images, one at a time or all at once. It all happens right in your browser.",
  canonicalSlug: "/pdf/pdf-to-jpg",
};

export const pdfToJpgHero = {
  eyebrow: "PDF Tool",
  title: "Convert a PDF to JPG images",
  subtitle:
    "Add your PDF, pick the pages to convert, then download the resulting JPG images. Everything runs in your browser — your PDF is never sent to a server to be converted.",
};

export const pdfToJpgTrustBlock: { title: string; intro: string; points: ContentItem[] } = {
  title: "Your PDF stays on your device",
  intro:
    "Conversion happens right in your browser, using your own device's processing power. Your PDF is never sent to a server to be turned into images.",
  points: [
    {
      title: "Local conversion",
      description:
        "Each page is turned into an image directly in your browser — none of it touches our servers.",
    },
    {
      title: "No file is stored",
      description:
        "FileoPDF doesn't keep a copy of your file: nothing is queued or archived server-side.",
    },
    {
      title: "Close the tab, it's gone",
      description:
        "Once you close the tab or reload the page, the loaded PDF and the images it generated are no longer accessible anywhere.",
    },
  ],
};

export const pdfToJpgHowItWorks: { title: string; intro: string; steps: ContentItem[] } = {
  title: "How to convert a PDF to JPG with FileoPDF",
  intro:
    "Three steps are all it takes to turn a PDF's pages into JPG images, with nothing to install.",
  steps: [
    {
      title: "1. Add your PDF",
      description:
        "Drag and drop your file or pick it from your device. Pages show up in a preview.",
    },
    {
      title: "2. Choose your pages",
      description:
        "Every page is selected by default. Uncheck the ones you don't want to convert.",
    },
    {
      title: "3. Convert and download",
      description:
        "Run the conversion: a single page downloads as a JPG right away; multiple pages are bundled into a ZIP archive.",
    },
  ],
};

export const pdfToJpgBenefits: { title: string; intro: string; items: ContentItem[] } = {
  title: "Why use FileoPDF's PDF to JPG tool",
  intro: "Pulling images out of a PDF shouldn't require dedicated software or a new account.",
  items: [
    {
      title: "Simple and direct",
      description: "A preview of every page, a clear selection, and one button to convert.",
    },
    {
      title: "No sign-up",
      description: "The tool works right away, with no account to create and no email address to hand over.",
    },
    {
      title: "Flexible page selection",
      description: "Convert the whole document, or just the pages you care about.",
    },
    {
      title: "Bundled downloads",
      description: "Multi-page conversions are automatically packaged into a ZIP archive, ready to download.",
    },
    {
      title: "Local processing",
      description: "Conversion runs in your browser rather than on a remote server, which limits your documents' exposure.",
    },
    {
      title: "Free, no artificial limits",
      description: "No hidden paywall for a basic feature like converting a PDF to images.",
    },
  ],
};

export const pdfToJpgUseCases: { title: string; intro: string; cases: ContentItem[] } = {
  title: "When to use PDF to JPG",
  intro: "A few real situations where pulling images out of a PDF makes things easier.",
  cases: [
    {
      title: "Share a page on social media or in a message",
      description: "Extract a single page from a PDF to share easily, without sending the whole document.",
    },
    {
      title: "Drop a page into a presentation",
      description: "Convert a page from a report or contract into an image to use in a slide deck or document.",
    },
    {
      title: "Preview a document quickly",
      description: "Get a visual preview of every page without opening a dedicated PDF viewer.",
    },
    {
      title: "Archive a file visually",
      description: "Convert a full PDF into a series of images for archiving or visual filing.",
    },
    {
      title: "Publish content on a site or blog",
      description: "Turn a document page into an image ready to use in an article or online post.",
    },
  ],
};

export const pdfToJpgFaq: FaqItem[] = [
  {
    question: "Is my PDF uploaded to a server to be converted?",
    answer: "No. Conversion runs entirely in your browser — your PDF is never sent to a server. The images are generated locally, on your device.",
  },
  {
    question: "Is FileoPDF's PDF to JPG tool really free?",
    answer: "Yes. Converting a PDF to JPG images is free and doesn't require any sign-up or personal information.",
  },
  {
    question: "Can I convert only some pages?",
    answer: "Yes, every page is selected by default, but you can uncheck the ones you don't want to convert before running the export.",
  },
  {
    question: "How are the images downloaded if my PDF has several pages?",
    answer: "If you convert a single page, the JPG downloads directly. If you convert several, they're automatically bundled into a ZIP archive, ready to extract.",
  },
  {
    question: "What quality are the resulting images?",
    answer: "Pages are converted at a resolution suited for everyday screen use and sharing, offering a good balance between sharpness and file size.",
  },
  {
    question: "Can I convert a PDF from my phone or tablet?",
    answer: "Yes, the tool works on mobile and tablet in any modern browser. Adding a file uses your device's file picker instead of drag-and-drop.",
  },
  {
    question: "What happens if my PDF is password-protected or corrupted?",
    answer: "A password-protected or damaged file may not be readable by the tool. If that happens, an error message appears — unlock the file before trying again.",
  },
  {
    question: "Is there a limit to how many pages I can convert?",
    answer: "You can convert an entire document. The practical limit mostly depends on your device's memory and processing power for very large files.",
  },
];

export const pdfToJpgSummary = {
  text: "Converting a PDF to JPG with FileoPDF takes no account and no install. Each page is turned into an image right in your browser, with a direct download or a ZIP bundle depending on how many pages you pick.",
};