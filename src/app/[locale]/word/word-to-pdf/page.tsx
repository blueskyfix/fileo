import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ToolHeroSplit } from "@/features/pdf/shared/components/tool-hero-split";
import { HowItWorks } from "@/features/pdf/shared/components/how-it-works";
import { BenefitsAndUseCases } from "@/features/pdf/shared/components/benefits-and-use-cases";
import { ToolFaq } from "@/features/pdf/shared/components/tool-faq";
import { ContentSummary } from "@/features/pdf/shared/components/content-summary";
import { RelatedTools } from "@/features/pdf/shared/components/related-tools";
import { WordToPdfWidget } from "@/features/word/word-to-pdf";
import { siteConfig } from "@/core/config/site";
import { getRelatedTools } from "@/data/tools/tools";
import {
  wordToPdfMeta,
  wordToPdfHero,
  wordToPdfHowItWorks,
  wordToPdfBenefits,
  wordToPdfUseCases,
  wordToPdfFaq,
  wordToPdfSummary,
} from "@/data/tools/word-to-pdf";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = wordToPdfMeta.canonicalSlug;

  return {
    title: wordToPdfMeta.metaTitle,
    description: wordToPdfMeta.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/${locale}${path}`,
      languages: {
        fr: `${siteConfig.url}/fr${path}`,
        en: `${siteConfig.url}/en${path}`,
        "x-default": `${siteConfig.url}/en${path}`,
      },
    },
    openGraph: {
      title: wordToPdfMeta.ogTitle,
      description: wordToPdfMeta.ogDescription,
      url: `${siteConfig.url}/${locale}${path}`,
    },
  };
}

export default function WordToPdfPage() {
  return (
    <Container className="pb-20">
      <ToolHeroSplit
        title={wordToPdfHero.title}
        description={wordToPdfHero.description}
        highlights={wordToPdfHero.highlights}
      >
        <WordToPdfWidget />
      </ToolHeroSplit>

      <HowItWorks steps={wordToPdfHowItWorks} />

      <BenefitsAndUseCases
        benefitsTitle="Pourquoi utiliser cet outil"
        benefits={wordToPdfBenefits}
        useCasesTitle="Cas d'usage"
        useCases={wordToPdfUseCases}
      />

      <ToolFaq items={wordToPdfFaq} />

      <ContentSummary text={wordToPdfSummary.text} />

      <RelatedTools tools={getRelatedTools("word-to-pdf")} />
    </Container>
  );
}