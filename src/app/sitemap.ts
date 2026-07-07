import type { MetadataRoute } from "next";
import { siteConfig } from "@/core/config/site";
import { pdfTools } from "@/data/tools/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1, frequency: "weekly" as const },
    { path: "/pdf", priority: 0.9, frequency: "weekly" as const },
    { path: "/privacy", priority: 0.3, frequency: "yearly" as const },
    { path: "/terms", priority: 0.3, frequency: "yearly" as const },
    { path: "/support", priority: 0.3, frequency: "yearly" as const },
  ];

  const toolRoutes = pdfTools
    .filter((tool) => tool.status === "available")
    .map((tool) => ({
      path: tool.href,
      priority: 0.9,
      frequency: "weekly" as const,
    }));

  const allRoutes = [...staticRoutes, ...toolRoutes];

  return allRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.frequency,
    priority: route.priority,
  }));
}