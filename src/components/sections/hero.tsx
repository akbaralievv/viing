import Image from "next/image";
import { ArrowRight, Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { heroImage, stats } from "@/lib/site-data";

export function Hero() {
  const t = useTranslations("hero");
  const tStats = useTranslations("hero.stats");

  return (
    <section
      className="relative min-h-[100svh] flex items-center pt-16 md:pt-20 overflow-hidden"
      aria-label={t("title2")}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
      <div
        aria-hidden="true"
        className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-float-slow"
      />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
              {t("badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t("title1")}
              <span className="text-gradient block mt-2">{t("title2")}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
              {t("subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="h-14 px-8 text-base">
                <Link href="/#contact">
                  {t("ctaPrimary")}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base">
                <Link href="/#products">{t("ctaSecondary")}</Link>
              </Button>
            </div>

            <dl className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-border">
              {stats.map((stat) => (
                <div key={stat.key}>
                  <dt className="sr-only">{tStats(stat.key)}</dt>
                  <dd className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</dd>
                  <p className="text-sm text-muted-foreground mt-1">{tStats(stat.key)}</p>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative hidden lg:block">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-br from-primary/20 to-amber-500/20 rounded-3xl blur-2xl"
            />
            <div className="relative bg-card rounded-3xl overflow-hidden border border-border">
              <div className="relative w-full h-[500px]">
                <Image
                  src={heroImage}
                  alt={t("imageAlt")}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white">
                      <Globe aria-hidden="true" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{t("globalTrade")}</div>
                      <div className="text-muted-foreground">{t("tradeRoute")}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
