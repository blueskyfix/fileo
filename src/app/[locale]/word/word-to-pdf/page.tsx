import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ToolHeroSplit } from "@/features/pdf/shared/components/tool-hero-split";
import { HowItWorks } from "@/features/pdf/shared/components/how-it-works";
import { BenefitsAndUseCases } from "@/features/pdf/shared/components/benefits-and-use-cases";
import { ToolFaq } from "@/features/pdf/shared/components/tool-faq";
import { ContentSummary } from "@/features/pdf/shared/components/content-summary";
import { RelatedTools } from "@/features/pdf/shared/components/related-tools";
import { getRelatedTools } from "@/data/tools/tools";
import { WordToPdfWidget } from "@/features/word/word-to-pdf";
import { siteConfig } from "@/core/config/site";
import type { AppLocale } from "@/i18n/routing";

// Chargement du contenu SEO par locale (Option A : fichiers séparés
// fr/word-to-pdf.ts et en/word-to-pdf.ts). if/else explicite plutôt qu'un
// import dynamique par template string, pour garder le typage complet
// de chaque module (un import dynamique `import(`.../${locale}/...`)`
// ferait perdre l'inférence de type sur les exports).
async function loadContent(locale: AppLocale) {
  if (locale === "en") {
    return import("@/data/tools/en/word-to-pdf");
  }
  return import("@/data/tools/fr/word-to-pdf");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { wordToPdfMeta } = await loadContent(locale as AppLocale);
  const path = wordToPdfMeta.canonicalSlug;

  return {
    title: wordToPdfMeta.metaTitle,
    description: wordToPdfMeta.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/${locale}${path}`,
      languages: {
        fr: `${siteConfig.url}/fr${path}`,
        en: `${siteConfig.url}/en${path}`,
        "x-default": `${siteConfig.url}/en${path}`,
      },
    },
    openGraph: {
      title: wordToPdfMeta.ogTitle,
      description: wordToPdfMeta.ogDescription,
      url: `${siteConfig.url}/${locale}${path}`,
    },
  };
}

const heroHighlights: Record<AppLocale, string[]> = {
  fr: ["Traitement 100% local", "Aucun fichier stocké", "Rien ne persiste après fermeture"],
  en: ["100% local processing", "No files stored", "Nothing persists after closing"],
};

export default async function WordToPdfPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const {
    wordToPdfHero,
    wordToPdfHowItWorks,
    wordToPdfBenefits,
    wordToPdfUseCases,
    wordToPdfFaq,
    wordToPdfSummary,
  } = await loadContent(locale as AppLocale);

  return (
    <Container className="pb-20">
      <ToolHeroSplit
        title={wordToPdfHero.title}
        description={wordToPdfHero.subtitle}
        highlights={heroHighlights[locale as AppLocale]}
      >
        <WordToPdfWidget />
      </ToolHeroSplit>

      <HowItWorks title={wordToPdfHowItWorks.title} steps={wordToPdfHowItWorks.steps} />

      <BenefitsAndUseCases
        benefitsTitle={wordToPdfBenefits.title}
        benefitsIntro={wordToPdfBenefits.intro}
        benefits={wordToPdfBenefits.items}
        useCasesTitle={wordToPdfUseCases.title}
        useCasesIntro={wordToPdfUseCases.intro}
        useCases={wordToPdfUseCases.cases}
      />

      <ToolFaq items={wordToPdfFaq} />

      <ContentSummary text={wordToPdfSummary.text} />

      <RelatedTools tools={getRelatedTools("word-to-pdf")} />
    </Container>
  );
}