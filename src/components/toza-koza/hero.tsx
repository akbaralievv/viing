import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const BENEFIT_ICONS = [
  "full-water_gold.svg",
  "no-alcohol_gold.svg",
  "textile_gold.svg",
  "no-pvc_gold.svg",
];

export function TozaKozaHero() {
  const t = useTranslations("wetWipes");
  const benefits = t.raw("hero.benefits") as string[];

  return (
    <section className="relative min-h-[100svh] bg-[#FAF7F1]">
      {/* Scene — desktop (>= 600px) */}
      <Image
        src="/tozaKoza/40-hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hidden object-cover object-center min-[600px]:block"
      />
      {/* Scene — mobile (< 600px) */}
      <Image
        src="/tozaKoza/40-hero_mobile.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="block object-cover object-center min-[600px]:hidden"
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex min-h-[100svh] flex-col justify-start pt-24 pb-12 md:pt-28 min-[600px]:justify-center">
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

          <p className="font-cormorant font-bold text-[#084b37] text-2xl lg:text-2xl max-w-[20rem] mt-5 mb-7 md:mb-8">
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
                  src={`/tozaKoza/icons/${BENEFIT_ICONS[i]}`}
                  alt=""
                  aria-hidden="true"
                  className="h-10 w-10 shrink-0 lg:h-[3.25rem] lg:w-[3.25rem]"
                />
                <span className="text-sm font-semibold leading-tight text-[#084b37] lg:text-[13px]">
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
