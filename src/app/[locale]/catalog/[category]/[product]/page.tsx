import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumb } from "@/components/breadcrumb";
import { Reveal } from "@/components/reveal";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { TelegramIcon, WhatsappIcon } from "@/components/social-icons";
import { siteConfig } from "@/lib/site-config";
import {
  getProduct,
  getCategory,
  productsByCategory,
  products,
  imageSrc,
} from "@/lib/catalog";

export function generateStaticParams() {
  return products.map((product) => ({
    category: product.category,
    product: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string; product: string }>;
}): Promise<Metadata> {
  const { locale, product } = await params;
  const item = getProduct(product);
  if (!item) return {};
  const tProd = await getTranslations({ locale, namespace: "catalog.products" });
  return {
    title: tProd(`${item.slug}.name`),
    description: tProd(`${item.slug}.desc`),
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; category: string; product: string }>;
}) {
  const { locale, category, product } = await params;
  setRequestLocale(locale);

  const item = getProduct(product);
  const cat = getCategory(category);
  if (!item || !cat || item.category !== cat.slug) notFound();

  const t = await getTranslations({ locale, namespace: "catalog" });
  const tProd = await getTranslations({ locale, namespace: "catalog.products" });
  const tCat = await getTranslations({ locale, namespace: "catalog.categories" });

  const name = tProd(`${item.slug}.name`);
  const desc = tProd(`${item.slug}.desc`);
  const specs = tProd.raw(`${item.slug}.specs`) as string[];
  const categoryName = tCat(`${cat.slug}.name`);

  const requestMessage = t("requestProductMessage", { name });
  const whatsappHref = `${siteConfig.contacts.whatsapp}?text=${encodeURIComponent(requestMessage)}`;

  const related = productsByCategory(cat.slug)
    .filter((p) => p.slug !== item.slug)
    .slice(0, 4);

  return (
    <main id="main" className="pt-24 md:pt-28 pb-20">
      <div className="container mx-auto px-4">
        <Breadcrumb
          items={[
            { label: t("breadcrumbHome"), href: "/" },
            { label: t("title"), href: "/catalog" },
            { label: categoryName, href: `/catalog/${cat.slug}` },
            { label: name },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="relative aspect-square rounded-3xl overflow-hidden border border-border bg-secondary">
            <Image
              src={imageSrc(item.image, 900, 900)}
              alt={name}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <Link
              href={`/catalog/${cat.slug}`}
              className="inline-block text-sm font-semibold text-brand mb-3 hover:underline"
            >
              {categoryName}
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-4">{name}</h1>
            <p className="text-muted-foreground leading-relaxed mb-6">{desc}</p>

            {specs?.length > 0 && (
              <div className="rounded-2xl border border-border bg-secondary p-5 mb-6">
                <h2 className="font-bold text-primary mb-3">{t("specsTitle")}</h2>
                <ul className="space-y-2.5">
                  {specs.map((spec) => (
                    <li key={spec} className="flex items-start gap-2.5 text-sm">
                      <span
                        aria-hidden="true"
                        className="flex items-center justify-center w-5 h-5 rounded-full bg-mint/25 text-primary shrink-0 mt-0.5"
                      >
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </span>
                      <span className="text-foreground">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-2xl border border-border p-5">
              <p className="text-sm font-semibold text-primary">{t("priceOnRequest")}</p>
              <p className="text-sm text-muted-foreground mt-1 mb-4">{t("priceNote")}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild variant="brand" className="h-12 px-6">
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                    <WhatsappIcon className="w-4 h-4" />
                    {t("requestPrice")}
                  </a>
                </Button>
                <Button asChild variant="outline" className="h-12 px-6">
                  <a href={siteConfig.contacts.telegram} target="_blank" rel="noopener noreferrer">
                    <TelegramIcon className="w-4 h-4" />
                    Telegram
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <Reveal as="section" className="mt-16 md:mt-20">
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-6">
              {t("relatedTitle")}
            </h2>
            <ul className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </main>
  );
}
