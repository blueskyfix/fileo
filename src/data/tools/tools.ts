import type { LucideIcon } from "lucide-react";
import {
  FileStack,
  Scissors,
  FileMinus,
  FileImage,
  Image as ImageIcon,
  FileType,
  RotateCw,
  Minimize2,
  FileUp,
  File as FileFallbackIcon,
} from "lucide-react";

export type ToolStatus = "available" | "coming-soon";
export type ToolIcon =
  | "merge"
  | "split"
  | "remove-pages"
  | "jpg-to-pdf"
  | "pdf-to-jpg"
  | "rotate-pdf"
  | "pdf-to-word"
  | "compress-image"
  | "word-to-pdf";

/** Format de fichier traité par l'outil — pilote le regroupement futur (hub /image, /word, nav). */
export type ToolMediaType = "pdf" | "image" | "word";

/**
 * Catégorie fonctionnelle d'un outil, utilisée pour organiser navbar/footer.
 * "main" = outils principaux, toujours visibles directement (pas en dropdown).
 */
export type ToolCategory = "main" | "convert" | "organize";

export const toolCategoryLabels: Record<ToolCategory, string> = {
  main: "Principaux",
  convert: "Convertir",
  organize: "Organiser",
};

export interface Tool {
  slug: string;
  name: string;
  description: string;
  href: string;
  status: ToolStatus;
  icon: ToolIcon;
  category: ToolCategory;
  mediaType: ToolMediaType;
  /** Slugs suggérés en "Voir aussi", dans l'ordre de préférence. */
  relatedSlugs?: string[];
}

/**
 * Source unique de vérité pour tous les outils, tous formats confondus.
 * Utiliser `pdfTools` / `imageTools` / `wordTools` pour les vues filtrées par format.
 */
export const tools: Tool[] = [
  {
    slug: "merge-pdf",
    name: "Fusionner des PDF",
    description:
      "Fusionnez plusieurs fichiers PDF en un seul, dans l'ordre de votre choix.",
    href: "/pdf/merge-pdf",
    status: "available",
    icon: "merge",
    category: "main",
    mediaType: "pdf",
    relatedSlugs: ["split-pdf", "remove-pages"],
  },
  {
    slug: "split-pdf",
    name: "Diviser un PDF",
    description: "Extrayez des pages ou divisez un PDF en plusieurs fichiers.",
    href: "/pdf/split-pdf",
    status: "available",
    icon: "split",
    category: "main",
    mediaType: "pdf",
    relatedSlugs: ["remove-pages", "merge-pdf"],
  },
  {
    slug: "jpg-to-pdf",
    name: "JPG vers PDF",
    description:
      "Convertissez vos images JPG ou PNG en un seul fichier PDF.",
    href: "/pdf/jpg-to-pdf",
    status: "available",
    icon: "jpg-to-pdf",
    category: "convert",
    mediaType: "pdf",
    relatedSlugs: ["pdf-to-jpg", "merge-pdf"],
  },
  {
    slug: "pdf-to-jpg",
    name: "PDF vers JPG",
    description:
      "Convertissez les pages d'un PDF en images JPG, individuellement ou en une seule fois.",
    href: "/pdf/pdf-to-jpg",
    status: "available",
    icon: "pdf-to-jpg",
    category: "convert",
    mediaType: "pdf",
    relatedSlugs: ["jpg-to-pdf", "split-pdf"],
  },
  {
    slug: "pdf-to-word",
    name: "PDF vers Word",
    description: "Convertissez votre PDF en document Word éditable.",
    href: "/pdf/pdf-to-word",
    status: "coming-soon",
    icon: "pdf-to-word",
    category: "convert",
    mediaType: "pdf",
    relatedSlugs: ["merge-pdf", "pdf-to-jpg"],
  },
  {
    slug: "remove-pages",
    name: "Supprimer des pages PDF",
    description:
      "Supprimez des pages spécifiques d'un PDF sans le retraiter entièrement.",
    href: "/pdf/remove-pages",
    status: "available",
    icon: "remove-pages",
    category: "organize",
    mediaType: "pdf",
    relatedSlugs: ["split-pdf", "merge-pdf"],
  },
  {
    slug: "rotate-pdf",
    name: "Rotate PDF",
    description: "Faites pivoter les pages de votre PDF, à 90°, 180° ou 270°.",
    href: "/pdf/rotate-pdf",
    status: "available",
    icon: "rotate-pdf",
    category: "organize",
    mediaType: "pdf",
    relatedSlugs: ["merge-pdf", "split-pdf"],
  },
  {
    slug: "compress-image",
    name: "Compresser une image",
    description:
      "Réduisez le poids de vos images JPEG, PNG et WebP sans perte de qualité visible.",
    href: "/image/compress-image",
    status: "available",
    icon: "compress-image",
    category: "main",
    mediaType: "image",
    relatedSlugs: ["jpg-to-pdf", "pdf-to-jpg"],
  },
  {
    slug: "word-to-pdf",
    name: "Word vers PDF",
    description:
      "Convertissez votre document Word (.docx) en PDF, directement dans votre navigateur.",
    href: "/word/word-to-pdf",
    status: "coming-soon",
    icon: "word-to-pdf",
    category: "convert",
    mediaType: "word",
    relatedSlugs: ["pdf-to-word", "merge-pdf"],
  },
];

/** Vue filtrée : outils PDF uniquement (usage historique, ex. hub /pdf, hero-preview). */
export const pdfTools: Tool[] = tools.filter((tool) => tool.mediaType === "pdf");

/** Vue filtrée : outils image uniquement (ex. hub /image). */
export const imageTools: Tool[] = tools.filter((tool) => tool.mediaType === "image");

/** Vue filtrée : outils Word uniquement (ex. hub /word). */
export const wordTools: Tool[] = tools.filter((tool) => tool.mediaType === "word");

/**
 * Source unique de vérité pour la résolution icône ToolIcon -> composant Lucide.
 * Remplace tout iconMap local (ex: ancien workaround dans hero-preview.tsx).
 */
const iconMap: Record<ToolIcon, LucideIcon> = {
  merge: FileStack,
  split: Scissors,
  "remove-pages": FileMinus,
  "jpg-to-pdf": FileImage,
  "pdf-to-jpg": ImageIcon,
  "pdf-to-word": FileType,
  "rotate-pdf": RotateCw,
  "compress-image": Minimize2,
  "word-to-pdf": FileUp,
};

/**
 * Résout un ToolIcon vers son composant Lucide.
 * Fallback + warning dev si une valeur ToolIcon n'a pas (encore) d'entrée dans iconMap.
 */
export function getToolIcon(icon: ToolIcon): LucideIcon {
  const resolved = iconMap[icon];
  if (!resolved) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[getToolIcon] Aucune icône mappée pour "${icon}", fallback utilisé.`);
    }
    return FileFallbackIcon;
  }
  return resolved;
}

/**
 * Retourne les outils "available" d'une catégorie donnée, dans l'ordre du tableau.
 */
export function getToolsByCategory(category: ToolCategory, onlyAvailable = true): Tool[] {
  return tools.filter(
    (tool) => tool.category === category && (!onlyAvailable || tool.status === "available")
  );
}

/**
 * Retourne `count` outils liés à `currentSlug`, basé sur `relatedSlugs`.
 * Fallback : si `relatedSlugs` absent/insuffisant, complète avec les autres
 * outils "available" (ordre du tableau), puis "coming-soon" si besoin.
 */
export function getRelatedTools(currentSlug: string, count = 2) {
  const current = tools.find((tool) => tool.slug === currentSlug);
  const others = tools.filter((tool) => tool.slug !== currentSlug);

  const bySlug = new Map(others.map((tool) => [tool.slug, tool]));
  const preferred = (current?.relatedSlugs ?? [])
    .map((slug) => bySlug.get(slug))
    .filter((tool): tool is Tool => Boolean(tool));

  const remaining = others.filter((tool) => !preferred.includes(tool));
  const available = remaining.filter((tool) => tool.status === "available");
  const comingSoon = remaining.filter((tool) => tool.status === "coming-soon");

  const result = [...preferred, ...available, ...comingSoon].slice(0, count);

  return result.map((tool) => ({
    name: tool.name,
    description: tool.description,
    href: tool.href,
    icon: getToolIcon(tool.icon),
  }));
}