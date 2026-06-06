import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { routing } from "@/i18n/routing";
import { productCategories, products } from "@/lib/catalog";
import { caseStudies } from "@/lib/cases";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
  const lastModified = new Date();

  const localePath = (locale: string, path: string) =>
    locale === routing.defaultLocale ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`;

  const languages = (path: string) =>
    Object.fromEntries(routing.locales.map((l) => [l, localePath(l, path)]));

  const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/catalog", priority: 0.9, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/cases", priority: 0.8, changeFrequency: "monthly" },
    ...caseStudies.map((c) => ({
      path: `/cases/${c.slug}`,
      priority: 0.6,
      changeFrequency: "monthly" as const,
    })),
    { path: "/brand", priority: 0.8, changeFrequency: "monthly" },
    ...productCategories.map((c) => ({
      path: `/catalog/${c.slug}`,
      priority: 0.7,
      changeFrequency: "weekly" as const,
    })),
    ...products.map((p) => ({
      path: `/catalog/${p.category}/${p.slug}`,
      priority: 0.6,
      changeFrequency: "monthly" as const,
    })),
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ];

  const pages: MetadataRoute.Sitemap = [];
  for (const route of routes) {
    for (const locale of routing.locales) {
      pages.push({
        url: localePath(locale, route.path),
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages: languages(route.path) },
      });
    }
  }

  return pages;
}
