// app/[locale]/pdf/split-pdf/page.tsx
import type { Metadata } from "next";
import { Lock, CloudOff, Trash2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { ToolHeroSplit } from "@/features/pdf/shared/components/tool-hero-split";
import { InlineTrustStrip } from "@/features/pdf/shared/components/inline-trust-strip";
import { HowItWorks } from "@/features/pdf/shared/components/how-it-works";
import { BenefitsAndUseCases } from "@/features/pdf/shared/components/benefits-and-use-cases";
import { ToolFaq } from "@/features/pdf/shared/components/tool-faq";
import { ContentSummary } from "@/features/pdf/shared/components/content-summary";
import { RelatedTools } from "@/features/pdf/shared/components/related-tools";
import { getRelatedTools } from "@/data/tools/tools";
import { SplitWidget } from "@/features/pdf/split";
import { siteConfig } from "@/core/config/site";
import type { AppLocale } from "@/i18n/routing";

async function loadContent(locale: AppLocale) {
  if (locale === "en") {
    return import("@/data/tools/en/split-pdf");
  }
  return import("@/data/tools/fr/split-pdf");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { splitPdfMeta } = await loadContent(locale as AppLocale);
  const path = splitPdfMeta.canonicalSlug;

  return {
    title: splitPdfMeta.metaTitle,
    description: splitPdfMeta.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/${locale}${path}`,
      languages: {
        fr: `${siteConfig.url}/fr${path}`,
        en: `${siteConfig.url}/en${path}`,
        "x-default": `${siteConfig.url}/en${path}`,
      },
    },
    openGraph: {
      title: splitPdfMeta.ogTitle,
      description: splitPdfMeta.ogDescription,
      url: `${siteConfig.url}/${locale}${path}`,
      images: [siteConfig.ogImage],
    },
  };
}

const heroHighlights: Record<AppLocale, string[]> = {
  fr: ["Traitement 100% local", "Aucun fichier stocké", "Rien ne persiste après fermeture"],
  en: ["100% local processing", "No files stored", "Nothing persists after closing"],
};

export default async function SplitPdfPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const {
    splitPdfHero,
    splitPdfTrustBlock,
    splitPdfHowItWorks,
    splitPdfBenefits,
    splitPdfUseCases,
    splitPdfFaq,
    splitPdfSummary,
  } = await loadContent(locale as AppLocale);

  return (
    <Container className="pb-20">
      <ToolHeroSplit
        title={splitPdfHero.title}
        description={splitPdfHero.subtitle}
        highlights={heroHighlights[locale as AppLocale]}
      >
        <SplitWidget />
      </ToolHeroSplit>

      <section className="mt-16 space-y-4">
        <h2 className="text-2xl font-bold text-foreground">{splitPdfTrustBlock.title}</h2>
        <p className="max-w-2xl text-foreground-muted">{splitPdfTrustBlock.intro}</p>
        <InlineTrustStrip
          points={[
            { label: "Traitement local", icon: Lock },
            { label: "Aucun stockage de votre fichier", icon: CloudOff },
            { label: "Tout disparaît à la fermeture", icon: Trash2 },
          ]}
        />
      </section>

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

      <RelatedTools tools={getRelatedTools("split-pdf", locale as AppLocale)} />
    </Container>
  );
}