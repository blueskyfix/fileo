import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ToolCard } from "@/components/marketing/tool-card";
import { pdfTools } from "@/data/tools/tools";

export const metadata: Metadata = {
  title: "Outils PDF",
  description:
    "Fusionnez, découpez et modifiez vos fichiers PDF directement dans votre navigateur, sans envoi sur un serveur.",
};

export default function PdfHubPage() {
  return (
    <Container className="py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Outils PDF
        </h1>
        <p className="mt-4 text-foreground-muted">
          Une suite d&apos;outils pour manipuler vos PDF sans quitter votre
          navigateur. Aucun fichier n&apos;est envoyé sur un serveur : tout le
          traitement se fait localement, sur votre machine.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pdfTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </Container>
  );
}