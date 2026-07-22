import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ToolHeroSplit } from "@/features/pdf/shared/components/tool-hero-split";
import { HowItWorks } from "@/features/pdf/shared/components/how-it-works";
import { BenefitsAndUseCases } from "@/features/pdf/shared/components/benefits-and-use-cases";
import { ToolFaq } from "@/features/pdf/shared/components/tool-faq";
import { ContentSummary } from "@/features/pdf/shared/components/content-summary";
import { RelatedTools } from "@/features/pdf/shared/components/related-tools";
import { getRelatedTools } from "@/data/tools/tools";
import { RotatePdfTool } from "@/features/pdf/rotate-pdf";
import { siteConfig } from "@/core/config/site";
import {
  rotatePdfMeta,
  rotatePdfHero,
  rotatePdfHowItWorks,
  rotatePdfBenefits,
  rotatePdfUseCases,
  rotatePdfFaq,
  rotatePdfSummary,
} from "@/data/tools/rotate-pdf";

export const metadata: Metadata = {
  title: rotatePdfMeta.title,
  description: rotatePdfMeta.description,
  alternates: { canonical: rotatePdfMeta.canonicalSlug },
  openGraph: {
    title: rotatePdfMeta.title,
    description: rotatePdfMeta.description,
    url: `${siteConfig.url}${rotatePdfMeta.canonicalSlug}`,
  },
};

const heroHighlights = [
  "Traitement 100% local",
  "Aucun fichier stocké",
  "Rien ne persiste après fermeture",
];

export default function RotatePdfPage() {
  return (
    <Container className="pb-20">
      <ToolHeroSplit
        title={rotatePdfHero.title}
        description={rotatePdfHero.description}
        highlights={rotatePdfHero.highlights}
      >
        <RotatePdfTool />
      </ToolHeroSplit>
      <HowItWorks steps={rotatePdfHowItWorks} />
      <BenefitsAndUseCases
        benefitsTitle="Pourquoi utiliser Rotate PDF"
        benefits={rotatePdfBenefits}
        useCasesTitle="Cas d'usage"
        useCases={rotatePdfUseCases}
      />
      <ToolFaq items={rotatePdfFaq} />
      <ContentSummary text={rotatePdfSummary.text} />
      <RelatedTools tools={getRelatedTools("rotate-pdf")} />
    </Container>
  );
}