import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/core/config/site";
import type { AppLocale } from "@/i18n/routing";

const PATH = "/terms";

type TermsContent = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lastUpdated: string;
  section1Title: string;
  section1Body: string;
  section2Title: string;
  section2Body: string;
  section3Title: string;
  section3Body: string;
  section4Title: string;
  section4Body: string;
  section5Title: string;
  section5Body: string;
  section6Title: string;
  section6Body: string;
};

const content: Record<AppLocale, TermsContent> = {
  fr: {
    metaTitle: "Conditions d'utilisation FileoPDF",
    metaDescription:
      "Consultez les conditions d'utilisation de FileoPDF : usage acceptable, propriété de vos fichiers PDF, absence de garantie et droit applicable.",
    h1: "Conditions d'utilisation",
    lastUpdated: "Dernière mise à jour : juillet 2026",
    section1Title: "Description du service",
    section1Body:
      "FileoPDF propose des outils gratuits de traitement de fichiers PDF, exécutés directement dans votre navigateur. Aucun compte n'est requis pour les utiliser.",
    section2Title: "Utilisation acceptable",
    section2Body:
      "Vous vous engagez à utiliser FileoPDF dans le respect des lois en vigueur. Vous restez seul responsable du contenu des fichiers que vous traitez avec les outils du site.",
    section3Title: "Propriété de vos fichiers",
    section3Body:
      "Vos fichiers PDF et leur contenu restent votre propriété exclusive. FileoPDF n'acquiert aucun droit sur eux, ne les stocke pas, et n'y a techniquement pas accès puisque le traitement se fait localement sur votre appareil.",
    section4Title: "Absence de garantie",
    section4Body:
      "FileoPDF est fourni « en l'état », sans garantie d'aucune sorte quant à la disponibilité continue du service ou l'absence totale d'erreur. Nous vous recommandons de vérifier le résultat de tout traitement avant un usage définitif ou critique de vos documents.",
    section5Title: "Évolution du service",
    section5Body:
      "FileoPDF est un projet en développement actif. Les fonctionnalités, outils disponibles et présentes conditions peuvent évoluer dans le temps.",
    section6Title: "Droit applicable",
    section6Body: "Les présentes conditions sont régies par le droit français.",
  },
  en: {
    metaTitle: "FileoPDF Terms of Use",
    metaDescription:
      "Read FileoPDF's terms of use: acceptable use, ownership of your PDF files, no warranty, and the law governing this free browser tool.",
    h1: "Terms of Use",
    lastUpdated: "Last updated: July 2026",
    section1Title: "Service description",
    section1Body:
      "FileoPDF offers free PDF processing tools that run directly in your browser. No account is required to use them.",
    section2Title: "Acceptable use",
    section2Body:
      "You agree to use FileoPDF in compliance with applicable laws. You remain solely responsible for the content of the files you process with the site's tools.",
    section3Title: "Ownership of your files",
    section3Body:
      "Your PDF files and their content remain your exclusive property. FileoPDF acquires no rights over them, does not store them, and has no technical access to them since processing happens locally on your device.",
    section4Title: "No warranty",
    section4Body:
      "FileoPDF is provided \"as is\", without any warranty regarding continuous service availability or the complete absence of errors. We recommend checking the result of any processing before a final or critical use of your documents.",
    section5Title: "Evolution of the service",
    section5Body:
      "FileoPDF is an actively developed project. Available features, tools, and these terms may change over time.",
    section6Title: "Governing law",
    section6Body: "These terms are governed by French law.",
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

export default async function TermsPage({
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
        <p className="mt-2 text-sm text-foreground-muted">{c.lastUpdated}</p>

        <div className="mt-8 flex flex-col gap-8 text-sm text-foreground-muted">
          <section>
            <h2 className="text-lg font-semibold text-foreground">
              {c.section1Title}
            </h2>
            <p className="mt-2">{c.section1Body}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              {c.section2Title}
            </h2>
            <p className="mt-2">{c.section2Body}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              {c.section3Title}
            </h2>
            <p className="mt-2">{c.section3Body}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              {c.section4Title}
            </h2>
            <p className="mt-2">{c.section4Body}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              {c.section5Title}
            </h2>
            <p className="mt-2">{c.section5Body}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              {c.section6Title}
            </h2>
            <p className="mt-2">{c.section6Body}</p>
          </section>
        </div>
      </div>
    </Container>
  );
}