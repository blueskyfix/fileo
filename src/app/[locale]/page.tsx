import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Lock, UserX, Gift } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Hero } from "@/components/marketing/hero";
import { ToolCard } from "@/components/marketing/tool-card";
import { pdfTools } from "@/data/tools/tools";
import { siteConfig } from "@/core/config/site";
import type { AppLocale } from "@/i18n/routing";

// Même pattern que les pages outils : if/else explicite pour garder
// l'inférence de type de chaque module fr/en.
async function loadContent(locale: AppLocale) {
  if (locale === "en") {
    return import("@/data/marketing/en/home");
  }
  return import("@/data/marketing/fr/home");
}

const whyIcons = [Lock, UserX, Gift];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { homeMeta } = await loadContent(locale as AppLocale);

  return {
    title: homeMeta.title,
    description: siteConfig.description,
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: {
        fr: `${siteConfig.url}/fr`,
        en: `${siteConfig.url}/en`,
        "x-default": `${siteConfig.url}/en`,
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { homeToolsSection, homeWhyPoints } = await loadContent(
    locale as AppLocale,
  );
  const availableTools = pdfTools.filter((tool) => tool.status === "available");

  return (
    <>
      <Container>
        <Hero locale={locale as AppLocale} />
      </Container>

      <Container className="hidden pb-20 md:block">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {homeToolsSection.title}
        </h2>

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {availableTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} locale={locale as AppLocale} />
          ))}
        </div>

        <p className="mt-8 text-center">
          <Link
            href="/pdf"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-elevated px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-unelevated"
          >
            {homeToolsSection.viewAllLabel}
          </Link>
        </p>
      </Container>

      <Container className="px-6 pb-20 sm:px-6">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-foreground md:text-3xl">
          {homeWhyPoints.title}
        </h2>

        <div className="mx-auto grid max-w-4xl gap-12 sm:grid-cols-3 sm:gap-10">
          {homeWhyPoints.points.map(({ title, description }, index) => {
            const Icon = whyIcons[index];
            if (!Icon) return null;
            return (
              <div key={title} className="flex flex-col gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-lg font-semibold text-foreground sm:text-base">
                  {title}
                </p>
                <p className="text-base leading-relaxed text-foreground-muted sm:text-sm">
                  {description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
}