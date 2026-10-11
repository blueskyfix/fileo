import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/core/config/site";
import { getToolLabel, tools } from "@/data/tools/tools";
import type { AppLocale } from "@/i18n/routing";

interface ToolJsonLdProps {
  locale: AppLocale;
  slug: string;
}

const homeLabel: Record<AppLocale, string> = { fr: "Accueil", en: "Home" };

const hubLabels: Record<string, Record<AppLocale, string>> = {
  pdf: { fr: "Outils PDF", en: "PDF tools" },
  word: { fr: "Outils Word", en: "Word tools" },
  image: { fr: "Outils image", en: "Image tools" },
};

/**
 * Données structurées d'une page outil : WebApplication (outil gratuit, utilisable
 * dans le navigateur) + BreadcrumbList (Accueil > hub > outil).
 */
export function ToolJsonLd({ locale, slug }: ToolJsonLdProps) {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return null;

  const { name, description } = getToolLabel(slug, locale);
  const base = `${siteConfig.url}/${locale}`;
  const url = `${base}${tool.href}`;

  const webApplication = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    inLanguage: locale,
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: homeLabel[locale], item: base },
      {
        "@type": "ListItem",
        position: 2,
        name: hubLabels[tool.mediaType]?.[locale] ?? tool.mediaType,
        item: `${base}/${tool.mediaType}`,
      },
      { "@type": "ListItem", position: 3, name, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={webApplication} />
      <JsonLd data={breadcrumb} />
    </>
  );
}
