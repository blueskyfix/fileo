import type { ContentItem } from "@/features/pdf/shared/types";

export const pdfHubHero = {
  title: "Outils PDF gratuits en ligne",
  subtitle:
    "Fusionnez, découpez, convertissez et modifiez vos PDF gratuitement, sans inscription. Tout se passe dans votre navigateur, en toute sécurité.",
  paragraphs: [
    "FileoPDF propose une suite d'outils PDF gratuits pensés pour un usage rapide, sans installation et sans inscription. Chaque outil traite vos fichiers PDF localement, dans votre navigateur, plutôt que de les envoyer vers un serveur distant pour les transformer.",
    "Cette approche limite l'exposition de vos documents, en particulier pour les fichiers sensibles : justificatifs, contrats, factures ou dossiers administratifs. Vous gardez le contrôle sur vos fichiers du début à la fin du traitement.",
  ],
};

export const pdfHubToolsIntro = {
  text: "Choisissez un outil ci-dessous pour commencer. D'autres outils PDF (découpage, suppression de pages) viennent progressivement compléter la suite.",
};

export const pdfHubTrustBlock: { title: string; items: ContentItem[] } = {
  title: "La philosophie des outils PDF FileoPDF",
  items: [
    {
      title: "Simplicité",
      description: "Un outil, une action claire. Pas de menus superflus ni d'étapes inutiles.",
    },
    {
      title: "Traitement local",
      description: "Vos fichiers PDF sont traités dans votre navigateur, sans être envoyés sur un serveur pour être transformés.",
    },
    {
      title: "Sans inscription",
      description: "Chaque outil est utilisable immédiatement, sans création de compte ni collecte d'informations personnelles.",
    },
  ],
};