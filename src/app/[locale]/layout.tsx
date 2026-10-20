import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
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

// Police des titres : donne a FileoPDF une voix propre, Inter reste pour le texte.
const displayFace = Bricolage_Grotesque({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const skipLinkLabel: Record<AppLocale, string> = {
  fr: "Aller au contenu",
  en: "Skip to content",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const localizedDefaults: Record<AppLocale, { title: string; description: string; ogAlt: string }> = {
  fr: {
    title: `${siteConfig.name} | Outils PDF rapides et sécurisés`,
    description: siteConfig.description,
    ogAlt: `${siteConfig.name} — Traitez vos PDF et images sensibles directement dans votre navigateur`,
  },
  en: {
    title: `${siteConfig.name} | Fast, secure PDF tools`,
    description:
      "Merge, split, and convert your documents for free. PDFs and images are processed in your browser, never uploaded to a server.",
    ogAlt: `${siteConfig.name} — Process your sensitive PDFs and images right in your browser`,
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const appLocale = locale as AppLocale;
  const defaults = localizedDefaults[appLocale] ?? localizedDefaults.fr;

  return {
    title: {
      default: defaults.title,
      template: "%s",
    },
    description: defaults.description,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title: siteConfig.name,
      description: defaults.description,
      url: `${siteConfig.url}/${locale}`,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: defaults.ogAlt,
        },
      ],
      locale: appLocale === "en" ? "en_US" : "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: defaults.description,
      images: [siteConfig.ogImage],
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

  setRequestLocale(locale as AppLocale);

  const messages = await getMessages();
  const isProd = process.env.NODE_ENV === "production";

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${displayFace.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only z-50 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {skipLinkLabel[locale as AppLocale]}
        </a>
        <NextIntlClientProvider messages={messages}>
          {isProd && analyticsConfig.umamiWebsiteId && (
            <Script
              defer
              src="https://cloud.umami.is/script.js"
              data-website-id={analyticsConfig.umamiWebsiteId}
              strategy="lazyOnload"
            />
          )}
          {isProd && (
            <Script
              src="https://analytics.ahrefs.com/analytics.js"
              data-key="sHtLKUZNI+80zGPJZ/Lb9A"
              strategy="lazyOnload"
            />
          )}
          <Navbar />
          <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}