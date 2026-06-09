import {
  Armchair,
  Boxes,
  Layers3,
  Package,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { ZoomableImage } from "@/components/zoomable-image";

const IMAGES = [
  "/gilam/use1.png",
  "/gilam/use2.jpg",
  "/gilam/use3.jpg",
  "/gilam/use4.jpg",
  "/gilam/use5.jpg",
];

const ICONS: LucideIcon[] = [Armchair, Package, Boxes, ShieldCheck, Layers3];

export function GilamUsage() {
  const t = useTranslations("stretchFilm");
  const items = t.raw("usage.items") as { title: string; desc: string }[];

  return (
    <section id="usage" className="bg-[#F6F1EA] pt-14 md:pt-20">
      <div className="container mx-auto px-4">
        {/* Header: badge + title + description on the left, roll floated top-right */}
        <div className="relative">
          <img
            src="/gilam/stretch_horizontal.png"
            alt="GILAM PLYÖNKASI SANOAT"
            className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 select-none object-contain lg:block"
            style={{ width: "clamp(300px, 34vw, 480px)" }}
          />

          <div className="relative max-w-2xl">
            <span className="inline-flex rounded-[3px] bg-[#7B4A2C] px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#F6F1EA]">
              {t("usage.badge")}
            </span>
            <h2 className="mt-5 font-helvetica text-[clamp(2rem,5vw,2rem)] font-bold uppercase leading-[1.05] tracking-tight text-[#2A1A14]">
              {t("usage.heading")}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#7D7269]">
              {t("usage.desc")}
            </p>
          </div>
        </div>

        {/* Use-case cards */}
        <div className="relative z-10 mt-10 grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 md:mt-14 lg:grid-cols-5">
          {items.map((it, i) => {
            const Icon = ICONS[i];
            return (
              <article key={it.title}>
                <div className="overflow-hidden rounded-2xl border border-[#DDD1C3] shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
                  <ZoomableImage
                    src={IMAGES[i]}
                    alt={it.title}
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>

                <div className="mt-4 flex items-start gap-3">
                  <Icon
                    className="h-7 w-7 shrink-0 text-[#7B4A2C]"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold uppercase tracking-wide text-[#2A1A14]">
                      {it.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#7D7269]">
                      {it.desc}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
