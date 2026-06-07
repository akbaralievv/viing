import { useTranslations } from "next-intl";
import { ZoomableImage } from "@/components/zoomable-image";

const PRODUCTS = [
  { count: "40", image: "/tozaKoza/40-pieces.png" },
  { count: "80", image: "/tozaKoza/80-pieces.png" },
  { count: "120", image: "/tozaKoza/120-pieces.png" },
];

export function TozaKozaLineup() {
  const t = useTranslations("wetWipes");
  const items = t.raw("lineup.items") as string[];
  const sheets = t("lineup.sheets");

  return (
    <section className="bg-[#FAF7F1] py-14 md:py-20">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="flex items-center justify-center gap-3 text-center font-cormorant text-2xl md:gap-4 md:text-[2.5rem] font-bold uppercase tracking-wide text-[#052439]">
          <span aria-hidden="true" className="text-lg text-[#B89A56] md:text-2xl">
            ✦
          </span>
          {t("lineup.heading")}
          <span aria-hidden="true" className="text-lg text-[#B89A56] md:text-2xl">
            ✦
          </span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-3 md:gap-6">
          {PRODUCTS.map((p, i) => (
            <div
              key={p.count}
              className="lineup-card mx-auto w-full max-w-[450px] rounded-2xl border border-[#E6D9C2] bg-[#F7F1E8] p-6 transition-colors md:p-7"
            >
              <div className="lc-num shrink-0">
                <div className="font-bodoni text-[2rem] font-semibold leading-none text-[#234C43]">
                  {p.count}
                </div>
                <div className="text-xs min-[400px]:text-sm md:text-xs min-[900px]:text-sm font-semibold text-[#234C43]">
                  {sheets}
                </div>
              </div>
              <ZoomableImage
                src={p.image}
                alt={`TOZA KO'ZA — ${p.count} ${sheets}`}
                className="lc-image w-full object-contain"
              />
              <p className="lc-desc text-xs min-[400px]:text-sm md:text-xs min-[900px]:text-sm leading-relaxed text-[#6E6E6E]">
                {items[i]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
