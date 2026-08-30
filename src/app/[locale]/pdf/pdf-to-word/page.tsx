// src/app/[locale]/pdf/pdf-to-word/page.tsx
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ToolHeroSplit } from "@/features/pdf/shared/components/tool-hero-split";
import { HowItWorks } from "@/features/pdf/shared/components/how-it-works";
import { BenefitsAndUseCases } from "@/features/pdf/shared/components/benefits-and-use-cases";
import { ToolFaq } from "@/features/pdf/shared/components/tool-faq";
import { ContentSummary } from "@/features/pdf/shared/components/content-summary";
import { RelatedTools } from "@/features/pdf/shared/components/related-tools";
import { getRelatedTools } from "@/data/tools/tools";
import { PdfToWordWidget } from "@/features/pdf/pdf-to-word";
import { siteConfig } from "@/core/config/site";
import type { AppLocale } from "@/i18n/routing";

async function loadContent(locale: AppLocale) {
  if (locale === "en") {
    return import("@/data/tools/en/pdf-to-word");
  }
  return import("@/data/tools/fr/pdf-to-word");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { pdfToWordMeta } = await loadContent(locale as AppLocale);
  const path = pdfToWordMeta.canonicalSlug;

  return {
    title: pdfToWordMeta.metaTitle,
    description: pdfToWordMeta.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/${locale}${path}`,
      languages: {
        fr: `${siteConfig.url}/fr${path}`,
        en: `${siteConfig.url}/en${path}`,
        "x-default": `${siteConfig.url}/en${path}`,
      },
    },
    openGraph: {
      title: pdfToWordMeta.ogTitle,
      description: pdfToWordMeta.ogDescription,
      url: `${siteConfig.url}/${locale}${path}`,
      images: [siteConfig.ogImage],
    },
  };
}

const heroHighlights: Record<AppLocale, string[]> = {
  fr: ["Traitement sécurisé", "Fichier supprimé après conversion", "Aucune limite quotidienne"],
  en: ["Secure processing", "File deleted after conversion", "No daily limit"],
};

export default async function PdfToWordPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const {
    pdfToWordHero,
    pdfToWordHowItWorks,
    pdfToWordBenefits,
    pdfToWordUseCases,
    pdfToWordFaq,
    pdfToWordSummary,
  } = await loadContent(locale as AppLocale);

  return (
    <Container className="pb-20">
      <ToolHeroSplit
        title={pdfToWordHero.title}
        description={pdfToWordHero.subtitle}
        highlights={heroHighlights[locale as AppLocale]}
      >
        <PdfToWordWidget />
      </ToolHeroSplit>

      <HowItWorks title={pdfToWordHowItWorks.title} steps={pdfToWordHowItWorks.steps} />

      <BenefitsAndUseCases
        benefitsTitle={pdfToWordBenefits.title}
        benefitsIntro={pdfToWordBenefits.intro}
        benefits={pdfToWordBenefits.items}
        useCasesTitle={pdfToWordUseCases.title}
        useCasesIntro={pdfToWordUseCases.intro}
        useCases={pdfToWordUseCases.cases}
      />

      <ToolFaq items={pdfToWordFaq} />

      <ContentSummary text={pdfToWordSummary.text} />

      <RelatedTools tools={getRelatedTools("pdf-to-word", locale as AppLocale)} />
    </Container>
  );
}