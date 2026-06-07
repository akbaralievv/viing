import { useTranslations } from "next-intl";
import { ZoomableImage } from "@/components/zoomable-image";

const IMAGES = [
  "/tozaKoza/design.png",
  "/tozaKoza/print.jpg",
  "/tozaKoza/valve.jpg",
  "/tozaKoza/box.jpg",
];

export function TozaKozaDesign() {
  const t = useTranslations("wetWipes");
  const items = t.raw("design.items") as { title: string; desc: string }[];

  return (
    <section className="bg-[#FDFBF7] py-14 md:py-20">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="flex items-center justify-center gap-3 text-center font-cormorant text-2xl md:gap-4 md:text-[2.5rem] font-bold uppercase tracking-wide text-[#052439]">
          <span aria-hidden="true" className="text-lg text-[#B89A56] md:text-2xl">
            ✦
          </span>
          {t("design.heading")}
          <span aria-hidden="true" className="text-lg text-[#B89A56] md:text-2xl">
            ✦
          </span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
          {items.map((c, i) => (
            <article key={c.title}>
              <div className="overflow-hidden rounded-2xl border border-[#E6D9C2]/70 bg-gradient-to-br from-[#FFFDF9] to-[#F2EBDD] shadow-[0_10px_30px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.02)]">
                <ZoomableImage
                  src={IMAGES[i]}
                  alt={c.title}
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-[#052439]">
                {c.title}
              </h3>
              <p className="mt-2 font-cormorant text-lg italic font-medium leading-snug text-[#4D5563]">
                {c.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
