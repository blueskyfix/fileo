import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroPreview } from "@/components/marketing/hero-preview";

export function Hero() {
  return (
    <section className="grid gap-12 py-16 md:grid-cols-2 md:items-center md:py-24">
      <div className="flex flex-col gap-6">
        <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
          Fusionnez, découpez et gérez vos PDF.{" "}
          <span className="text-primary">Simplement. Localement.</span>
        </h1>

        <p className="max-w-xl text-lg text-foreground-muted">
          Tous les outils PDF dont vous avez besoin, directement dans votre
          navigateur. Sans inscription. Sans compromis sur la confidentialité.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/pdf/merge-pdf"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-[filter] hover:brightness-110"
          >
            Fusionner un PDF
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/pdf"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-elevated px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-unelevated"
          >
            Voir tous les outils
          </Link>
        </div>
      </div>

      <HeroPreview />
    </section>
  );
}