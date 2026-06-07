import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type Feature = { icon: string; title: string; desc: string };

const LEFT_ICONS = ["full-water.svg", "no_alcohol.svg", "textile.svg"];
const RIGHT_ICONS = ["washable.svg", "no-pvc.svg", "halal-certified_ellipse.svg"];

function FeatureItem({
  icon,
  title,
  desc,
  className,
}: Feature & { className?: string }) {
  return (
    <li
      className={cn("flex items-center gap-3.5 transition-transform", className)}
    >
      <img
        src={`/tozaKoza/icons/${icon}`}
        alt=""
        aria-hidden="true"
        className="h-12 w-12 shrink-0 lg:h-14 lg:w-14"
      />
      <div className="min-[600px]:max-w-[220px]">
        <h3 className="font-cormorant text-xl font-bold leading-tight text-[#052439] lg:text-2xl">
          {title}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-[#4D5563]">{desc}</p>
      </div>
    </li>
  );
}

/** Custom decorative orbit (dotted ellipse + accent dots) around the jug. Desktop only. */
function OrbitDecoration() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 460 480"
      fill="none"
      className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[480px] w-[460px] -translate-x-1/2 -translate-y-1/2 lg:block"
    >
      <ellipse
        cx="230"
        cy="240"
        rx="200"
        ry="228"
        stroke="#B89A56"
        strokeOpacity="0.45"
        strokeWidth="1.5"
        strokeDasharray="1.5 8"
      />
      <circle cx="30" cy="240" r="4" fill="#B89A56" />
      <circle cx="430" cy="240" r="4" fill="#B89A56" />
    </svg>
  );
}

export function TozaKozaPurity() {
  const t = useTranslations("wetWipes");
  const left = t.raw("purity.left") as Pick<Feature, "title" | "desc">[];
  const right = t.raw("purity.right") as Pick<Feature, "title" | "desc">[];

  return (
    <section className="relative overflow-hidden bg-[#FAF7F1]">
      {/* Scene with jug — desktop (> 850px) */}
      <Image
        src="/tozaKoza/section2-background.png"
        alt=""
        fill
        sizes="100vw"
        className="hidden object-cover object-center min-[850px]:block"
      />
      {/* Background — tablet (600–850px) */}
      <Image
        src="/tozaKoza/section2-background_table.png"
        alt=""
        fill
        sizes="100vw"
        className="hidden object-cover object-center min-[600px]:block min-[850px]:hidden"
      />
      {/* Background — mobile (< 600px) */}
      <Image
        src="/tozaKoza/section2-background_mobile.png"
        alt=""
        fill
        sizes="100vw"
        className="block object-cover object-center min-[600px]:hidden"
      />

      <div className="relative z-10 container mx-auto px-4 py-14 md:py-20">
        {/* Heading */}
        <h2 className="flex items-center justify-center gap-3 text-center font-cormorant text-2xl md:gap-4 md:text-[2.5rem] font-bold uppercase tracking-wide text-[#052439]">
          <span aria-hidden="true" className="text-lg text-[#B89A56] md:text-2xl">
            ✦
          </span>
          <span>{t("purity.heading")}</span>
          <span aria-hidden="true" className="text-lg text-[#B89A56] md:text-2xl">
            ✦
          </span>
        </h2>

        {/* Divider — two dots on a line */}
        <div
          aria-hidden="true"
          className="mt-4 flex items-center justify-center gap-2.5 md:mt-5"
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#B89A56]/60" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#B89A56]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#B89A56]" />
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#B89A56]/60" />
        </div>

        {/* Features: one column on mobile, two columns flanking the jug on desktop */}
        <div className="relative mx-auto mt-10 max-w-5xl md:mt-14">
          <OrbitDecoration />
          <div className="relative flex flex-col gap-8 min-[600px]:flex-row min-[600px]:justify-between min-[600px]:gap-0">
            <ul className="flex flex-col gap-8 min-[600px]:min-h-[440px] min-[600px]:max-w-[42%] min-[600px]:justify-between lg:min-h-[480px] lg:max-w-[280px]">
              {left.map((f, i) => (
                <FeatureItem
                  key={f.title}
                  icon={LEFT_ICONS[i]}
                  title={f.title}
                  desc={f.desc}
                  className={cn(
                    "min-[600px]:flex-row-reverse min-[600px]:text-right",
                    i !== 1 && "min-[600px]:translate-x-8 lg:translate-x-14"
                  )}
                />
              ))}
            </ul>
            <ul className="flex flex-col gap-8 min-[600px]:min-h-[440px] min-[600px]:max-w-[42%] min-[600px]:justify-between lg:min-h-[480px] lg:max-w-[280px]">
              {right.map((f, i) => (
                <FeatureItem
                  key={f.title}
                  icon={RIGHT_ICONS[i]}
                  title={f.title}
                  desc={f.desc}
                  className={
                    i !== 1 ? "min-[600px]:-translate-x-8 lg:-translate-x-16" : ""
                  }
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
