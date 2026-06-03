import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { heroStats } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      className="relative flex min-h-[860px] md:min-h-[820px] lg:min-h-[800px] flex-col overflow-hidden bg-primary"
      aria-label={t("title")}
    >
      <Image
        src="/hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent to-[60%] lg:hidden"
      />

      <div className="relative z-10 container mx-auto px-4 flex flex-1 items-center pt-28 pb-14 md:pt-32">
        <div className="max-w-2xl animate-slide-up">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand mb-4">
            {t("eyebrow")}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] text-white mb-6">
            {t("title")}
          </h1>
          <p className="text-lg text-white/80 mb-9 max-w-xl">{t("subtitle")}</p>

          <div className="flex flex-col sm:flex-row gap-3.5">
            <Button asChild variant="brand" size="lg" className="h-[52px] px-7">
              <Link href="/#contact">
                {t("ctaOffer")}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-[52px] px-7 border-transparent bg-white text-primary hover:bg-white/90 hover:text-primary"
            >
              <Link href="/catalog">{t("ctaCatalog")}</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 bg-primary">
        <ul className="relative container mx-auto px-4 grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-x-0">
          {heroStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <li
                key={stat.key}
                className={cn(
                  "flex items-center gap-3 py-5 lg:py-6 lg:px-6",
                  idx > 0 && "lg:border-l lg:border-white/10"
                )}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-brand">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-base font-bold leading-tight text-white">
                    {t(`stats.${stat.key}.value`)}
                  </span>
                  <span className="block text-xs leading-snug text-white/70">
                    {t(`stats.${stat.key}.label`)}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
