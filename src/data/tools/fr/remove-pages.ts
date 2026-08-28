import type { ContentItem, FaqItem } from "@/features/pdf/shared/types";

export const removePagesMeta = {
  metaTitle: "Supprimer des pages d'un PDF en ligne, gratuit et sans inscription",
  metaDescription:
    "Supprimez les pages inutiles d'un PDF en quelques clics, directement dans votre navigateur. Gratuit, sans inscription, sans serveur.",
  ogTitle: "Supprimer des pages d'un PDF — traitement local, sans envoi de fichiers",
  ogDescription:
    "Sélectionnez et supprimez les pages dont vous n'avez plus besoin dans un PDF. Tout se passe dans votre navigateur.",
  canonicalSlug: "/pdf/remove-pages",
};

export const removePagesHero = {
  eyebrow: "Outil PDF",
  title: "Supprimer des pages d'un PDF",
  subtitle:
    "Sélectionnez les pages à retirer de votre PDF et téléchargez le document allégé. Le traitement se fait dans votre navigateur : votre PDF n'est pas envoyé sur un serveur pour être modifié.",
};

export const removePagesTrustBlock: { title: string; intro: string; points: ContentItem[] } = {
  title: "Votre PDF reste sur votre appareil",
  intro:
    "La suppression de pages se fait directement dans votre navigateur, avec la puissance de calcul de votre appareil. Votre PDF n'est pas envoyé vers un serveur pour être modifié.",
  points: [
    {
      title: "Traitement local",
      description:
        "Les pages sont retirées et le nouveau document reconstitué directement dans votre navigateur, sans passer par nos serveurs.",
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

export const removePagesHowItWorks: { title: string; intro: string; steps: ContentItem[] } = {
  title: "Comment supprimer des pages d'un PDF avec FileoPDF",
  intro:
    "Trois étapes suffisent pour retirer des pages d'un PDF, sans logiciel à installer.",
  steps: [
    {
      title: "1. Ajoutez votre fichier PDF",
      description:
        "Glissez-déposez votre fichier ou sélectionnez-le depuis votre appareil. Un aperçu de chaque page s'affiche.",
    },
    {
      title: "2. Sélectionnez les pages à supprimer",
      description:
        "Cochez les pages dont vous n'avez plus besoin dans l'aperçu.",
    },
    {
      title: "3. Téléchargez le PDF allégé",
      description:
        "Le document final, sans les pages sélectionnées, est généré dans votre navigateur et prêt à télécharger.",
    },
  ],
};

export const removePagesBenefits: { title: string; intro: string; items: ContentItem[] } = {
  title: "Pourquoi utiliser l'outil Remove Pages de FileoPDF",
  intro: "Supprimer des pages d'un PDF ne devrait pas nécessiter un logiciel dédié ni un compte à créer.",
  items: [
    {
      title: "Simple et direct",
      description: "Un aperçu visuel de chaque page pour sélectionner exactement ce que vous voulez retirer.",
    },
    {
      title: "Aucune inscription",
      description: "L'outil est utilisable immédiatement, sans créer de compte ni fournir d'adresse e-mail.",
    },
    {
      title: "Traitement local",
      description: "La suppression s'exécute dans votre navigateur plutôt que sur un serveur distant, ce qui limite l'exposition de votre document.",
    },
    {
      title: "Qualité préservée",
      description: "Les pages conservées ne sont pas recompressées : texte, images et mise en page restent identiques à l'original.",
    },
    {
      title: "Adapté à un usage pro comme personnel",
      description: "Contrats, rapports, dossiers administratifs : l'outil convient aussi bien à un usage ponctuel qu'à un usage régulier.",
    },
    {
      title: "Gratuit, sans limite artificielle",
      description: "Aucun palier payant caché pour une fonctionnalité de base comme la suppression de pages.",
    },
  ],
};

export const removePagesUseCases: { title: string; intro: string; cases: ContentItem[] } = {
  title: "Dans quels cas utiliser Remove Pages",
  intro: "Quelques situations concrètes où supprimer des pages d'un PDF simplifie les choses.",
  cases: [
    {
      title: "Retirer une page blanche ou un brouillon",
      description: "Nettoyer un PDF scanné qui contient une page vierge ou une page test ajoutée par erreur.",
    },
    {
      title: "Alléger un document avant envoi",
      description: "Retirer les pages annexes non pertinentes avant de transmettre un dossier à un client ou un collègue.",
    },
    {
      title: "Extraire un contrat de ses annexes",
      description: "Supprimer les pages d'annexes pour ne garder que le corps principal d'un contrat.",
    },
    {
      title: "Corriger un rapport avant diffusion",
      description: "Retirer une section obsolète ou confidentielle d'un rapport avant de le partager plus largement.",
    },
  ],
};

export const removePagesFaq: FaqItem[] = [
  {
    question: "Mon PDF est-il envoyé sur un serveur pour supprimer des pages ?",
    answer: "Non. Le traitement s'exécute directement dans votre navigateur : votre PDF n'est pas envoyé sur un serveur. Le document final est généré localement, sur votre appareil.",
  },
  {
    question: "L'outil Remove Pages de FileoPDF est-il vraiment gratuit ?",
    answer: "Oui. La suppression de pages est gratuite et ne nécessite aucune inscription ni aucune information personnelle.",
  },
  {
    question: "Puis-je supprimer plusieurs pages en une seule fois ?",
    answer: "Oui, vous pouvez sélectionner autant de pages que nécessaire et les supprimer en une seule opération.",
  },
  {
    question: "Puis-je supprimer toutes les pages d'un PDF ?",
    answer: "Non, un document doit contenir au moins une page. Si vous sélectionnez toutes les pages, un message vous invite à en désélectionner au moins une.",
  },
  {
    question: "La qualité des pages conservées est-elle affectée ?",
    answer: "Non, les pages conservées ne sont pas recompressées : leur contenu (texte, images, mise en page) reste identique à celui du fichier d'origine.",
  },
  {
    question: "Puis-je utiliser l'outil depuis mon téléphone ou ma tablette ?",
    answer: "Oui, l'outil fonctionne sur mobile et tablette via un navigateur récent. L'ajout du fichier se fait via le sélecteur de fichiers de l'appareil plutôt que par glisser-déposer.",
  },
  {
    question: "Que se passe-t-il si mon PDF est protégé par un mot de passe ou corrompu ?",
    answer: "Un fichier protégé par un mot de passe ou endommagé peut ne pas être lisible par l'outil. Dans ce cas, un message d'erreur signale le problème ; retirez la protection avant de relancer l'opération.",
  },
];

export const removePagesSummary = {
  text: "Supprimer des pages d'un PDF avec FileoPDF ne demande ni compte ni installation. Les pages sont retirées directement dans votre navigateur, et le document final est prêt à télécharger en quelques secondes.",
};