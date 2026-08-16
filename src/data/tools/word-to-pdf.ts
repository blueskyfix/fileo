import { siteConfig } from "@/core/config/site";
import type { FaqItem, HowItWorksStep, ContentItem } from "@/features/pdf/shared/types";

export const wordToPdfMeta = {
  title: "Convertir Word en PDF gratuitement | FileoPDF",
  description:
    "Convertissez vos documents Word (.docx) en PDF directement dans votre navigateur. Gratuit, sans compte, sans upload — 100% local.",
  canonicalSlug: "/word/word-to-pdf",
};

export const wordToPdfHero = {
  title: "Convertir Word en PDF",
  description:
    "Transformez votre document Word en PDF en un clic. Tout se passe dans votre navigateur — aucun fichier n'est envoyé sur un serveur.",
  highlights: [
    "Fichier .docx accepté",
    "Aucun compte requis",
    "Traitement 100% local",
  ],
};

export const wordToPdfHowItWorks: HowItWorksStep[] = [
  {
    title: "Déposez votre fichier Word",
    description: "Glissez votre document .docx ou cliquez pour le sélectionner.",
  },
  {
    title: "Lancez la conversion",
    description: "Le document est converti en PDF directement dans votre navigateur.",
  },
  {
    title: "Téléchargez le PDF",
    description: "Récupérez votre fichier PDF, prêt à partager ou imprimer.",
  },
];

export const wordToPdfBenefits: ContentItem[] = [
  {
    title: "Confidentialité totale",
    description: "Votre document ne quitte jamais votre appareil.",
  },
  {
    title: "Aucune limite d'usage",
    description: "Convertissez autant de fichiers que vous voulez, gratuitement.",
  },
  {
    title: "Rapide",
    description: "Pas d'attente serveur, la conversion se fait sur votre machine.",
  },
];

export const wordToPdfUseCases: ContentItem[] = [
  {
    title: "Envoyer un document figé",
    description: "Partagez un CV, une lettre ou un rapport sans risque de modification.",
  },
  {
    title: "Archiver un document",
    description: "Le PDF garantit un rendu identique dans le temps, indépendamment du logiciel.",
  },
];

export const wordToPdfFaq: FaqItem[] = [
  {
    question: "La mise en page est-elle parfaitement conservée ?",
    answer:
      "Les mises en page simples (texte, titres, listes, images) sont fidèlement converties. Les documents avec une mise en forme très complexe (colonnes multiples, en-têtes avancés) peuvent présenter de légères différences.",
  },
  {
    question: "Mon fichier est-il envoyé sur un serveur ?",
    answer:
      "Non. La conversion se fait entièrement dans votre navigateur — votre document ne quitte jamais votre ordinateur.",
  },
  {
    question: "Quels formats Word sont acceptés ?",
    answer: "Seul le format .docx (Word 2007 et versions ultérieures) est pris en charge.",
  },
];

export const wordToPdfSummary =
  "Cet outil convertit vos documents Word (.docx) en PDF directement dans votre navigateur, sans envoi de fichier sur un serveur.";