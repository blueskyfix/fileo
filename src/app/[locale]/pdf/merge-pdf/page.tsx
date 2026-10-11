// app/[locale]/pdf/merge-pdf/page.tsx
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
import { MergeTool } from "@/features/pdf/merge";
import { buildPageMetadata } from "@/core/seo/metadata";
import type { AppLocale } from "@/i18n/routing";

async function loadContent(locale: AppLocale) {
  if (locale === "en") {
    return import("@/data/tools/en/merge-pdf");
  }
  return import("@/data/tools/fr/merge-pdf");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { mergePdfMeta } = await loadContent(locale as AppLocale);
  const path = mergePdfMeta.canonicalSlug;

  return buildPageMetadata({
    locale,
    path: path,
    title: mergePdfMeta.metaTitle,
    description: mergePdfMeta.metaDescription,
    ogTitle: mergePdfMeta.ogTitle,
    ogDescription: mergePdfMeta.ogDescription,
  });
}

const heroHighlights: Record<AppLocale, string[]> = {
  fr: ["Traitement 100% local", "Aucun fichier stocké", "Rien ne persiste après fermeture"],
  en: ["100% local processing", "No files stored", "Nothing persists after closing"],
};

export default async function MergePdfPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const {
    mergePdfHero,
    mergePdfTrustBlock,
    mergePdfHowItWorks,
    mergePdfBenefits,
    mergePdfUseCases,
    mergePdfFaq,
    mergePdfSummary,
  } = await loadContent(locale as AppLocale);

  return (
    <Container className="pb-20">
      <ToolJsonLd locale={locale as AppLocale} slug="merge-pdf" />
      <ToolHeroSplit
        title={mergePdfHero.title}
        description={mergePdfHero.subtitle}
        highlights={heroHighlights[locale as AppLocale]}
      >
        <MergeTool />
      </ToolHeroSplit>

      <section className="mt-16 space-y-4 pb-16">
        <h2 className="text-2xl font-bold text-foreground">{mergePdfTrustBlock.title}</h2>
        <p className="max-w-2xl text-foreground-muted">{mergePdfTrustBlock.intro}</p>
        <InlineTrustStrip
          points={[
            { label: mergePdfTrustBlock.points[0]?.title ?? "", icon: Lock },
            { label: mergePdfTrustBlock.points[1]?.title ?? "", icon: CloudOff },
            { label: mergePdfTrustBlock.points[2]?.title ?? "", icon: Trash2 },
          ]}
        />
      </section>

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

      <RelatedTools tools={getRelatedTools("merge-pdf", locale as AppLocale)} />
    </Container>
  );
}