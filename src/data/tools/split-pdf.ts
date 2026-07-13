import type { ContentItem, FaqItem } from "@/features/pdf/shared/types";

export const splitPdfMeta = {
  metaTitle: "Diviser un PDF en ligne, gratuit et sans inscription | FileoPDF",
  metaDescription:
    "Extrayez des pages ou divisez un PDF en plusieurs fichiers, directement dans votre navigateur. Vos fichiers ne sont pas envoyés sur un serveur. Gratuit, rapide, sans inscription.",
  ogTitle: "Diviser un PDF — traitement local, sans envoi de fichiers",
  ogDescription:
    "Extrayez une sélection de pages en un seul PDF, ou divisez votre document en plusieurs fichiers séparés. Tout se passe dans votre navigateur.",
  canonicalSlug: "/pdf/split-pdf",
};

export const splitPdfHero = {
  eyebrow: "Outil PDF",
  title: "Diviser un PDF ou extraire des pages",
  subtitle:
    "Ajoutez votre fichier PDF, sélectionnez les pages qui vous intéressent, puis choisissez d'extraire une sélection en un seul document ou de diviser le PDF en plusieurs fichiers séparés. Le traitement se fait dans votre navigateur : votre PDF n'est pas envoyé sur un serveur.",
};

export const splitPdfTrustBlock: { title: string; intro: string; points: ContentItem[] } = {
  title: "Votre PDF reste sur votre appareil",
  intro:
    "Le découpage se fait directement dans votre navigateur, avec la puissance de calcul de votre appareil. Votre fichier PDF n'est pas envoyé vers un serveur pour être divisé.",
  points: [
    {
      title: "Traitement local",
      description:
        "L'extraction ou la division du document se fait dans votre navigateur, sans passer par nos serveurs.",
    },
    {
      title: "Aucun stockage de votre PDF",
      description:
        "FileoPDF ne conserve pas de copie de votre fichier : rien n'est mis en file d'attente ni archivé côté serveur.",
    },
    {
      title: "Fermez l'onglet, tout disparaît",
      description:
        "Une fois l'onglet fermé ou la page rechargée, le PDF chargé et les fichiers générés ne sont plus accessibles nulle part.",
    },
  ],
};

export const splitPdfHowItWorks: { title: string; intro: string; steps: ContentItem[] } = {
  title: "Comment diviser un PDF avec FileoPDF",
  intro:
    "Quelques étapes suffisent pour extraire ou diviser les pages d'un PDF, sans logiciel à installer.",
  steps: [
    {
      title: "1. Ajoutez votre fichier PDF",
      description:
        "Glissez-déposez votre fichier ou sélectionnez-le depuis votre appareil. Un aperçu de chaque page s'affiche.",
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
        "Un seul fichier se télécharge directement ; plusieurs fichiers sont regroupés dans une archive ZIP.",
    },
  ],
};

export const splitPdfBenefits: { title: string; intro: string; items: ContentItem[] } = {
  title: "Pourquoi utiliser l'outil Split PDF de FileoPDF",
  intro: "Diviser ou extraire des pages d'un PDF ne devrait pas nécessiter un logiciel dédié ni un compte à créer.",
  items: [
    {
      title: "Deux modes en un seul outil",
      description: "Extraire une sélection en un document, ou diviser en fichiers séparés : à vous de choisir selon votre besoin.",
    },
    {
      title: "Aucune inscription",
      description: "L'outil est utilisable immédiatement, sans créer de compte ni fournir d'adresse e-mail.",
    },
    {
      title: "Sélection visuelle des pages",
      description: "Un aperçu de chaque page permet de choisir précisément ce que vous voulez garder, sans deviner les numéros.",
    },
    {
      title: "Téléchargement groupé",
      description: "Les divisions multi-fichiers sont automatiquement regroupées dans une archive ZIP prête à télécharger.",
    },
    {
      title: "Traitement local",
      description: "Le découpage s'exécute dans votre navigateur plutôt que sur un serveur distant, ce qui limite l'exposition de vos documents.",
    },
    {
      title: "Gratuit, sans limite artificielle",
      description: "Aucun palier payant caché pour une fonctionnalité de base comme la division de PDF.",
    },
  ],
};

export const splitPdfUseCases: { title: string; intro: string; cases: ContentItem[] } = {
  title: "Dans quels cas utiliser Split PDF",
  intro: "Quelques situations concrètes où extraire ou diviser un PDF simplifie les choses.",
  cases: [
    {
      title: "Extraire un chapitre ou une section",
      description: "Isoler quelques pages d'un rapport ou d'un livre pour les partager sans envoyer tout le document.",
    },
    {
      title: "Séparer un lot de documents scannés",
      description: "Diviser un PDF issu d'un scanner multi-documents en fichiers individuels, un par document d'origine.",
    },
    {
      title: "Retirer une partie confidentielle avant envoi",
      description: "Extraire uniquement les pages pertinentes d'un contrat ou dossier avant de le transmettre à un tiers.",
    },
    {
      title: "Alléger un PDF trop volumineux",
      description: "Diviser un document en plusieurs fichiers plus légers, plus faciles à envoyer par e-mail.",
    },
    {
      title: "Réorganiser un dossier administratif",
      description: "Séparer les pages d'un PDF regroupant plusieurs justificatifs pour les classer individuellement.",
    },
  ],
};

export const splitPdfFaq: FaqItem[] = [
  {
    question: "Mon PDF est-il envoyé sur un serveur pour être divisé ?",
    answer: "Non. Le découpage s'exécute directement dans votre navigateur : votre fichier PDF n'est pas envoyé sur un serveur. Les fichiers sont générés localement, sur votre appareil.",
  },
  {
    question: "L'outil Split PDF de FileoPDF est-il vraiment gratuit ?",
    answer: "Oui. L'extraction et la division de PDF sont gratuites et ne nécessitent aucune inscription ni aucune information personnelle.",
  },
  {
    question: "Quelle est la différence entre extraire et diviser ?",
    answer: "Extraire regroupe les pages sélectionnées dans un seul PDF. Diviser crée un fichier PDF séparé pour chaque page sélectionnée.",
  },
  {
    question: "Comment sont téléchargés les fichiers en mode division ?",
    answer: "Si une seule page est sélectionnée, le PDF se télécharge directement. Si plusieurs pages sont sélectionnées, les fichiers sont automatiquement regroupés dans une archive ZIP.",
  },
  {
    question: "Puis-je choisir précisément quelles pages garder ?",
    answer: "Oui, toutes les pages sont cochées par défaut avec un aperçu visuel, et vous pouvez décocher celles que vous ne souhaitez pas inclure avant de lancer le traitement.",
  },
  {
    question: "La qualité du PDF est-elle affectée par le split ?",
    answer: "Non, les pages sont copiées telles quelles depuis le document d'origine, sans recompression ni perte de qualité.",
  },
  {
    question: "Puis-je diviser un PDF depuis mon téléphone ou ma tablette ?",
    answer: "Oui, l'outil fonctionne sur mobile et tablette via un navigateur récent. L'ajout du fichier se fait via le sélecteur de fichiers de l'appareil plutôt que par glisser-déposer.",
  },
  {
    question: "Que se passe-t-il si mon PDF est protégé par un mot de passe ou corrompu ?",
    answer: "Un fichier protégé par un mot de passe ou endommagé peut ne pas être lisible par l'outil. Dans ce cas, un message d'erreur s'affiche ; déverrouillez le fichier avant de relancer le traitement.",
  },
];

export const splitPdfSummary = {
  text: "Diviser un PDF avec FileoPDF ne demande ni compte ni installation. Choisissez vos pages, extrayez-les en un seul fichier ou divisez-les en documents séparés, directement dans votre navigateur.",
};