import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumb } from "@/components/breadcrumb";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { img } from "@/lib/catalog";

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
    <main id="main" className="pt-24 md:pt-28 pb-20">
      <div className="container mx-auto px-4">
        <Breadcrumb
          items={[
            { label: tCatalog("breadcrumbHome"), href: "/" },
            { label: t("pageTitle") },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-16 md:mb-24">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-primary leading-tight mb-5">
              {t("pageTitle")}
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl">{t("pageSubtitle")}</p>
            <Button asChild size="lg" className="h-[52px] px-7">
              <Link href="/#contact">
                {t("ctaButton")}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border bg-secondary">
              <Image
                src={img("1494412574643-ff11b0a5c1c3", 800, 600)}
                alt={t("pageTitle")}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <span className="absolute bottom-4 left-4 rounded-lg bg-primary/90 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-foreground backdrop-blur">
                Your Brand
              </span>
            </div>
          </div>
        </div>

        <Reveal as="ul" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16 md:mb-24">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5"
            >
              <span
                aria-hidden="true"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-mint/25 text-primary shrink-0"
              >
                <Check className="w-4 h-4" strokeWidth={3} />
              </span>
              <span className="font-medium text-foreground">{feature}</span>
            </li>
          ))}
        </Reveal>

        <Reveal as="section" className="mb-16 md:mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-10">
            {t("stepsTitle")}
          </h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {steps.map((step, idx) => (
              <li key={step.title} className="rounded-2xl border border-border bg-card p-6">
                <span className="text-3xl font-bold text-brand/25 leading-none">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-bold text-primary mt-3 mb-2">{step.title}</h3>
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
