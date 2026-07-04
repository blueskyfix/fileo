import type { ContentItem, FaqItem } from "@/features/pdf/shared/types";

export const mergePdfMeta = {
  metaTitle: "Fusionner un PDF en ligne, gratuit et sans inscription | Fileo",
  metaDescription:
    "Fusionnez plusieurs PDF en un seul fichier, directement dans votre navigateur. Vos fichiers PDF ne sont pas envoyés sur un serveur. Gratuit, rapide, sans inscription.",
  ogTitle: "Fusionner des PDF en ligne — traitement local, sans envoi de fichiers",
  ogDescription:
    "Assemblez plusieurs fichiers PDF en un seul document. Réorganisez l'ordre des pages, fusionnez, téléchargez. Tout se passe dans votre navigateur.",
  canonicalSlug: "/pdf/merge-pdf",
};

export const mergePdfHero = {
  eyebrow: "Outil PDF",
  title: "Fusionner plusieurs PDF en un seul fichier",
  subtitle:
    "Ajoutez vos fichiers, réorganisez-les dans l'ordre souhaité, puis téléchargez le PDF fusionné. Le traitement se fait dans votre navigateur : vos fichiers PDF ne sont pas envoyés sur un serveur pour être fusionnés.",
};

export const mergePdfTrustBlock: { title: string; intro: string; points: ContentItem[] } = {
  title: "Vos fichiers PDF restent sur votre appareil",
  intro:
    "La fusion se fait directement dans votre navigateur, avec la puissance de calcul de votre appareil. Vos fichiers PDF ne sont pas envoyés vers un serveur pour être assemblés.",
  points: [
    {
      title: "Fusion locale",
      description:
        "Le document final est généré dans votre navigateur, page par page, sans passer par nos serveurs.",
    },
    {
      title: "Aucun stockage de vos PDF",
      description:
        "Fileo ne conserve pas de copie de vos fichiers : rien n'est mis en file d'attente ni archivé côté serveur.",
    },
    {
      title: "Fermez l'onglet, tout disparaît",
      description:
        "Une fois l'onglet fermé ou la page rechargée, les fichiers chargés et le résultat ne sont plus accessibles nulle part.",
    },
  ],
};

export const mergePdfHowItWorks: { title: string; intro: string; steps: ContentItem[] } = {
  title: "Comment fusionner des PDF avec Fileo",
  intro:
    "Trois étapes suffisent pour assembler plusieurs fichiers PDF en un seul document, sans logiciel à installer.",
  steps: [
    {
      title: "1. Ajoutez vos fichiers PDF",
      description:
        "Glissez-déposez vos fichiers ou sélectionnez-les depuis votre appareil. Vous pouvez ajouter autant de PDF que nécessaire.",
    },
    {
      title: "2. Réorganisez l'ordre",
      description:
        "Déplacez les fichiers pour définir l'ordre final du document fusionné, avant de lancer la fusion.",
    },
    {
      title: "3. Fusionnez et téléchargez",
      description:
        "Lancez la fusion : le fichier final est généré dans votre navigateur et prêt à télécharger en quelques secondes.",
    },
  ],
};

export const mergePdfBenefits: { title: string; intro: string; items: ContentItem[] } = {
  title: "Pourquoi utiliser l'outil Merge PDF de Fileo",
  intro: "Fusionner des PDF ne devrait pas nécessiter un logiciel dédié ni un compte à créer.",
  items: [
    {
      title: "Simple et direct",
      description: "Pas de menu compliqué ni d'options inutiles. Vous ajoutez vos fichiers, vous fusionnez.",
    },
    {
      title: "Aucune inscription",
      description: "L'outil est utilisable immédiatement, sans créer de compte ni fournir d'adresse e-mail.",
    },
    {
      title: "Réorganisation flexible",
      description: "Changez l'ordre des fichiers avant la fusion, pour construire le document final exactement comme vous le souhaitez.",
    },
    {
      title: "Traitement local",
      description: "La fusion s'exécute dans votre navigateur plutôt que sur un serveur distant, ce qui limite l'exposition de vos documents.",
    },
    {
      title: "Adapté à un usage pro comme personnel",
      description: "Dossiers administratifs, factures, rapports : l'outil convient aussi bien à un usage ponctuel qu'à un usage régulier.",
    },
    {
      title: "Gratuit, sans limite artificielle",
      description: "Aucun palier payant caché pour une fonctionnalité de base comme la fusion de PDF.",
    },
  ],
};

export const mergePdfUseCases: { title: string; intro: string; cases: ContentItem[] } = {
  title: "Dans quels cas utiliser Merge PDF",
  intro: "Quelques situations concrètes où fusionner plusieurs PDF en un seul fichier simplifie les choses.",
  cases: [
    {
      title: "Regrouper des justificatifs",
      description: "Rassembler plusieurs justificatifs (identité, domicile, revenus) en un seul document pour un dossier administratif.",
    },
    {
      title: "Fusionner des factures",
      description: "Assembler plusieurs factures ou reçus en un seul fichier avant envoi à la comptabilité ou à un client.",
    },
    {
      title: "Constituer un dossier de candidature",
      description: "Réunir CV, lettre de motivation et diplômes dans un seul PDF, dans le bon ordre.",
    },
    {
      title: "Assembler un contrat et ses annexes",
      description: "Joindre les annexes à un contrat principal pour n'envoyer qu'un seul fichier final.",
    },
    {
      title: "Réunir les chapitres d'un rapport ou d'un mémoire",
      description: "Combiner des sections rédigées séparément en un document unique, prêt à être relu ou imprimé.",
    },
  ],
};

export const mergePdfFaq: FaqItem[] = [
  {
    question: "Mes fichiers PDF sont-ils envoyés sur un serveur pour être fusionnés ?",
    answer: "Non. La fusion s'exécute directement dans votre navigateur : vos fichiers PDF ne sont pas envoyés sur un serveur pour être assemblés. Le document final est généré localement, sur votre appareil.",
  },
  {
    question: "L'outil Merge PDF de Fileo est-il vraiment gratuit ?",
    answer: "Oui. La fusion de PDF est gratuite et ne nécessite aucune inscription ni aucune information personnelle.",
  },
  {
    question: "Y a-t-il une limite au nombre ou à la taille des fichiers ?",
    answer: "Vous pouvez fusionner plusieurs fichiers à la suite. La limite pratique dépend surtout de la mémoire et de la puissance de votre appareil : des fichiers très volumineux ou très nombreux peuvent ralentir le traitement sur un appareil peu puissant.",
  },
  {
    question: "Puis-je fusionner des PDF depuis mon téléphone ou ma tablette ?",
    answer: "Oui, l'outil fonctionne sur mobile et tablette via un navigateur récent. L'ajout de fichiers se fait via le sélecteur de fichiers de l'appareil plutôt que par glisser-déposer.",
  },
  {
    question: "Puis-je changer l'ordre des fichiers avant de les fusionner ?",
    answer: "Oui, vous pouvez réorganiser librement l'ordre des fichiers ajoutés avant de lancer la fusion. Le document final respecte l'ordre que vous avez défini.",
  },
  {
    question: "Que se passe-t-il si un de mes PDF est protégé par un mot de passe ou corrompu ?",
    answer: "Un fichier protégé par un mot de passe ou endommagé peut ne pas être lisible par l'outil. Dans ce cas, un message d'erreur signale le fichier concerné ; retirez-le ou déverrouillez-le avant de relancer la fusion.",
  },
  {
    question: "La qualité et le contenu de mes PDF sont-ils conservés après la fusion ?",
    answer: "L'outil assemble vos fichiers PDF sans recompresser leur contenu. Le texte, les images et la mise en page de chaque fichier d'origine sont conservés dans le document final.",
  },
  {
    question: "Puis-je fusionner plus de deux fichiers en une seule fois ?",
    answer: "Oui, vous pouvez ajouter et fusionner autant de fichiers PDF que nécessaire en une seule opération, dans l'ordre de votre choix.",
  },
];

export const mergePdfSummary = {
  text: "Fusionner des PDF avec Fileo ne demande ni compte ni installation. Vos fichiers sont assemblés directement dans votre navigateur, dans l'ordre que vous choisissez, et le résultat est prêt à télécharger en quelques secondes.",
};