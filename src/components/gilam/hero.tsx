import { Move, Recycle, Weight, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { BackButton } from "@/components/back-button";

const FEATURE_ICONS: LucideIcon[] = [Weight, Move, Recycle];

export function GilamHero() {
  const t = useTranslations("stretchFilm");
  const features = t.raw("hero.features") as string[];

  return (
    <section className="relative flex min-h-[100svh] overflow-hidden bg-gilam-ink">
      {/* Background scene — dark section bg prevents a white flash before it loads */}
      <img
        src="/gilam/hero-back.webp"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none object-cover"
      />
      {/* Scrim for text legibility (darker on the text side) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-gradient-to-r from-black/0 via-black/50"
      />

      <BackButton
        ariaLabel={t("backAria")}
        className="text-white/80 hover:text-white"
      />

      <div className="relative z-10 container mx-auto grid grid-cols-1 content-center items-center gap-8 px-4 pb-12 pt-40 min-[900px]:gap-0 min-[900px]:grid-cols-2 min-[900px]:pt-28">
        {/* Text */}
        <div className="flex flex-col items-center min-[900px]:items-start">
          <h1 className="font-merriweather text-[clamp(4rem,6vw,80px)] font-black uppercase leading-[0.95] tracking-[0.08em] text-gilam-cream">
            Gilam
          </h1>
          <p className="mt-1 font-helvetica text-center min-[900px]:text-start text-[clamp(1.2rem,2.8vw,30px)] font-bold uppercase leading-tight tracking-[0.06em] text-gilam-cream">
            Pallet Qadoqlash
            <br />
            Plyonkasi
          </p>

          <p className="mt-5 max-w-md text-center min-[900px]:text-start text-base leading-relaxed text-gilam-cream/85 min-[900px]:mx-0 md:text-lg">
            {t("hero.desc")}
          </p>

          <ul className="mt-8 flex w-full max-w-md flex-nowrap items-start justify-center gap-2 min-[400px]:gap-4 min-[900px]:max-w-none min-[900px]:justify-start min-[900px]:gap-6">
            {features.map((title, i) => {
              const Icon = FEATURE_ICONS[i];
              return (
                <li
                  key={title}
                  className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center min-[900px]:flex-none"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-white bg-gilam-title min-[400px]:h-14 min-[400px]:w-14 min-[900px]:h-16 min-[900px]:w-16">
                    <Icon
                      className="h-7 w-7 text-white min-[900px]:h-10 min-[900px]:w-10"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="whitespace-pre-line text-[10px] font-bold uppercase leading-tight tracking-wide text-gilam-cream min-[400px]:text-xs">
                    {title}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Product */}
        <div className="min-[900px]:justify-self-end max-w-[600px] mx-auto">
          <img
            src="/gilam/hero.webp"
            alt="GILAM PALLET QADOQLASH PLYONKASI"
            className="w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
