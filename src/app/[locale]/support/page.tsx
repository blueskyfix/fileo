import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/core/config/site";

const PATH = "/support";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const url = `${siteConfig.url}/${locale}${PATH}`;
  const title = "Support";
  const description = "Besoin d'aide avec FileoPDF ? Contactez-nous.";

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `${siteConfig.url}/fr${PATH}`,
        en: `${siteConfig.url}/en${PATH}`,
        "x-default": `${siteConfig.url}/en${PATH}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
    },
  };
}

export default async function SupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Support
        </h1>
        <p className="mt-4 text-foreground-muted">
          Une question, un bug, ou une suggestion ? On est là pour aider.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          
           <a href="mailto:contact@fileopdf.app"
            className="flex items-center gap-3 rounded-lg border border-border bg-elevated p-5 transition-colors hover:border-primary"
            >
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium text-foreground">
                contact@fileopdf.app
              </p>
              <p className="text-sm text-foreground-muted">
                Réponse généralement sous 48h
              </p>
            </div>
          </a>

          <p className="text-sm text-foreground-muted">
            Pour les questions les plus courantes sur Merge PDF, consultez
            aussi la{" "}
            <Link
              href={`/${locale}/pdf/merge-pdf#faq`}
              className="text-primary hover:underline"
            >
              FAQ de l&apos;outil
            </Link>
            .
          </p>
        </div>
      </div>
    </Container>
  );
}