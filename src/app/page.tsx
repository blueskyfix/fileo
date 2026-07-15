import type { Metadata } from "next";
import Link from "next/link";
import { Lock, UserX, Gift } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Hero } from "@/components/marketing/hero";
import { ToolCard } from "@/components/marketing/tool-card";
import { pdfTools } from "@/data/tools/tools";
import { siteConfig } from "@/core/config/site";

export const metadata: Metadata = {
  title: "FileoPDF | Outils PDF rapides et sécurisés",
  description: siteConfig.description,
};

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

      <Container className="pb-20">
        <h2 className="mb-10 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Pourquoi FileoPDF
        </h2>

        <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-3">
          {whyPoints.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <p className="font-semibold text-foreground">{title}</p>
              <p className="text-sm text-foreground-muted">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}