import { ArrowRight } from "lucide-react";
import { ZoomableImage } from "@/components/zoomable-image";

const STEPS: { image: string; num: string; label: string }[] = [
  { image: "/gilam/1.png", num: "01", label: "Экструзия" },
  { image: "/gilam/2.png", num: "02", label: "Охлаждение" },
  { image: "/gilam/3.png", num: "03", label: "Намотка" },
  { image: "/gilam/4.png", num: "04", label: "Упаковка" },
  { image: "/gilam/5.png", num: "05", label: "Складирование" },
  { image: "/gilam/6.png", num: "06", label: "Логистика" },
];

export function GilamProduction() {
  return (
    <section id="production" className="bg-[#F6F1EA] py-14 md:py-20">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-8">
          <h2 className="font-cormorant text-3xl font-semibold uppercase tracking-wide text-[#2A1A14] md:text-[2.5rem]">
            Современное производство
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-[#7D7269]">
            Полный цикл производства стретч-пленки с контролем качества на каждом
            этапе.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:mt-12 lg:grid-cols-6 lg:gap-x-6">
          {STEPS.map((step, i) => (
            <div key={step.num} className="flex flex-col items-center text-center">
              <div className="relative w-full">
                <ZoomableImage
                  src={step.image}
                  alt={step.label}
                  className="aspect-square w-full rounded-2xl object-cover shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
                />
                {/* connector arrow — desktop single-row only */}
                {i < STEPS.length - 1 && (
                  <span className="absolute -right-5 top-1/2 hidden -translate-y-1/2 text-[#7B4A2C] lg:block">
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </span>
                )}
              </div>
              <div className="mt-4 flex items-baseline justify-center gap-2">
                <span className="text-lg font-semibold text-[#2A1A14] md:text-xl">
                  {step.num}
                </span>
                <span className="text-sm font-medium text-[#4A4038]">
                  {step.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
