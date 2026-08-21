import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ToolHeroSplit } from "@/features/pdf/shared/components/tool-hero-split";
import { HowItWorks } from "@/features/pdf/shared/components/how-it-works";
import { BenefitsAndUseCases } from "@/features/pdf/shared/components/benefits-and-use-cases";
import { ToolFaq } from "@/features/pdf/shared/components/tool-faq";
import { ContentSummary } from "@/features/pdf/shared/components/content-summary";
import { RelatedTools } from "@/features/pdf/shared/components/related-tools";
import { getRelatedTools } from "@/data/tools/tools";
import { JpgToPdfWidget } from "@/features/pdf/jpg-to-pdf";
import { siteConfig } from "@/core/config/site";
import type { AppLocale } from "@/i18n/routing";

// Chargement du contenu SEO par locale (Option A : fichiers séparés
// fr/jpg-to-pdf.ts et en/jpg-to-pdf.ts). if/else explicite plutôt qu'un
// import dynamique par template string, pour garder le typage complet
// de chaque module (un import dynamique `import(`.../${locale}/...`)`
// ferait perdre l'inférence de type sur les exports).
async function loadContent(locale: AppLocale) {
  if (locale === "en") {
    return import("@/data/tools/en/jpg-to-pdf");
  }
  return import("@/data/tools/fr/jpg-to-pdf");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { jpgToPdfMeta } = await loadContent(locale as AppLocale);
  const path = jpgToPdfMeta.canonicalSlug;

  return {
    title: jpgToPdfMeta.metaTitle,
    description: jpgToPdfMeta.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/${locale}${path}`,
      languages: {
        fr: `${siteConfig.url}/fr${path}`,
        en: `${siteConfig.url}/en${path}`,
        "x-default": `${siteConfig.url}/en${path}`,
      },
    },
    openGraph: {
      title: jpgToPdfMeta.ogTitle,
      description: jpgToPdfMeta.ogDescription,
      url: `${siteConfig.url}/${locale}${path}`,
    },
  };
}

const heroHighlights: Record<AppLocale, string[]> = {
  fr: ["Traitement 100% local", "Aucun fichier stocké", "Rien ne persiste après fermeture"],
  en: ["100% local processing", "No files stored", "Nothing persists after closing"],
};

export default async function JpgToPdfPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const {
    jpgToPdfHero,
    jpgToPdfHowItWorks,
    jpgToPdfBenefits,
    jpgToPdfUseCases,
    jpgToPdfFaq,
    jpgToPdfSummary,
  } = await loadContent(locale as AppLocale);

  return (
    <Container className="pb-20">
      <ToolHeroSplit
        title={jpgToPdfHero.title}
        description={jpgToPdfHero.subtitle}
        highlights={heroHighlights[locale as AppLocale]}
      >
        <JpgToPdfWidget />
      </ToolHeroSplit>

      <HowItWorks title={jpgToPdfHowItWorks.title} steps={jpgToPdfHowItWorks.steps} />

      <BenefitsAndUseCases
        benefitsTitle={jpgToPdfBenefits.title}
        benefitsIntro={jpgToPdfBenefits.intro}
        benefits={jpgToPdfBenefits.items}
        useCasesTitle={jpgToPdfUseCases.title}
        useCasesIntro={jpgToPdfUseCases.intro}
        useCases={jpgToPdfUseCases.cases}
      />

      <ToolFaq items={jpgToPdfFaq} />

      <ContentSummary text={jpgToPdfSummary.text} />

      <RelatedTools tools={getRelatedTools("jpg-to-pdf")} />
    </Container>
  );
}