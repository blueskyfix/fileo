import type { ContentItem, FaqItem, HowItWorksStep } from "@/features/pdf/shared/types";

export const compressImageMeta = {
  metaTitle: "Compresser une image (JPEG, PNG, WebP) — Gratuit et local",
  metaDescription:
    "Réduisez le poids de vos images JPEG, PNG et WebP directement dans votre navigateur. Aucun envoi sur un serveur, traitement par lot, téléchargement en ZIP.",
  ogTitle: "Compresser une image (JPEG, PNG, WebP) — Gratuit et local",
  ogDescription:
    "Réduisez le poids de vos images JPEG, PNG et WebP directement dans votre navigateur. Aucun envoi sur un serveur, traitement par lot, téléchargement en ZIP.",
  canonicalSlug: "/image/compress-image",
};

export const compressImageHero = {
  title: "Compresser une image",
  description:
    "Réduisez le poids de vos photos et images sans perte de qualité visible. Glissez plusieurs fichiers, ajustez la qualité, téléchargez le résultat en un clic.",
  highlights: [
    "100% local — vos images ne quittent jamais votre appareil",
    "JPEG, PNG et WebP pris en charge",
    "Traitement par lot avec export ZIP",
  ],
};

// ⚠️ DÉDUIT — forme non confirmée, TrustBlock non consommé dans page.tsx actuellement (cf. merge-pdf/remove-pages).
export const compressImageTrustBlock = {
  items: ["Sans inscription", "Sans limite de fichiers", "Gratuit"],
};

export const compressImageHowItWorks: HowItWorksStep[] = [
  {
    title: "Déposez vos images",
    description: "Glissez un ou plusieurs fichiers JPEG, PNG ou WebP, ou sélectionnez-les depuis votre appareil.",
  },
  {
    title: "Ajustez la qualité",
    description: "Réglez le curseur de qualité selon le compromis poids / netteté souhaité.",
  },
  {
    title: "Téléchargez le résultat",
    description: "Récupérez vos images compressées individuellement ou toutes ensemble dans un ZIP.",
  },
];

export const compressImageBenefits: ContentItem[] = [
  {
    title: "Confidentialité totale",
    description: "La compression s'exécute dans votre navigateur, aucun fichier n'est envoyé à un serveur.",
  },
  {
    title: "Gain de poids immédiat",
    description: "Réduisez significativement la taille de vos fichiers pour l'envoi par e-mail ou le web.",
  },
  {
    title: "Traitement par lot",
    description: "Compressez plusieurs images en une seule fois et récupérez-les dans une archive ZIP.",
  },
];

export const compressImageUseCases: ContentItem[] = [
  {
    title: "Pièces jointes e-mail",
    description: "Passez sous la limite de poids imposée par votre messagerie sans changer de format.",
  },
  {
    title: "Optimisation pour le web",
    description: "Réduisez le poids des images de votre site pour améliorer les temps de chargement.",
  },
  {
    title: "Espace de stockage",
    description: "Libérez de l'espace sur votre appareil ou votre cloud en allégeant vos photos.",
  },
];

export const compressImageFaq: FaqItem[] = [
  {
    question: "Mes images sont-elles envoyées sur un serveur ?",
    answer:
      "Non. Toute la compression s'exécute localement dans votre navigateur, via un traitement d'image natif. Vos fichiers ne quittent jamais votre appareil.",
  },
  {
    question: "Quelle différence entre les formats de sortie ?",
    answer:
      "Le JPEG et le WebP acceptent un réglage de qualité progressif, ce qui permet un vrai compromis poids/netteté. Le PNG reste un format sans perte : la compression change son encodage mais ne réduit pas son poids aussi fortement que le JPEG ou le WebP.",
  },
  {
    question: "Puis-je compresser plusieurs images à la fois ?",
    answer:
      "Oui, déposez autant d'images que nécessaire. Une fois la compression terminée, téléchargez-les toutes en une seule archive ZIP.",
  },
  {
    question: "Y a-t-il une limite de fichiers ou de poids ?",
    answer: "Aucune limite artificielle n'est imposée. Elle dépend uniquement des capacités de votre appareil.",
  },
];

export const compressImageSummary = {
  text: "Compresser une image en ligne, gratuitement et sans inscription, avec un traitement 100% local dans le navigateur pour les formats JPEG, PNG et WebP.",
};