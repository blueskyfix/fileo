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

export const metadata: Metadata = {
  title: wordToPdfMeta.title,
  description: wordToPdfMeta.description,
  alternates: { canonical: wordToPdfMeta.canonicalSlug },
  openGraph: {
    title: wordToPdfMeta.title,
    description: wordToPdfMeta.description,
    url: `${siteConfig.url}${wordToPdfMeta.canonicalSlug}`,
  },
};

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

      <ContentSummary text={wordToPdfSummary} />

      <RelatedTools tools={getRelatedTools("word-to-pdf")} />
    </Container>
  );
}