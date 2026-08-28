import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/core/config/site";
import type { AppLocale } from "@/i18n/routing";

const PATH = "/privacy";

type PrivacyContent = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lastUpdated: string;
  section1Title: string;
  section1Body: string;
  section2Title: string;
  section2Intro: string;
  umamiLabel: string;
  umamiBody: string;
  sentryLabel: string;
  sentryBody: string;
  section3Title: string;
  section3Body: string;
  section4Title: string;
  section4Body: string;
  section5Title: string;
  section5Pre: string;
  section5Post: string;
  section6Title: string;
  section6Body: string;
};

const content: Record<AppLocale, PrivacyContent> = {
  fr: {
    metaTitle: "Politique de confidentialité FileoPDF",
    metaDescription:
      "Découvrez comment FileoPDF traite vos données : traitement 100% local dans votre navigateur, aucun fichier stocké, aucune donnée personnelle collectée.",
    h1: "Politique de confidentialité",
    lastUpdated: "Dernière mise à jour : juillet 2026",
    section1Title: "Vos fichiers PDF",
    section1Body:
      "Les outils FileoPDF traitent vos fichiers PDF directement dans votre navigateur, sur votre appareil. Vos fichiers ne sont jamais envoyés vers un serveur, jamais stockés, et FileoPDF n'y a jamais accès. Fermer l'onglet ou recharger la page efface immédiatement tout ce qui a été chargé.",
    section2Title: "Données que nous collectons",
    section2Intro:
      "FileoPDF utilise deux services pour faire fonctionner et améliorer le site :",
    umamiLabel: "Umami",
    umamiBody:
      " — mesure d'audience anonymisée (pages visitées, provenance du trafic). Aucun cookie, aucune donnée personnelle identifiable n'est collectée.",
    sentryLabel: "Sentry",
    sentryBody:
      " — détection d'erreurs techniques, uniquement en cas de bug (message d'erreur, navigateur utilisé). Les noms de vos fichiers ne sont jamais inclus dans ces rapports.",
    section3Title: "Cookies",
    section3Body:
      "FileoPDF n'utilise aucun cookie de suivi publicitaire ni de profilage. Aucun bandeau de consentement n'est nécessaire, faute de cookie non essentiel.",
    section4Title: "Hébergement",
    section4Body:
      "Le site est hébergé par Vercel Inc. Aucun fichier PDF que vous traitez n'est transmis à cet hébergeur : seul le code de l'application y est servi.",
    section5Title: "Vos droits",
    section5Pre:
      "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et d'effacement des données vous concernant. Étant donné que FileoPDF ne collecte aucune donnée personnelle identifiable dans le cadre normal d'utilisation, ce droit s'exerce principalement pour toute question ou signalement : contactez-nous à ",
    section5Post: ".",
    section6Title: "Modifications",
    section6Body:
      "Cette politique peut évoluer avec le service. Toute mise à jour significative sera reflétée par la date en haut de cette page.",
  },
  en: {
    metaTitle: "FileoPDF Privacy Policy",
    metaDescription:
      "Learn how FileoPDF handles your data: all processing happens locally in your browser, no files are stored, and no personal data is collected.",
    h1: "Privacy Policy",
    lastUpdated: "Last updated: July 2026",
    section1Title: "Your PDF files",
    section1Body:
      "FileoPDF tools process your PDF files directly in your browser, on your device. Your files are never sent to a server, never stored, and FileoPDF never has access to them. Closing the tab or reloading the page immediately clears everything that was loaded.",
    section2Title: "Data we collect",
    section2Intro: "FileoPDF uses two services to run and improve the site:",
    umamiLabel: "Umami",
    umamiBody:
      " — anonymized audience measurement (pages visited, traffic source). No cookies, no personally identifiable data is collected.",
    sentryLabel: "Sentry",
    sentryBody:
      " — technical error detection, only when a bug occurs (error message, browser used). Your file names are never included in these reports.",
    section3Title: "Cookies",
    section3Body:
      "FileoPDF does not use any advertising tracking or profiling cookies. No consent banner is needed, since there are no non-essential cookies.",
    section4Title: "Hosting",
    section4Body:
      "The site is hosted by Vercel Inc. No PDF file you process is ever transmitted to this host: only the application code is served there.",
    section5Title: "Your rights",
    section5Pre:
      "Under GDPR, you have the right to access, rectify, and erase your personal data. Since FileoPDF does not collect personally identifiable data during normal use, this right mainly applies to any question or report: contact us at ",
    section5Post: ".",
    section6Title: "Changes",
    section6Body:
      "This policy may evolve along with the service. Any significant update will be reflected by the date at the top of this page.",
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

export default async function PrivacyPage({
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
            <p className="mt-2">{c.section2Intro}</p>
            <ul className="mt-2 flex flex-col gap-2">
              <li>
                <strong className="text-foreground">{c.umamiLabel}</strong>
                {c.umamiBody}
              </li>
              <li>
                <strong className="text-foreground">{c.sentryLabel}</strong>
                {c.sentryBody}
              </li>
            </ul>
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
            <p className="mt-2">
              {c.section5Pre}
              
              <a href="mailto:contact@fileopdf.app" className="text-primary hover:underline">contact@fileopdf.app</a>
              {c.section5Post}
            </p>
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