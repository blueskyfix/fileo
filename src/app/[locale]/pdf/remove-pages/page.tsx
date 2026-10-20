// app/[locale]/pdf/remove-pages/page.tsx
import type { Metadata } from "next";
import { Lock, CloudOff, Trash2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { ToolJsonLd } from "@/components/seo/tool-json-ld";
import { ToolHeroSplit } from "@/features/pdf/shared/components/tool-hero-split";
import { InlineTrustStrip } from "@/features/pdf/shared/components/inline-trust-strip";
import { HowItWorks } from "@/features/pdf/shared/components/how-it-works";
import { BenefitsAndUseCases } from "@/features/pdf/shared/components/benefits-and-use-cases";
import { ToolFaq } from "@/features/pdf/shared/components/tool-faq";
import { ContentSummary } from "@/features/pdf/shared/components/content-summary";
import { RelatedTools } from "@/features/pdf/shared/components/related-tools";
import { getRelatedTools } from "@/data/tools/tools";
import { RemovePagesWidget } from "@/features/pdf/remove-pages";
import { buildPageMetadata } from "@/core/seo/metadata";
import type { AppLocale } from "@/i18n/routing";

async function loadContent(locale: AppLocale) {
  if (locale === "en") {
    return import("@/data/tools/en/remove-pages");
  }
  return import("@/data/tools/fr/remove-pages");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { removePagesMeta } = await loadContent(locale as AppLocale);
  const path = removePagesMeta.canonicalSlug;

  return buildPageMetadata({
    locale,
    path: path,
    title: removePagesMeta.metaTitle,
    description: removePagesMeta.metaDescription,
    ogTitle: removePagesMeta.ogTitle,
    ogDescription: removePagesMeta.ogDescription,
  });
}

const heroHighlights: Record<AppLocale, string[]> = {
  fr: ["Traitement 100% local", "Aucun fichier stocké", "Rien ne persiste après fermeture"],
  en: ["100% local processing", "No files stored", "Nothing persists after closing"],
};

export default async function RemovePagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const {
    removePagesHero,
    removePagesTrustBlock,
    removePagesHowItWorks,
    removePagesBenefits,
    removePagesUseCases,
    removePagesFaq,
    removePagesSummary,
  } = await loadContent(locale as AppLocale);

  return (
    <Container className="pb-20">
      <ToolJsonLd locale={locale as AppLocale} slug="remove-pages" />
      <ToolHeroSplit
        title={removePagesHero.title}
        description={removePagesHero.subtitle}
        highlights={heroHighlights[locale as AppLocale]}
      >
        <RemovePagesWidget />
      </ToolHeroSplit>

      <section className="mt-16 space-y-4">
        <h2 className="text-2xl font-bold text-foreground">{removePagesTrustBlock.title}</h2>
        <p className="max-w-2xl text-foreground-muted">{removePagesTrustBlock.intro}</p>
        <InlineTrustStrip
          points={[
            { label: removePagesTrustBlock.points[0]?.title ?? "", icon: Lock },
            { label: removePagesTrustBlock.points[1]?.title ?? "", icon: CloudOff },
            { label: removePagesTrustBlock.points[2]?.title ?? "", icon: Trash2 },
          ]}
        />
      </section>

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

      <RelatedTools tools={getRelatedTools("remove-pages", locale as AppLocale)} />
    </Container>
  );
}