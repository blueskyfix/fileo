import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ToolCard } from "@/components/marketing/tool-card";
import { Zap, Lock, UserX } from "lucide-react";
import { InlineTrustStrip } from "@/features/pdf/shared/components/inline-trust-strip";
import { wordTools } from "@/data/tools/tools";
import { wordHubHero } from "@/data/categories/word";
import { siteConfig } from "@/core/config/site";

const HUB_PATH = "/word";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: wordHubHero.title,
    description: wordHubHero.subtitle,
    alternates: {
      canonical: `${siteConfig.url}/${locale}${HUB_PATH}`,
      languages: {
        fr: `${siteConfig.url}/fr${HUB_PATH}`,
        en: `${siteConfig.url}/en${HUB_PATH}`,
        "x-default": `${siteConfig.url}/en${HUB_PATH}`,
      },
    },
  };
}

export default function WordHubPage() {
  const availableTools = wordTools.filter((tool) => tool.status === "available");
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {wordHubHero.title}
        </h1>
        <p className="mt-4 text-foreground-muted">{wordHubHero.subtitle}</p>

        {wordHubHero.paragraphs.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-sm text-foreground-muted">
            {paragraph}
          </p>
        ))}

        <div className="mt-6 flex justify-center sm:justify-start">
          <InlineTrustStrip
            points={[
              { label: "Simple et direct", icon: Zap },
              { label: "100% traitement local", icon: Lock },
              { label: "Sans inscription", icon: UserX },
            ]}
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {availableTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </Container>
  );
}