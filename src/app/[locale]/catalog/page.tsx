import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumb } from "@/components/breadcrumb";
import { CategoryGrid } from "@/components/category-grid";
import { Reveal } from "@/components/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "catalog" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "catalog" });

  return (
    <main id="main" className="pt-24 md:pt-28 pb-20">
      <div className="container mx-auto px-4">
        <Breadcrumb items={[{ label: t("breadcrumbHome"), href: "/" }, { label: t("title") }]} />
        <header className="max-w-2xl mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </header>
        <Reveal>
          <CategoryGrid />
        </Reveal>
      </div>
    </main>
  );
}
