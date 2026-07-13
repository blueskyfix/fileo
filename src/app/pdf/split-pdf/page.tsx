import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ToolHeroSplit } from "@/features/pdf/shared/components/tool-hero-split";
import { HowItWorks } from "@/features/pdf/shared/components/how-it-works";
import { BenefitsAndUseCases } from "@/features/pdf/shared/components/benefits-and-use-cases";
import { ToolFaq } from "@/features/pdf/shared/components/tool-faq";
import { ContentSummary } from "@/features/pdf/shared/components/content-summary";
import { RelatedTools } from "@/features/pdf/shared/components/related-tools";
import { FileStack, FileImage } from "lucide-react";
import { SplitWidget } from "@/features/pdf/split";
import { siteConfig } from "@/core/config/site";
import {
  splitPdfMeta,
  splitPdfHero,
  splitPdfHowItWorks,
  splitPdfBenefits,
  splitPdfUseCases,
  splitPdfFaq,
  splitPdfSummary,
} from "@/data/tools/split-pdf";

export const metadata: Metadata = {
  title: splitPdfMeta.metaTitle,
  description: splitPdfMeta.metaDescription,
  alternates: {
    canonical: splitPdfMeta.canonicalSlug,
  },
  openGraph: {
    title: splitPdfMeta.ogTitle,
    description: splitPdfMeta.ogDescription,
    url: `${siteConfig.url}${splitPdfMeta.canonicalSlug}`,
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
    name: "PDF to JPG",
    description: "Extraire les pages d'un PDF en images",
    href: "/pdf/pdf-to-jpg",
    icon: FileImage,
  },
];

export default function SplitPdfPage() {
  return (
    <Container className="pb-20">
      <ToolHeroSplit
        title={splitPdfHero.title}
        description={splitPdfHero.subtitle}
        highlights={heroHighlights}
      >
        <SplitWidget />
      </ToolHeroSplit>

      <HowItWorks title={splitPdfHowItWorks.title} steps={splitPdfHowItWorks.steps} />

      <BenefitsAndUseCases
        benefitsTitle={splitPdfBenefits.title}
        benefitsIntro={splitPdfBenefits.intro}
        benefits={splitPdfBenefits.items}
        useCasesTitle={splitPdfUseCases.title}
        useCasesIntro={splitPdfUseCases.intro}
        useCases={splitPdfUseCases.cases}
      />

      <ToolFaq items={splitPdfFaq} />

      <ContentSummary text={splitPdfSummary.text} />

      <RelatedTools tools={relatedTools} />
    </Container>
  );
}