// src/data/tools/fr/word-to-pdf.ts
import type { ContentItem, FaqItem, HowItWorksStep } from "@/features/pdf/shared/types";

export const wordToPdfMeta = {
  metaTitle: "Convertir un Word en PDF gratuitement | FileoPDF",
  metaDescription:
    "Convertissez votre document Word en PDF en quelques secondes, mise en page conservée. Gratuit, sans compte, sans limite.",
  canonicalSlug: "/word/word-to-pdf",
  ogTitle: "Convertir un Word en PDF gratuitement",
  ogDescription:
    "Un document Word transformé en PDF prêt à partager, avec sa mise en forme d'origine.",
};

export const wordToPdfHero = {
  title: "Convertir un Word en PDF",
  subtitle:
    "Transformez votre document Word en PDF, prêt à partager ou archiver, mise en page conservée.",
};

const wordToPdfSteps: HowItWorksStep[] = [
  {
    title: "Déposez votre document Word",
    description: "Glissez votre fichier .docx ou sélectionnez-le depuis votre appareil.",
  },
  {
    title: "Lancez la conversion",
    description: "Le document est converti en conservant sa mise en forme d'origine.",
  },
  {
    title: "Téléchargez le PDF",
    description: "Récupérez votre fichier PDF, prêt à envoyer ou imprimer.",
  },
];

export const wordToPdfHowItWorks = {
  title: "Comment convertir un Word en PDF",
  steps: wordToPdfSteps,
};

const wordToPdfBenefitsItems: ContentItem[] = [
  {
    title: "Mise en page fidèle",
    description: "Couleurs, tableaux et mise en forme sont conservés dans le PDF final.",
  },
  {
    title: "Prêt à partager",
    description: "Un PDF stable, identique quel que soit l'appareil qui l'ouvre.",
  },
  {
    title: "Rapide et sans compte",
    description: "Aucune création de compte, aucune limite quotidienne de conversions.",
  },
];

export const wordToPdfBenefits = {
  title: "Pourquoi convertir votre Word avec FileoPDF",
  intro: "Un PDF fidèle à votre document d'origine, sans étape superflue.",
  items: wordToPdfBenefitsItems,
};

const wordToPdfUseCasesItems: ContentItem[] = [
  {
    title: "Envoyer un document figé",
    description: "Partagez un rapport ou une proposition sans risque de modification.",
  },
  {
    title: "Archiver un document final",
    description: "Conservez une version PDF stable d'un document Word validé.",
  },
  {
    title: "Préparer un document à imprimer",
    description: "Obtenez un rendu PDF fidèle avant impression, sans surprise de mise en page.",
  },
];

export const wordToPdfUseCases = {
  title: "Cas d'usage courants",
  intro: "Quelques situations où cet outil fait gagner du temps.",
  cases: wordToPdfUseCasesItems,
};

export const wordToPdfFaq: FaqItem[] = [
  {
    question: "La mise en page de mon document est-elle conservée ?",
    answer:
      "Oui. Couleurs, tableaux, images et mise en forme sont reconstruits fidèlement dans le PDF final, y compris sur des documents avec une identité visuelle marquée.",
  },
  {
    question: "Mon fichier est-il conservé après la conversion ?",
    answer:
      "Non. Le fichier est supprimé du service de conversion une fois le PDF généré.",
  },
  {
    question: "Y a-t-il une limite de taille ou de nombre de conversions ?",
    answer:
      "Les fichiers très volumineux peuvent être refusés au-delà d'une certaine taille. En cas de forte affluence, l'outil peut temporairement demander de réessayer un peu plus tard.",
  },
  {
    question: "Quels formats de fichier sont acceptés ?",
    answer:
      "Cet outil accepte les fichiers .docx (Word 2007 et versions ultérieures). Les anciens fichiers .doc doivent d'abord être enregistrés au format .docx.",
  },
];

export const wordToPdfSummary = {
  text: "Convertissez gratuitement votre document Word en PDF, mise en page conservée, sans compte ni limite de conversions.",
};