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
  const availableTools = pdfTools.filter((tool) => tool.status === "available");

  return (
    <>
      <Container>
        <Hero />
      </Container>

      <Container className="pb-20">
        <h2 className="mb-10 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Outils populaires
        </h2>

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {availableTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-foreground-muted">
          <Link href="/pdf" className="font-medium text-primary hover:underline">
            Voir tous les outils PDF
          </Link>
        </p>
      </Container>
    </>
  );
}