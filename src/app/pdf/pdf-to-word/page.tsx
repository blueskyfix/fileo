import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ToolHeroSplit } from "@/features/pdf/shared/components/tool-hero-split";
import { HowItWorks } from "@/features/pdf/shared/components/how-it-works";
import { BenefitsAndUseCases } from "@/features/pdf/shared/components/benefits-and-use-cases";
import { ToolFaq } from "@/features/pdf/shared/components/tool-faq";
import { ContentSummary } from "@/features/pdf/shared/components/content-summary";
import { RelatedTools } from "@/features/pdf/shared/components/related-tools";
import { FileStack, Scissors } from "lucide-react";
import { PdfToWordWidget } from "@/features/pdf/pdf-to-word";
import { siteConfig } from "@/core/config/site";
import {
  pdfToWordMeta,
  pdfToWordHero,
  pdfToWordHowItWorks,
  pdfToWordBenefits,
  pdfToWordUseCases,
  pdfToWordFaq,
  pdfToWordSummary,
} from "@/data/tools/pdf-to-word";

export const metadata: Metadata = {
  title: pdfToWordMeta.metaTitle,
  description: pdfToWordMeta.metaDescription,
  alternates: {
    canonical: pdfToWordMeta.canonicalSlug,
  },
  openGraph: {
    title: pdfToWordMeta.ogTitle,
    description: pdfToWordMeta.ogDescription,
    url: `${siteConfig.url}${pdfToWordMeta.canonicalSlug}`,
  },
};

const heroHighlights = [
  "Traitement 100% local : le calcul se fait directement sur votre appareil.",
  "Aucun fichier stocké ni mis en file d'attente sur nos serveurs.",
  "Rien ne persiste une fois l'onglet fermé ou la page rechargée.",
];

const relatedTools = [
  {
    name: "Merge PDF",
    description: "Fusionner plusieurs PDF en un seul",
    href: "/pdf/merge-pdf",
    icon: FileStack,
  },
  {
    name: "Split PDF",
    description: "Extraire ou diviser les pages d'un PDF",
    href: "/pdf/split-pdf",
    icon: Scissors,
  },
];

export default function PdfToWordPage() {
  return (
    <Container className="pb-20">
      <ToolHeroSplit
        title={pdfToWordHero.title}
        description={pdfToWordHero.subtitle}
        highlights={heroHighlights}
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

      <RelatedTools tools={relatedTools} />
    </Container>
  );
}