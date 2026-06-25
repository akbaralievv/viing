import { useTranslations } from "next-intl";
import { BackButton } from "@/components/back-button";

const FEATURE_ICONS = [
  "/dasturxon/feature-eco.svg",
  "/dasturxon/feature-air.svg",
  "/dasturxon/feature-microwave.svg",
];

export function DasturxonHero() {
  const t = useTranslations("dasturxon");
  const features = t.raw("hero.features") as string[];

  return (
    <section className="relative flex min-h-[100svh] overflow-hidden bg-dast-night">
      <BackButton
        ariaLabel={t("backAria")}
        className="text-white/80 hover:text-white"
      />

      {/* Tonal ornament over the navy backdrop */}
      <img
        src="/dasturxon/hero-ornament.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none opacity-50 absolute inset-0 z-0 h-full w-full select-none object-cover"
      />

      <div className="relative z-10 container mx-auto grid grid-cols-1 content-center items-center gap-10 px-4 pb-14 pt-36 text-center min-[900px]:grid-cols-2 min-[900px]:gap-0 min-[900px]:pt-40 min-[900px]:text-left">
        {/* Text */}
        <div className="mx-auto min-[900px]:mx-0">
          {/* Decorative wordmark */}
          <img
            src="/dasturxon/777.webp"
            alt="DASTURXON PLYÖNKASI"
            className="mx-auto mb-6 w-[clamp(200px,22vw,300px)] select-none min-[900px]:mx-0"
          />

          <h1 className="font-display text-[clamp(2.25rem,5.5vw,4rem)] font-bold uppercase leading-[0.95] tracking-tight text-white">
            {t("hero.title")}
          </h1>
          <p className="mt-1 font-display text-[clamp(1.15rem,2.6vw,1.75rem)] font-bold uppercase leading-tight tracking-tight text-[#95C121]">
            {t("hero.subtitle")}
          </p>

          <p className="mx-auto mt-6 max-w-md text-lg font-regular leading-snug text-white min-[900px]:mx-0 md:text-xl">
            {t("hero.tagline")}
          </p>
          <p className="mx-auto mt-1 max-w-md text-base font-regular leading-relaxed text-white/70 min-[900px]:mx-0">
            {t("hero.note")}
          </p>

          {/* Feature badges — icon + text shrink on small screens, wrap if they still don't fit */}
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-4 sm:gap-x-4 min-[900px]:mt-9 min-[900px]:justify-start min-[900px]:gap-x-7">
            {features.map((label, i) => (
              <li key={label} className="flex items-center gap-1.5 sm:gap-2.5">
                <img
                  src={FEATURE_ICONS[i]}
                  alt=""
                  aria-hidden="true"
                  className="h-8 w-8 shrink-0 sm:h-10 sm:w-10 min-[900px]:h-12 min-[900px]:w-12"
                />
                <span className="min-w-0 whitespace-pre-line text-left text-[10px] font-semibold uppercase leading-tight tracking-wide text-white sm:text-xs">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Product — black backdrop dissolves into the navy via `lighten` blend */}
        <div className="w-full">
          <img
            src="/dasturxon/888.webp"
            alt="DASTURXON PLYÖNKASI"
            className="w-full select-none mix-blend-lighten"
          />
        </div>
      </div>
    </section>
  );
}
