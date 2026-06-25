import Image from "next/image";
import { useTranslations } from "next-intl";

type Feature = { icon: string; title: string; desc: string };

const ICONS = [
  "full-water.svg",
  "no-alcohol.svg",
  "textile.svg",
  "washable.svg",
  "no-pvc.svg",
  "halal-certified.svg",
];

function FeatureItem({ icon, title, desc }: Feature) {
  return (
    <li className="flex items-center gap-3.5">
      <img
        src={`/toza-koza/icons/${icon}`}
        alt=""
        loading="lazy"
        decoding="async"
        aria-hidden="true"
        className="h-12 w-12 shrink-0"
      />
      <div>
        <h3 className="font-cormorant text-xl font-bold leading-tight text-toza-ink">
          {title}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-toza-body">{desc}</p>
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
    <section className="relative overflow-hidden bg-toza-cream">
      {/* Background — droplets scene */}
      <Image
        src="/toza-koza/purity-back.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="relative z-10 container mx-auto pt-8 md:pt-14">
        {/* Heading */}
        <h2 className="flex items-center justify-center gap-3 text-center font-cormorant text-2xl md:gap-4 md:text-[2.5rem] font-bold uppercase tracking-wide text-toza-ink">
          <span aria-hidden="true" className="text-lg text-toza-gold md:text-2xl">
            ✦
          </span>
          <span>{t("purity.heading")}</span>
          <span aria-hidden="true" className="text-lg text-toza-gold md:text-2xl">
            ✦
          </span>
        </h2>

        {/* Divider — two dots on a line */}
        <div
          aria-hidden="true"
          className="mt-4 flex items-center justify-center gap-2.5 md:mt-5"
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-toza-gold/60" />
          <span className="h-1.5 w-1.5 rounded-full bg-toza-gold" />
          <span className="h-1.5 w-1.5 rounded-full bg-toza-gold" />
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-toza-gold/60" />
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
              src="/toza-koza/purity.webp"
              loading="lazy"
              decoding="async"
              alt="TOZA KO'ZA"
              className="w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
