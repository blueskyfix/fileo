import type { ContentItem, FaqItem } from "@/features/pdf/shared/types";

export const pdfToJpgMeta = {
  metaTitle: "Convertir PDF en JPG en ligne, gratuit et sans inscription | FileoPDF",
  metaDescription:
    "Convertissez les pages de votre PDF en images JPG, directement dans votre navigateur. Vos fichiers PDF ne sont pas envoyés sur un serveur. Gratuit, rapide, sans inscription.",
  ogTitle: "Convertir un PDF en images JPG — traitement local, sans envoi de fichiers",
  ogDescription:
    "Transformez les pages de votre PDF en images JPG, individuellement ou toutes à la fois. Tout se passe dans votre navigateur.",
  canonicalSlug: "/pdf/pdf-to-jpg",
};

export const pdfToJpgHero = {
  eyebrow: "Outil PDF",
  title: "Convertir un PDF en images JPG",
  subtitle:
    "Ajoutez votre fichier PDF, choisissez les pages à convertir, puis téléchargez les images JPG obtenues. Le traitement se fait dans votre navigateur : votre PDF n'est pas envoyé sur un serveur pour être converti.",
};

export const pdfToJpgTrustBlock: { title: string; intro: string; points: ContentItem[] } = {
  title: "Votre PDF reste sur votre appareil",
  intro:
    "La conversion se fait directement dans votre navigateur, avec la puissance de calcul de votre appareil. Votre fichier PDF n'est pas envoyé vers un serveur pour être transformé en images.",
  points: [
    {
      title: "Conversion locale",
      description:
        "Chaque page est transformée en image directement dans votre navigateur, sans passer par nos serveurs.",
    },
    {
      title: "Aucun stockage de votre PDF",
      description:
        "FileoPDF ne conserve pas de copie de votre fichier : rien n'est mis en file d'attente ni archivé côté serveur.",
    },
    {
      title: "Fermez l'onglet, tout disparaît",
      description:
        "Une fois l'onglet fermé ou la page rechargée, le PDF chargé et les images générées ne sont plus accessibles nulle part.",
    },
  ],
};

export const pdfToJpgHowItWorks: { title: string; intro: string; steps: ContentItem[] } = {
  title: "Comment convertir un PDF en JPG avec FileoPDF",
  intro:
    "Trois étapes suffisent pour transformer les pages d'un PDF en images JPG, sans logiciel à installer.",
  steps: [
    {
      title: "1. Ajoutez votre fichier PDF",
      description:
        "Glissez-déposez votre fichier ou sélectionnez-le depuis votre appareil. Les pages s'affichent en aperçu.",
    },
    {
      title: "2. Choisissez les pages",
      description:
        "Toutes les pages sont sélectionnées par défaut. Décochez celles que vous ne souhaitez pas convertir.",
    },
    {
      title: "3. Convertissez et téléchargez",
      description:
        "Lancez la conversion : une seule page se télécharge directement en JPG, plusieurs pages sont regroupées dans une archive ZIP.",
    },
  ],
};

export const pdfToJpgBenefits: { title: string; intro: string; items: ContentItem[] } = {
  title: "Pourquoi utiliser l'outil PDF to JPG de FileoPDF",
  intro: "Extraire des images d'un PDF ne devrait pas nécessiter un logiciel dédié ni un compte à créer.",
  items: [
    {
      title: "Simple et direct",
      description: "Un aperçu de chaque page, une sélection claire, un bouton pour convertir.",
    },
    {
      title: "Aucune inscription",
      description: "L'outil est utilisable immédiatement, sans créer de compte ni fournir d'adresse e-mail.",
    },
    {
      title: "Sélection de pages flexible",
      description: "Convertissez tout le document ou seulement les pages qui vous intéressent.",
    },
    {
      title: "Téléchargement groupé",
      description: "Les conversions multi-pages sont automatiquement regroupées dans une archive ZIP prête à télécharger.",
    },
    {
      title: "Traitement local",
      description: "La conversion s'exécute dans votre navigateur plutôt que sur un serveur distant, ce qui limite l'exposition de vos documents.",
    },
    {
      title: "Gratuit, sans limite artificielle",
      description: "Aucun palier payant caché pour une fonctionnalité de base comme la conversion de PDF en images.",
    },
  ],
};

export const pdfToJpgUseCases: { title: string; intro: string; cases: ContentItem[] } = {
  title: "Dans quels cas utiliser PDF to JPG",
  intro: "Quelques situations concrètes où extraire des images d'un PDF simplifie les choses.",
  cases: [
    {
      title: "Partager une page sur les réseaux ou par message",
      description: "Extraire une seule page d'un PDF pour la partager facilement, sans envoyer tout le document.",
    },
    {
      title: "Insérer une page dans une présentation",
      description: "Convertir une page de rapport ou de contrat en image pour l'intégrer dans un diaporama ou un document.",
    },
    {
      title: "Prévisualiser un document rapidement",
      description: "Obtenir un aperçu visuel de chaque page sans ouvrir de lecteur PDF dédié.",
    },
    {
      title: "Archiver visuellement un dossier",
      description: "Convertir un PDF complet en une série d'images pour un archivage ou un classement visuel.",
    },
    {
      title: "Publier du contenu sur un site ou un blog",
      description: "Transformer une page de document en image directement utilisable dans un article ou une publication en ligne.",
    },
  ],
};

export const pdfToJpgFaq: FaqItem[] = [
  {
    question: "Mon PDF est-il envoyé sur un serveur pour être converti ?",
    answer: "Non. La conversion s'exécute directement dans votre navigateur : votre fichier PDF n'est pas envoyé sur un serveur. Les images sont générées localement, sur votre appareil.",
  },
  {
    question: "L'outil PDF to JPG de FileoPDF est-il vraiment gratuit ?",
    answer: "Oui. La conversion de PDF en images JPG est gratuite et ne nécessite aucune inscription ni aucune information personnelle.",
  },
  {
    question: "Puis-je convertir seulement certaines pages ?",
    answer: "Oui, toutes les pages sont sélectionnées par défaut, mais vous pouvez décocher celles que vous ne souhaitez pas convertir avant de lancer l'export.",
  },
  {
    question: "Comment sont téléchargées les images si mon PDF a plusieurs pages ?",
    answer: "Si vous convertissez une seule page, l'image JPG se télécharge directement. Si vous en convertissez plusieurs, elles sont automatiquement regroupées dans une archive ZIP, prête à être extraite.",
  },
  {
    question: "Quelle est la qualité des images obtenues ?",
    answer: "Les pages sont converties à une résolution adaptée à un usage écran et partage courant, offrant un bon compromis entre netteté et poids de fichier.",
  },
  {
    question: "Puis-je convertir un PDF depuis mon téléphone ou ma tablette ?",
    answer: "Oui, l'outil fonctionne sur mobile et tablette via un navigateur récent. L'ajout du fichier se fait via le sélecteur de fichiers de l'appareil plutôt que par glisser-déposer.",
  },
  {
    question: "Que se passe-t-il si mon PDF est protégé par un mot de passe ou corrompu ?",
    answer: "Un fichier protégé par un mot de passe ou endommagé peut ne pas être lisible par l'outil. Dans ce cas, un message d'erreur s'affiche ; déverrouillez le fichier avant de relancer la conversion.",
  },
  {
    question: "Y a-t-il une limite au nombre de pages convertibles ?",
    answer: "Vous pouvez convertir un document entier. La limite pratique dépend surtout de la mémoire et de la puissance de votre appareil pour les documents très volumineux.",
  },
];

export const pdfToJpgSummary = {
  text: "Convertir un PDF en JPG avec FileoPDF ne demande ni compte ni installation. Chaque page est transformée en image directement dans votre navigateur, avec un téléchargement direct ou groupé en ZIP selon le nombre de pages choisies.",
};