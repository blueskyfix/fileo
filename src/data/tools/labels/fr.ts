import type { ToolLabel } from "@/data/tools/tools";

/**
 * name/description traduits par outil, indexés par slug.
 * Séparé de tools.ts (structure/routing) pour permettre un chargement
 * ciblé par locale sans dupliquer la structure de navigation.
 */
export const toolLabelsFr: Record<string, ToolLabel> = {
  "merge-pdf": {
    name: "Fusionner des PDF",
    description:
      "Fusionnez plusieurs fichiers PDF en un seul, dans l'ordre de votre choix.",
  },
  "split-pdf": {
    name: "Diviser un PDF",
    description: "Extrayez des pages ou divisez un PDF en plusieurs fichiers.",
  },
  "jpg-to-pdf": {
    name: "JPG vers PDF",
    description: "Convertissez vos images JPG ou PNG en un seul fichier PDF.",
  },
  "pdf-to-jpg": {
    name: "PDF vers JPG",
    description:
      "Convertissez les pages d'un PDF en images JPG, individuellement ou en une seule fois.",
  },
  "pdf-to-word": {
    name: "PDF vers Word",
    description: "Convertissez votre PDF en document Word éditable.",
  },
  "remove-pages": {
    name: "Supprimer des pages PDF",
    description:
      "Supprimez des pages spécifiques d'un PDF sans le retraiter entièrement.",
  },
  "rotate-pdf": {
    name: "Rotate PDF",
    description: "Faites pivoter les pages de votre PDF, à 90°, 180° ou 270°.",
  },
  "compress-image": {
    name: "Compresser une image",
    description:
      "Réduisez le poids de vos images JPEG, PNG et WebP sans perte de qualité visible.",
  },
  "word-to-pdf": {
    name: "Word vers PDF",
    description:
      "Convertissez votre document Word (.docx) en PDF, directement dans votre navigateur.",
  },
};