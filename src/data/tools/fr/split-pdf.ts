// data/tools/fr/split-pdf.ts
import type { ContentItem, FaqItem } from "@/features/pdf/shared/types";

export const splitPdfMeta = {
  metaTitle: "Diviser un PDF en toute confidentialité, sans inscription",
  metaDescription:
    "Extrayez ou divisez vos PDF confidentiels sans qu'ils quittent votre appareil. Traitement 100% local, gratuit, sans inscription.",
  ogTitle: "Diviser un PDF sans l'envoyer sur un serveur",
  ogDescription:
    "Extrayez ou séparez des pages d'un PDF directement dans votre navigateur. Rien n'est envoyé, rien n'est stocké.",
  canonicalSlug: "/pdf/split-pdf",
};

export const splitPdfHero = {
  eyebrow: "Outil PDF confidentiel",
  title: "Diviser un PDF sans l'exposer à un serveur externe",
  subtitle:
    "Extrayez ou séparez les pages d'un PDF directement dans votre navigateur. Aucun envoi de fichier, aucun stockage : une méthode adaptée aux contrats, dossiers RH ou documents médicaux que vous ne pouvez pas confier à un service tiers.",
};

export const splitPdfTrustBlock: { title: string; intro: string; points: ContentItem[] } = {
  title: "Votre PDF ne quitte jamais votre appareil",
  intro:
    "Le découpage se fait entièrement dans votre navigateur, avec la puissance de calcul de votre appareil. Aucune page, aucune donnée de votre document n'est transmise à un serveur pour être traitée.",
  points: [
    {
      title: "Traitement local",
      description:
        "L'extraction ou la division du document se fait dans votre navigateur, sans passer par nos serveurs.",
    },
    {
      title: "Aucun stockage de votre PDF",
      description:
        "Fileo ne conserve pas de copie de votre fichier : rien n'est mis en file d'attente ni archivé côté serveur.",
    },
    {
      title: "Fermez l'onglet, tout disparaît",
      description:
        "Une fois l'onglet fermé ou la page rechargée, le PDF chargé et les fichiers générés ne sont plus accessibles nulle part.",
    },
  ],
};

export const splitPdfHowItWorks: { title: string; intro: string; steps: ContentItem[] } = {
  title: "Comment diviser un PDF sans le transmettre à un tiers",
  intro:
    "Quatre étapes suffisent, toutes exécutées sur votre appareil, sans logiciel à installer.",
  steps: [
    {
      title: "1. Ajoutez votre fichier PDF",
      description:
        "Glissez-déposez votre fichier ou sélectionnez-le depuis votre appareil. Il reste local dès cet instant.",
    },
    {
      title: "2. Sélectionnez les pages",
      description:
        "Toutes les pages sont cochées par défaut. Décochez celles que vous ne souhaitez pas inclure.",
    },
    {
      title: "3. Choisissez le mode",
      description:
        "Extrayez la sélection en un seul PDF, ou divisez-la en fichiers séparés, un par page.",
    },
    {
      title: "4. Téléchargez le résultat",
      description:
        "Un seul fichier se télécharge directement ; plusieurs fichiers sont regroupés dans une archive ZIP, générée elle aussi dans votre navigateur.",
    },
  ],
};

export const splitPdfBenefits: { title: string; intro: string; items: ContentItem[] } = {
  title: "Pourquoi diviser vos PDF confidentiels avec Fileo",
  intro: "Un outil pensé pour les documents que vous ne pouvez pas exposer à un service cloud classique.",
  items: [
    {
      title: "Zéro upload",
      description: "Vos pages ne sont jamais téléversées sur un serveur, un point essentiel pour les documents sensibles.",
    },
    {
      title: "Deux modes en un seul outil",
      description: "Extraire une sélection en un document, ou diviser en fichiers séparés, selon votre besoin.",
    },
    {
      title: "Sélection visuelle des pages",
      description: "Un aperçu de chaque page permet de choisir précisément ce que vous voulez garder, sans deviner les numéros.",
    },
    {
      title: "Téléchargement groupé",
      description: "Les divisions multi-fichiers sont automatiquement regroupées dans une archive ZIP, générée elle aussi côté client.",
    },
    {
      title: "Aucune inscription",
      description: "L'outil est utilisable immédiatement, sans créer de compte ni fournir d'adresse e-mail.",
    },
    {
      title: "Gratuit, sans limite artificielle",
      description: "Aucun palier payant caché pour une fonctionnalité de base comme la division de PDF.",
    },
  ],
};

export const splitPdfUseCases: { title: string; intro: string; cases: ContentItem[] } = {
  title: "Qui utilise Split PDF pour ses documents sensibles",
  intro: "Des professionnels qui manipulent des données qu'ils ne peuvent pas envoyer à un outil tiers.",
  cases: [
    {
      title: "Juristes et cabinets d'avocats",
      description: "Extraire une clause ou une pièce d'un contrat sans exposer l'intégralité du dossier client.",
    },
    {
      title: "Ressources humaines",
      description: "Séparer un bulletin de paie ou un dossier de candidature sans passer par un service cloud externe.",
    },
    {
      title: "Professionnels de santé",
      description: "Isoler une page d'un compte rendu médical en respectant la confidentialité du patient.",
    },
    {
      title: "Comptabilité et finance",
      description: "Diviser des factures ou des relevés sensibles sans dépendre d'un outil en ligne tiers.",
    },
    {
      title: "PME et indépendants",
      description: "Réorganiser un dossier administratif sans confier ses documents à un service externe.",
    },
  ],
};

export const splitPdfFaq: FaqItem[] = [
  {
    question: "Mon PDF est-il envoyé sur un serveur pour être divisé ?",
    answer: "Non. Le découpage s'exécute directement dans votre navigateur : votre fichier PDF n'est jamais transmis à un serveur. Les fichiers sont générés localement, sur votre appareil.",
  },
  {
    question: "Diviser, scinder, séparer ou fractionner un PDF : est-ce la même chose ?",
    answer: "Oui, il s'agit toujours de la même opération. Que vous cherchiez à diviser, scinder, dissocier, fractionner ou séparer un PDF, Fileo propose les deux méthodes possibles dans un seul outil : extraire une sélection de pages dans un nouveau document, ou éclater le fichier en plusieurs PDF distincts.",
  },
  {
    question: "Puis-je utiliser cet outil pour des documents confidentiels ?",
    answer: "Oui, c'est exactement l'usage pour lequel l'outil a été pensé. Le traitement 100% local garantit qu'aucune donnée sensible, contrat, dossier RH ou médical, ne sort de votre appareil.",
  },
  {
    question: "Quelle est la différence entre extraire et diviser ?",
    answer: "Extraire regroupe les pages sélectionnées dans un seul PDF. Diviser crée un fichier PDF séparé pour chaque page sélectionnée.",
  },
  {
    question: "Comment sont téléchargés les fichiers en mode division ?",
    answer: "Si une seule page est sélectionnée, le PDF se télécharge directement. Si plusieurs pages sont sélectionnées, les fichiers sont regroupés dans une archive ZIP, elle aussi générée dans votre navigateur.",
  },
  {
    question: "L'outil Split PDF de Fileo est-il vraiment gratuit ?",
    answer: "Oui. L'extraction et la division de PDF sont gratuites et ne nécessitent aucune inscription ni aucune information personnelle.",
  },
  {
    question: "La qualité du PDF est-elle affectée par le split ?",
    answer: "Non, les pages sont copiées telles quelles depuis le document d'origine, sans recompression ni perte de qualité.",
  },
  {
    question: "Puis-je diviser un PDF depuis mon téléphone ou ma tablette ?",
    answer: "Oui, l'outil fonctionne sur mobile et tablette via un navigateur récent. Le traitement reste local, y compris sur ces appareils.",
  },
  {
    question: "Que se passe-t-il si mon PDF est protégé par un mot de passe ou corrompu ?",
    answer: "Un fichier protégé par un mot de passe ou endommagé peut ne pas être lisible par l'outil. Dans ce cas, un message d'erreur s'affiche ; déverrouillez le fichier avant de relancer le traitement.",
  },
];

export const splitPdfSummary = {
  text: "Split PDF permet de diviser ou d'extraire des pages d'un document directement dans le navigateur, sans envoi de fichier vers un serveur. Un outil gratuit et sans compte, pensé pour les professionnels qui manipulent des documents confidentiels : contrats, dossiers RH, relevés médicaux ou comptables.",
};