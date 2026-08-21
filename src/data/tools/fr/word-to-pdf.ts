import type { ContentItem, FaqItem } from "@/features/pdf/shared/types";

export const wordToPdfMeta = {
  metaTitle: "Convertir Word en PDF en ligne, gratuit et sans inscription",
  metaDescription:
    "Convertissez vos documents Word (.docx) en PDF directement dans votre navigateur. Vos fichiers ne sont pas envoyés sur un serveur. Gratuit, rapide, sans inscription.",
  ogTitle: "Convertir Word en PDF — traitement local, sans envoi de fichiers",
  ogDescription:
    "Transformez un document Word (.docx) en PDF en un clic, directement dans votre navigateur.",
  canonicalSlug: "/word/word-to-pdf",
};

export const wordToPdfHero = {
  eyebrow: "Outil Word",
  title: "Convertir un document Word en PDF",
  subtitle:
    "Ajoutez votre fichier Word (.docx), lancez la conversion, puis téléchargez le PDF obtenu. Le traitement se fait dans votre navigateur : votre document n'est pas envoyé sur un serveur pour être converti.",
};

export const wordToPdfTrustBlock: { title: string; intro: string; points: ContentItem[] } = {
  title: "Votre document reste sur votre appareil",
  intro:
    "La conversion se fait directement dans votre navigateur, avec la puissance de calcul de votre appareil. Votre fichier Word n'est pas envoyé vers un serveur pour être transformé en PDF.",
  points: [
    {
      title: "Conversion locale",
      description:
        "Le document est transformé en PDF directement dans votre navigateur, sans passer par nos serveurs.",
    },
    {
      title: "Aucun stockage de votre fichier",
      description:
        "FileoPDF ne conserve pas de copie de votre document : rien n'est mis en file d'attente ni archivé côté serveur.",
    },
    {
      title: "Fermez l'onglet, tout disparaît",
      description:
        "Une fois l'onglet fermé ou la page rechargée, le fichier Word chargé et le PDF généré ne sont plus accessibles nulle part.",
    },
  ],
};

export const wordToPdfHowItWorks: { title: string; intro: string; steps: ContentItem[] } = {
  title: "Comment convertir un Word en PDF avec FileoPDF",
  intro:
    "Trois étapes suffisent pour transformer un document Word en PDF, sans logiciel à installer.",
  steps: [
    {
      title: "1. Ajoutez votre fichier Word",
      description:
        "Glissez-déposez votre document .docx ou sélectionnez-le depuis votre appareil.",
    },
    {
      title: "2. Lancez la conversion",
      description:
        "Le document est transformé en PDF directement dans votre navigateur, en quelques secondes.",
    },
    {
      title: "3. Téléchargez le PDF",
      description:
        "Récupérez votre fichier PDF, prêt à partager ou à imprimer.",
    },
  ],
};

export const wordToPdfBenefits: { title: string; intro: string; items: ContentItem[] } = {
  title: "Pourquoi utiliser l'outil Word to PDF de FileoPDF",
  intro: "Convertir un document Word en PDF ne devrait pas nécessiter un logiciel dédié ni un compte à créer.",
  items: [
    {
      title: "Simple et direct",
      description: "Un fichier à déposer, un bouton à cliquer, un PDF à télécharger.",
    },
    {
      title: "Aucune inscription",
      description: "L'outil est utilisable immédiatement, sans créer de compte ni fournir d'adresse e-mail.",
    },
    {
      title: "Rendu figé et fiable",
      description: "Le PDF garantit un affichage identique quel que soit l'appareil ou le logiciel utilisé pour l'ouvrir.",
    },
    {
      title: "Rapide",
      description: "Pas d'attente serveur : la conversion s'exécute directement sur votre machine.",
    },
    {
      title: "Traitement local",
      description: "La conversion s'exécute dans votre navigateur plutôt que sur un serveur distant, ce qui limite l'exposition de vos documents.",
    },
    {
      title: "Gratuit, sans limite artificielle",
      description: "Aucun palier payant caché pour une fonctionnalité de base comme la conversion Word vers PDF.",
    },
  ],
};

export const wordToPdfUseCases: { title: string; intro: string; cases: ContentItem[] } = {
  title: "Dans quels cas utiliser Word to PDF",
  intro: "Quelques situations concrètes où convertir un document Word en PDF simplifie les choses.",
  cases: [
    {
      title: "Envoyer un document figé",
      description: "Partager un CV, une lettre de motivation ou un rapport sans risque qu'il soit modifié par le destinataire.",
    },
    {
      title: "Archiver un document durablement",
      description: "Garantir un rendu identique dans le temps, indépendamment des versions futures de votre logiciel de traitement de texte.",
    },
    {
      title: "Préparer un document à imprimer",
      description: "Obtenir un PDF prêt à l'impression, avec une mise en page stable quel que soit l'appareil utilisé.",
    },
    {
      title: "Déposer un dossier administratif",
      description: "Convertir un document Word en PDF pour respecter le format souvent exigé lors de démarches en ligne.",
    },
    {
      title: "Partager un compte-rendu ou une note",
      description: "Diffuser un document interne dans un format lisible sur n'importe quel appareil, sans dépendre de Word.",
    },
  ],
};

export const wordToPdfFaq: FaqItem[] = [
  {
    question: "Mon fichier Word est-il envoyé sur un serveur pour être converti ?",
    answer: "Non. La conversion s'exécute entièrement dans votre navigateur : votre document ne quitte jamais votre ordinateur.",
  },
  {
    question: "L'outil Word to PDF de FileoPDF est-il vraiment gratuit ?",
    answer: "Oui. La conversion de Word en PDF est gratuite et ne nécessite aucune inscription ni aucune information personnelle.",
  },
  {
    question: "Quels formats Word sont acceptés ?",
    answer: "Seul le format .docx (Word 2007 et versions ultérieures) est pris en charge.",
  },
  {
    question: "La mise en page est-elle parfaitement conservée ?",
    answer: "Les mises en page simples (texte, titres, listes, images) sont fidèlement converties. Les documents avec une mise en forme très complexe (colonnes multiples, en-têtes avancés) peuvent présenter de légères différences.",
  },
  {
    question: "Le texte du PDF obtenu est-il sélectionnable et copiable ?",
    answer: "Le PDF généré reproduit visuellement votre document, mais son texte n'est pas sélectionnable ni copiable dans cette version : chaque page est rendue comme une image fidèle à la mise en page d'origine.",
  },
  {
    question: "Puis-je convertir plusieurs fichiers Word à la suite ?",
    answer: "Oui, vous pouvez convertir autant de documents que vous le souhaitez, les uns après les autres, sans limite artificielle.",
  },
  {
    question: "Puis-je convertir un fichier Word depuis mon téléphone ou ma tablette ?",
    answer: "Oui, l'outil fonctionne sur mobile et tablette via un navigateur récent. L'ajout du fichier se fait via le sélecteur de fichiers de l'appareil plutôt que par glisser-déposer.",
  },
  {
    question: "Que se passe-t-il si mon fichier Word est corrompu ou dans un format non pris en charge ?",
    answer: "Un fichier endommagé ou dans un format autre que .docx peut ne pas être lisible par l'outil. Dans ce cas, un message d'erreur s'affiche ; vérifiez le format ou réenregistrez le fichier avant de relancer la conversion.",
  },
];

export const wordToPdfSummary = {
  text: "Convertir un document Word en PDF avec FileoPDF ne demande ni compte ni installation. Le fichier .docx est transformé en PDF directement dans votre navigateur, prêt à télécharger en quelques secondes.",
};