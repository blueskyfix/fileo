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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = mergePdfMeta.canonicalSlug;

  // TODO (étape 6 du chantier i18n) : title/description traduits pour /en.
  // Pour l'instant seule la structure technique (canonical, hreflang)
  // change selon la locale, le contenu textuel reste identique.
  return {
    title: mergePdfMeta.metaTitle,
    description: mergePdfMeta.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/${locale}${path}`,
      languages: {
        fr: `${siteConfig.url}/fr${path}`,
        en: `${siteConfig.url}/en${path}`,
        // x-default pointe vers /en (public international par défaut,
        // décision du brief i18n).
        "x-default": `${siteConfig.url}/en${path}`,
      },
    },
    openGraph: {
      title: mergePdfMeta.ogTitle,
      description: mergePdfMeta.ogDescription,
      url: `${siteConfig.url}/${locale}${path}`,
    },
  };
}

const heroHighlights = [
  "Traitement 100% local",
  "Aucun fichier stocké",
  "Rien ne persiste après fermeture",
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