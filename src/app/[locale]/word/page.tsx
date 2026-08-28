import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ToolCard } from "@/components/marketing/tool-card";
import { Zap, Lock, UserX } from "lucide-react";
import { InlineTrustStrip } from "@/features/pdf/shared/components/inline-trust-strip";
import { wordTools } from "@/data/tools/tools";
import { siteConfig } from "@/core/config/site";
import type { AppLocale } from "@/i18n/routing";

const HUB_PATH = "/word";

// Même pattern que les autres hubs (pdf/page.tsx) : if/else explicite
// pour garder l'inférence de type de chaque module fr/en.
async function loadContent(locale: AppLocale) {
  if (locale === "en") {
    return import("@/data/categories/en/word");
  }
  return import("@/data/categories/fr/word");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { wordHubHero } = await loadContent(locale as AppLocale);
  const url = `${siteConfig.url}/${locale}${HUB_PATH}`;

  return {
    title: wordHubHero.title,
    description: wordHubHero.subtitle,
    alternates: {
      canonical: url,
      languages: {
        fr: `${siteConfig.url}/fr${HUB_PATH}`,
        en: `${siteConfig.url}/en${HUB_PATH}`,
        "x-default": `${siteConfig.url}/en${HUB_PATH}`,
      },
    },
    openGraph: {
      title: wordHubHero.title,
      description: wordHubHero.subtitle,
      url,
    },
  };
}

export default async function WordHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { wordHubHero } = await loadContent(locale as AppLocale);
  const availableTools = wordTools.filter((tool) => tool.status === "available");

  const trustLabels: Record<AppLocale, { simple: string; local: string; noSignup: string }> = {
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
          {wordHubHero.title}
        </h1>
        <p className="mt-4 text-foreground-muted">{wordHubHero.subtitle}</p>

        {wordHubHero.paragraphs.map((paragraph) => (
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