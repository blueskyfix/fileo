import type { MetadataRoute } from "next";
import { siteConfig } from "@/core/config/site";
import { tools } from "@/data/tools/tools";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1, frequency: "weekly" as const },
    { path: "/pdf", priority: 0.9, frequency: "weekly" as const },
    { path: "/word", priority: 0.8, frequency: "weekly" as const },
    { path: "/privacy", priority: 0.3, frequency: "yearly" as const },
    { path: "/terms", priority: 0.3, frequency: "yearly" as const },
    { path: "/support", priority: 0.3, frequency: "yearly" as const },
  ];

  // Bug corrigé : `pdfTools` excluait tout outil image/word (ex: compress-image,
  // pourtant "available") du sitemap. `tools` couvre tous les mediaType.
  const toolRoutes = tools
    .filter((tool) => tool.status === "available")
    .map((tool) => ({
      path: tool.href,
      priority: 0.9,
      frequency: "weekly" as const,
    }));

  const allRoutes = [...staticRoutes, ...toolRoutes];

  // Une entrée <url> par route ET par locale (recommandation Google pour
  // les sitemaps multilingues), chacune déclarant ses alternates hreflang
  // vers toutes les locales + x-default (brief i18n, section hreflang).
  return allRoutes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.frequency,
      priority: route.priority,
      alternates: {
        languages: {
          ...Object.fromEntries(
            routing.locales.map((loc) => [loc, `${siteConfig.url}/${loc}${route.path}`])
          ),
          "x-default": `${siteConfig.url}/en${route.path}`,
        },
      },
    }))
  );
}