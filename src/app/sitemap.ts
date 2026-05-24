import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
  const lastModified = new Date();

  const localePath = (locale: string, path: string) =>
    locale === routing.defaultLocale ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`;

  const languages = (path: string) =>
    Object.fromEntries(routing.locales.map((l) => [l, localePath(l, path)]));

  const pages: MetadataRoute.Sitemap = [];

  for (const path of ["/", "/privacy", "/terms"] as const) {
    for (const locale of routing.locales) {
      pages.push({
        url: localePath(locale, path === "/" ? "" : path),
        lastModified,
        changeFrequency: path === "/" ? "weekly" : "yearly",
        priority: path === "/" ? 1 : 0.3,
        alternates: {
          languages: languages(path === "/" ? "" : path),
        },
      });
    }
  }

  return pages;
}
