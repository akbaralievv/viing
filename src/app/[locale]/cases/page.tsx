import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Package } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/reveal";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { caseStudies } from "@/lib/cases";

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
  const projects = t.raw("projects") as Project[];

  return (
    <main id="main">
      {/* Hero — title + description (no background image) */}
      <section className="bg-primary pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl animate-slide-up">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-4">
              {t("eyebrow")}
            </p>
            <h1 className="font-display text-[1.75rem] md:text-5xl font-bold text-white leading-[1.15] md:leading-[1.1] mb-6">
              {t("title")}
            </h1>
            <p className="text-base md:text-lg text-white/80">{t("subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Projects — alternating image / text rows (code.html styling) */}
      <section className="bg-[#f7f9fb] py-16 md:py-28">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-16 md:gap-24">
            {projects.map((project, idx) => {
              const study = caseStudies[idx];
              const isGilam = study.slug === "stretch-film";
              return (
                <Reveal key={study.slug}>
                  <Link
                    href={`/cases/${study.slug}`}
                    className={cn(
                      "group flex flex-col items-center gap-12",
                      idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    )}
                  >
                    <div
                      className={cn(
                        "relative aspect-[1.37] w-full overflow-hidden rounded-xl border border-[#c6c6cd] md:w-1/2",
                        isGilam && "bg-[#EDEDF1]"
                      )}
                    >
                      <Image
                        src={study.image}
                        alt={project.title}
                        fill
                        sizes="(min-width: 768px) 45vw, 100vw"
                        className={cn(
                          "transition-transform duration-700 ease-out group-hover:scale-105",
                          isGilam ? "object-contain" : "object-cover"
                        )}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-6 py-3 text-sm font-semibold text-[#191c1e]">
                          {t("viewMore")}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </span>
                      </div>
                    </div>

                    <div className="flex w-full flex-col items-start md:w-1/2">
                      <div className="mb-4">
                        <span className="border border-[#006a61] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#006a61]">
                          {project.tag}
                        </span>
                      </div>

                      <h2 className="mb-4 font-display text-2xl md:text-[32px] font-semibold leading-tight text-[#191c1e]">
                        {project.title}
                      </h2>
                      <p className="mb-8 max-w-md text-sm md:text-base text-[#45464d]">{project.desc}</p>

                      <div className="w-full border-t border-[#c6c6cd] pt-6">
                        <div className="grid grid-cols-3 gap-6">
                          {project.specs.map((spec) => (
                            <div key={spec.label}>
                              <span className="mb-1 block text-xs text-[#45464d]">{spec.label}</span>
                              <span className="block text-sm font-semibold tracking-wide text-[#191c1e]">
                                {spec.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 flex w-full items-center gap-3 rounded-xl bg-[#f2f4f6] px-4 py-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#006a61]">
                          <Package className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block text-xs text-[#45464d]">{project.quantityLabel}</span>
                          <span className="block text-sm md:text-base font-bold text-[#191c1e]">
                            {project.quantityValue}
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
}
