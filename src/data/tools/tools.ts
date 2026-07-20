import type { LucideIcon } from "lucide-react";
import {
  Merge,
  Split,
  FileMinus2,
  FileImage,
  ImagePlus,
  RotateCw,
  FileType2,
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
  | "pdf-to-word";

export interface Tool {
  slug: string;
  name: string;
  description: string;
  href: string;
  status: ToolStatus;
  icon: ToolIcon;
  /** Slugs suggérés en "Voir aussi", dans l'ordre de préférence. */
  relatedSlugs?: string[];
}

export const pdfTools: Tool[] = [
  {
    slug: "merge-pdf",
    name: "Fusionner des PDF",
    description:
      "Fusionnez plusieurs fichiers PDF en un seul, dans l'ordre de votre choix.",
    href: "/pdf/merge-pdf",
    status: "available",
    icon: "merge",
    relatedSlugs: ["split-pdf", "remove-pages"],
  },
  {
    slug: "jpg-to-pdf",
    name: "JPG vers PDF",
    description:
      "Convertissez vos images JPG ou PNG en un seul fichier PDF.",
    href: "/pdf/jpg-to-pdf",
    status: "available",
    icon: "jpg-to-pdf",
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
    relatedSlugs: ["jpg-to-pdf", "split-pdf"],
  },
  {
    slug: "split-pdf",
    name: "Diviser un PDF",
    description: "Extrayez des pages ou divisez un PDF en plusieurs fichiers.",
    href: "/pdf/split-pdf",
    status: "available",
    icon: "split",
    relatedSlugs: ["remove-pages", "merge-pdf"],
  },
  {
    slug: "pdf-to-word",
    name: "PDF vers Word",
    description: "Convertissez votre PDF en document Word éditable.",
    href: "/pdf/pdf-to-word",
    status: "coming-soon",
    icon: "pdf-to-word",
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
    relatedSlugs: ["split-pdf", "merge-pdf"],
  },
  {
    slug: "rotate-pdf",
    name: "Rotate PDF",
    description: "Faites pivoter les pages de votre PDF, à 90°, 180° ou 270°.",
    href: "/pdf/rotate-pdf",
    status: "coming-soon",
    icon: "rotate-pdf",
    relatedSlugs: ["merge-pdf", "split-pdf"],
  },
];

/**
 * Source unique de vérité pour la résolution icône ToolIcon -> composant Lucide.
 * Remplace tout iconMap local (ex: ancien workaround dans hero-preview.tsx).
 */
const iconMap: Record<ToolIcon, LucideIcon> = {
  merge: Merge,
  split: Split,
  "remove-pages": FileMinus2,
  "jpg-to-pdf": ImagePlus,
  "pdf-to-jpg": FileImage,
  "rotate-pdf": RotateCw,
  "pdf-to-word": FileType2,
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
 * Retourne `count` outils liés à `currentSlug`, basé sur `relatedSlugs`.
 * Fallback : si `relatedSlugs` absent/insuffisant, complète avec les autres
 * outils "available" (ordre du tableau), puis "coming-soon" si besoin.
 */
export function getRelatedTools(currentSlug: string, count = 2) {
  const current = pdfTools.find((tool) => tool.slug === currentSlug);
  const others = pdfTools.filter((tool) => tool.slug !== currentSlug);

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