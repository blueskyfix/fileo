import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ToolJsonLd } from "@/components/seo/tool-json-ld";
import { ToolHeroSplit } from "@/features/pdf/shared/components/tool-hero-split";
import { HowItWorks } from "@/features/pdf/shared/components/how-it-works";
import { BenefitsAndUseCases } from "@/features/pdf/shared/components/benefits-and-use-cases";
import { ToolFaq } from "@/features/pdf/shared/components/tool-faq";
import { ContentSummary } from "@/features/pdf/shared/components/content-summary";
import { RelatedTools } from "@/features/pdf/shared/components/related-tools";
import { getRelatedTools } from "@/data/tools/tools";
import { RotatePdfTool } from "@/features/pdf/rotate-pdf";
import { buildPageMetadata } from "@/core/seo/metadata";
import type { AppLocale } from "@/i18n/routing";

async function loadContent(locale: AppLocale) {
  if (locale === "en") {
    return import("@/data/tools/en/rotate-pdf");
  }
  return import("@/data/tools/fr/rotate-pdf");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { rotatePdfMeta } = await loadContent(locale as AppLocale);
  const path = rotatePdfMeta.canonicalSlug;

  return buildPageMetadata({
    locale,
    path: path,
    title: rotatePdfMeta.metaTitle,
    description: rotatePdfMeta.metaDescription,
    ogTitle: rotatePdfMeta.ogTitle,
    ogDescription: rotatePdfMeta.ogDescription,
  });
}

const heroHighlights: Record<AppLocale, string[]> = {
  fr: ["Traitement 100% local", "Aucun fichier stocké", "Rien ne persiste après fermeture"],
  en: ["100% local processing", "No files stored", "Nothing persists after closing"],
};

export default async function RotatePdfPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const {
    rotatePdfHero,
    rotatePdfHowItWorks,
    rotatePdfBenefits,
    rotatePdfUseCases,
    rotatePdfFaq,
    rotatePdfSummary,
  } = await loadContent(locale as AppLocale);

  return (
    <Container className="pb-20">
      <ToolJsonLd locale={locale as AppLocale} slug="rotate-pdf" />
      <ToolHeroSplit
        title={rotatePdfHero.title}
        description={rotatePdfHero.subtitle}
        highlights={heroHighlights[locale as AppLocale]}
      >
        <RotatePdfTool />
      </ToolHeroSplit>

      <HowItWorks title={rotatePdfHowItWorks.title} steps={rotatePdfHowItWorks.steps} />

      <BenefitsAndUseCases
        benefitsTitle={rotatePdfBenefits.title}
        benefitsIntro={rotatePdfBenefits.intro}
        benefits={rotatePdfBenefits.items}
        useCasesTitle={rotatePdfUseCases.title}
        useCasesIntro={rotatePdfUseCases.intro}
        useCases={rotatePdfUseCases.cases}
      />

      <ToolFaq items={rotatePdfFaq} />

      <ContentSummary text={rotatePdfSummary.text} />

      <RelatedTools tools={getRelatedTools("rotate-pdf", locale as AppLocale)} />
    </Container>
  );
}