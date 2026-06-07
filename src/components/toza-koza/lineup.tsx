import { cn } from "@/lib/utils";

type Product = { count: string; image: string; desc: string; active?: boolean };

const PRODUCTS: Product[] = [
  {
    count: "40",
    image: "/tozaKoza/40-pieces.png",
    desc: "Компактная упаковка для ежедневного комфорта.",
  },
  {
    count: "80",
    image: "/tozaKoza/80-pieces.png",
    desc: "Оптимальный формат для всей семьи.",
    // active: true,
  },
  {
    count: "120",
    image: "/tozaKoza/120-pieces.png",
    desc: "Выгодный формат для длительного использования.",
  },
];

export function TozaKozaLineup() {
  return (
    <section className="bg-[#FAF7F1] py-14 md:py-20">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="flex items-center justify-center gap-3 text-center font-cormorant text-2xl md:gap-4 md:text-[2.5rem] font-bold uppercase tracking-wide text-[#052439]">
          <span aria-hidden="true" className="text-lg text-[#B89A56] md:text-2xl">
            ✦
          </span>
          Линейка продукции
          <span aria-hidden="true" className="text-lg text-[#B89A56] md:text-2xl">
            ✦
          </span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-3 md:gap-6">
          {PRODUCTS.map((p) => (
            <div
              key={p.count}
              className={cn(
                "lineup-card mx-auto w-full max-w-[450px] rounded-2xl border p-6 transition-colors md:p-7",
                p.active
                  ? "border-transparent bg-[#0B5A4A]"
                  : "border-[#E6D9C2] bg-[#F7F1E8]"
              )}
            >
              <div className="lc-num shrink-0">
                <div
                  className={cn(
                    "font-bodoni text-[2rem] font-semibold leading-none",
                    p.active ? "text-white" : "text-[#234C43]"
                  )}
                >
                  {p.count}
                </div>
                <div
                  className={cn(
                    "text-xs min-[400px]:text-sm md:text-xs min-[900px]:text-sm font-semibold",
                    p.active ? "text-white/90" : "text-[#234C43]"
                  )}
                >
                  листов
                </div>
              </div>
              <img
                src={p.image}
                alt={`TOZA KO'ZA — ${p.count} листов`}
                className="lc-image w-full object-contain"
              />
              <p
                className={cn(
                  "lc-desc text-xs min-[400px]:text-sm md:text-xs min-[900px]:text-sm leading-relaxed",
                  p.active ? "text-white/80" : "text-[#6E6E6E]"
                )}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
