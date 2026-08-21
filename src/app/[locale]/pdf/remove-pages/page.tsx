import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ToolHeroSplit } from "@/features/pdf/shared/components/tool-hero-split";
import { HowItWorks } from "@/features/pdf/shared/components/how-it-works";
import { BenefitsAndUseCases } from "@/features/pdf/shared/components/benefits-and-use-cases";
import { ToolFaq } from "@/features/pdf/shared/components/tool-faq";
import { ContentSummary } from "@/features/pdf/shared/components/content-summary";
import { RelatedTools } from "@/features/pdf/shared/components/related-tools";
import { getRelatedTools } from "@/data/tools/tools";
import { RemovePagesWidget } from "@/features/pdf/remove-pages";
import { siteConfig } from "@/core/config/site";
import type { AppLocale } from "@/i18n/routing";

// Chargement du contenu SEO par locale (Option A : fichiers séparés
// fr/remove-pages.ts et en/remove-pages.ts). if/else explicite plutôt qu'un
// import dynamique par template string, pour garder le typage complet
// de chaque module (un import dynamique `import(`.../${locale}/...`)`
// ferait perdre l'inférence de type sur les exports).
async function loadContent(locale: AppLocale) {
  if (locale === "en") {
    return import("@/data/tools/en/remove-pages");
  }
  return import("@/data/tools/fr/remove-pages");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { removePagesMeta } = await loadContent(locale as AppLocale);
  const path = removePagesMeta.canonicalSlug;

  return {
    title: removePagesMeta.metaTitle,
    description: removePagesMeta.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/${locale}${path}`,
      languages: {
        fr: `${siteConfig.url}/fr${path}`,
        en: `${siteConfig.url}/en${path}`,
        "x-default": `${siteConfig.url}/en${path}`,
      },
    },
    openGraph: {
      title: removePagesMeta.ogTitle,
      description: removePagesMeta.ogDescription,
      url: `${siteConfig.url}/${locale}${path}`,
    },
  };
}

const heroHighlights: Record<AppLocale, string[]> = {
  fr: ["Traitement 100% local", "Aucun fichier stocké", "Rien ne persiste après fermeture"],
  en: ["100% local processing", "No files stored", "Nothing persists after closing"],
};

export default async function RemovePagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const {
    removePagesHero,
    removePagesHowItWorks,
    removePagesBenefits,
    removePagesUseCases,
    removePagesFaq,
    removePagesSummary,
  } = await loadContent(locale as AppLocale);

  return (
    <Container className="pb-20">
      <ToolHeroSplit
        title={removePagesHero.title}
        description={removePagesHero.subtitle}
        highlights={heroHighlights[locale as AppLocale]}
      >
        <RemovePagesWidget />
      </ToolHeroSplit>

      <HowItWorks title={removePagesHowItWorks.title} steps={removePagesHowItWorks.steps} />

      <BenefitsAndUseCases
        benefitsTitle={removePagesBenefits.title}
        benefitsIntro={removePagesBenefits.intro}
        benefits={removePagesBenefits.items}
        useCasesTitle={removePagesUseCases.title}
        useCasesIntro={removePagesUseCases.intro}
        useCases={removePagesUseCases.cases}
      />

      <ToolFaq items={removePagesFaq} />

      <ContentSummary text={removePagesSummary.text} />

      <RelatedTools tools={getRelatedTools("remove-pages")} />
    </Container>
  );
}