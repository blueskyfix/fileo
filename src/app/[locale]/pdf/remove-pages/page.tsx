// app/[locale]/pdf/remove-pages/page.tsx
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
import { RemovePagesWidget } from "@/features/pdf/remove-pages";
import { siteConfig } from "@/core/config/site";
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

  return {
    title: removePagesMeta.metaTitle,
    description: removePagesMeta.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/${locale}${path}`,
      languages: {
        fr: `${siteConfig.url}/fr${path}`,
        en: `${siteConfig.url}/en${path}`,
        "x-default": `${siteConfig.url}/en${path}`,
      },
    },
    openGraph: {
      title: removePagesMeta.ogTitle,
      description: removePagesMeta.ogDescription,
      url: `${siteConfig.url}/${locale}${path}`,
      images: [siteConfig.ogImage],
    },
  };
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
            { label: "Traitement local", icon: Lock },
            { label: "Aucun stockage de votre fichier", icon: CloudOff },
            { label: "Tout disparaît à la fermeture", icon: Trash2 },
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