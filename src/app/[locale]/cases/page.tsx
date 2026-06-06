import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Package } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumb } from "@/components/breadcrumb";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

// One image per project, in the same order as the `cases.projects` messages.
const projectImages = [
  "/portfolio/wipes.png", // Влажные салфетки
  "/portfolio/gilam.png", // Стретч-плёнка (GILAM PLYONKASI SANOAT)
  "/portfolio/dasturxon.png", // Пищевая плёнка (DASTURXON PLYONKASI)
];

type Spec = { label: string; value: string };
type Project = {
  tag: string;
  title: string;
  desc: string;
  quantityLabel: string;
  quantityValue: string;
  specs: Spec[];
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cases" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function CasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "cases" });
  const tCatalog = await getTranslations({ locale, namespace: "catalog" });
  const projects = t.raw("projects") as Project[];

  return (
    <main id="main">
      {/* Hero — background image, centered text */}
      <section className="relative flex h-[100svh] min-h-[600px] max-h-[900px] flex-col overflow-hidden bg-primary">
        <Image
          src="/portfolio/hero.png"
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

        <div className="relative z-10 container mx-auto px-4 pt-24 md:pt-28">
          <Breadcrumb
            light
            items={[
              { label: tCatalog("breadcrumbHome"), href: "/" },
              { label: t("metaTitle") },
            ]}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 flex flex-1 items-center justify-center pb-16 md:pb-20">
          <div className="max-w-3xl text-center animate-slide-up">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-300 mb-4">
              {t("eyebrow")}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.1] mb-6">
              {t("title")}
            </h1>
            <p className="text-lg text-white/80">{t("subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Projects — alternating image / text rows */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-16 md:gap-24">
            {projects.map((project, idx) => (
              <Reveal
                key={project.title}
                className={cn(
                  "flex flex-col items-center gap-8 md:gap-12",
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border bg-secondary md:w-1/2">
                  <Image
                    src={projectImages[idx] ?? projectImages[0]}
                    alt={project.title}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="w-full md:w-1/2">
                  <div className="mb-4">
                    <span className="inline-block rounded-full border border-brand/40 px-3 py-1 text-xs font-medium uppercase tracking-wider text-brand">
                      {project.tag}
                    </span>
                  </div>

                  <h2 className="mb-4 text-2xl md:text-3xl font-bold leading-tight text-primary">
                    {project.title}
                  </h2>
                  <p className="mb-8 max-w-md text-muted-foreground">{project.desc}</p>

                  <div className="border-t border-border pt-6">
                    <div className="grid grid-cols-3 gap-4">
                      {project.specs.map((spec) => (
                        <div key={spec.label}>
                          <span className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
                            {spec.label}
                          </span>
                          <span className="block font-semibold text-primary">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-3 rounded-xl bg-secondary px-4 py-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-card text-brand">
                      <Package className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs text-muted-foreground">
                        {project.quantityLabel}
                      </span>
                      <span className="block font-bold text-primary">{project.quantityValue}</span>
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-5 text-3xl md:text-4xl font-bold text-primary">{t("ctaTitle")}</h2>
          <p className="mx-auto mb-9 max-w-2xl text-muted-foreground">{t("ctaSubtitle")}</p>
          <Button asChild size="lg" className="h-[52px] px-8">
            <Link href="/#contact">
              {t("ctaButton")}
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
