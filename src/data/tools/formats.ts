// Accents de format (identité v2.0, section 5) : identifiants visuels
// secondaires. Ils ne remplacent jamais la palette de marque ; si on les
// retire, l'interface doit rester cohérente et lisible.

export type FileFormat = "pdf" | "word" | "excel" | "ppt" | "image" | "other";

export const formatColor: Record<FileFormat, string> = {
  pdf: "var(--fmt-pdf)",
  word: "var(--fmt-word)",
  excel: "var(--fmt-excel)",
  ppt: "var(--fmt-ppt)",
  image: "var(--fmt-image)",
  other: "var(--fmt-other)",
};

const tagFormat: Record<string, FileFormat> = {
  PDF: "pdf",
  DOCX: "word",
  XLSX: "excel",
  PPTX: "ppt",
  JPG: "image",
  PNG: "image",
  WEBP: "image",
};

/** Format principal (couleur du liseré et de l'icône) et formats manipulés. */
const toolFormats: Record<string, { accent: FileFormat; tags: string[] }> = {
  "merge-pdf": { accent: "pdf", tags: ["PDF"] },
  "split-pdf": { accent: "pdf", tags: ["PDF"] },
  "remove-pages": { accent: "pdf", tags: ["PDF"] },
  "rotate-pdf": { accent: "pdf", tags: ["PDF"] },
  "pdf-to-jpg": { accent: "pdf", tags: ["PDF", "JPG"] },
  "pdf-to-word": { accent: "pdf", tags: ["PDF", "DOCX"] },
  "jpg-to-pdf": { accent: "image", tags: ["JPG", "PDF"] },
  "word-to-pdf": { accent: "word", tags: ["DOCX", "PDF"] },
  "compress-image": { accent: "image", tags: ["JPG", "PNG", "WEBP"] },
};

export function getToolFormat(slug: string) {
  const entry = toolFormats[slug] ?? { accent: "other" as const, tags: [] };
  return {
    color: formatColor[entry.accent],
    tags: entry.tags.map((tag) => ({ label: tag, color: formatColor[tagFormat[tag] ?? "other"] })),
  };
}

/** Fond teinté à 12 % de la couleur du format (icônes, badges). */
export function formatTint(color: string) {
  return `color-mix(in srgb, ${color} 12%, transparent)`;
}
