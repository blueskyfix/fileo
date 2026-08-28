import type { ContentItem, FaqItem } from "@/features/pdf/shared/types";

export const compressImageMeta = {
  metaTitle: "Compresser une image en ligne, gratuit et sans inscription",
  metaDescription:
    "Réduisez le poids de vos JPEG, PNG et WebP en un clic, sans perte visible. Traitement local, gratuit, sans inscription.",
  ogTitle: "Compresser une image — traitement local, sans envoi de fichiers",
  ogDescription:
    "Réduisez le poids de vos photos et images JPEG, PNG ou WebP, une par une ou en lot. Tout se passe dans votre navigateur.",
  canonicalSlug: "/image/compress-image",
};

export const compressImageHero = {
  eyebrow: "Outil Image",
  title: "Compresser une image",
  subtitle:
    "Ajoutez vos images JPEG, PNG ou WebP, ajustez le niveau de qualité souhaité, puis téléchargez les fichiers allégés. Le traitement se fait dans votre navigateur : vos images ne sont pas envoyées sur un serveur pour être compressées.",
};

export const compressImageTrustBlock: { title: string; intro: string; points: ContentItem[] } = {
  title: "Vos images restent sur votre appareil",
  intro:
    "La compression se fait directement dans votre navigateur, avec la puissance de calcul de votre appareil. Vos images ne sont pas envoyées vers un serveur pour être réduites.",
  points: [
    {
      title: "Compression locale",
      description:
        "Chaque image est réduite directement dans votre navigateur, sans passer par nos serveurs.",
    },
    {
      title: "Aucun stockage de vos images",
      description:
        "FileoPDF ne conserve pas de copie de vos fichiers : rien n'est mis en file d'attente ni archivé côté serveur.",
    },
    {
      title: "Fermez l'onglet, tout disparaît",
      description:
        "Une fois l'onglet fermé ou la page rechargée, les images chargées et les fichiers compressés ne sont plus accessibles nulle part.",
    },
  ],
};

export const compressImageHowItWorks: { title: string; intro: string; steps: ContentItem[] } = {
  title: "Comment compresser une image avec FileoPDF",
  intro:
    "Trois étapes suffisent pour réduire le poids d'une ou plusieurs images, sans logiciel à installer.",
  steps: [
    {
      title: "1. Ajoutez vos images",
      description:
        "Glissez-déposez vos fichiers JPEG, PNG ou WebP, ou sélectionnez-les depuis votre appareil. Vous pouvez en ajouter plusieurs à la fois.",
    },
    {
      title: "2. Ajustez la qualité",
      description:
        "Réglez le curseur de qualité selon le compromis souhaité entre poids du fichier et netteté visuelle.",
    },
    {
      title: "3. Téléchargez le résultat",
      description:
        "Une seule image se télécharge directement ; plusieurs images sont regroupées dans une archive ZIP.",
    },
  ],
};

export const compressImageBenefits: { title: string; intro: string; items: ContentItem[] } = {
  title: "Pourquoi utiliser l'outil Compress Image de FileoPDF",
  intro: "Réduire le poids d'une image ne devrait pas nécessiter un logiciel dédié ni un compte à créer.",
  items: [
    {
      title: "Trois formats pris en charge",
      description: "JPEG, PNG et WebP sont tous pris en charge, avec un réglage de qualité adapté à chaque format.",
    },
    {
      title: "Aucune inscription",
      description: "L'outil est utilisable immédiatement, sans créer de compte ni fournir d'adresse e-mail.",
    },
    {
      title: "Traitement par lot",
      description: "Compressez plusieurs images en une seule fois et récupérez-les regroupées dans un ZIP.",
    },
    {
      title: "Contrôle de la qualité",
      description: "Un curseur simple permet d'ajuster le compromis entre poids du fichier et netteté visuelle.",
    },
    {
      title: "Traitement local",
      description: "La compression s'exécute dans votre navigateur plutôt que sur un serveur distant, ce qui limite l'exposition de vos images.",
    },
    {
      title: "Gratuit, sans limite artificielle",
      description: "Aucun palier payant caché pour une fonctionnalité de base comme la compression d'images.",
    },
  ],
};

export const compressImageUseCases: { title: string; intro: string; cases: ContentItem[] } = {
  title: "Dans quels cas utiliser Compress Image",
  intro: "Quelques situations concrètes où réduire le poids d'une image simplifie les choses.",
  cases: [
    {
      title: "Passer sous la limite d'une pièce jointe e-mail",
      description: "Réduire le poids d'une photo pour respecter la limite imposée par votre messagerie, sans changer de format.",
    },
    {
      title: "Optimiser des images pour un site web",
      description: "Alléger les visuels d'un site pour améliorer les temps de chargement, sans sacrifier la qualité perçue.",
    },
    {
      title: "Libérer de l'espace de stockage",
      description: "Réduire le poids de photos volumineuses avant de les archiver sur un appareil ou un service cloud.",
    },
    {
      title: "Préparer des visuels pour les réseaux sociaux",
      description: "Compresser des images avant publication pour accélérer les envois, sans perte de qualité visible.",
    },
    {
      title: "Envoyer des photos rapidement",
      description: "Réduire le poids d'un lot de photos avant un transfert ou un partage sur un service à taille limitée.",
    },
  ],
};

export const compressImageFaq: FaqItem[] = [
  {
    question: "Mes images sont-elles envoyées sur un serveur pour être compressées ?",
    answer: "Non. La compression s'exécute directement dans votre navigateur : vos images ne sont pas envoyées sur un serveur. Les fichiers réduits sont générés localement, sur votre appareil.",
  },
  {
    question: "L'outil Compress Image de FileoPDF est-il vraiment gratuit ?",
    answer: "Oui. La compression d'images est gratuite et ne nécessite aucune inscription ni aucune information personnelle.",
  },
  {
    question: "Quelle est la différence entre les formats de sortie ?",
    answer: "Le JPEG et le WebP acceptent un réglage de qualité progressif, ce qui permet un vrai compromis entre poids et netteté. Le PNG reste un format sans perte : la compression change son encodage mais réduit son poids moins fortement que le JPEG ou le WebP.",
  },
  {
    question: "Puis-je compresser plusieurs images à la fois ?",
    answer: "Oui, vous pouvez déposer autant d'images que nécessaire et les compresser en une seule opération. Le résultat est regroupé dans une archive ZIP.",
  },
  {
    question: "Comment sont téléchargées les images compressées ?",
    answer: "Si une seule image est compressée, elle se télécharge directement. Si plusieurs images sont traitées, elles sont automatiquement regroupées dans une archive ZIP.",
  },
  {
    question: "Y a-t-il une limite au nombre ou au poids des fichiers ?",
    answer: "Aucune limite artificielle n'est imposée. La limite pratique dépend surtout de la mémoire et de la puissance de votre appareil.",
  },
  {
    question: "Puis-je compresser des images depuis mon téléphone ou ma tablette ?",
    answer: "Oui, l'outil fonctionne sur mobile et tablette via un navigateur récent. L'ajout des images se fait via le sélecteur de fichiers de l'appareil plutôt que par glisser-déposer.",
  },
  {
    question: "La compression dégrade-t-elle visiblement mes images ?",
    answer: "À un niveau de qualité modéré, la perte est généralement imperceptible à l'œil nu. Le curseur de qualité vous permet d'ajuster ce compromis selon vos besoins.",
  },
];

export const compressImageSummary = {
  text: "Compresser une image avec FileoPDF ne demande ni compte ni installation. Réduisez le poids de vos fichiers JPEG, PNG ou WebP directement dans votre navigateur, seuls ou en lot, avec un téléchargement direct ou groupé en ZIP.",
};