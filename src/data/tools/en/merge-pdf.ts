import type { ContentItem, FaqItem } from "@/features/pdf/shared/types";

export const mergePdfMeta = {
  metaTitle: "Merge PDF Online, Free and No Sign-up Required",
  metaDescription:
    "Merge multiple PDF files into one, right in your browser. Nothing gets uploaded to a server. Free, fast, no sign-up.",
  ogTitle: "Merge PDF Files Online, Fully Processed in Your Browser",
  ogDescription:
    "Combine multiple PDF files into a single document. Reorder pages, merge, download. Everything happens in your browser.",
  canonicalSlug: "/pdf/merge-pdf",
};

export const mergePdfHero = {
  eyebrow: "PDF Tool",
  title: "Merge multiple PDF files into one",
  subtitle:
    "Add your files, put them in the order you want, then download the merged PDF. Everything happens in your browser. Your files are never uploaded to a server to be merged.",
};

export const mergePdfTrustBlock: { title: string; intro: string; points: ContentItem[] } = {
  title: "Your PDF files stay on your device",
  intro:
    "Merging happens right in your browser, using your own device's processing power. Nothing is sent to a server to be combined.",
  points: [
    {
      title: "Local merging",
      description:
        "The final document is generated in your browser, page by page. Our servers never see it.",
    },
    {
      title: "No storage of your PDFs",
      description:
        "FileoPDF keeps no copy of your files. Nothing is queued, nothing is archived server-side.",
    },
    {
      title: "Close the tab, it's all gone",
      description:
        "Once you close the tab or reload the page, the files you loaded and the result disappear for good.",
    },
  ],
};

export const mergePdfHowItWorks: { title: string; intro: string; steps: ContentItem[] } = {
  title: "How to merge PDF files with FileoPDF",
  intro:
    "Three steps are all it takes to combine multiple PDF files into one document. No software to install.",
  steps: [
    {
      title: "1. Add your PDF files",
      description:
        "Drag and drop your files, or pick them from your device. Add as many PDFs as you need.",
    },
    {
      title: "2. Reorder them",
      description:
        "Move the files around to set the final order before you merge.",
    },
    {
      title: "3. Merge and download",
      description:
        "Start the merge. Your browser generates the final file, ready to download in seconds.",
    },
  ],
};

export const mergePdfBenefits: { title: string; intro: string; items: ContentItem[] } = {
  title: "Why use FileoPDF's Merge PDF tool",
  intro: "Merging PDFs shouldn't require dedicated software or an account.",
  items: [
    {
      title: "Simple and direct",
      description: "No complicated menus, no unnecessary options. Add your files, merge them.",
    },
    {
      title: "No sign-up required",
      description: "The tool works right away. No account, no email address needed.",
    },
    {
      title: "Flexible reordering",
      description: "Rearrange your files before merging so the final document comes out exactly the way you want it.",
    },
    {
      title: "Local processing",
      description: "Merging runs in your browser instead of a remote server, so your documents stay off other systems.",
    },
    {
      title: "Built for work and everyday use",
      description: "Administrative files, invoices, reports. The tool handles a one-off merge just as well as regular use.",
    },
    {
      title: "Free, no artificial limits",
      description: "No hidden paywall for a basic feature like merging PDFs.",
    },
  ],
};

export const mergePdfUseCases: { title: string; intro: string; cases: ContentItem[] } = {
  title: "When to use Merge PDF",
  intro: "A few real situations where combining PDFs into one file makes life easier.",
  cases: [
    {
      title: "Bundle supporting documents",
      description: "Gather ID, proof of address, and proof of income into a single file for an administrative application.",
    },
    {
      title: "Merge invoices",
      description: "Combine several invoices or receipts into one file before sending them to accounting or a client.",
    },
    {
      title: "Put together a job application",
      description: "Bring your resume, cover letter, and diplomas into one PDF, in the right order.",
    },
    {
      title: "Attach appendices to a contract",
      description: "Add appendices to a main contract so you only have to send one final file.",
    },
    {
      title: "Combine report or thesis chapters",
      description: "Merge sections written separately into a single document, ready to proofread or print.",
    },
  ],
};

export const mergePdfFaq: FaqItem[] = [
  {
    question: "Are my PDF files uploaded to a server to be merged?",
    answer: "No. Merging happens right in your browser. Your files are never uploaded to a server, and the final document is generated locally, on your device.",
  },
  {
    question: "Is FileoPDF's Merge PDF tool really free?",
    answer: "Yes. Merging PDFs is free and requires no sign-up or personal information.",
  },
  {
    question: "Is there a limit on the number or size of files?",
    answer: "You can merge as many files as you need, one after another. In practice, the limit depends on your device's memory and processing power. Very large or very numerous files may slow things down on a less powerful machine.",
  },
  {
    question: "Can I merge PDFs from my phone or tablet?",
    answer: "Yes, the tool works on mobile and tablet through a modern browser. You'll add files through your device's file picker instead of drag-and-drop.",
  },
  {
    question: "Can I change the order of the files before merging them?",
    answer: "Yes. Reorder your files freely before starting the merge, and the final document will follow that order.",
  },
  {
    question: "What happens if one of my PDFs is password-protected or corrupted?",
    answer: "The tool may not be able to read a password-protected or damaged file. If that happens, an error message flags it. Remove it or unlock it before restarting the merge.",
  },
  {
    question: "Is the quality and content of my PDFs preserved after merging?",
    answer: "Yes. The tool combines your files without recompressing them, so the text, images, and layout of each original stay intact in the final document.",
  },
  {
    question: "Can I merge more than two files at once?",
    answer: "Yes, add and merge as many PDF files as you need in a single operation, in whatever order you choose.",
  },
];

export const mergePdfSummary = {
  text: "Merging PDFs with FileoPDF takes no account and no installation. Your files are combined right in your browser, in the order you choose, and the result is ready to download in seconds.",
};