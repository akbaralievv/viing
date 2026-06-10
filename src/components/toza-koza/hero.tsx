import { useTranslations } from "next-intl";
import { BackButton } from "@/components/back-button";

const BENEFIT_ICONS = [
  "full-water-gold.svg",
  "no-alcohol-gold.svg",
  "textile-gold.svg",
  "no-pvc-gold.svg",
];

export function TozaKozaHero() {
  const t = useTranslations("wetWipes");
  const benefits = t.raw("hero.benefits") as string[];

  return (
    <section className="relative min-h-[100svh] flex bg-toza-cream max-h-[900px]">
      <BackButton
        ariaLabel={t("backAria")}
        className="text-toza-green hover:text-toza-green-soft"
      />

      {/* Scene — <picture> downloads only the matching variant (mobile/desktop) */}
      <picture>
        <source media="(max-width: 599px)" srcSet="/toza-koza/hero-mobile.png" />
        <img
          src="/toza-koza/hero.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </picture>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col justify-start pt-32 pb-12 md:pt-28 min-[600px]:justify-center">
        <div className="max-w-xl mt-[25px] min-[600px]:mt-0">
          <h1 className="font-cormorant font-bold leading-[0.92] tracking-tight text-[clamp(3.25rem,9vw,6.875rem)]">
            <span
              className="inline-block w-fit bg-clip-text text-transparent lg:block"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #1b6c53 100%, #1f745a 20%, #2a8a6d 35%, #3daf8d 50%, #3fb391 55%, #2d8a6f 75%, #1d5c49 100%)",
              }}
            >
              TOZA
            </span>{" "}
            <span
              className="inline-block w-fit bg-clip-text text-transparent lg:block"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, #c5a059 100%, #e8d089 100%, #c5a059 100%)",
              }}
            >
              KO’ZA
            </span>
          </h1>

          <p className="font-cormorant font-bold text-toza-green text-2xl lg:text-2xl max-w-[20rem] mt-5 mb-7 md:mb-8">
            {t("hero.tagline")}
          </p>

          {/* Benefits */}
          <ul className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-start lg:gap-x-7 lg:gap-y-5">
            {benefits.map((title, i) => (
              <li
                key={title}
                className="flex items-center gap-3 lg:flex-col lg:items-center lg:gap-2 lg:text-center"
              >
                <img
                  src={`/toza-koza/icons/${BENEFIT_ICONS[i]}`}
                  alt=""
                  aria-hidden="true"
                  className="h-10 w-10 shrink-0 lg:h-[3.25rem] lg:w-[3.25rem]"
                />
                <span className="text-sm font-semibold leading-tight text-toza-green lg:text-[13px]">
                  {title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
