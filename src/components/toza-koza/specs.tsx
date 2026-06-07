import Image from "next/image";
import { ZoomableImage } from "@/components/zoomable-image";

const SPECS: [string, string][] = [
  ["Размер листа", "150 × 200 мм"],
  ["Материал полотна", "Нетканое полотно (древесная целлюлоза / вискоза)"],
  ["Состав (INCI)", "Aqua, Citric Acid, Sodium Citrate"],
  ["Количество листов", "40 / 80 / 120 шт."],
  ["Срок годности", "3 года"],
  [
    "Условия хранения",
    "Хранить при комнатной температуре, избегать прямых солнечных лучей.",
  ],
];

const CALLOUTS: { image: string; text: string }[] = [
  {
    image: "/tozaKoza/textile.png",
    text: "Мягкая текстура и тиснение для бережного очищения.",
  },
  {
    image: "/tozaKoza/valve.png",
    text: "Надёжный клапан сохраняет влагу и свежесть.",
  },
];

export function TozaKozaSpecs() {
  return (
    <section className="relative overflow-hidden bg-white">
      <Image
        src="/tozaKoza/white-background.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="relative z-10 container mx-auto px-4 py-14 md:py-20">
        {/* Heading */}
        <h2 className="font-cormorant text-2xl font-bold uppercase tracking-wide text-[#052439] md:text-[2rem]">
          Характеристики продукта
        </h2>

        <div className="mt-8 flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          {/* Specs table */}
          <div className="w-full overflow-hidden rounded-xl bg-white/55 ring-1 ring-[#E6E2D9]/70 backdrop-blur-sm lg:max-w-[560px]">
            <table className="w-full border-collapse text-left align-top">
              <tbody>
                {SPECS.map(([label, value]) => (
                  <tr
                    key={label}
                    className="border-b border-[#E8E4DB] last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="w-2/5 bg-[#F2F0EA]/80 px-4 py-3 text-xs font-semibold text-[#052439] sm:text-sm"
                    >
                      {label}
                    </th>
                    <td className="px-4 py-3 text-xs leading-relaxed text-[#5C5C5C] sm:text-sm">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Feature callouts */}
          <div className="flex w-full max-w-[420px] flex-col gap-8 min-[600px]:max-w-none min-[600px]:flex-row min-[600px]:flex-wrap min-[600px]:justify-center lg:max-w-[300px] lg:flex-col lg:pt-6">
            {CALLOUTS.map((c) => (
              <div
                key={c.text}
                className="flex items-center gap-4 min-[600px]:w-[300px] lg:w-auto"
              >
                <ZoomableImage
                  src={c.image}
                  alt={c.text}
                  className="h-20 w-20 shrink-0 rounded-full object-cover ring-1 ring-[#E6E2D9] shadow-[0_6px_18px_rgba(0,0,0,0.06)] min-[400px]:h-24 min-[400px]:w-24 md:h-28 md:w-28"
                />
                <p className="min-w-0 flex-1 text-sm leading-relaxed text-[#4D5563]">
                  {c.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
