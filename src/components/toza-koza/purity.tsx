import Image from "next/image";
import { useTranslations } from "next-intl";

type Feature = { icon: string; title: string; desc: string };

const ICONS = [
  "full-water.svg",
  "no_alcohol.svg",
  "textile.svg",
  "washable.svg",
  "no-pvc.svg",
  "halal-certified_ellipse.svg",
];

function FeatureItem({ icon, title, desc }: Feature) {
  return (
    <li className="flex items-center gap-3.5">
      <img
        src={`/tozaKoza/icons/${icon}`}
        alt=""
        aria-hidden="true"
        className="h-12 w-12 shrink-0"
      />
      <div>
        <h3 className="font-cormorant text-xl font-bold leading-tight text-[#052439]">
          {title}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-[#4D5563]">{desc}</p>
      </div>
    </li>
  );
}

export function TozaKozaPurity() {
  const t = useTranslations("wetWipes");
  const left = t.raw("purity.left") as Pick<Feature, "title" | "desc">[];
  const right = t.raw("purity.right") as Pick<Feature, "title" | "desc">[];
  const features = [...left, ...right];

  return (
    <section className="relative overflow-hidden bg-[#FAF7F1]">
      {/* Background — droplets scene */}
      <Image
        src="/tozaKoza/purity-back.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="relative z-10 container mx-auto pt-8 md:pt-14">
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

        {/* Features list (left) + image (right, slightly lower); image drops below on mobile */}
        <div className="mt-10 flex flex-col md:mt-14 min-[768px]:flex-row">
          <ul className="flex flex-col gap-7 min-[768px]:shrink-0 pb-[40px]">
            {features.map((f, i) => (
              <FeatureItem
                key={f.title}
                icon={ICONS[i]}
                title={f.title}
                desc={f.desc}
              />
            ))}
          </ul>

          <div className="min-[768px]:flex-1">
            <img
              src="/tozaKoza/purity.png"
              alt="TOZA KO'ZA"
              className="w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
