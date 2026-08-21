import type { ContentItem, FaqItem } from "@/features/pdf/shared/types";

export const rotatePdfMeta = {
  metaTitle: "Pivoter un PDF en ligne, gratuit et sans inscription",
  metaDescription:
    "Faites pivoter les pages de votre PDF à 90°, 180° ou 270°, directement dans votre navigateur. Vos fichiers PDF ne sont pas envoyés sur un serveur. Gratuit, rapide, sans inscription.",
  ogTitle: "Pivoter les pages d'un PDF — traitement local, sans envoi de fichiers",
  ogDescription:
    "Corrigez l'orientation de vos pages PDF, une par une ou toutes en même temps. Tout se passe dans votre navigateur.",
  canonicalSlug: "/pdf/rotate-pdf",
};

export const rotatePdfHero = {
  eyebrow: "Outil PDF",
  title: "Pivoter les pages d'un PDF",
  subtitle:
    "Ajoutez votre fichier PDF, choisissez les pages à pivoter et l'angle souhaité, puis téléchargez le document corrigé. Le traitement se fait dans votre navigateur : votre PDF n'est pas envoyé sur un serveur pour être modifié.",
};

export const rotatePdfTrustBlock: { title: string; intro: string; points: ContentItem[] } = {
  title: "Votre PDF reste sur votre appareil",
  intro:
    "La rotation se fait directement dans votre navigateur, avec la puissance de calcul de votre appareil. Votre fichier PDF n'est pas envoyé vers un serveur pour être modifié.",
  points: [
    {
      title: "Traitement local",
      description:
        "La rotation des pages et la reconstitution du document se font directement dans votre navigateur, sans passer par nos serveurs.",
    },
    {
      title: "Aucun stockage de votre PDF",
      description:
        "FileoPDF ne conserve pas de copie de votre fichier : rien n'est mis en file d'attente ni archivé côté serveur.",
    },
    {
      title: "Fermez l'onglet, tout disparaît",
      description:
        "Une fois l'onglet fermé ou la page rechargée, le PDF chargé et le document généré ne sont plus accessibles nulle part.",
    },
  ],
};

export const rotatePdfHowItWorks: { title: string; intro: string; steps: ContentItem[] } = {
  title: "Comment pivoter un PDF avec FileoPDF",
  intro:
    "Trois étapes suffisent pour corriger l'orientation des pages d'un PDF, sans logiciel à installer.",
  steps: [
    {
      title: "1. Ajoutez votre fichier PDF",
      description:
        "Glissez-déposez votre fichier ou sélectionnez-le depuis votre appareil. Un aperçu de chaque page s'affiche.",
    },
    {
      title: "2. Choisissez la rotation",
      description:
        "Pivotez une page individuellement à 90°, 180° ou 270°, ou appliquez la même rotation à tout le document en un clic.",
    },
    {
      title: "3. Téléchargez le résultat",
      description:
        "Le PDF corrigé est généré dans votre navigateur et prêt à télécharger en quelques secondes.",
    },
  ],
};

export const rotatePdfBenefits: { title: string; intro: string; items: ContentItem[] } = {
  title: "Pourquoi utiliser l'outil Rotate PDF de FileoPDF",
  intro: "Corriger l'orientation d'un PDF ne devrait pas nécessiter un logiciel dédié ni un compte à créer.",
  items: [
    {
      title: "Rotation page par page ou groupée",
      description: "Pivotez une seule page mal orientée ou appliquez la rotation à l'ensemble du document en un clic.",
    },
    {
      title: "Aucune inscription",
      description: "L'outil est utilisable immédiatement, sans créer de compte ni fournir d'adresse e-mail.",
    },
    {
      title: "Aperçu visuel avant validation",
      description: "Chaque page s'affiche en miniature, ce qui permet de vérifier l'orientation avant de télécharger.",
    },
    {
      title: "Aucune limite de taille de fichier",
      description: "Traitez des documents volumineux sans palier payant ni restriction artificielle.",
    },
    {
      title: "Traitement local",
      description: "La rotation s'exécute dans votre navigateur plutôt que sur un serveur distant, ce qui limite l'exposition de vos documents.",
    },
    {
      title: "Qualité préservée",
      description: "Les pages ne sont pas recompressées : seule leur orientation change, le contenu reste identique à l'original.",
    },
  ],
};

export const rotatePdfUseCases: { title: string; intro: string; cases: ContentItem[] } = {
  title: "Dans quels cas utiliser Rotate PDF",
  intro: "Quelques situations concrètes où corriger l'orientation d'un PDF simplifie les choses.",
  cases: [
    {
      title: "Corriger un document scanné à l'envers",
      description: "Redresser une ou plusieurs pages issues d'un scanner qui a mal orienté certaines feuilles.",
    },
    {
      title: "Uniformiser un PDF mêlant portrait et paysage",
      description: "Remettre toutes les pages dans le même sens avant de partager ou d'imprimer un document.",
    },
    {
      title: "Repositionner des photos importées en PDF",
      description: "Corriger l'orientation de pages issues de photos prises verticalement ou horizontalement par erreur.",
    },
    {
      title: "Préparer un document avant impression",
      description: "S'assurer que chaque page est dans le bon sens pour éviter une impression illisible ou de travers.",
    },
    {
      title: "Nettoyer un dossier avant archivage",
      description: "Harmoniser l'orientation des pages d'un dossier administratif avant de le classer définitivement.",
    },
  ],
};

export const rotatePdfFaq: FaqItem[] = [
  {
    question: "Mon PDF est-il envoyé sur un serveur pour être pivoté ?",
    answer: "Non. La rotation s'exécute directement dans votre navigateur : votre fichier PDF n'est pas envoyé sur un serveur. Le document final est généré localement, sur votre appareil.",
  },
  {
    question: "L'outil Rotate PDF de FileoPDF est-il vraiment gratuit ?",
    answer: "Oui. La rotation de PDF est gratuite et ne nécessite aucune inscription ni aucune information personnelle.",
  },
  {
    question: "Puis-je pivoter une seule page sans toucher aux autres ?",
    answer: "Oui, chaque page peut être pivotée individuellement à 90°, 180° ou 270°, indépendamment des autres pages du document.",
  },
  {
    question: "Puis-je appliquer la même rotation à tout le document ?",
    answer: "Oui, un mode permet d'appliquer une rotation identique à toutes les pages en une seule action.",
  },
  {
    question: "La qualité du PDF est-elle affectée par la rotation ?",
    answer: "Non, seule l'orientation des pages change. Le texte, les images et la mise en page restent identiques à l'original, sans recompression.",
  },
  {
    question: "Y a-t-il une limite de taille pour le fichier à pivoter ?",
    answer: "Aucune limite artificielle n'est imposée. La limite pratique dépend surtout de la mémoire et de la puissance de votre appareil pour les documents très volumineux.",
  },
  {
    question: "Puis-je pivoter un PDF depuis mon téléphone ou ma tablette ?",
    answer: "Oui, l'outil fonctionne sur mobile et tablette via un navigateur récent. L'ajout du fichier se fait via le sélecteur de fichiers de l'appareil plutôt que par glisser-déposer.",
  },
  {
    question: "Que se passe-t-il si mon PDF est protégé par un mot de passe ou corrompu ?",
    answer: "Un fichier protégé par un mot de passe ou endommagé peut ne pas être lisible par l'outil. Dans ce cas, un message d'erreur s'affiche ; déverrouillez le fichier avant de relancer le traitement.",
  },
];

export const rotatePdfSummary = {
  text: "Pivoter un PDF avec FileoPDF ne demande ni compte ni installation. Corrigez l'orientation d'une page ou de tout le document directement dans votre navigateur, et téléchargez le résultat en quelques secondes.",
};