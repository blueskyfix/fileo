// app/[locale]/pdf/compress-pdf/page.tsx
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
import { CompressPdfWidget } from "@/features/pdf/compress-pdf";
import { buildPageMetadata } from "@/core/seo/metadata";
import type { AppLocale } from "@/i18n/routing";

async function loadContent(locale: AppLocale) {
  if (locale === "en") {
    return import("@/data/tools/en/compress-pdf");
  }
  return import("@/data/tools/fr/compress-pdf");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { compressPdfMeta } = await loadContent(locale as AppLocale);

  return buildPageMetadata({
    locale,
    path: compressPdfMeta.canonicalSlug,
    title: compressPdfMeta.metaTitle,
    description: compressPdfMeta.metaDescription,
    ogTitle: compressPdfMeta.ogTitle,
    ogDescription: compressPdfMeta.ogDescription,
  });
}

const heroHighlights: Record<AppLocale, string[]> = {
  fr: ["Traitement dans votre navigateur", "Aucun fichier stocké", "Texte conservé et sélectionnable"],
  en: ["Processed in your browser", "No files stored", "Text stays selectable"],
};

export default async function CompressPdfPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const {
    compressPdfHero,
    compressPdfTrustBlock,
    compressPdfHowItWorks,
    compressPdfBenefits,
    compressPdfUseCases,
    compressPdfFaq,
    compressPdfSummary,
  } = await loadContent(locale as AppLocale);

  return (
    <Container className="pb-20">
      <ToolJsonLd locale={locale as AppLocale} slug="compress-pdf" />
      <ToolHeroSplit
        title={compressPdfHero.title}
        description={compressPdfHero.subtitle}
        highlights={heroHighlights[locale as AppLocale]}
      >
        <CompressPdfWidget />
      </ToolHeroSplit>

      <section className="mt-16 space-y-4 pb-16">
        <h2 className="text-2xl font-bold text-foreground">{compressPdfTrustBlock.title}</h2>
        <p className="max-w-2xl text-foreground-muted">{compressPdfTrustBlock.intro}</p>
        <InlineTrustStrip
          points={[
            { label: compressPdfTrustBlock.points[0]?.title ?? "", icon: Lock },
            { label: compressPdfTrustBlock.points[1]?.title ?? "", icon: CloudOff },
            { label: compressPdfTrustBlock.points[2]?.title ?? "", icon: Trash2 },
          ]}
        />
      </section>

      <HowItWorks title={compressPdfHowItWorks.title} steps={compressPdfHowItWorks.steps} />

      <BenefitsAndUseCases
        benefitsTitle={compressPdfBenefits.title}
        benefitsIntro={compressPdfBenefits.intro}
        benefits={compressPdfBenefits.items}
        useCasesTitle={compressPdfUseCases.title}
        useCasesIntro={compressPdfUseCases.intro}
        useCases={compressPdfUseCases.cases}
      />

      <ToolFaq items={compressPdfFaq} />

      <ContentSummary text={compressPdfSummary.text} />

      <RelatedTools tools={getRelatedTools("compress-pdf", locale as AppLocale)} />
    </Container>
  );
}
