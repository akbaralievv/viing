import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Package, Users, Boxes, Globe, ShieldCheck } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const statIcons = [Package, Users, Boxes, Globe, ShieldCheck];

type Stat = { value: string; label: string };
type ProcessStep = { title: string; description: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "about" });
  const stats = t.raw("stats") as Stat[];
  const process = t.raw("process") as ProcessStep[];

  return (
    <main id="main" className="pb-20">
      {/* Hero — background image, centered text */}
      <section className="relative flex h-[100svh] min-h-[600px] max-h-[900px] flex-col overflow-hidden bg-primary">
        <Image
          src="/about/about.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-black/70" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50"
        />

        <div className="relative z-10 container mx-auto px-6 flex flex-1 items-center justify-center py-24 md:py-28">
          <div className="max-w-3xl text-center animate-slide-up">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-4">
              {t("eyebrow")}
            </p>
            <h1 className="text-[1.75rem] md:text-4xl lg:text-[3rem] font-bold text-white leading-[1.1] lg:leading-[1.2] mb-6">
              {t("title")}
            </h1>
            <p className="text-base md:text-lg text-white/85 mb-4">{t("p1")}</p>
            <p className="text-white/70 mb-8">{t("p2")}</p>
            <Button asChild variant="brand" size="lg" className="h-[52px] px-7">
              <Link href="/#contact">
                {t("ctaButton")}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="pt-6 pb-12 md:pt-8 md:pb-16 lg:pt-0">
        <div className="container mx-auto px-4">
          <Reveal
            as="ul"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
          >
            {stats.map((stat, idx) => {
              const Icon = statIcons[idx] ?? statIcons[0];
              return (
                <li
                  key={stat.label}
                  className={cn(
                    "flex items-center gap-3.5 p-5 lg:p-6",
                    idx > 0 && "max-sm:border-t lg:border-l border-border"
                  )}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block whitespace-nowrap text-xl font-bold leading-none text-primary mb-1.5">
                      {stat.value}
                    </span>
                    <span className="block text-xs leading-snug text-muted-foreground">
                      {stat.label}
                    </span>
                  </span>
                </li>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* Process — how we work */}
      <section className="pb-12 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand mb-3">
              {t("processEyebrow")}
            </p>
            <h2 className="text-2xl md:text-[2rem] font-bold text-primary leading-tight">
              {t("processTitle")}
            </h2>
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-x-8 gap-y-12">
            {process.map((step, idx) => (
              <li key={step.title}>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                    {idx + 1}
                  </span>
                  <h3 className="font-bold leading-tight text-primary">{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4">
        <Reveal
          as="div"
          className="relative overflow-hidden rounded-3xl bg-primary px-6 py-12 md:px-12 md:py-16 text-center"
        >
          <Image
            src="/banner.webp"
            alt=""
            fill
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="object-cover"
          />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{t("ctaTitle")}</h2>
            <p className="text-white/80 mb-7">{t("ctaSubtitle")}</p>
            <Button asChild variant="brand" size="lg" className="h-[52px] px-8 rounded-lg">
              <Link href="/#contact">
                {t("ctaButton")}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
