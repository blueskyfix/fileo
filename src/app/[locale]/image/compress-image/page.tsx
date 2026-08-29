import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ToolHeroSplit } from "@/features/pdf/shared/components/tool-hero-split";
import { HowItWorks } from "@/features/pdf/shared/components/how-it-works";
import { BenefitsAndUseCases } from "@/features/pdf/shared/components/benefits-and-use-cases";
import { ToolFaq } from "@/features/pdf/shared/components/tool-faq";
import { ContentSummary } from "@/features/pdf/shared/components/content-summary";
import { RelatedTools } from "@/features/pdf/shared/components/related-tools";
import { getRelatedTools } from "@/data/tools/tools";
import { CompressImageWidget } from "@/features/images/compress";
import { siteConfig } from "@/core/config/site";
import type { AppLocale } from "@/i18n/routing";

async function loadContent(locale: AppLocale) {
  if (locale === "en") {
    return import("@/data/tools/en/compress-image");
  }
  return import("@/data/tools/fr/compress-image");
}

const relatedToolsTitle: Record<AppLocale, string> = {
  fr: "Voir aussi",
  en: "See also",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { compressImageMeta } = await loadContent(locale as AppLocale);
  const path = compressImageMeta.canonicalSlug;

  return {
    title: compressImageMeta.metaTitle,
    description: compressImageMeta.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/${locale}${path}`,
      languages: {
        fr: `${siteConfig.url}/fr${path}`,
        en: `${siteConfig.url}/en${path}`,
        "x-default": `${siteConfig.url}/en${path}`,
      },
    },
    openGraph: {
      title: compressImageMeta.ogTitle,
      description: compressImageMeta.ogDescription,
      url: `${siteConfig.url}/${locale}${path}`,
      images: [siteConfig.ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: compressImageMeta.ogTitle,
      description: compressImageMeta.ogDescription,
      images: [siteConfig.ogImage],
    },
  };
}

const heroHighlights: Record<AppLocale, string[]> = {
  fr: ["Traitement 100% local", "Aucun fichier stocké", "Rien ne persiste après fermeture"],
  en: ["100% local processing", "No files stored", "Nothing persists after closing"],
};

export default async function CompressImagePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const appLocale = locale as AppLocale;
  const {
    compressImageHero,
    compressImageHowItWorks,
    compressImageBenefits,
    compressImageUseCases,
    compressImageFaq,
    compressImageSummary,
  } = await loadContent(appLocale);

  return (
    <Container className="pb-20">
      <ToolHeroSplit
        title={compressImageHero.title}
        description={compressImageHero.subtitle}
        highlights={heroHighlights[appLocale]}
      >
        <CompressImageWidget />
      </ToolHeroSplit>

      <HowItWorks title={compressImageHowItWorks.title} steps={compressImageHowItWorks.steps} />

      <BenefitsAndUseCases
        benefitsTitle={compressImageBenefits.title}
        benefitsIntro={compressImageBenefits.intro}
        benefits={compressImageBenefits.items}
        useCasesTitle={compressImageUseCases.title}
        useCasesIntro={compressImageUseCases.intro}
        useCases={compressImageUseCases.cases}
      />

      <ToolFaq items={compressImageFaq} />

      <ContentSummary text={compressImageSummary.text} />

      <RelatedTools
        title={relatedToolsTitle[appLocale]}
        tools={getRelatedTools("compress-image", appLocale)}
      />
    </Container>
  );
}