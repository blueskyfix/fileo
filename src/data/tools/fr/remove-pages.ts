// data/tools/fr/remove-pages.ts
import type { ContentItem, FaqItem } from "@/features/pdf/shared/types";

export const removePagesMeta = {
  metaTitle: "Supprimer des pages d'un PDF, sans upload, gratuit",
  metaDescription:
    "Retirez des pages d'un PDF confidentiel directement dans votre navigateur. Aucun envoi de fichier, gratuit, sans inscription.",
  ogTitle: "Supprimer des pages d'un PDF sans l'envoyer en ligne",
  ogDescription:
    "Sélectionnez et retirez des pages d'un PDF sensible sans qu'il quitte votre appareil. Traitement entièrement local.",
  canonicalSlug: "/pdf/remove-pages",
};

export const removePagesHero = {
  eyebrow: "Outil PDF confidentiel",
  title: "Supprimer des pages d'un PDF sans l'exposer",
  subtitle:
    "Sélectionnez les pages à retirer et téléchargez le document allégé, sans que le fichier quitte jamais votre appareil. Une méthode adaptée aux documents que vous ne pouvez pas transmettre à un service en ligne tiers.",
};

export const removePagesTrustBlock: { title: string; intro: string; points: ContentItem[] } = {
  title: "Votre PDF ne quitte jamais votre appareil",
  intro:
    "La suppression de pages se fait entièrement dans votre navigateur, avec la puissance de calcul de votre appareil. Aucune page de votre document n'est transmise à un serveur pour être modifiée.",
  points: [
    {
      title: "Traitement local",
      description:
        "Les pages sont retirées et le nouveau document reconstitué directement dans votre navigateur, sans passer par nos serveurs.",
    },
    {
      title: "Aucun stockage de votre PDF",
      description:
        "Fileo ne conserve pas de copie de vos fichiers : rien n'est mis en file d'attente ni archivé côté serveur.",
    },
    {
      title: "Fermez l'onglet, tout disparaît",
      description:
        "Une fois l'onglet fermé ou la page rechargée, le fichier chargé et le résultat ne sont plus accessibles nulle part.",
    },
  ],
};

export const removePagesHowItWorks: { title: string; intro: string; steps: ContentItem[] } = {
  title: "Comment retirer des pages d'un PDF sans le transmettre à un tiers",
  intro: "Trois étapes, toutes exécutées sur votre appareil, sans logiciel à installer.",
  steps: [
    {
      title: "1. Ajoutez votre fichier PDF",
      description:
        "Glissez-déposez votre fichier ou sélectionnez-le depuis votre appareil. Il reste local dès cet instant.",
    },
    {
      title: "2. Sélectionnez les pages à supprimer",
      description: "Cochez les pages dont vous n'avez plus besoin dans l'aperçu.",
    },
    {
      title: "3. Téléchargez le PDF allégé",
      description:
        "Le document final, sans les pages sélectionnées, est généré dans votre navigateur et prêt à télécharger.",
    },
  ],
};

export const removePagesBenefits: { title: string; intro: string; items: ContentItem[] } = {
  title: "Pourquoi retirer des pages avec Fileo plutôt qu'un outil cloud",
  intro: "Une solution pensée pour les documents que vous devez garder sous contrôle.",
  items: [
    {
      title: "Zéro upload",
      description: "Le fichier ne quitte jamais votre navigateur, à aucun moment du traitement.",
    },
    {
      title: "Sélection visuelle claire",
      description: "Un aperçu de chaque page pour choisir exactement ce que vous voulez retirer.",
    },
    {
      title: "Qualité préservée",
      description: "Les pages conservées ne sont pas recompressées : texte, images et mise en page restent identiques à l'original.",
    },
    {
      title: "Aucune inscription",
      description: "L'outil est utilisable immédiatement, sans créer de compte ni fournir d'adresse e-mail.",
    },
    {
      title: "Compatible avec les documents volumineux",
      description: "Le traitement local évite les limites de taille imposées par les outils cloud classiques.",
    },
    {
      title: "Gratuit, sans limite artificielle",
      description: "Aucun palier payant caché pour une fonctionnalité de base comme la suppression de pages.",
    },
  ],
};

export const removePagesUseCases: { title: string; intro: string; cases: ContentItem[] } = {
  title: "Des documents sensibles, un traitement resté chez vous",
  intro: "Retirer des pages d'un PDF sans les envoyer ailleurs, un besoin fréquent pour ces métiers.",
  cases: [
    {
      title: "Cabinets juridiques",
      description: "Retirer des pages annexes d'un contrat avant transmission, sans exposer le dossier complet.",
    },
    {
      title: "Services RH",
      description: "Nettoyer un dossier de candidature ou un contrat de travail avant archivage.",
    },
    {
      title: "Secteur de la santé",
      description: "Retirer une page contenant des informations non pertinentes d'un dossier patient.",
    },
    {
      title: "Comptabilité et finance",
      description: "Supprimer des pages obsolètes d'un rapport financier sans passer par un service en ligne tiers.",
    },
  ],
};

export const removePagesFaq: FaqItem[] = [
  {
    question: "Mon PDF est-il envoyé sur un serveur pour supprimer des pages ?",
    answer: "Non. Le traitement s'exécute directement dans votre navigateur : votre PDF n'est jamais transmis à un serveur. Le document final est généré localement, sur votre appareil.",
  },
  {
    question: "Cet outil convient-il à des documents confidentiels ?",
    answer: "Oui, le traitement 100% local est justement pensé pour ce type de documents : contrats, dossiers médicaux, données RH ou financières.",
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
    answer: "Non, les pages conservées ne sont pas recompressées : leur contenu, texte, images et mise en page, reste identique à celui du fichier d'origine.",
  },
  {
    question: "Dois-je créer un compte pour utiliser l'outil ?",
    answer: "Non, l'outil est utilisable immédiatement, sans inscription ni adresse e-mail.",
  },
  {
    question: "Que se passe-t-il si mon PDF est protégé par un mot de passe ou corrompu ?",
    answer: "Un fichier protégé par un mot de passe ou endommagé peut ne pas être lisible par l'outil. Dans ce cas, un message d'erreur signale le problème ; retirez la protection avant de relancer l'opération.",
  },
];

export const removePagesSummary = {
  text: "Remove Pages permet de supprimer une ou plusieurs pages d'un PDF sans jamais envoyer le fichier vers un serveur externe. Un outil gratuit, sans compte, pensé pour les professionnels qui manipulent des documents confidentiels au quotidien.",
};