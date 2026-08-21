import type { ContentItem, FaqItem } from "@/features/pdf/shared/types";

export const jpgToPdfMeta = {
  metaTitle: "Convert JPG to PDF online, free, no sign-up",
  metaDescription:
    "Convert your JPG or PNG images into a PDF, right in your browser. Your images are never uploaded to a server. Free, fast, no account needed.",
  ogTitle: "Convert JPG images to PDF — processed locally, nothing uploaded",
  ogDescription:
    "Turn one or several images into a single PDF document. Reorder them, convert, download. It all happens right in your browser.",
  canonicalSlug: "/pdf/jpg-to-pdf",
};

export const jpgToPdfHero = {
  eyebrow: "PDF Tool",
  title: "Convert JPG images to PDF",
  subtitle:
    "Add your images, reorder them the way you want, then download the resulting PDF. Everything runs in your browser — your images are never sent to a server to be converted.",
};

export const jpgToPdfTrustBlock: { title: string; intro: string; points: ContentItem[] } = {
  title: "Your images stay on your device",
  intro:
    "Conversion happens right in your browser, using your own device's processing power. Your images are never sent to a server to be turned into a PDF.",
  points: [
    {
      title: "Local conversion",
      description:
        "The final document is generated in your browser, image by image — none of it touches our servers.",
    },
    {
      title: "No file is stored",
      description:
        "FileoPDF doesn't keep a copy of your images: nothing is queued or archived server-side.",
    },
    {
      title: "Close the tab, it's gone",
      description:
        "Once you close the tab or reload the page, the loaded images and the generated PDF are no longer accessible anywhere.",
    },
  ],
};

export const jpgToPdfHowItWorks: { title: string; intro: string; steps: ContentItem[] } = {
  title: "How to convert JPG to PDF with FileoPDF",
  intro:
    "Three steps are all it takes to turn one or several images into a PDF document, with nothing to install.",
  steps: [
    {
      title: "1. Add your images",
      description:
        "Drag and drop your JPG or PNG files, or pick them from your device. Add as many images as you need.",
    },
    {
      title: "2. Reorder them",
      description:
        "Move the images around to set the page order of the final PDF, before running the conversion.",
    },
    {
      title: "3. Convert and download",
      description:
        "Run the conversion: the PDF is generated in your browser and ready to download in seconds.",
    },
  ],
};

export const jpgToPdfBenefits: { title: string; intro: string; items: ContentItem[] } = {
  title: "Why use FileoPDF's JPG to PDF tool",
  intro: "Converting images to PDF shouldn't require dedicated software or a new account.",
  items: [
    {
      title: "Simple and direct",
      description: "No complicated menus or extra options. Add your images, convert.",
    },
    {
      title: "No sign-up",
      description: "The tool works right away, with no account to create and no email address to hand over.",
    },
    {
      title: "Several images in one PDF",
      description: "Combine as many images as you need into a single document, in the order you choose.",
    },
    {
      title: "No distortion",
      description: "Every PDF page keeps the exact proportions of the original image, with no cropping or stretching.",
    },
    {
      title: "Local processing",
      description: "Conversion runs in your browser rather than on a remote server, which limits your images' exposure.",
    },
    {
      title: "Free, no artificial limits",
      description: "No hidden paywall for a basic feature like converting images.",
    },
  ],
};

export const jpgToPdfUseCases: { title: string; intro: string; cases: ContentItem[] } = {
  title: "When to use JPG to PDF",
  intro: "A few real situations where converting images to PDF makes things easier.",
  cases: [
    {
      title: "Send photos of documents",
      description: "Turn phone photos (ID card, receipt, ticket) into a clean PDF ready to send.",
    },
    {
      title: "Put together a portfolio",
      description: "Gather several visuals or photos into a single PDF file that's easy to share.",
    },
    {
      title: "Prepare a document for printing",
      description: "Combine several images in the right order before printing, without needing layout software.",
    },
    {
      title: "Archive screenshots or scans",
      description: "Bundle screenshots or scans taken separately into one browsable document.",
    },
    {
      title: "Build a visual file",
      description: "Assemble supporting photos or presentation visuals into a universally readable PDF format.",
    },
  ],
};

export const jpgToPdfFaq: FaqItem[] = [
  {
    question: "Are my images uploaded to a server to be converted?",
    answer: "No. Conversion runs entirely in your browser — your images are never sent to a server. The final PDF is generated locally, on your device.",
  },
  {
    question: "Is FileoPDF's JPG to PDF tool really free?",
    answer: "Yes. Converting images to PDF is free and doesn't require any sign-up or personal information.",
  },
  {
    question: "What page size do I get in the final PDF?",
    answer: "Each PDF page matches the exact dimensions of the original image, with no distortion or margins added automatically.",
  },
  {
    question: "Can I convert several images into one PDF?",
    answer: "Yes, you can add several JPG or PNG images and convert them into a single PDF document, in the order you set.",
  },
  {
    question: "Can I change the order of the images before converting?",
    answer: "Yes, you can freely reorder the images you've added before running the conversion. The final PDF follows the order you set.",
  },
  {
    question: "What happens if my images are very large or high resolution?",
    answer: "Very large images are automatically resized before being placed into the PDF, to avoid slowdowns and keep the final file a reasonable size while preserving good visual quality.",
  },
  {
    question: "Can I convert images from my phone or tablet?",
    answer: "Yes, the tool works on mobile and tablet in any modern browser. Adding images uses your device's file picker instead of drag-and-drop.",
  },
  {
    question: "What image formats are accepted?",
    answer: "The tool accepts JPG (JPEG) and PNG images.",
  },
];

export const jpgToPdfSummary = {
  text: "Converting images to PDF with FileoPDF takes no account and no install. Your images are assembled right in your browser, in the order you choose, and the result is ready to download in seconds.",
};