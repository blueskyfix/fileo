import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ToolHeroSplit } from "@/features/pdf/shared/components/tool-hero-split";
import { HowItWorks } from "@/features/pdf/shared/components/how-it-works";
import { BenefitsAndUseCases } from "@/features/pdf/shared/components/benefits-and-use-cases";
import { ToolFaq } from "@/features/pdf/shared/components/tool-faq";
import { ContentSummary } from "@/features/pdf/shared/components/content-summary";
import { RelatedTools } from "@/features/pdf/shared/components/related-tools";
import { JpgToPdfWidget } from "@/features/pdf/jpg-to-pdf";
import { siteConfig } from "@/core/config/site";
import {
  jpgToPdfMeta,
  jpgToPdfHero,
  jpgToPdfHowItWorks,
  jpgToPdfBenefits,
  jpgToPdfUseCases,
  jpgToPdfFaq,
  jpgToPdfSummary,
} from "@/data/tools/jpg-to-pdf";

export const metadata: Metadata = {
  title: jpgToPdfMeta.metaTitle,
  description: jpgToPdfMeta.metaDescription,
  alternates: {
    canonical: jpgToPdfMeta.canonicalSlug,
  },
  openGraph: {
    title: jpgToPdfMeta.ogTitle,
    description: jpgToPdfMeta.ogDescription,
    url: `${siteConfig.url}${jpgToPdfMeta.canonicalSlug}`,
  },
};

const heroHighlights = [
  "Traitement 100% local : le calcul se fait directement sur votre appareil.",
  "Aucune image stockée ni mise en file d'attente sur nos serveurs.",
  "Rien ne persiste une fois l'onglet fermé ou la page rechargée.",
];

const relatedTools = [
  {
    name: "Merge PDF",
    description: "Fusionner plusieurs PDF en un seul",
    href: "/pdf/merge-pdf",
  },
  {
    name: "PDF to JPG",
    description: "Extraire les pages d'un PDF en images",
    href: "/pdf/pdf-to-jpg",
  },
];

export default function JpgToPdfPage() {
  return (
    <Container className="pb-20">
      <ToolHeroSplit
        title={jpgToPdfHero.title}
        description={jpgToPdfHero.subtitle}
        highlights={heroHighlights}
      >
        <JpgToPdfWidget />
      </ToolHeroSplit>

      <HowItWorks title={jpgToPdfHowItWorks.title} steps={jpgToPdfHowItWorks.steps} />

      <BenefitsAndUseCases
        benefitsTitle={jpgToPdfBenefits.title}
        benefitsIntro={jpgToPdfBenefits.intro}
        benefits={jpgToPdfBenefits.items}
        useCasesTitle={jpgToPdfUseCases.title}
        useCasesIntro={jpgToPdfUseCases.intro}
        useCases={jpgToPdfUseCases.cases}
      />

      <ToolFaq items={jpgToPdfFaq} />

      <ContentSummary text={jpgToPdfSummary.text} />

      <RelatedTools tools={relatedTools} />
    </Container>
  );
}