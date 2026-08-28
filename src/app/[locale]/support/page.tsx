import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/core/config/site";
import type { AppLocale } from "@/i18n/routing";

const PATH = "/support";

type SupportContent = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  emailNote: string;
  faqPre: string;
  faqLinkLabel: string;
  faqPost: string;
};

const content: Record<AppLocale, SupportContent> = {
  fr: {
    metaTitle: "Contacter le support FileoPDF",
    metaDescription:
      "Une question sur FileoPDF ? Contactez notre équipe par email ou consultez la FAQ de nos outils PDF pour trouver rapidement une réponse.",
    h1: "Support",
    intro: "Une question, un bug, ou une suggestion ? On est là pour aider.",
    emailNote: "Réponse généralement sous 48h",
    faqPre:
      "Pour les questions les plus courantes sur Merge PDF, consultez aussi la ",
    faqLinkLabel: "FAQ de l'outil",
    faqPost: ".",
  },
  en: {
    metaTitle: "Contact FileoPDF support",
    metaDescription:
      "Have a question about FileoPDF? Reach our team by email or check the FAQ on our PDF tools to quickly find the answer you need.",
    h1: "Support",
    intro: "A question, a bug, or a suggestion? We're here to help.",
    emailNote: "We usually reply within 48 hours",
    faqPre: "For common questions about Merge PDF, also check the tool's ",
    faqLinkLabel: "FAQ",
    faqPost: ".",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = content[locale as AppLocale];
  const url = `${siteConfig.url}/${locale}${PATH}`;

  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical: url,
      languages: {
        fr: `${siteConfig.url}/fr${PATH}`,
        en: `${siteConfig.url}/en${PATH}`,
        "x-default": `${siteConfig.url}/en${PATH}`,
      },
    },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url,
      images: [siteConfig.ogImage],
    },
  };
}

export default async function SupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = content[locale as AppLocale];

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {c.h1}
        </h1>
        <p className="mt-4 text-foreground-muted">{c.intro}</p>

        <div className="mt-8 flex flex-col gap-4">
          
          <a href="mailto:contact@fileopdf.app" className="flex items-center gap-3 rounded-lg border border-border bg-elevated p-5 transition-colors hover:border-primary">
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium text-foreground">contact@fileopdf.app</p>
              <p className="text-sm text-foreground-muted">{c.emailNote}</p>
            </div>
          </a>

          <p className="text-sm text-foreground-muted">
            {c.faqPre}
            <Link
              href={`/${locale}/pdf/merge-pdf#faq`}
              className="text-primary hover:underline"
            >
              {c.faqLinkLabel}
            </Link>
            {c.faqPost}
          </p>
        </div>
      </div>
    </Container>
  );
}