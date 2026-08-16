import type { ContentItem } from "@/features/pdf/shared/types";

export const wordHubHero = {
  title: "Outils Word gratuits en ligne",
  subtitle: "Convertissez vos documents Word directement dans votre navigateur.",
  paragraphs: [
    "FileoPDF propose des outils Word gratuits pensés pour un usage rapide, sans installation et sans inscription. Chaque outil traite vos fichiers localement, dans votre navigateur, plutôt que de les envoyer vers un serveur distant pour les transformer.",
    "Cette approche limite l'exposition de vos documents, en particulier pour les fichiers sensibles : CV, contrats, rapports ou dossiers administratifs. Vous gardez le contrôle sur vos fichiers du début à la fin du traitement.",
  ],
};

export const wordHubToolsIntro = {
  text: "Choisissez un outil ci-dessous pour commencer. D'autres outils Word viennent progressivement compléter la suite.",
};

export const wordHubTrustBlock: { title: string; items: ContentItem[] } = {
  title: "La philosophie des outils Word FileoPDF",
  items: [
    {
      title: "Simplicité",
      description: "Un outil, une action claire. Pas de menus superflus ni d'étapes inutiles.",
    },
    {
      title: "Traitement local",
      description: "Vos fichiers Word sont traités dans votre navigateur, sans être envoyés sur un serveur pour être transformés.",
    },
    {
      title: "Sans inscription",
      description: "Chaque outil est utilisable immédiatement, sans création de compte ni collecte d'informations personnelles.",
    },
  ],
};