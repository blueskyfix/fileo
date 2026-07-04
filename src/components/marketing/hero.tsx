import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TrustBadge } from "@/components/marketing/trust-badge";

export function Hero() {
  return (
    <section className="flex flex-col items-center gap-6 py-20 text-center md:py-28">
      <TrustBadge />

      <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        L&apos;infrastructure documentaire de précision
      </h1>

      <p className="max-w-xl text-lg text-foreground-muted">
        Fusionnez vos PDF directement dans votre navigateur. Rapide, sécurisé,
        sans envoi de fichier sur un serveur.
      </p>

      <Link
        href="/pdf/merge-pdf"
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-[filter] hover:brightness-110"
      >
        Fusionner un PDF
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}