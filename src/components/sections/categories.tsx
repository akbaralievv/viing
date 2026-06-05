import { useTranslations } from "next-intl";
import { CategoryGrid } from "@/components/category-grid";

export function Categories() {
  const t = useTranslations("categories");

  return (
    <section id="categories" className="py-12 md:py-16 scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-[2rem] font-bold text-primary mb-8 md:mb-10">
          {t("title")}
        </h2>

        <CategoryGrid />
      </div>
    </section>
  );
}
