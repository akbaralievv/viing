import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ZoomableImage } from "@/components/zoomable-image";

const IMAGES = [
  "/gilam/production-1.png",
  "/gilam/production-2.png",
  "/gilam/production-3.png",
  "/gilam/production-4.png",
  "/gilam/production-5.png",
  "/gilam/production-6.png",
];

export function GilamProduction() {
  const t = useTranslations("stretchFilm");
  const steps = t.raw("production.steps") as string[];

  return (
    <section id="production" className="bg-gilam-cream py-14 md:py-20">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-8">
          <h2 className="font-cormorant text-3xl font-semibold uppercase tracking-wide text-gilam-ink md:text-[2.5rem]">
            {t("production.heading")}
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-gilam-muted">
            {t("production.subtitle")}
          </p>
        </div>

        {/* Steps */}
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:mt-12 lg:grid-cols-6 lg:gap-x-6">
          {steps.map((label, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <div key={num} className="flex flex-col items-center text-center">
                <div className="relative w-full">
                  <ZoomableImage
                    src={IMAGES[i]}
                    alt={label}
                    className="aspect-square w-full rounded-2xl object-cover shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
                  />
                  {/* connector arrow — desktop single-row only */}
                  {i < steps.length - 1 && (
                    <span className="absolute -right-5 top-1/2 hidden -translate-y-1/2 text-gilam-brown lg:block">
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </div>
                <div className="mt-4 flex items-baseline justify-center gap-2">
                  <span className="text-lg font-semibold text-gilam-ink md:text-xl">
                    {num}
                  </span>
                  <span className="text-sm font-medium text-gilam-body">
                    {label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
