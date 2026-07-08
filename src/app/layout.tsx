import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { siteConfig } from "@/core/config/site";
import { analyticsConfig } from "@/core/config/analytics";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  verification: {
    google: "OtnEGwzlcolXwD16WNyAh5CjaVZm0VfJtPKQcfO9z7U",
  },
  openGraph: {
    title: 'Fileo',
    description: 'Traitez vos documents et images sensibles. Sans les envoyer nulle part.',
    url: 'https://fileo-green.vercel.app',
    siteName: 'Fileo',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fileo — Traitez vos documents et images sensibles, sans les envoyer nulle part',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fileo',
    description: 'Traitez vos documents et images sensibles. Sans les envoyer nulle part.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable}  flex min-h-screen flex-col`}
      >
        {analyticsConfig.umamiWebsiteId && (
          <Script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id={analyticsConfig.umamiWebsiteId}
          />
        )}
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}