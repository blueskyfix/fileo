import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Hero } from "@/components/marketing/hero";
import { ToolCard } from "@/components/marketing/tool-card";
import { pdfTools } from "@/data/tools/tools";
import { siteConfig } from "@/core/config/site";

export const metadata: Metadata = {
  title: "Outils PDF rapides et sécurisés",
  description: siteConfig.description,
};

export default function HomePage() {
  const mergeTool = pdfTools.find((tool) => tool.slug === "merge-pdf")!;

  return (
    <>
      <Container>
        <Hero />
      </Container>

    <Container className="pb-20">
      <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-foreground">
        Outils déjà disponibles
      </h2>

      <div className="mx-auto max-w-sm">
        <ToolCard tool={mergeTool} />
      </div>

      <p className="mt-6 text-center text-sm text-foreground-muted">
        <Link href="/pdf" className="font-medium text-primary hover:underline">
          Voir tous les outils PDF
        </Link>
      </p>
    </Container>
    </>
  );
}