import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ToolHeroSplit } from "@/features/pdf/shared/components/tool-hero-split";
import { HowItWorks } from "@/features/pdf/shared/components/how-it-works";
import { BenefitsAndUseCases } from "@/features/pdf/shared/components/benefits-and-use-cases";
import { ToolFaq } from "@/features/pdf/shared/components/tool-faq";
import { ContentSummary } from "@/features/pdf/shared/components/content-summary";
import { RelatedTools } from "@/features/pdf/shared/components/related-tools";
import { getRelatedTools } from "@/data/tools/tools";
import { RemovePagesWidget } from "@/features/pdf/remove-pages";
import { siteConfig } from "@/core/config/site";
import {
  removePagesMeta,
  removePagesHero,
  removePagesHowItWorks,
  removePagesBenefits,
  removePagesUseCases,
  removePagesFaq,
  removePagesSummary,
} from "@/data/tools/remove-pages";

export const metadata: Metadata = {
  title: removePagesMeta.metaTitle,
  description: removePagesMeta.metaDescription,
  alternates: {
    canonical: removePagesMeta.canonicalSlug,
  },
  openGraph: {
    title: removePagesMeta.ogTitle,
    description: removePagesMeta.ogDescription,
    url: `${siteConfig.url}${removePagesMeta.canonicalSlug}`,
  },
};

const heroHighlights = [
  "Traitement 100% local : le calcul se fait directement sur votre appareil.",
  "Aucun fichier stocké ni mis en file d'attente sur nos serveurs.",
  "Rien ne persiste une fois l'onglet fermé ou la page rechargée.",
];

export default function RemovePagesPage() {
  return (
    <Container className="pb-20">
      <ToolHeroSplit
        title={removePagesHero.title}
        description={removePagesHero.subtitle}
        highlights={heroHighlights}
      >
        <RemovePagesWidget />
      </ToolHeroSplit>

      <HowItWorks title={removePagesHowItWorks.title} steps={removePagesHowItWorks.steps} />

      <BenefitsAndUseCases
        benefitsTitle={removePagesBenefits.title}
        benefitsIntro={removePagesBenefits.intro}
        benefits={removePagesBenefits.items}
        useCasesTitle={removePagesUseCases.title}
        useCasesIntro={removePagesUseCases.intro}
        useCases={removePagesUseCases.cases}
      />

      <ToolFaq items={removePagesFaq} />

      <ContentSummary text={removePagesSummary.text} />

      <RelatedTools tools={getRelatedTools("remove-pages")} />
    </Container>
  );
}