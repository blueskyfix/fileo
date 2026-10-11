import { defineRouting } from "next-intl/routing";

// Préfixage symétrique (brief i18n, section "Décision structurante") :
// /fr/... et /en/..., jamais de locale à la racine.
// defaultLocale reste requis techniquement par next-intl mais n'a pas
// d'effet "racine sans préfixe" ici puisque localePrefix = "always".
export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "en",
  localePrefix: "always",
  // Cookie NEXT_LOCALE : priorité au choix explicite de l'utilisateur
  // (switcher), sinon détection Accept-Language. Comportement par défaut
  // de next-intl, conforme au brief.
  localeDetection: true,
  // Les hreflang sont déjà déclarés dans les métadonnées de chaque page et dans
  // le sitemap. Sans ça, next-intl ajoute un en-tête HTTP `Link` dont le
  // x-default pointe vers l'URL SANS locale (ex. /pdf/rotate-pdf), qui redirige
  // en 301 : doublon d'hreflang + hreflang vers une redirection (Ahrefs).
  alternateLinks: false,
});

export type AppLocale = (typeof routing.locales)[number];