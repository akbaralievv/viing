import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { categories, categoryImage, type Category } from "@/lib/catalog";

export function categoryHref(category: Category): string {
  if (category.kind === "products") return `/catalog/${category.slug}`;
  return category.href ?? "/catalog";
}

const cardColors: Record<string, { bg: string; hover: string }> = {
  hygiene: { bg: "#EEF6F3", hover: "#E6F2EE" },
  packaging: { bg: "#EEF2FA", hover: "#E5ECF8" },
  home: { bg: "#F7F2EC", hover: "#F3ECE4" },
  horeca: { bg: "#F8F1E7", hover: "#F3E9DB" },
  "private-label": { bg: "#EDF5F0", hover: "#E4F0E9" },
  custom: { bg: "#F1F2FA", hover: "#E8EAF6" },
};

export function CategoryGrid() {
  const t = useTranslations("categories");
  const tCat = useTranslations("catalog.categories");

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      {categories.map((category) => {
        const c = cardColors[category.slug] ?? cardColors.hygiene;
        return (
          <li key={category.slug}>
            <Link
              href={categoryHref(category)}
              style={
                { "--bg": c.bg, "--bgh": c.hover } as React.CSSProperties
              }
              className="group relative flex h-[200px] sm:h-[220px] overflow-hidden rounded-2xl bg-[var(--bg)] transition-colors duration-300 hover:bg-[var(--bgh)]"
            >
              <div className="relative z-10 flex h-full max-w-[48%] flex-col p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-bold leading-tight text-primary">
                  {tCat(`${category.slug}.name`)}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {category.count
                    ? `${category.count} ${t("countLabel")}`
                    : tCat(`${category.slug}.desc`)}
                </p>
              </div>

              <div className="pointer-events-none absolute inset-y-0 right-0 w-[60%]">
                <Image
                  src={categoryImage(category)}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 36vw, 64vw"
                  className="object-contain object-center p-2 mix-blend-multiply"
                />
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
