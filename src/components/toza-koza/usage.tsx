import { Briefcase, Car, Hand, Home, Users, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { ZoomableImage } from "@/components/zoomable-image";

const IMAGES = [
  "/toza-koza/use-1.webp",
  "/toza-koza/use-2.webp",
  "/toza-koza/use-3.webp",
  "/toza-koza/use-4.webp",
  "/toza-koza/use-5.webp",
];

const ICONS: LucideIcon[] = [Hand, Car, Home, Briefcase, Users];

export function TozaKozaUsage() {
  const t = useTranslations("wetWipes");
  const items = t.raw("usage.items") as { title: string; desc: string }[];

  return (
    <section className="bg-toza-cream py-14 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header: centered title + subtitle, product pack floated top-right on desktop */}
        <div className="relative">
          <div className="text-center">
            <h2 className="flex items-center justify-center gap-3 font-cormorant text-2xl font-bold uppercase tracking-wide text-toza-ink md:gap-4 md:text-[2.5rem]">
              <span
                aria-hidden="true"
                className="text-lg text-toza-gold md:text-2xl"
              >
                ✦
              </span>
              {t("usage.heading")}
              <span
                aria-hidden="true"
                className="text-lg text-toza-gold md:text-2xl"
              >
                ✦
              </span>
            </h2>
            <p className="mt-3 text-sm text-toza-body md:text-base">
              {t("usage.subtitle")}
            </p>
          </div>

          <img
            src="/toza-koza/80-pieces.webp"
            alt="TOZA KO'ZA"
            loading="lazy"
            decoding="async"
            className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 select-none object-contain lg:block"
            style={{ width: "clamp(220px, 24vw, 340px)" }}
          />
        </div>

        {/* Use-case cards */}
        <div className="relative z-10 mt-10 grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 md:mt-14 lg:grid-cols-5">
          {items.map((it, i) => {
            const Icon = ICONS[i];
            return (
              <article key={it.title}>
                <div className="overflow-hidden rounded-2xl border border-toza-sand/70 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
                  <ZoomableImage
                    src={IMAGES[i]}
                    alt={it.title}
                    className="aspect-square w-full object-cover"
                  />
                </div>

                <div className="mt-4 flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-toza-gold/35">
                    <Icon
                      className="h-[18px] w-[18px] text-toza-gold"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold uppercase tracking-wide text-toza-ink">
                      {it.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-toza-body">
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
