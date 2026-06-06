import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, PenTool, Boxes, Factory, ShieldCheck, Truck } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumb } from "@/components/breadcrumb";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/** Icons for the highlight bar — one per brand `features` item (in order). */
const featureIcons = [PenTool, Boxes, Factory, ShieldCheck, Truck];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "brand" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

type Step = { title: string; description: string };

export default async function BrandPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "brand" });
  const tCatalog = await getTranslations({ locale, namespace: "catalog" });
  const features = t.raw("features") as string[];
  const steps = t.raw("steps") as Step[];

  return (
    <main id="main">
      {/* Hero — background image (same treatment as the home page hero) */}
      <section className="relative flex flex-col h-[100svh] min-h-[600px] max-h-[800px] overflow-hidden bg-primary">
        <Image
          src="/brand/your-brand.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent to-[60%]"
        />

        <div className="relative z-10 container mx-auto px-4 pt-24 md:pt-28">
          <Breadcrumb
            light
            items={[
              { label: tCatalog("breadcrumbHome"), href: "/" },
              { label: t("pageTitle") },
            ]}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 flex flex-1 items-center pb-14 md:pb-16">
          <div className="max-w-2xl animate-slide-up">
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-5">
              {t("pageTitle")}
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-xl">{t("pageSubtitle")}</p>
            <Button asChild variant="brand" size="lg" className="h-[52px] px-7">
              <Link href="/#contact">
                {t("ctaButton")}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Highlights bar — quick glance under the hero (same family as the home stats bar) */}
      <section aria-label={t("stepsTitle")} className="border-y border-white/10 bg-primary">
        <ul className="container mx-auto px-4 grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-5">
          {features.map((feature, idx) => {
            const Icon = featureIcons[idx] ?? featureIcons[0];
            return (
              <li
                key={feature}
                className={cn(
                  "flex items-center gap-3 py-5 lg:px-5 lg:py-7",
                  idx > 0 && "lg:border-l lg:border-white/10"
                )}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-brand">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium leading-snug text-white">{feature}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="container mx-auto px-4 py-16 md:py-20">
        <Reveal as="section" className="mb-16 md:mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-10">
            {t("stepsTitle")}
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {steps.map((step, idx) => (
              <li key={step.title} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl font-bold leading-none text-brand/40">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-bold leading-tight text-primary">{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal as="section" className="relative overflow-hidden rounded-3xl bg-primary px-6 py-12 md:px-12 md:py-16 text-center">
          <Image
            src="/banner.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="object-cover"
          />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{t("ctaTitle")}</h2>
            <p className="text-white/80 mb-7">{t("ctaSubtitle")}</p>
            <Button asChild variant="brand" size="lg" className="h-[52px] px-8">
              <Link href="/#contact">
                {t("ctaButton")}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
