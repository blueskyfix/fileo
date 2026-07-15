import Link from "next/link";
import { ArrowRight, Zap, Lock, UserX } from "lucide-react";
import { HeroPreview } from "@/components/marketing/hero-preview";

const reassurance = [
  { icon: Zap, label: "Simple et direct" },
  { icon: Lock, label: "100% traitement local" },
  { icon: UserX, label: "Sans inscription" },
];

export function Hero() {
  return (
    <section className="grid gap-12 py-16 md:grid-cols-2 md:items-center md:py-24">
      <div className="flex flex-col gap-6">
        <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
          Traitez vos PDFs, <span className="text-primary">simplement</span>.
        </h1>

        <p className="max-w-xl text-lg text-foreground-muted">
          Fusionnez, découpez et convertissez vos PDF dans votre navigateur en toute confidentialite et sans inscription.
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

        <div className="hidden flex-wrap gap-x-6 gap-y-2 pt-1 md:flex">
          {reassurance.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="h-4 w-4 shrink-0 text-primary" />
              <span className="text-sm text-foreground-muted">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden md:block">
        <HeroPreview />
      </div>
    </section>
  );
}