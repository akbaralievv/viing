import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumb } from "@/components/breadcrumb";
import { Reveal } from "@/components/reveal";
import { ProductCard } from "@/components/product-card";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { getCategory, productsByCategory, productCategories } from "@/lib/catalog";

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
  const items = productsByCategory(cat.slug);
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
        <header className="max-w-2xl mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">{name}</h1>
          <p className="text-muted-foreground">{tCat(`${cat.slug}.desc`)}</p>
          {cat.count && (
            <p className="text-sm text-muted-foreground/70 mt-3">
              {cat.count} {t("productsLabel")}
            </p>
          )}
        </header>

        {items.length > 0 ? (
          <Reveal as="ul" className="grid grid-cols-1 min-[550px]:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {items.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </Reveal>
        ) : (
          <div className="rounded-2xl border border-border bg-secondary p-8 text-center">
            <p className="text-muted-foreground mb-5">{t("emptyCategory")}</p>
            <Button asChild>
              <Link href="/#contact">{t("requestPrice")}</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
