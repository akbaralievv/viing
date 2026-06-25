import { Droplet, Leaf, ShieldCheck, Snowflake, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const ICONS: LucideIcon[] = [Leaf, Droplet, ShieldCheck, Snowflake];

export function DasturxonAdvantages() {
  const t = useTranslations("dasturxon");
  const sizes = t.raw("advantages.sizes") as string[];
  const items = t.raw("advantages.items") as { title: string; desc: string }[];

  return (
    <section className="bg-white pt-14 md:pt-20">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <h2
          className="text-center text-2xl font-medium uppercase tracking-wide text-dast-ink md:text-[2rem]"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {t("advantages.heading")}
        </h2>
        {/* Layout: roll · sizes · advantages */}
        <div className="mt-12 grid grid-cols-1 items-start gap-10 sm:grid-cols-12 sm:gap-8 lg:gap-6">
          {/* Product roll */}
          <div className="sm:col-span-12 lg:col-span-5">
            <img
              src="/dasturxon/66.webp"
              alt="DASTURXON PLYÖNKASI"
              loading="lazy"
              decoding="async"
              className="mx-auto w-full max-w-[520px] select-none lg:max-w-none"
            />
          </div>

          {/* Sizes */}
          <div className="text-center sm:col-span-6 lg:col-span-3">
            <ul className="flex flex-col gap-3.5">
              {sizes.map((size) => (
                <li
                  key={size}
                  className="text-lg font-semibold tracking-wide text-dast-ink md:text-xl"
                >
                  {size}
                </li>
              ))}
            </ul>
          </div>

          {/* Advantages */}
          <div className="sm:col-span-6 lg:col-span-4">
            <ul className="flex flex-col gap-7">
              {items.map(({ title, desc }, i) => {
                const Icon = ICONS[i];
                return (
                  <li key={title} className="flex items-start gap-4">
                    <Icon
                      className="mt-0.5 h-8 w-8 shrink-0 text-dast-navy"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wide text-dast-ink">
                        {title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-dast-muted">
                        {desc}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
