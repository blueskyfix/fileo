import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import "../globals.css";
import { siteConfig } from "@/core/config/site";
import { analyticsConfig } from "@/core/config/analytics";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // TODO (étape 6 du chantier i18n) : title/description traduits.
  // Pour l'instant seule la structure technique (lang, og:locale) change,
  // le contenu textuel reste identique aux deux langues.
  return {
    title: {
      default: `${siteConfig.name} | Outils PDF rapides et sécurisés`,
      template: "%s",
    },
    description: siteConfig.description,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title: siteConfig.name,
      description: siteConfig.description,
      url: `${siteConfig.url}/${locale}`,
      siteName: siteConfig.name,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — Traitez vos documents et images sensibles, sans les envoyer nulle part`,
        },
      ],
      locale: locale === "en" ? "en_US" : "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
      images: ["/og-image.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Active le rendu statique pour cette locale (recommandation next-intl).
  setRequestLocale(locale as AppLocale);

  const messages = await getMessages();
  const isProd = process.env.NODE_ENV === "production";

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} flex min-h-screen flex-col`}>
        <NextIntlClientProvider messages={messages}>
          {isProd && analyticsConfig.umamiWebsiteId && (
            <Script
              defer
              src="https://cloud.umami.is/script.js"
              data-website-id={analyticsConfig.umamiWebsiteId}
            />
          )}
          {isProd && (
            <Script
              src="https://analytics.ahrefs.com/analytics.js"
              data-key="sHtLKUZNI+80zGPJZ/Lb9A"
              strategy="beforeInteractive"
            />
          )}
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}