import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function BrandCta() {
  const t = useTranslations("brand");
  const features = t.raw("features") as string[];

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl md:text-[2rem] font-bold text-primary mb-4 leading-tight">
                {t("title")}
              </h2>
              <p className="text-muted-foreground mb-7 max-w-lg">{t("subtitle")}</p>

              <ul className="space-y-3 mb-8">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="flex items-center justify-center w-6 h-6 rounded-full bg-mint/25 text-primary shrink-0"
                    >
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-[15px] font-medium text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button asChild size="lg">
                <Link href="/brand">
                  {t("cta")}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>

            <div className="relative min-h-[300px] lg:min-h-[380px] overflow-hidden rounded-tl-[10rem] bg-secondary">
              <Image
                src="/brand.png"
                alt={t("title")}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-contain"
              />
            </div>
          </div>
      </div>
    </section>
  );
}
