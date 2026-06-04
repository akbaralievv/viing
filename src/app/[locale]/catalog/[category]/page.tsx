import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumb } from "@/components/breadcrumb";
import { CatalogBrowser } from "@/components/catalog-browser";
import { getCategory, productCategories } from "@/lib/catalog";

export function generateStaticParams() {
  return productCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  const cat = getCategory(category);
  if (!cat || cat.kind !== "products") return {};
  const tCat = await getTranslations({ locale, namespace: "catalog.categories" });
  return {
    title: tCat(`${cat.slug}.name`),
    description: tCat(`${cat.slug}.desc`),
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  setRequestLocale(locale);

  const cat = getCategory(category);
  if (!cat || cat.kind !== "products") notFound();

  const t = await getTranslations({ locale, namespace: "catalog" });
  const tCat = await getTranslations({ locale, namespace: "catalog.categories" });
  const name = tCat(`${cat.slug}.name`);

  return (
    <main id="main" className="pt-24 md:pt-28 pb-20">
      <div className="container mx-auto px-4">
        <Breadcrumb
          items={[
            { label: t("breadcrumbHome"), href: "/" },
            { label: t("title"), href: "/catalog" },
            { label: name },
          ]}
        />
        <h1 className="sr-only">{name}</h1>
        <CatalogBrowser initialCategory={cat.slug} />
      </div>
    </main>
  );
}
