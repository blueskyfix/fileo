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

const localizedDefaults: Record<AppLocale, { title: string; description: string; ogAlt: string }> = {
  fr: {
    title: `${siteConfig.name} | Outils PDF rapides et sécurisés`,
    description: siteConfig.description,
    ogAlt: `${siteConfig.name} — Traitez vos documents et images sensibles, sans les envoyer nulle part`,
  },
  en: {
    title: `${siteConfig.name} | Fast, secure PDF tools`,
    description:
      "Merge, process, and organize your documents directly in your browser. Fast, secure, no file ever leaves your device.",
    ogAlt: `${siteConfig.name} — Process your sensitive documents and images without sending them anywhere`,
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
          {isProd && (
            <Script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5286690973312577"
              crossOrigin="anonymous"
              strategy="afterInteractive"
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