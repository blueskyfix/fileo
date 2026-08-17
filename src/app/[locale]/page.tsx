import type { Metadata } from "next";
import Link from "next/link";
import { Lock, UserX, Gift } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Hero } from "@/components/marketing/hero";
import { ToolCard } from "@/components/marketing/tool-card";
import { pdfTools } from "@/data/tools/tools";
import { siteConfig } from "@/core/config/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "FileoPDF | Outils PDF rapides et sécurisés",
    description: siteConfig.description,
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: {
        fr: `${siteConfig.url}/fr`,
        en: `${siteConfig.url}/en`,
        "x-default": `${siteConfig.url}/en`,
      },
    },
  };
}

const whyPoints = [
  {
    icon: Lock,
    title: "Traitement 100% local",
    description: "Vos fichiers ne quittent jamais votre appareil, aucun envoi vers un serveur.",
  },
  {
    icon: UserX,
    title: "Sans inscription",
    description: "Aucun compte, aucune adresse e-mail à fournir pour utiliser les outils.",
  },
  {
    icon: Gift,
    title: "Gratuit, sans limite",
    description: "Aucun palier payant caché pour des fonctionnalités de base.",
  },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const availableTools = pdfTools.filter((tool) => tool.status === "available");

  return (
    <>
      <Container>
        <Hero />
      </Container>

      <Container className="hidden pb-20 md:block">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Outils populaires
        </h2>

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {availableTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>

        <p className="mt-8 text-center">
          <Link href={`/${locale}/pdf`} className="inline-flex items-center gap-2 rounded-lg border border-border bg-elevated px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-unelevated">
            Voir tous les outils PDF
          </Link>
        </p>
      </Container>

      <Container className="px-6 pb-20 sm:px-6">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-foreground md:text-3xl">
          Pourquoi utiliser FileoPDF ?
        </h2>

        <div className="mx-auto grid max-w-4xl gap-12 sm:grid-cols-3 sm:gap-10">
          {whyPoints.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-lg font-semibold text-foreground sm:text-base">{title}</p>
              <p className="text-base leading-relaxed text-foreground-muted sm:text-sm">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}