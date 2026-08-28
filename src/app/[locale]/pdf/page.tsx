import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ToolCard } from "@/components/marketing/tool-card";
import { Zap, Lock, UserX } from "lucide-react";
import { InlineTrustStrip } from "@/features/pdf/shared/components/inline-trust-strip";
import { pdfTools } from "@/data/tools/tools";
import { siteConfig } from "@/core/config/site";
import type { AppLocale } from "@/i18n/routing";

const HUB_PATH = "/pdf";

// Même pattern que les pages outils (merge-pdf, compress-image) :
// if/else explicite pour garder l'inférence de type des exports.
async function loadContent(locale: AppLocale) {
  if (locale === "en") {
    return import("@/data/categories/en/pdf");
  }
  return import("@/data/categories/fr/pdf");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { pdfHubHero } = await loadContent(locale as AppLocale);
  const url = `${siteConfig.url}/${locale}${HUB_PATH}`;

  return {
    title: pdfHubHero.title,
    description: pdfHubHero.subtitle,
    alternates: {
      canonical: url,
      languages: {
        fr: `${siteConfig.url}/fr${HUB_PATH}`,
        en: `${siteConfig.url}/en${HUB_PATH}`,
        "x-default": `${siteConfig.url}/en${HUB_PATH}`,
      },
    },
    openGraph: {
      title: pdfHubHero.title,
      description: pdfHubHero.subtitle,
      url,
      images: [siteConfig.ogImage],
    },
  };
}

export default async function PdfHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // pdfHubToolsIntro et pdfHubTrustBlock existent dans le contenu mais
  // n'étaient déjà pas consommés dans la version FR d'origine — conservé
  // à l'identique, à traiter séparément si besoin de les afficher un jour.
  const { pdfHubHero } = await loadContent(locale as AppLocale);
  const availableTools = pdfTools.filter((tool) => tool.status === "available");

  const trustLabels: Record<
    AppLocale,
    { simple: string; local: string; noSignup: string }
  > = {
    fr: {
      simple: "Simple et direct",
      local: "100% traitement local",
      noSignup: "Sans inscription",
    },
    en: {
      simple: "Simple and direct",
      local: "100% local processing",
      noSignup: "No sign-up",
    },
  };
  const trust = trustLabels[locale as AppLocale];

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {pdfHubHero.title}
        </h1>
        <p className="mt-4 text-foreground-muted">{pdfHubHero.subtitle}</p>

        {pdfHubHero.paragraphs.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-sm text-foreground-muted">
            {paragraph}
          </p>
        ))}

        <div className="mt-6 flex justify-center sm:justify-start">
          <InlineTrustStrip
            points={[
              { label: trust.simple, icon: Zap },
              { label: trust.local, icon: Lock },
              { label: trust.noSignup, icon: UserX },
            ]}
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {availableTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} locale={locale as AppLocale} />
        ))}
      </div>
    </Container>
  );
}