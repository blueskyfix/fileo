import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ToolCard } from "@/components/marketing/tool-card";
import { Zap, Lock, UserX } from "lucide-react";
import { InlineTrustStrip } from "@/features/pdf/shared/components/inline-trust-strip";
import { pdfTools } from "@/data/tools/tools";
import { pdfHubHero, pdfHubToolsIntro, pdfHubTrustBlock } from "@/data/categories/pdf";

export const metadata: Metadata = {
  title: pdfHubHero.title,
  description: pdfHubHero.subtitle,
};

export default function PdfHubPage() {
  const availableTools = pdfTools.filter((tool) => tool.status === "available");
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
        <div className="mt-6">
        <InlineTrustStrip
          points={[
            { label: "Simple et direct", icon: Zap },
            { label: "100% traitement local", icon: Lock },
            { label: "Sans inscription", icon: UserX },
          ]}
        />
      </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {availableTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </Container>
  );
}