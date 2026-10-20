import type { Metadata } from "next";
import { CloudOff, Gift, UserX } from "lucide-react";
import { Container } from "@/components/layout/container";
import { InlineTrustStrip } from "@/features/pdf/shared/components/inline-trust-strip";
import { buildPageMetadata } from "@/core/seo/metadata";
import type { AppLocale } from "@/i18n/routing";

const PATH = "/about";

type AboutContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  heroLede: string;
  ctaLabel: string;
  trustPoints: [string, string, string];
  section1Title: string;
  section1Paragraphs: string[];
  section2Title: string;
  section2Paragraphs: string[];
  section3Title: string;
  section3Paragraphs: string[];
  signature: string;
};

const content: Record<AppLocale, AboutContent> = {
  fr: {
    metaTitle: "Pourquoi Fileo existe : le traitement local des documents",
    metaDescription:
      "Fileo traite vos PDF et images dans votre navigateur, sans serveur, sans pub, gratuit. Découvrez pourquoi ce hub a été créé.",
    eyebrow: "Notre histoire",
    h1: "Pourquoi j'ai créé Fileo",
    heroLede: "Vos documents ne devraient jamais quitter votre appareil.",
    ctaLabel: "Essayer Fusionner un PDF",
    trustPoints: ["Aucun compte requis", "PDF et images traités localement", "100% gratuit"],
    section1Title: "Un passeport, un doute, une idée",
    section1Paragraphs: [
      "Un jour, j'ai eu besoin de convertir mon passeport en image pour un formulaire en ligne. Une tâche banale. Mais au moment de choisir un outil, je me suis arrêté : pourquoi enverrais-je une pièce d'identité sur le serveur d'un inconnu ?",
      "J'ai testé les solutions réputées sérieuses, iLovePDF, Smallpdf. Le constat était le même à chaque fois. Soit mes fichiers transitaient par leurs serveurs, soit je devais accepter des publicités partout sur la page, soit un abonnement était demandé pour retirer les deux. Aucune de ces options ne convenait pour un document que je ne voulais montrer à personne.",
    ],
    section2Title: "Ce que fait Fileo aujourd'hui",
    section2Paragraphs: [
      "J'ai construit Fileo pour répondre à ce problème précis. Fusionner un PDF, convertir une image, pivoter un document : tout se passe directement dans votre navigateur, sur votre appareil. Ces fichiers ne sont envoyés vers aucun serveur, donc aucune fuite de données n'est possible de notre côté, même en cas de piratage ailleurs sur le web.",
      "L'équipe Fileo travaille aujourd'hui sur le PDF, avec l'image et le Word déjà disponibles. Seules les conversions Word passent par un service externe, CloudConvert, car elles ne peuvent pas encore se faire dans le navigateur : le fichier y est supprimé dès la fin de la conversion.",
    ],
    section3Title: "Une question de confiance, pas de marketing",
    section3Paragraphs: [
      "Le traitement local n'est pas un argument commercial chez Fileo. C'est la raison d'être du produit. Pas de compte à créer, pas de publicité, pas d'abonnement pour un usage normal. Fileo reste gratuit pour ses fonctionnalités actuelles.",
      "Basé à Douala, au Cameroun, Fileo est pensé pour toute personne qui veut traiter ses documents sans les exposer inutilement.",
    ],
    signature: "— Horatio NGUEND, fondateur",
  },
  en: {
    metaTitle: "Why Fileo exists: local document processing",
    metaDescription:
      "Fileo processes your PDFs and images right in your browser, no server, no ads, free. Here's why this hub was created.",
    eyebrow: "Our story",
    h1: "Why I created Fileo",
    heroLede: "Your documents should never leave your device.",
    ctaLabel: "Try Merge PDF",
    trustPoints: ["No account required", "PDFs and images processed locally", "100% free"],
    section1Title: "A passport, a doubt, an idea",
    section1Paragraphs: [
      "One day, I needed to convert my passport into an image for an online form. A simple task. But when it came time to pick a tool, I stopped: why would I send an identity document to a stranger's server?",
      "I tried the tools with a solid reputation, iLovePDF, Smallpdf. The result was the same every time. Either my files were sent to their servers, or I had to put up with ads all over the page, or a subscription was required to remove both. None of these fit a document I didn't want to show anyone.",
    ],
    section2Title: "What Fileo does today",
    section2Paragraphs: [
      "I built Fileo to solve this exact problem. Merging a PDF, converting an image, rotating a document: everything happens directly in your browser, on your device. These files are never sent to a server, so no data leak is possible on our end, even if another service gets breached.",
      "The Fileo team is currently focused on PDF, with image and Word tools already available. Only Word conversions go through an external service, CloudConvert, because they cannot yet be done in the browser: the file is deleted there as soon as the conversion ends.",
    ],
    section3Title: "A matter of trust, not marketing",
    section3Paragraphs: [
      "Local processing isn't a selling point at Fileo. It's the reason the product exists. No account to create, no ads, no subscription for normal use. Fileo stays free for its current features.",
      "Based in Douala, Cameroon, Fileo is built for anyone who wants to process their documents without exposing them needlessly.",
    ],
    signature: "— Horatio NGUEND, founder",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = content[locale as AppLocale];

  return buildPageMetadata({
    locale,
    path: PATH,
    title: c.metaTitle,
    description: c.metaDescription,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = content[locale as AppLocale];
  const trustIcons = [UserX, CloudOff, Gift] as const;

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-4xl">
        <section className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              {c.eyebrow}
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {c.h1}
            </h1>
            <p className="mt-4 text-lg text-foreground-muted">{c.heroLede}</p>
            <a
              href={`/${locale}/pdf/merge-pdf`}
              className="mt-6 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground/90 shadow-sm transition-all hover:bg-primary-hover hover:text-primary-foreground hover:shadow-md"
            >
              {c.ctaLabel}
            </a>
          </div>

          <div className="flex items-center justify-center rounded-xl border border-border bg-elevated p-10">
            <AboutIllustration className="h-auto w-full max-w-[220px]" />
          </div>
        </section>

        <div className="mt-10">
          <InlineTrustStrip
            points={c.trustPoints.map((label, index) => ({
              label,
              icon: trustIcons[index] ?? UserX,
            }))}
          />
        </div>

        <div className="mt-14 flex flex-col gap-10 text-sm text-foreground-muted">
          <section>
            <h2 className="text-2xl font-bold text-foreground">
              {c.section1Title}
            </h2>
            {c.section1Paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-base">
                {paragraph}
              </p>
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">
              {c.section2Title}
            </h2>
            {c.section2Paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-base">
                {paragraph}
              </p>
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">
              {c.section3Title}
            </h2>
            {c.section3Paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-base">
                {paragraph}
              </p>
            ))}
          </section>

          <p className="font-medium text-foreground">{c.signature}</p>
        </div>
      </div>
    </Container>
  );
}

/**
 * Illustration maison : un document se verrouille dans le navigateur,
 * pendant qu'un nuage barré rappelle qu'aucun fichier ne part vers un serveur.
 * Couleurs limitées aux 8 tokens de la charte v2 (aucune couleur hors palette).
 */
function AboutIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="20"
        y="55"
        width="160"
        height="125"
        rx="12"
        stroke="#2666EB"
        strokeWidth="3"
        fill="#F8FAFC"
      />
      <line x1="20" y1="80" x2="180" y2="80" stroke="#2666EB" strokeWidth="3" />
      <circle cx="34" cy="67" r="3" fill="#E2E8F0" />
      <circle cx="46" cy="67" r="3" fill="#E2E8F0" />
      <circle cx="58" cy="67" r="3" fill="#E2E8F0" />

      <path
        d="M70 96h40l14 14v56a4 4 0 0 1-4 4H70a4 4 0 0 1-4-4V100a4 4 0 0 1 4-4Z"
        fill="#2666EB"
        fillOpacity="0.1"
        stroke="#2666EB"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M110 96v14h14"
        stroke="#2666EB"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <line x1="76" y1="128" x2="120" y2="128" stroke="#2666EB" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="76" y1="140" x2="120" y2="140" stroke="#2666EB" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="76" y1="152" x2="104" y2="152" stroke="#2666EB" strokeWidth="2.5" strokeLinecap="round" />

      <circle cx="132" cy="160" r="16" fill="#2666EB" />
      <rect x="124" y="159" width="16" height="12" rx="2" fill="#F8FAFC" />
      <path
        d="M127 159v-4a5 5 0 0 1 10 0v4"
        stroke="#F8FAFC"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      <path
        d="M150 30c-1.5-6-7-10-13-9-4.5.7-8 4-9 8.3-4.7.4-8.3 4.3-8.3 9 0 5 4 9 9 9h20c4.4 0 8-3.6 8-8 0-4-3-7.4-6.7-8.3Z"
        stroke="#64748B"
        strokeWidth="2.5"
        fill="none"
        strokeLinejoin="round"
      />
      <line x1="112" y1="20" x2="160" y2="52" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}