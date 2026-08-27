import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/core/config/site";

const PATH = "/privacy";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const url = `${siteConfig.url}/${locale}${PATH}`;
  const title = "Politique de confidentialité";
  const description = "Comment FileoPDF traite vos données et vos fichiers.";

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

export default function PrivacyPage() {
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Politique de confidentialité
        </h1>
        <p className="mt-2 text-sm text-foreground-muted">
          Dernière mise à jour : juillet 2026
        </p>

        <div className="mt-8 flex flex-col gap-8 text-sm text-foreground-muted">
          <section>
            <h2 className="text-lg font-semibold text-foreground">
              Vos fichiers PDF
            </h2>
            <p className="mt-2">
              Les outils FileoPDF traitent vos fichiers PDF directement dans
              votre navigateur, sur votre appareil. Vos fichiers ne sont
              jamais envoyés vers un serveur, jamais stockés, et FileoPDF n&apos;y
              a jamais accès. Fermer l&apos;onglet ou recharger la page efface
              immédiatement tout ce qui a été chargé.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              Données que nous collectons
            </h2>
            <p className="mt-2">
              FileoPDF utilise deux services pour faire fonctionner et améliorer
              le site :
            </p>
            <ul className="mt-2 flex flex-col gap-2">
              <li>
                <strong className="text-foreground">Umami</strong> — mesure
                d&apos;audience anonymisée (pages visitées, provenance du
                trafic). Aucun cookie, aucune donnée personnelle identifiable
                n&apos;est collectée.
              </li>
              <li>
                <strong className="text-foreground">Sentry</strong> — détection
                d&apos;erreurs techniques, uniquement en cas de bug (message
                d&apos;erreur, navigateur utilisé). Les noms de vos fichiers ne
                sont jamais inclus dans ces rapports.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">Cookies</h2>
            <p className="mt-2">
              FileoPDF n&apos;utilise aucun cookie de suivi publicitaire ni de
              profilage. Aucun bandeau de consentement n&apos;est nécessaire,
              faute de cookie non essentiel.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              Hébergement
            </h2>
            <p className="mt-2">
              Le site est hébergé par Vercel Inc. Aucun fichier PDF que vous
              traitez n&apos;est transmis à cet hébergeur : seul le code de
              l&apos;application y est servi.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              Vos droits
            </h2>
            <p className="mt-2">
              Conformément au RGPD, vous disposez d&apos;un droit
              d&apos;accès, de rectification et d&apos;effacement des données
              vous concernant. Étant donné que FileoPDF ne collecte aucune
              donnée personnelle identifiable dans le cadre normal
              d&apos;utilisation, ce droit s&apos;exerce principalement pour
              toute question ou signalement : contactez-nous à{" "}
              
              <a href="mailto:contact@fileopdf.app"
                className="text-primary hover:underline"
              >
                contact@fileoPDF.app
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              Modifications
            </h2>
            <p className="mt-2">
              Cette politique peut évoluer avec le service. Toute mise à jour
              significative sera reflétée par la date en haut de cette page.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}