import type { ContentItem, FaqItem } from "@/features/pdf/shared/types";

export const compressImageMeta = {
  metaTitle: "Compress an image online, free, no sign-up",
  metaDescription:
    "Shrink your JPEG, PNG, and WebP images right in your browser. Your files are never uploaded to a server. Free, fast, no account needed.",
  ogTitle: "Compress an image — processed locally, nothing uploaded",
  ogDescription:
    "Reduce the size of your JPEG, PNG, or WebP photos and images, one at a time or in bulk. It all happens right in your browser.",
  canonicalSlug: "/image/compress-image",
};

export const compressImageHero = {
  eyebrow: "Image Tool",
  title: "Compress an image",
  subtitle:
    "Add your JPEG, PNG, or WebP images, set the quality level you want, then download the smaller files. Everything runs in your browser — your images are never sent to a server to be compressed.",
};

export const compressImageTrustBlock: { title: string; intro: string; points: ContentItem[] } = {
  title: "Your images stay on your device",
  intro:
    "Compression happens right in your browser, using your own device's processing power. Your images are never sent to a server to be reduced.",
  points: [
    {
      title: "Local compression",
      description:
        "Each image is shrunk directly in your browser — none of it touches our servers.",
    },
    {
      title: "No file is stored",
      description:
        "FileoPDF doesn't keep a copy of your images: nothing is queued or archived server-side.",
    },
    {
      title: "Close the tab, it's gone",
      description:
        "Once you close the tab or reload the page, the loaded images and the compressed files are no longer accessible anywhere.",
    },
  ],
};

export const compressImageHowItWorks: { title: string; intro: string; steps: ContentItem[] } = {
  title: "How to compress an image with FileoPDF",
  intro:
    "Three steps are all it takes to shrink one or several images, with nothing to install.",
  steps: [
    {
      title: "1. Add your images",
      description:
        "Drag and drop your JPEG, PNG, or WebP files, or pick them from your device. Add several at once if you need to.",
    },
    {
      title: "2. Set the quality",
      description:
        "Adjust the quality slider to the balance you want between file size and visual sharpness.",
    },
    {
      title: "3. Download the result",
      description:
        "A single image downloads right away; multiple images are bundled into a ZIP archive.",
    },
  ],
};

export const compressImageBenefits: { title: string; intro: string; items: ContentItem[] } = {
  title: "Why use FileoPDF's Compress Image tool",
  intro: "Shrinking an image shouldn't require dedicated software or a new account.",
  items: [
    {
      title: "Three formats supported",
      description: "JPEG, PNG, and WebP are all supported, with a quality setting tuned to each format.",
    },
    {
      title: "No sign-up",
      description: "The tool works right away, with no account to create and no email address to hand over.",
    },
    {
      title: "Batch processing",
      description: "Compress several images at once and get them back bundled into a ZIP.",
    },
    {
      title: "Quality control",
      description: "A simple slider lets you adjust the balance between file size and visual sharpness.",
    },
    {
      title: "Local processing",
      description: "Compression runs in your browser rather than on a remote server, which limits your images' exposure.",
    },
    {
      title: "Free, no artificial limits",
      description: "No hidden paywall for a basic feature like compressing images.",
    },
  ],
};

export const compressImageUseCases: { title: string; intro: string; cases: ContentItem[] } = {
  title: "When to use Compress Image",
  intro: "A few real situations where shrinking an image makes things easier.",
  cases: [
    {
      title: "Fit under an email attachment limit",
      description: "Shrink a photo to fit your email provider's size limit, without changing its format.",
    },
    {
      title: "Optimize images for a website",
      description: "Lighten a site's visuals to improve load times, without sacrificing perceived quality.",
    },
    {
      title: "Free up storage space",
      description: "Shrink large photos before archiving them on a device or a cloud service.",
    },
    {
      title: "Prepare visuals for social media",
      description: "Compress images before posting to speed up uploads, with no visible loss of quality.",
    },
    {
      title: "Send photos quickly",
      description: "Shrink a batch of photos before a transfer or a share on a size-limited service.",
    },
  ],
};

export const compressImageFaq: FaqItem[] = [
  {
    question: "Are my images uploaded to a server to be compressed?",
    answer: "No. Compression runs entirely in your browser — your images are never sent to a server. The smaller files are generated locally, on your device.",
  },
  {
    question: "Is FileoPDF's Compress Image tool really free?",
    answer: "Yes. Compressing images is free and doesn't require any sign-up or personal information.",
  },
  {
    question: "What's the difference between the output formats?",
    answer: "JPEG and WebP support a progressive quality setting, which gives a real trade-off between size and sharpness. PNG stays a lossless format: compression changes its encoding but shrinks it less than JPEG or WebP.",
  },
  {
    question: "Can I compress several images at once?",
    answer: "Yes, you can add as many images as you need and compress them in a single operation. The result is bundled into a ZIP archive.",
  },
  {
    question: "How are the compressed images downloaded?",
    answer: "If you compress a single image, it downloads directly. If you process several, they're automatically bundled into a ZIP archive.",
  },
  {
    question: "Is there a limit on the number or size of files?",
    answer: "No artificial limit is enforced. The practical limit mostly depends on your device's memory and processing power.",
  },
  {
    question: "Can I compress images from my phone or tablet?",
    answer: "Yes, the tool works on mobile and tablet in any modern browser. Adding images uses your device's file picker instead of drag-and-drop.",
  },
  {
    question: "Does compression visibly degrade my images?",
    answer: "At a moderate quality level, the loss is generally imperceptible to the naked eye. The quality slider lets you adjust that trade-off to your needs.",
  },
];

export const compressImageSummary = {
  text: "Compressing an image with FileoPDF takes no account and no install. Shrink your JPEG, PNG, or WebP files right in your browser, one at a time or in bulk, with a direct download or a ZIP bundle.",
};