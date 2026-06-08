import { ArrowRight } from "lucide-react";

const STEPS: { image: string; label: string }[] = [
  { image: "/dasturxon/1.png", label: "Экструзия" },
  { image: "/dasturxon/2.png", label: "Намотка" },
  { image: "/dasturxon/3.png", label: "Нарезка" },
  { image: "/dasturxon/4.png", label: "Упаковка" },
  { image: "/dasturxon/5.png", label: "Логистика" },
];

export function DasturxonProduction() {
  return (
    <section className="bg-[#F8F6F2] py-14 md:py-20">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-8">
          <h2
            className="text-2xl font-medium uppercase tracking-wide text-[#223B63] md:text-[2rem]"
            style={{ fontFamily: "Georgia, sans-serif" }}
          >
            Производство
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-[#6B7A92]">
            Полный цикл производства пищевой плёнки с контролем качества на каждом
            этапе.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:mt-12 lg:grid-cols-5 lg:gap-x-6">
          {STEPS.map((step, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <div key={num} className="flex flex-col items-center text-center">
                <div className="relative w-full">
                  <img
                    src={step.image}
                    alt={step.label}
                    loading="lazy"
                    className="aspect-square w-full rounded-2xl object-cover shadow-[0_8px_30px_rgba(34,59,99,0.06)]"
                  />
                  {/* connector arrow — desktop single-row only */}
                  {i < STEPS.length - 1 && (
                    <span className="absolute -right-5 top-1/2 hidden -translate-y-1/2 text-[#1F426E] lg:block">
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </div>
                <div className="mt-4 flex items-baseline justify-center gap-2">
                  <span className="text-lg font-semibold text-[#223B63] md:text-xl">
                    {num}
                  </span>
                  <span className="text-sm font-medium text-[#344B68]">
                    {step.label}
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
