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
  },
  {
    slug: "jpg-to-pdf",
    name: "JPG vers PDF",
    description:
      "Convertissez vos images JPG ou PNG en un seul fichier PDF.",
    href: "/pdf/jpg-to-pdf",
    status: "available",
    icon: "jpg-to-pdf",
  },
  {
    slug: "pdf-to-jpg",
    name: "PDF vers JPG",
    description:
      "Convertissez les pages d'un PDF en images JPG, individuellement ou en une seule fois.",
    href: "/pdf/pdf-to-jpg",
    status: "available",
    icon: "pdf-to-jpg",
  },
  {
    slug: "split-pdf",
    name: "Diviser un PDF",
    description: "Extrayez des pages ou divisez un PDF en plusieurs fichiers.",
    href: "/pdf/split-pdf",
    status: "available",
    icon: "split",
  },
  {
    slug: "pdf-to-word",
    name: "PDF vers Word",
    description: "Convertissez votre PDF en document Word éditable.",
    href: "/pdf/pdf-to-word",
    status: "coming-soon",
    icon: "pdf-to-word",
  },
  {
    slug: "remove-pages",
    name: "Supprimer des pages PDF",
    description:
      "Supprimez des pages spécifiques d'un PDF sans le retraiter entièrement.",
    href: "/pdf/remove-pages",
    status: "available",
    icon: "remove-pages",
  },
  {
    slug: "rotate-pdf",
    name: "Rotate PDF",
    description: "Faites pivoter les pages de votre PDF, à 90°, 180° ou 270°.",
    href: "/pdf/rotate-pdf",
    status: "coming-soon", 
    icon: "rotate-pdf",
  },
];