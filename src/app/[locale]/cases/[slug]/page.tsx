import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Package } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { caseStudies, getCaseIndex } from "@/lib/cases";

type Spec = { label: string; value: string };
type Project = {
  tag: string;
  title: string;
  desc: string;
  quantityLabel: string;
  quantityValue: string;
  specs: Spec[];
};

// "wet-wipes" has its own dedicated page (cases/wet-wipes), so it's excluded here.
export function generateStaticParams() {
  return caseStudies
    .filter((c) => c.slug !== "wet-wipes")
    .map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const idx = getCaseIndex(slug);
  if (idx < 0) return {};
  const t = await getTranslations({ locale, namespace: "cases" });
  const project = (t.raw("projects") as Project[])[idx];
  return { title: project.title, description: project.desc };
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const idx = getCaseIndex(slug);
  if (idx < 0) notFound();

  const study = caseStudies[idx];
  const t = await getTranslations({ locale, namespace: "cases" });
  const project = (t.raw("projects") as Project[])[idx];

  return (
    <main id="main" className="pt-24 md:pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-secondary lg:sticky lg:top-24">
            <Image
              src={study.image}
              alt={project.title}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <span className="mb-4 inline-block rounded-full border border-brand/40 px-3 py-1 text-xs font-medium uppercase tracking-wider text-brand">
              {project.tag}
            </span>
            <h1 className="mb-5 text-3xl md:text-4xl font-bold leading-tight text-primary">
              {project.title}
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">{project.desc}</p>

            <div className="mb-8 flex items-center gap-3 rounded-xl bg-secondary px-4 py-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-card text-brand">
                <Package className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs text-muted-foreground">
                  {project.quantityLabel}
                </span>
                <span className="block text-lg font-bold text-primary">
                  {project.quantityValue}
                </span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-5 border-t border-border pt-6 sm:grid-cols-3">
              {project.specs.map((spec) => (
                <div key={spec.label}>
                  <span className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
                    {spec.label}
                  </span>
                  <span className="block font-semibold text-primary">{spec.value}</span>
                </div>
              ))}
            </div>

            <Button asChild size="lg" className="mt-10 h-[52px] px-7">
              <Link href="/#contact">
                {t("ctaButton")}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
