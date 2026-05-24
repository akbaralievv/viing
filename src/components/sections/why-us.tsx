import { Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { whyUsIcons, heroSecondaryStats } from "@/lib/site-data";

type WhyUsItem = { title: string; description: string };

export function WhyUs() {
  const t = useTranslations("whyUs");
  const tStats = useTranslations("whyUs.stats");
  const items = t.raw("items") as WhyUsItem[];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-amber-500/5">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">{t("badge")}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("title1")} <span className="text-primary">{t("title2")}</span> {t("title3")}
            </h2>
            <p className="text-muted-foreground text-lg mb-8">{t("subtitle")}</p>

            <ul className="space-y-6">
              {items.map((item, idx) => {
                const Icon = whyUsIcons[idx] ?? whyUsIcons[0];
                return (
                  <li key={item.title} className="flex gap-4 items-start">
                    <span className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0 text-white">
                      <Icon aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-br from-primary/20 to-amber-500/20 rounded-3xl blur-2xl"
            />
            <div className="relative bg-card rounded-3xl p-8 border border-border">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                  <Globe aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold">{t("globalTitle")}</h3>
              </div>
              <dl className="grid grid-cols-2 gap-6">
                {heroSecondaryStats.map((stat) => (
                  <div key={stat.key} className="text-center p-4 bg-muted/50 rounded-2xl">
                    <dt className="sr-only">{tStats(stat.key)}</dt>
                    <dd className="text-3xl font-bold text-primary mb-1">{stat.value}</dd>
                    <p className="text-sm text-muted-foreground">{tStats(stat.key)}</p>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
