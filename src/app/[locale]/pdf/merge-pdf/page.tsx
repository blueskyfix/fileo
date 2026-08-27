import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ToolHeroSplit } from "@/features/pdf/shared/components/tool-hero-split";
import { HowItWorks } from "@/features/pdf/shared/components/how-it-works";
import { BenefitsAndUseCases } from "@/features/pdf/shared/components/benefits-and-use-cases";
import { ToolFaq } from "@/features/pdf/shared/components/tool-faq";
import { ContentSummary } from "@/features/pdf/shared/components/content-summary";
import { RelatedTools } from "@/features/pdf/shared/components/related-tools";
import { getRelatedTools } from "@/data/tools/tools";
import { MergeTool } from "@/features/pdf/merge";
import { siteConfig } from "@/core/config/site";
import type { AppLocale } from "@/i18n/routing";

async function loadContent(locale: AppLocale) {
  if (locale === "en") {
    return import("@/data/tools/en/merge-pdf");
  }
  return import("@/data/tools/fr/merge-pdf");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { mergePdfMeta } = await loadContent(locale as AppLocale);
  const path = mergePdfMeta.canonicalSlug;

  return {
    title: mergePdfMeta.metaTitle,
    description: mergePdfMeta.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/${locale}${path}`,
      languages: {
        fr: `${siteConfig.url}/fr${path}`,
        en: `${siteConfig.url}/en${path}`,
        "x-default": `${siteConfig.url}/en${path}`,
      },
    },
    openGraph: {
      title: mergePdfMeta.ogTitle,
      description: mergePdfMeta.ogDescription,
      url: `${siteConfig.url}/${locale}${path}`,
    },
  };
}

const heroHighlights: Record<AppLocale, string[]> = {
  fr: ["Traitement 100% local", "Aucun fichier stocké", "Rien ne persiste après fermeture"],
  en: ["100% local processing", "No files stored", "Nothing persists after closing"],
};

export default async function MergePdfPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const {
    mergePdfHero,
    mergePdfHowItWorks,
    mergePdfBenefits,
    mergePdfUseCases,
    mergePdfFaq,
    mergePdfSummary,
  } = await loadContent(locale as AppLocale);

  return (
    <Container className="pb-20">
      <ToolHeroSplit
        title={mergePdfHero.title}
        description={mergePdfHero.subtitle}
        highlights={heroHighlights[locale as AppLocale]}
      >
        <MergeTool />
      </ToolHeroSplit>

      <HowItWorks title={mergePdfHowItWorks.title} steps={mergePdfHowItWorks.steps} />

      <BenefitsAndUseCases
        benefitsTitle={mergePdfBenefits.title}
        benefitsIntro={mergePdfBenefits.intro}
        benefits={mergePdfBenefits.items}
        useCasesTitle={mergePdfUseCases.title}
        useCasesIntro={mergePdfUseCases.intro}
        useCases={mergePdfUseCases.cases}
      />

      <ToolFaq items={mergePdfFaq} />

      <ContentSummary text={mergePdfSummary.text} />

      <RelatedTools tools={getRelatedTools("merge-pdf", locale as AppLocale)} />
    </Container>
  );
}