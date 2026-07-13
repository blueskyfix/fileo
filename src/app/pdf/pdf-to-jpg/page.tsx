import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ToolHeroSplit } from "@/features/pdf/shared/components/tool-hero-split";
import { HowItWorks } from "@/features/pdf/shared/components/how-it-works";
import { BenefitsAndUseCases } from "@/features/pdf/shared/components/benefits-and-use-cases";
import { ToolFaq } from "@/features/pdf/shared/components/tool-faq";
import { ContentSummary } from "@/features/pdf/shared/components/content-summary";
import { RelatedTools } from "@/features/pdf/shared/components/related-tools";
import { FileStack, Scissors } from "lucide-react";
import { PdfToJpgWidget } from "@/features/pdf/pdf-to-jpg";
import { siteConfig } from "@/core/config/site";
import {
  pdfToJpgMeta,
  pdfToJpgHero,
  pdfToJpgHowItWorks,
  pdfToJpgBenefits,
  pdfToJpgUseCases,
  pdfToJpgFaq,
  pdfToJpgSummary,
} from "@/data/tools/pdf-to-jpg";

export const metadata: Metadata = {
  title: pdfToJpgMeta.metaTitle,
  description: pdfToJpgMeta.metaDescription,
  alternates: {
    canonical: pdfToJpgMeta.canonicalSlug,
  },
  openGraph: {
    title: pdfToJpgMeta.ogTitle,
    description: pdfToJpgMeta.ogDescription,
    url: `${siteConfig.url}${pdfToJpgMeta.canonicalSlug}`,
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

export default function PdfToJpgPage() {
  return (
    <Container className="pb-20">
      <ToolHeroSplit
        title={pdfToJpgHero.title}
        description={pdfToJpgHero.subtitle}
        highlights={heroHighlights}
      >
        <PdfToJpgWidget />
      </ToolHeroSplit>

      <HowItWorks title={pdfToJpgHowItWorks.title} steps={pdfToJpgHowItWorks.steps} />

      <BenefitsAndUseCases
        benefitsTitle={pdfToJpgBenefits.title}
        benefitsIntro={pdfToJpgBenefits.intro}
        benefits={pdfToJpgBenefits.items}
        useCasesTitle={pdfToJpgUseCases.title}
        useCasesIntro={pdfToJpgUseCases.intro}
        useCases={pdfToJpgUseCases.cases}
      />

      <ToolFaq items={pdfToJpgFaq} />

      <ContentSummary text={pdfToJpgSummary.text} />

      <RelatedTools tools={relatedTools} />
    </Container>
  );
}