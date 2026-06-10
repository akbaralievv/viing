import { MoveHorizontal, ShieldCheck, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { BackButton } from "@/components/back-button";

const FEATURE_ICONS: LucideIcon[] = [ShieldCheck, MoveHorizontal];

export function GilamHero() {
  const t = useTranslations("stretchFilm");
  const features = t.raw("hero.features") as string[];

  return (
    <section className="relative min-h-[100svh] flex overflow-hidden bg-gilam-hero">
      <BackButton
        ariaLabel={t("backAria")}
        className="text-gilam-brown hover:text-gilam-brown-deep"
      />

      <div className="relative z-10 container mx-auto grid grid-cols-1 content-center items-center gap-8 px-4 pb-12 pt-28 min-[900px]:gap-0 min-[900px]:grid-cols-2">
        {/* Text */}
        <div className="flex flex-col items-start">
          <h1 className="font-helvetica text-[clamp(3.2rem,5vw,70px)] font-bold uppercase leading-[0.95] tracking-tight text-gilam-ink">
            Gilam Plyönkasi
          </h1>
          <p className="mt-1 font-helvetica text-[clamp(2.5rem,3vw,50px)] font-bold uppercase tracking-[0.08em] text-gilam-brown">
            Sanoat
          </p>

          <p className="mt-5 max-w-md text-base leading-relaxed text-gilam-body min-[900px]:mx-0 md:text-lg">
            {t("hero.desc")}
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-5 [@media(max-width:1023px)_and_(max-height:849px)]:hidden">
            {features.map((title, i) => {
              const Icon = FEATURE_ICONS[i];
              return (
                <li key={title} className="flex items-center gap-3">
                  <Icon
                    className="h-8 w-8 shrink-0 text-gilam-rust"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span className="whitespace-pre-line text-left text-sm font-medium leading-tight text-gilam-body">
                    {title}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Product */}
        <div className="min-[900px]:justify-self-end">
          <img
            src="/gilam/stretch-hero.png"
            alt="GILAM PLYÖNKASI SANOAT"
            className="w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
