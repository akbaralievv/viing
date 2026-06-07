import Image from "next/image";
import { cn } from "@/lib/utils";

const BENEFITS = [
  { icon: "full-water_gold.svg", title: "99% воды", sub: "" },
  { icon: "no-alcohol_gold.svg", title: "Без спирта", sub: "" },
  { icon: "textile_gold.svg", title: "Мягкие", sub: "" },
  // { icon: "washable_gold.svg", title: "Смываемые", sub: "" },
  { icon: "no-pvc_gold.svg", title: "Без ПВХ", sub: "",},
] as const;

export function TozaKozaHero() {
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
                  "linear-gradient(90deg, #1b6c53 0%, #1f745a 20%, #2a8a6d 35%, #3daf8d 50%, #3fb391 55%, #2d8a6f 75%, #1d5c49 100%)",
              }}
            >
              TOZA
            </span>{" "}
            <span
              className="inline-block w-fit bg-clip-text text-transparent lg:block"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, #c5a059 50%, #e8d089 100%, #c5a059 100%)",
              }}
            >
              KO’ZA
            </span>
          </h1>

          <p className="font-cormorant font-bold text-[#0E5A4F] text-2xl lg:text-2xl max-w-[20rem] mt-5 mb-7 md:mb-8">
            Влажная туалетная бумага премиального качества
          </p>

          {/* Benefits */}
          <ul className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-start lg:gap-x-7 lg:gap-y-5">
            {BENEFITS.map((b) => (
              <li
                key={`${b.title}-${b.sub}`}
                className={cn(
                  "flex items-center gap-3 lg:flex-col lg:items-center lg:gap-2 lg:text-center",
                  "mobileOnly" in b && b.mobileOnly ? "lg:hidden" : ""
                )}
              >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/tozaKoza/icons/${b.icon}`}
                    alt=""
                    aria-hidden="true"
                    className="h-10 w-10 shrink-0 lg:h-[3.25rem] lg:w-[3.25rem]"
                  />
                <span className="leading-tight">
                  {/* mobile: single inline line */}
                  <span className="text-sm font-semibold text-[#0E5A4F] lg:hidden">
                    {b.title}
                    {b.sub ? ` ${b.sub}` : ""}
                  </span>
                  {/* desktop: stacked */}
                  <span className="hidden text-[13px] font-semibold leading-tight text-[#0E5A4F] lg:block">
                    {b.title}
                  </span>
                  {b.sub ? (
                    <span className="hidden text-[13px] leading-tight text-[#4D5563] lg:block">
                      {b.sub}
                    </span>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
