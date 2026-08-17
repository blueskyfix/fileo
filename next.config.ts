import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default withSentryConfig(withNextIntl(nextConfig), {
  // Piège connu (voir Fileo_Reference_Composants_Patterns.md) :
  // org = slug seul, jamais une URL complète. Corrigé ici.
  org: "horatio-nguend",
  project: "fileo",
  silent: !process.env.CI,
});