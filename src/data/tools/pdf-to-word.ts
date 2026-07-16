import type { ContentItem, FaqItem } from "@/features/pdf/shared/types";

export const pdfToWordMeta = {
  metaTitle: "Convertir un PDF en Word en ligne, gratuit et sans inscription",
  metaDescription:
    "Convertissez un PDF en document Word éditable, directement dans votre navigateur. Vos fichiers PDF ne sont pas envoyés sur un serveur. Gratuit, rapide, sans inscription.",
  ogTitle: "Convertir un PDF en Word — traitement local, sans envoi de fichiers",
  ogDescription:
    "Transformez un PDF contenant du texte sélectionnable en document Word (.docx) éditable. Tout se passe dans votre navigateur.",
  canonicalSlug: "/pdf/pdf-to-word",
};

export const pdfToWordHero = {
  eyebrow: "Outil PDF",
  title: "Convertir un PDF en document Word éditable",
  subtitle:
    "Importez votre PDF et récupérez un fichier Word (.docx) éditable en quelques secondes. Le traitement se fait dans votre navigateur : votre PDF n'est pas envoyé sur un serveur pour être converti.",
};

export const pdfToWordTrustBlock: { title: string; intro: string; points: ContentItem[] } = {
  title: "Votre PDF reste sur votre appareil",
  intro:
    "La conversion se fait directement dans votre navigateur, avec la puissance de calcul de votre appareil. Votre PDF n'est pas envoyé vers un serveur pour être transformé en document Word.",
  points: [
    {
      title: "Conversion locale",
      description:
        "Le texte est extrait et reconstitué en document Word directement dans votre navigateur, sans passer par nos serveurs.",
    },
    {
      title: "Aucun stockage de votre PDF",
      description:
        "FileoPDF ne conserve pas de copie de vos fichiers : rien n'est mis en file d'attente ni archivé côté serveur.",
    },
    {
      title: "Fermez l'onglet, tout disparaît",
      description:
        "Une fois l'onglet fermé ou la page rechargée, le fichier chargé et le résultat ne sont plus accessibles nulle part.",
    },
  ],
};

export const pdfToWordHowItWorks: { title: string; intro: string; steps: ContentItem[] } = {
  title: "Comment convertir un PDF en Word avec FileoPDF",
  intro:
    "Deux étapes suffisent pour transformer un PDF en document Word éditable, sans logiciel à installer.",
  steps: [
    {
      title: "1. Ajoutez votre fichier PDF",
      description:
        "Glissez-déposez votre fichier ou sélectionnez-le depuis votre appareil.",
    },
    {
      title: "2. Lancez la conversion",
      description:
        "Le texte de votre PDF est extrait et reconstitué en document Word, prêt à être modifié.",
    },
    {
      title: "3. Téléchargez le fichier Word",
      description:
        "Récupérez votre fichier .docx généré directement dans votre navigateur, en quelques secondes.",
    },
  ],
};

export const pdfToWordBenefits: { title: string; intro: string; items: ContentItem[] } = {
  title: "Pourquoi utiliser l'outil PDF to Word de FileoPDF",
  intro: "Convertir un PDF en Word ne devrait pas nécessiter un logiciel dédié ni un compte à créer.",
  items: [
    {
      title: "Simple et direct",
      description: "Pas de menu compliqué ni d'options inutiles. Vous ajoutez votre PDF, vous convertissez.",
    },
    {
      title: "Aucune inscription",
      description: "L'outil est utilisable immédiatement, sans créer de compte ni fournir d'adresse e-mail.",
    },
    {
      title: "Traitement local",
      description: "La conversion s'exécute dans votre navigateur plutôt que sur un serveur distant, ce qui limite l'exposition de votre document.",
    },
    {
      title: "Format Word standard",
      description: "Le fichier généré s'ouvre directement dans Word, Google Docs ou LibreOffice sans manipulation supplémentaire.",
    },
    {
      title: "Adapté à un usage pro comme personnel",
      description: "Rapports, contrats, notes : l'outil convient aussi bien à un usage ponctuel qu'à un usage régulier.",
    },
    {
      title: "Gratuit, sans limite artificielle",
      description: "Aucun palier payant caché pour la conversion basique d'un PDF en Word.",
    },
  ],
};

export const pdfToWordUseCases: { title: string; intro: string; cases: ContentItem[] } = {
  title: "Dans quels cas utiliser PDF to Word",
  intro: "Quelques situations concrètes où convertir un PDF en Word simplifie les choses.",
  cases: [
    {
      title: "Modifier un document reçu en PDF",
      description: "Récupérer un contenu texte pour le corriger ou le compléter sans le ressaisir entièrement.",
    },
    {
      title: "Réutiliser le contenu d'un rapport",
      description: "Extraire le texte d'un rapport PDF pour l'intégrer dans un nouveau document Word.",
    },
    {
      title: "Adapter un modèle existant",
      description: "Transformer un modèle de document PDF en fichier Word pour l'ajuster à un nouveau besoin.",
    },
    {
      title: "Corriger une ancienne version d'un document",
      description: "Repartir d'un PDF quand le fichier Word d'origine n'est plus disponible.",
    },
  ],
};

export const pdfToWordFaq: FaqItem[] = [
  {
    question: "Mon PDF est-il envoyé sur un serveur pour être converti ?",
    answer: "Non. La conversion s'exécute directement dans votre navigateur : votre PDF n'est pas envoyé sur un serveur. Le document Word est généré localement, sur votre appareil.",
  },
  {
    question: "L'outil PDF to Word de FileoPDF est-il vraiment gratuit ?",
    answer: "Oui, la conversion basique est gratuite et ne nécessite aucune inscription ni aucune information personnelle.",
  },
  {
    question: "L'outil fonctionne-t-il avec un PDF scanné ou une image ?",
    answer: "La conversion actuelle fonctionne à partir du texte sélectionnable présent dans le PDF. Un PDF scanné (image sans texte reconnu) donnera un résultat vide ou incomplet, sauf si vous choisissez de continuer malgré l'avertissement. La reconnaissance de texte (OCR) pour les documents scannés arrive dans une prochaine version.",
  },
  {
    question: "La mise en page de mon PDF est-elle conservée dans le Word ?",
    answer: "La conversion actuelle privilégie la récupération fiable du texte plutôt que la reproduction exacte de la mise en page (colonnes, tableaux, positionnement précis). Le contenu textuel est conservé, mais la mise en forme peut différer du PDF d'origine.",
  },
  {
    question: "Puis-je convertir un PDF en Word depuis mon téléphone ou ma tablette ?",
    answer: "Oui, l'outil fonctionne sur mobile et tablette via un navigateur récent. L'ajout du fichier se fait via le sélecteur de fichiers de l'appareil plutôt que par glisser-déposer.",
  },
  {
    question: "Que se passe-t-il si mon PDF est protégé par un mot de passe ou corrompu ?",
    answer: "Un fichier protégé par un mot de passe ou endommagé peut ne pas être lisible par l'outil. Dans ce cas, un message d'erreur signale le problème ; retirez la protection avant de relancer la conversion.",
  },
];

export const pdfToWordSummary = {
  text: "Convertir un PDF en Word avec FileoPDF ne demande ni compte ni installation. Le texte de votre PDF est extrait et reconstitué en document .docx directement dans votre navigateur, prêt à télécharger en quelques secondes.",
};