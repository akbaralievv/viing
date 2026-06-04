import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CategoryGrid } from "@/components/category-grid";

export function Categories() {
  const t = useTranslations("categories");

  return (
    <section id="categories" className="py-12 md:py-16 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between gap-4 mb-8 md:mb-10">
          <h2 className="text-2xl md:text-[2rem] font-bold text-primary">{t("title")}</h2>
          <Link
            href="/catalog"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:gap-2.5 transition-all whitespace-nowrap"
          >
            {t("viewAll")}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <CategoryGrid />
      </div>
    </section>
  );
}
