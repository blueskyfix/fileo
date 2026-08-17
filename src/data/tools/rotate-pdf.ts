import type { ContentItem, FaqItem } from "@/features/pdf/shared/types";

export const rotatePdfMeta = {
  metaTitle: "Rotate PDF gratuit — Pivoter les pages d'un PDF en ligne | FileoPDF",
  metaDescription:
    "Faites pivoter les pages de votre PDF à 90°, 180° ou 270°, gratuitement et sans compte. Traitement 100% local dans votre navigateur.",
  ogTitle: "Rotate PDF gratuit — Pivoter les pages d'un PDF en ligne | FileoPDF",
  ogDescription:
    "Faites pivoter les pages de votre PDF à 90°, 180° ou 270°, gratuitement et sans compte. Traitement 100% local dans votre navigateur.",
  canonicalSlug: "/pdf/rotate-pdf",
};

export const rotatePdfHero = {
  title: "Rotate PDF",
  description:
    "Corrigez l'orientation de vos pages PDF en quelques clics. Aucun envoi sur un serveur, tout se passe dans votre navigateur.",
  highlights: [
    "Rotation page par page ou en un clic",
    "Aucune limite de taille de fichier",
    "100% gratuit, sans compte",
  ],
};

export const rotatePdfHowItWorks: ContentItem[] = [
  { title: "Déposez votre PDF", description: "Glissez-déposez ou sélectionnez votre fichier." },
  { title: "Choisissez la rotation", description: "Pivotez les pages individuellement ou toutes en même temps." },
  { title: "Téléchargez", description: "Récupérez votre PDF corrigé en un clic." },
];

export const rotatePdfBenefits: ContentItem[] = [
  { title: "Traitement local", description: "Votre fichier ne quitte jamais votre appareil." },
  { title: "Rapide", description: "Rotation appliquée en quelques secondes." },
  { title: "Sans watermark", description: "Aucune marque ajoutée à votre document." },
];

export const rotatePdfUseCases: ContentItem[] = [
  { title: "Documents scannés", description: "Corrigez l'orientation de pages scannées à l'envers." },
  { title: "Photos importées en PDF", description: "Repositionnez des pages issues de photos prises en portrait/paysage." },
];

export const rotatePdfFaq: FaqItem[] = [
  { question: "Mes fichiers sont-ils envoyés sur un serveur ?", answer: "Non, tout le traitement se fait localement dans votre navigateur." },
  { question: "Puis-je pivoter une seule page ?", answer: "Oui, chaque page peut être pivotée individuellement." },
];

export const rotatePdfSummary = {
  text: "Rotate PDF vous permet de pivoter les pages de vos documents PDF directement dans votre navigateur, gratuitement et sans limite.",
};