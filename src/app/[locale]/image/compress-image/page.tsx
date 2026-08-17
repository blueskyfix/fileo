import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ToolHeroSplit } from "@/features/pdf/shared/components/tool-hero-split";
import { HowItWorks } from "@/features/pdf/shared/components/how-it-works";
import { BenefitsAndUseCases } from "@/features/pdf/shared/components/benefits-and-use-cases";
import { ToolFaq } from "@/features/pdf/shared/components/tool-faq";
import { ContentSummary } from "@/features/pdf/shared/components/content-summary";
import { RelatedTools } from "@/features/pdf/shared/components/related-tools";
import { CompressImageWidget } from "@/features/images/compress";
import { getRelatedTools } from "@/data/tools/tools";
import { siteConfig } from "@/core/config/site";
import {
  compressImageMeta as meta,
  compressImageHero as hero,
  compressImageHowItWorks as howItWorks,
  compressImageBenefits as benefits,
  compressImageUseCases as useCases,
  compressImageFaq as faq,
  compressImageSummary as summary,
} from "@/data/tools/compress-image";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: meta.canonicalSlug },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${siteConfig.url}${meta.canonicalSlug}`,
  },
};

export default function CompressImagePage() {
  return (
    <Container className="pb-20">
      <ToolHeroSplit title={hero.title} description={hero.description} highlights={hero.highlights}>
        <CompressImageWidget />
      </ToolHeroSplit>

      <HowItWorks steps={howItWorks} />

      <BenefitsAndUseCases
        benefitsTitle="Pourquoi compresser vos images"
        benefits={benefits}
        useCasesTitle="Cas d'usage"
        useCases={useCases}
      />

      <ToolFaq items={faq} />

      <ContentSummary text={summary.text} />

      <RelatedTools tools={getRelatedTools("compress-image")} />
    </Container>
  );
}