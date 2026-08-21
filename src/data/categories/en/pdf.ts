import type { ContentItem } from "@/features/pdf/shared/types";

export const pdfHubHero = {
  title: "Free Online PDF Tools",
  subtitle: "Merge, split, and edit your PDFs directly in your browser.",
  paragraphs: [
    "FileoPDF offers a suite of free PDF tools built for fast use, with no install and no sign-up required. Each tool processes your PDF files locally, in your browser, instead of sending them to a remote server for processing.",
    "This approach limits exposure of your documents, especially for sensitive files: proof of ID, contracts, invoices, or administrative records. You keep full control of your files from start to finish.",
  ],
};

export const pdfHubToolsIntro = {
  text: "Pick a tool below to get started. More PDF tools (splitting, page removal) are being added to the suite progressively.",
};

export const pdfHubTrustBlock: { title: string; items: ContentItem[] } = {
  title: "The philosophy behind FileoPDF's PDF tools",
  items: [
    {
      title: "Simplicity",
      description: "One tool, one clear action. No unnecessary menus or steps.",
    },
    {
      title: "Local processing",
      description: "Your PDF files are processed in your browser, never sent to a server to be transformed.",
    },
    {
      title: "No sign-up",
      description: "Every tool is usable immediately, with no account creation or personal data collection.",
    },
  ],
};