import { Link } from "@/i18n/navigation";
import { ArrowRight, Ban, Lock, UserX } from "lucide-react";
import { HeroPreview } from "@/components/marketing/hero-preview";
import type { AppLocale } from "@/i18n/routing";

// Même pattern que les pages outils : if/else explicite pour garder
// l'inférence de type de chaque module fr/en.
async function loadContent(locale: AppLocale) {
  if (locale === "en") {
    return import("@/data/marketing/en/home");
  }
  return import("@/data/marketing/fr/home");
}

const reassuranceIcons = [Lock, UserX, Ban];

export async function Hero({ locale }: { locale: AppLocale }) {
  const { homeHero } = await loadContent(locale);

  return (
    <section className="grid gap-8 py-16 md:grid-cols-2 md:items-center md:gap-12 md:py-24">
      <div className="flex flex-col gap-6">
        <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-primary md:text-5xl">
          {homeHero.titleLead}{" "}
          <span className="text-brand">{homeHero.titleHighlight}</span>
        </h1>

        <p className="max-w-xl text-lg text-foreground-muted">
          {homeHero.subtitle}
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/pdf/compress-pdf"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            {homeHero.ctaPrimaryLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/pdf"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-elevated px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-unelevated"
          >
            {homeHero.ctaSecondaryLabel}
          </Link>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
          {homeHero.reassurance.map((label, index) => {
            const Icon = reassuranceIcons[index];
            if (!Icon) return null;
            return (
              <div key={label} className="flex items-center gap-2">
                <Icon className="h-4 w-4 shrink-0 text-safe" aria-hidden="true" />
                <span className="text-sm text-foreground-muted">{label}</span>
              </div>
            );
          })}
        </div>

        <p className="max-w-xl text-sm text-foreground-muted">{homeHero.proof}</p>
      </div>

      <HeroPreview />
    </section>
  );
}