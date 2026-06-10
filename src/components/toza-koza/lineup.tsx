import { useTranslations } from "next-intl";
import { ZoomableImage } from "@/components/zoomable-image";

const PRODUCTS = [
  { count: "40", image: "/toza-koza/40-pieces.png" },
  { count: "80", image: "/toza-koza/80-pieces.png" },
  { count: "120", image: "/toza-koza/120-pieces.png" },
];

export function TozaKozaLineup() {
  const t = useTranslations("wetWipes");
  const items = t.raw("lineup.items") as string[];
  const sheets = t("lineup.sheets");

  return (
    <section className="bg-toza-cream py-14 md:py-20">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="flex items-center justify-center gap-3 text-center font-cormorant text-2xl md:gap-4 md:text-[2.5rem] font-bold uppercase tracking-wide text-toza-ink">
          <span aria-hidden="true" className="text-lg text-toza-gold md:text-2xl">
            ✦
          </span>
          {t("lineup.heading")}
          <span aria-hidden="true" className="text-lg text-toza-gold md:text-2xl">
            ✦
          </span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-3 md:gap-6">
          {PRODUCTS.map((p, i) => (
            <div
              key={p.count}
              className="lineup-card mx-auto w-full max-w-[450px] rounded-2xl border border-toza-sand bg-toza-shell p-6 transition-colors md:p-7"
            >
              <div className="lc-num shrink-0">
                <div className="font-bodoni text-[2rem] font-semibold leading-none text-toza-pine">
                  {p.count}
                </div>
                <div className="text-xs min-[400px]:text-sm md:text-xs min-[900px]:text-sm font-semibold text-toza-pine">
                  {sheets}
                </div>
              </div>
              <ZoomableImage
                src={p.image}
                alt={`TOZA KO'ZA — ${p.count} ${sheets}`}
                className="lc-image w-full object-contain"
              />
              <p className="lc-desc text-xs min-[400px]:text-sm md:text-xs min-[900px]:text-sm leading-relaxed text-toza-gray">
                {items[i]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
