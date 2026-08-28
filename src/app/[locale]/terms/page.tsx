import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/core/config/site";

const PATH = "/terms";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const url = `${siteConfig.url}/${locale}${PATH}`;
  const title = "Conditions d'utilisation";
  const description = "Les règles d'utilisation des outils FileoPDF.";

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

export default function TermsPage() {
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Conditions d&apos;utilisation
        </h1>
        <p className="mt-2 text-sm text-foreground-muted">
          Dernière mise à jour : juillet 2026
        </p>

        <div className="mt-8 flex flex-col gap-8 text-sm text-foreground-muted">
          <section>
            <h2 className="text-lg font-semibold text-foreground">
              Description du service
            </h2>
            <p className="mt-2">
              FileoPDF propose des outils gratuits de traitement de fichiers
              PDF, exécutés directement dans votre navigateur. Aucun compte
              n&apos;est requis pour les utiliser.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              Utilisation acceptable
            </h2>
            <p className="mt-2">
              Vous vous engagez à utiliser FileoPDF dans le respect des lois en
              vigueur. Vous restez seul responsable du contenu des fichiers
              que vous traitez avec les outils du site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              Propriété de vos fichiers
            </h2>
            <p className="mt-2">
              Vos fichiers PDF et leur contenu restent votre propriété
              exclusive. FileoPDF n&apos;acquiert aucun droit sur eux, ne les
              stocke pas, et n&apos;y a techniquement pas accès puisque le
              traitement se fait localement sur votre appareil.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              Absence de garantie
            </h2>
            <p className="mt-2">
              FileoPDF est fourni « en l&apos;état », sans garantie d&apos;aucune
              sorte quant à la disponibilité continue du service ou
              l&apos;absence totale d&apos;erreur. Nous vous recommandons de
              vérifier le résultat de tout traitement avant un usage
              définitif ou critique de vos documents.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              Évolution du service
            </h2>
            <p className="mt-2">
              FileoPDF est un projet en développement actif. Les fonctionnalités,
              outils disponibles et présentes conditions peuvent évoluer dans
              le temps.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              Droit applicable
            </h2>
            <p className="mt-2">
              Les présentes conditions sont régies par le droit français.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}