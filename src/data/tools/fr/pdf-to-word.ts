// src/data/tools/fr/pdf-to-word.ts
import type { ContentItem, FaqItem, HowItWorksStep } from "@/features/pdf/shared/types";

export const pdfToWordMeta = {
  metaTitle: "Convertir un PDF en Word gratuitement | FileoPDF",
  metaDescription:
    "Convertissez votre PDF en document Word modifiable en quelques secondes. Gratuit, sans compte, sans limite de conversions.",
  canonicalSlug: "/pdf/pdf-to-word",
  ogTitle: "Convertir un PDF en Word gratuitement",
  ogDescription:
    "Un PDF transformé en document Word modifiable, prêt à corriger ou compléter.",
};

export const pdfToWordHero = {
  title: "Convertir un PDF en Word",
  subtitle:
    "Transformez votre PDF en fichier Word modifiable, prêt à corriger ou compléter.",
};

const pdfToWordSteps: HowItWorksStep[] = [
  {
    title: "Déposez votre PDF",
    description: "Glissez votre fichier ou sélectionnez-le depuis votre appareil.",
  },
  {
    title: "Lancez la conversion",
    description: "Le document est analysé puis reconstruit au format Word.",
  },
  {
    title: "Téléchargez le résultat",
    description: "Récupérez votre fichier .docx prêt à modifier dans Word.",
  },
];

export const pdfToWordHowItWorks = {
  title: "Comment convertir un PDF en Word",
  steps: pdfToWordSteps,
};

const pdfToWordBenefitsItems: ContentItem[] = [
  {
    title: "Texte modifiable immédiatement",
    description: "Corrigez, complétez ou réutilisez le contenu sans tout retaper.",
  },
  {
    title: "Mise en page respectée",
    description: "Paragraphes, titres et hiérarchie du texte sont reconstruits fidèlement.",
  },
  {
    title: "Rapide et sans compte",
    description: "Aucune création de compte, aucune limite quotidienne de conversions.",
  },
];

export const pdfToWordBenefits = {
  title: "Pourquoi convertir votre PDF avec FileoPDF",
  intro: "Un document Word prêt à l'emploi, sans étape superflue.",
  items: pdfToWordBenefitsItems,
};

const pdfToWordUseCasesItems: ContentItem[] = [
  {
    title: "Réviser un rapport reçu en PDF",
    description: "Passez directement à la correction sans ressaisir le contenu.",
  },
  {
    title: "Réutiliser un ancien document",
    description: "Récupérez un texte figé en PDF pour le mettre à jour dans Word.",
  },
  {
    title: "Adapter un modèle existant",
    description: "Modifiez un contrat, un CV ou un modèle de lettre reçu en PDF.",
  },
];

export const pdfToWordUseCases = {
  title: "Cas d'usage courants",
  intro: "Quelques situations où cet outil fait gagner du temps.",
  cases: pdfToWordUseCasesItems,
};

export const pdfToWordFaq: FaqItem[] = [
  {
    question: "Le résultat est-il identique au PDF d'origine ?",
    answer:
      "Le texte, les titres et les paragraphes sont reconstruits fidèlement sur des documents texte classiques. Une mise en page très complexe, comme des colonnes multiples ou des tableaux imbriqués, peut nécessiter quelques ajustements manuels dans Word.",
  },
  {
    question: "Mon fichier est-il conservé après la conversion ?",
    answer:
      "Non. Le fichier est supprimé du service de conversion une fois le document Word généré.",
  },
  {
    question: "Y a-t-il une limite de taille ou de nombre de conversions ?",
    answer:
      "Les fichiers très volumineux peuvent être refusés au-delà d'une certaine taille. En cas de forte affluence, l'outil peut temporairement demander de réessayer un peu plus tard.",
  },
  {
    question: "Puis-je convertir un PDF scanné, comme une image ?",
    answer:
      "Cet outil est optimisé pour les PDF contenant du texte natif. Un document scanné sous forme d'image peut donner un résultat de moins bonne qualité.",
  },
];

export const pdfToWordSummary = {
  text: "Convertissez gratuitement votre PDF en document Word modifiable, sans compte ni limite de conversions.",
};