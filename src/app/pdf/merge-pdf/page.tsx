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
import {
  mergePdfMeta,
  mergePdfHero,
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

const heroHighlights = [
  "Traitement 100% local : le calcul se fait directement sur votre appareil.",
  "Aucun fichier stocké ni mis en file d'attente sur nos serveurs.",
  "Rien ne persiste une fois l'onglet fermé ou la page rechargée.",
];

export default function MergePdfPage() {
  return (
    <Container className="pb-20">
      <ToolHeroSplit
        title={mergePdfHero.title}
        description={mergePdfHero.subtitle}
        highlights={heroHighlights}
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

      <RelatedTools tools={getRelatedTools("merge-pdf")} />
    </Container>
  );
}