import type { Metadata } from "next";
import { siteConfig } from "@/core/config/site";
import { routing, type AppLocale } from "@/i18n/routing";

interface PageMetadataInput {
  locale: string;
  /** Chemin sans locale, ex. "/pdf/merge-pdf". "" pour la home. */
  path: string;
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
}

const ogLocales: Record<AppLocale, string> = { fr: "fr_FR", en: "en_US" };

/**
 * Métadonnées SEO complètes d'une page : canonical, hreflang, Open Graph et Twitter.
 *
 * Next.js remplace `openGraph` et `twitter` en bloc (pas de fusion profonde avec
 * le layout) : chaque page doit donc fournir type, siteName, locale, image et
 * dimensions, faute de quoi Ahrefs signale des « balises Open Graph incomplètes ».
 */
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  ogTitle = title,
  ogDescription = description,
}: PageMetadataInput): Metadata {
  const url = `${siteConfig.url}/${locale}${path}`;
  const image = {
    url: siteConfig.ogImage,
    width: 1200,
    height: 630,
    alt: ogTitle,
  };

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((loc) => [loc, `${siteConfig.url}/${loc}${path}`]),
        ),
        "x-default": `${siteConfig.url}/${routing.defaultLocale}${path}`,
      },
    },
    openGraph: {
      type: "website",
      title: ogTitle,
      description: ogDescription,
      url,
      siteName: siteConfig.name,
      locale: ogLocales[locale as AppLocale] ?? ogLocales.fr,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [siteConfig.ogImage],
    },
  };
}
