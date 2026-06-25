import { useTranslations } from "next-intl";
import { ZoomableImage } from "@/components/zoomable-image";

const IMAGES = [
  "/toza-koza/design.webp",
  "/toza-koza/print.webp",
  "/toza-koza/valve.webp",
  "/toza-koza/box.webp",
];

export function TozaKozaDesign() {
  const t = useTranslations("wetWipes");
  const items = t.raw("design.items") as { title: string; desc: string }[];

  return (
    <section className="bg-toza-ivory py-14 md:py-20">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="flex items-center justify-center gap-3 text-center font-cormorant text-2xl md:gap-4 md:text-[2.5rem] font-bold uppercase tracking-wide text-toza-ink">
          <span aria-hidden="true" className="text-lg text-toza-gold md:text-2xl">
            ✦
          </span>
          {t("design.heading")}
          <span aria-hidden="true" className="text-lg text-toza-gold md:text-2xl">
            ✦
          </span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
          {items.map((c, i) => (
            <article key={c.title}>
              <div className="overflow-hidden rounded-2xl border border-toza-sand/70 bg-gradient-to-br from-toza-card-from to-toza-card-to shadow-[0_10px_30px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.02)]">
                <ZoomableImage
                  src={IMAGES[i]}
                  alt={c.title}
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-toza-ink">
                {c.title}
              </h3>
              <p className="mt-2 font-cormorant text-lg italic font-medium leading-snug text-toza-body">
                {c.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
