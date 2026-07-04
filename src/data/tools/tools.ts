export type ToolStatus = "available" | "coming-soon";
export type ToolIcon = "merge" | "split" | "remove-pages";

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
    slug: "split-pdf",
    name: "Split PDF",
    description: "Extrayez des pages ou divisez un PDF en plusieurs fichiers.",
    href: "/pdf/split-pdf",
    status: "coming-soon",
    icon: "split",
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