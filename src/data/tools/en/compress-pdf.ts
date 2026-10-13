import type { ContentItem, FaqItem } from "@/features/pdf/shared/types";

export const compressPdfMeta = {
  metaTitle: "Compress a PDF without uploading it, free",
  metaDescription:
    "Reduce the size of a PDF right in your browser, to meet a portal's or an email's size limit. Text stays selectable. Free, no sign-up.",
  ogTitle: "Compress a PDF without uploading it",
  ogDescription:
    "Shrink a scanned or large PDF in your browser. The file stays on your device.",
  canonicalSlug: "/pdf/compress-pdf",
};

export const compressPdfHero = {
  eyebrow: "PDF Tool",
  title: "Compress a PDF without uploading it",
  subtitle:
    "Reduce the size of a scanned or large PDF to get under a portal's or an email's limit, in your browser. Text stays sharp and selectable.",
};

export const compressPdfTrustBlock: { title: string; intro: string; points: ContentItem[] } = {
  title: "Your PDF stays on your device",
  intro:
    "Compression happens in your browser, using your own device's processing power. No page of your document is sent to a server.",
  points: [
    {
      title: "Processed in your browser",
      description:
        "Compression and the rebuilding of the new file happen on your device, without going through our servers.",
    },
    {
      title: "Your PDF is never stored",
      description:
        "Fileo keeps no copy of your files: nothing is queued or archived on a server.",
    },
    {
      title: "Close the tab, it is gone",
      description:
        "Once the tab is closed or the page reloaded, the loaded file and the result are no longer accessible anywhere.",
    },
  ],
};

export const compressPdfHowItWorks: { title: string; intro: string; steps: ContentItem[] } = {
  title: "How to shrink a PDF in three steps",
  intro: "Everything runs on your device, with no software to install.",
  steps: [
    {
      title: "1. Add your PDF file",
      description: "Drag and drop your file or select it from your device.",
    },
    {
      title: "2. Pick a level, or a maximum size",
      description:
        "Light, Balanced or Strong. If you know the limit to meet, enter it in MB: stronger levels are tried automatically until it is reached.",
    },
    {
      title: "3. Download the smaller PDF",
      description:
        "You see the size before and after. If there is no gain, the tool tells you instead of handing back a heavier file.",
    },
  ],
};

export const compressPdfBenefits: { title: string; intro: string; items: ContentItem[] } = {
  title: "What this tool does, and what it doesn't",
  intro: "Compression designed for scanned PDFs, the ones that most often exceed portal limits.",
  items: [
    {
      title: "Text and vectors preserved",
      description:
        "Text stays sharp, selectable and searchable, and fonts are untouched.",
    },
    {
      title: "Target a maximum size",
      description:
        "Enter the limit to meet in MB: the tool increases compression step by step until the file is under that size, or tells you it could not.",
    },
    {
      title: "Honest about its limits",
      description:
        "A text-only PDF, or one that is already optimized, can't be reduced much. Any digital signature is no longer valid after compression.",
    },
    {
      title: "No sign-up",
      description: "The tool works right away, with no account or email address.",
    },
  ],
};

export const compressPdfUseCases: { title: string; intro: string; cases: ContentItem[] } = {
  title: "When do you need a smaller PDF?",
  intro: "Very common situations where a file is rejected because it is too heavy.",
  cases: [
    {
      title: "Application and enrollment files",
      description: "Bring scans (IDs, diplomas, statements) under the limit set by the platform.",
    },
    {
      title: "Administrative procedures",
      description: "Upload a supporting document to a portal that caps attachment size.",
    },
    {
      title: "Sending by email",
      description: "Fit a scanned document through a mailbox that rejects large attachments.",
    },
    {
      title: "Phone scans",
      description: "Shrink photos of documents turned into PDFs, often very heavy for what they contain.",
    },
  ],
};

export const compressPdfFaq: FaqItem[] = [
  {
    question: "Is my PDF sent to a server to be compressed?",
    answer:
      "No. Compression runs in your browser: your PDF is not sent to a server. The final file is generated on your device.",
  },
  {
    question: "Does the text stay selectable after compression?",
    answer:
      "Yes. Text, fonts and vector elements stay as they are. However, a scanned PDF does not contain real text: it does not become selectable.",
  },
  {
    question: "How much smaller will my PDF be?",
    answer:
      "It depends on the content. A scanned PDF can lose most of its weight. A text-only PDF, or one that is already optimized, will shrink little or not at all: the tool tells you.",
  },
  {
    question: "What is the difference between Light, Balanced and Strong?",
    answer:
      "The stronger the level, the more the visual quality of the document drops. Light stays very close to the original, Strong gives the smallest file at the cost of a blurrier result. Check that small print stays readable before sending the document.",
  },
  {
    question: "How do I meet a precise limit, such as 2 MB?",
    answer:
      "Enter the maximum size in the field provided. The tool tries the chosen level, then stronger ones, until the file is under that size. If it can't get there, it tells you and gives you the best result obtained.",
  },
  {
    question: "What happens to a digital signature?",
    answer:
      "It is no longer valid: the file is rebuilt, which invalidates the signature. If the document must stay signed, don't compress it, or compress it before signing.",
  },
  {
    question: "What if my PDF is password-protected or damaged?",
    answer:
      "A password-protected or damaged file may not be readable by the tool. An error message then points out the problem; remove the protection before trying again.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "Large files take longer to process and need memory, especially on a phone. If processing fails, try on a computer, or split the document first with the split tool.",
  },
];

export const compressPdfSummary = {
  text: "Compress PDF reduces the size of a scanned or large document right in your browser, without sending the file to a server. Text stays selectable. A free tool with no account, to get under a portal's or an email's limit.",
};
