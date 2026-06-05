import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { imageSrc, type Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const categoryPill: Record<string, { bg: string; text: string }> = {
  hygiene: { bg: "#DEEFE9", text: "#2E6A55" },
  packaging: { bg: "#E0E8F6", text: "#3C5690" },
  home: { bg: "#F2E9DC", text: "#7C6438" },
  horeca: { bg: "#F4E8D6", text: "#936B33" },
  "private-label": { bg: "#DEEFE7", text: "#2E6A55" },
  custom: { bg: "#E5E8F6", text: "#444A8A" },
};

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const t = useTranslations("popular");
  const tProd = useTranslations("catalog.products");
  const tCat = useTranslations("catalog.categories");
  const pill = categoryPill[product.category] ?? categoryPill.hygiene;

  return (
    <li
      className={cn(
        "product-card flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-brand/40 hover:shadow-lg hover:shadow-primary/10",
        className
      )}
    >
      <Link href={`/catalog/${product.category}/${product.slug}`} className="group block">
        <div className="relative aspect-square overflow-hidden bg-white">
          <Image
            src={imageSrc(product.image, 600, 600)}
            alt={tProd(`${product.slug}.name`)}
            fill
            sizes="(min-width: 1280px) 290px, (min-width: 768px) 30vw, (min-width: 480px) 45vw, 90vw"
            className="pc-img object-contain p-4"
          />
        </div>
        <div className="pc-body px-4 pt-4">
          <h3 className="pc-title line-clamp-2 text-sm font-semibold leading-snug text-primary transition-colors group-hover:text-brand">
            {tProd(`${product.slug}.name`)}
          </h3>
          <span
            className="pc-pill mt-2 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium"
            style={{ backgroundColor: pill.bg, color: pill.text }}
          >
            {tCat(`${product.category}.name`)}
          </span>
        </div>
      </Link>
      <div className="pc-foot mt-auto p-4">
        <Button asChild variant="outline" size="sm" className="pc-btn w-full">
          <Link href="/#contact">{t("requestPrice")}</Link>
        </Button>
      </div>
    </li>
  );
}
