import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ToolHeroSplit } from "@/features/pdf/shared/components/tool-hero-split";
import { HowItWorks } from "@/features/pdf/shared/components/how-it-works";
import { BenefitsAndUseCases } from "@/features/pdf/shared/components/benefits-and-use-cases";
import { ToolFaq } from "@/features/pdf/shared/components/tool-faq";
import { ContentSummary } from "@/features/pdf/shared/components/content-summary";
import { RelatedTools } from "@/features/pdf/shared/components/related-tools";
import { getRelatedTools } from "@/data/tools/tools";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = pdfToJpgMeta.canonicalSlug;

  return {
    title: pdfToJpgMeta.metaTitle,
    description: pdfToJpgMeta.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/${locale}${path}`,
      languages: {
        fr: `${siteConfig.url}/fr${path}`,
        en: `${siteConfig.url}/en${path}`,
        "x-default": `${siteConfig.url}/en${path}`,
      },
    },
    openGraph: {
      title: pdfToJpgMeta.ogTitle,
      description: pdfToJpgMeta.ogDescription,
      url: `${siteConfig.url}/${locale}${path}`,
    },
  };
}

const heroHighlights = [
  "Traitement 100% local",
  "Aucun fichier stocké",
  "Rien ne persiste après fermeture",
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

      <RelatedTools tools={getRelatedTools("pdf-to-jpg")} />
    </Container>
  );
}