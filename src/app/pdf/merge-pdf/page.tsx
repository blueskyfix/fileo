import type { Metadata } from "next";
import { Lock, Ban, X } from "lucide-react";
import { Container } from "@/components/layout/container";
import { ToolPageHeader } from "@/features/pdf/shared/components/tool-page-header";
import { FeatureGrid } from "@/features/pdf/shared/components/feature-grid";
import { HowItWorks } from "@/features/pdf/shared/components/how-it-works";
import { ToolFaq } from "@/features/pdf/shared/components/tool-faq";
import { ContentSummary } from "@/features/pdf/shared/components/content-summary";
import { MergeTool } from "@/features/pdf/merge";
import { siteConfig } from "@/core/config/site";
import {
  mergePdfMeta,
  mergePdfHero,
  mergePdfTrustBlock,
  mergePdfHowItWorks,
  mergePdfBenefits,
  mergePdfUseCases,
  mergePdfFaq,
  mergePdfSummary,
} from "@/data/tools/merge-pdf";

export const metadata: Metadata = {
  title: mergePdfMeta.metaTitle,
  description: mergePdfMeta.metaDescription,
  alternates: {
    canonical: mergePdfMeta.canonicalSlug,
  },
  openGraph: {
    title: mergePdfMeta.ogTitle,
    description: mergePdfMeta.ogDescription,
    url: `${siteConfig.url}${mergePdfMeta.canonicalSlug}`,
  },
};

const trustIcons = [Lock, Ban, X];

export default function MergePdfPage() {
  return (
    <Container className="pb-20">
      <ToolPageHeader
        eyebrow={mergePdfHero.eyebrow}
        title={mergePdfHero.title}
        description={mergePdfHero.subtitle}
      />

      <MergeTool />

      <FeatureGrid
        title={mergePdfTrustBlock.title}
        intro={mergePdfTrustBlock.intro}
        items={mergePdfTrustBlock.points}
        icons={trustIcons}
        emphasized
      />

      <HowItWorks title={mergePdfHowItWorks.title} steps={mergePdfHowItWorks.steps} />

      <FeatureGrid
        title={mergePdfBenefits.title}
        intro={mergePdfBenefits.intro}
        items={mergePdfBenefits.items}
      />

      <FeatureGrid
        title={mergePdfUseCases.title}
        intro={mergePdfUseCases.intro}
        items={mergePdfUseCases.cases}
        columns={2}
      />

      <ToolFaq items={mergePdfFaq} />

      <ContentSummary text={mergePdfSummary.text} />
    </Container>
  );
}