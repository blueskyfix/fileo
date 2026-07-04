import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ToolCard } from "@/components/marketing/tool-card";
import { FeatureGrid } from "@/features/pdf/shared/components/feature-grid";
import { pdfTools } from "@/data/tools/tools";
import { pdfHubHero, pdfHubToolsIntro, pdfHubTrustBlock } from "@/data/categories/pdf";

if (typeof window !== "undefined" && window.location.search.includes("test-sentry")) {
  throw new Error("Test Sentry — à retirer après vérification");
}

export const metadata: Metadata = {
  title: pdfHubHero.title,
  description: pdfHubHero.subtitle,
};

export default function PdfHubPage() {
  return (
    <Container className="py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {pdfHubHero.title}
        </h1>
        <p className="mt-4 text-foreground-muted">{pdfHubHero.subtitle}</p>

        {pdfHubHero.paragraphs.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-sm text-foreground-muted">
            {paragraph}
          </p>
        ))}
      </div>

      <p className="mt-10 text-sm text-foreground-muted">{pdfHubToolsIntro.text}</p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pdfTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>

      <FeatureGrid title={pdfHubTrustBlock.title} items={pdfHubTrustBlock.items} />
    </Container>
  );
}