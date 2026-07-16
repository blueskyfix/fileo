export type ToolStatus = "available" | "coming-soon";
export type ToolIcon =
  | "merge"
  | "split"
  | "remove-pages"
  | "jpg-to-pdf"
  | "pdf-to-jpg"
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
    name: "Merge PDF",
    description:
      "Fusionnez plusieurs fichiers PDF en un seul, dans l'ordre de votre choix.",
    href: "/pdf/merge-pdf",
    status: "available",
    icon: "merge",
  },
  {
    slug: "jpg-to-pdf",
    name: "JPG to PDF",
    description:
      "Convertissez vos images JPG ou PNG en un seul fichier PDF.",
    href: "/pdf/jpg-to-pdf",
    status: "available",
    icon: "jpg-to-pdf",
  },
  {
    slug: "pdf-to-jpg",
    name: "PDF to JPG",
    description:
      "Convertissez les pages d'un PDF en images JPG, individuellement ou en une seule fois.",
    href: "/pdf/pdf-to-jpg",
    status: "available",
    icon: "pdf-to-jpg",
  },
  {
    slug: "split-pdf",
    name: "Split PDF",
    description: "Extrayez des pages ou divisez un PDF en plusieurs fichiers.",
    href: "/pdf/split-pdf",
    status: "available",
    icon: "split",
  },
  {
    slug: "pdf-to-word",
    name: "PDF to Word",
    description:
      "Convertissez votre PDF en document Word éditable.",
    href: "/pdf/pdf-to-word",
    status: "coming-soon",
    icon: "pdf-to-word",
  },
  {
    slug: "remove-pages",
    name: "Remove Pages",
    description:
      "Supprimez des pages spécifiques d'un PDF sans le retraiter entièrement.",
    href: "/pdf/remove-pages",
    status: "coming-soon",
    icon: "remove-pages",
  },
];