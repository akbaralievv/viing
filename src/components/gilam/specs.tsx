import { Droplet, Eye, RotateCw, ShieldCheck, type LucideIcon } from "lucide-react";
import { ZoomableImage } from "@/components/zoomable-image";

const SPECS: { value: string; label: string }[] = [
  { value: "45 см", label: "ширина" },
  { value: "200 м", label: "длина" },
  { value: "50 мкм", label: "толщина" },
];

const FEATURES: { Icon: LucideIcon; title: string; desc: string }[] = [
  {
    Icon: Eye,
    title: "Высокая прозрачность",
    desc: "Обеспечивает визуальный контроль без снятия упаковки.",
  },
  {
    Icon: ShieldCheck,
    title: "Устойчивость к проколу",
    desc: "Надежная защита от повреждений при транспортировке.",
  },
  {
    Icon: RotateCw,
    title: "Ручная и машинная намотка",
    desc: "Подходит для всех типов паллетообмотчиков.",
  },
  {
    Icon: Droplet,
    title: "Защита от влаги и пыли",
    desc: "Сохраняет товарный вид и качество продукции.",
  },
];

export function GilamSpecs() {
  return (
    <section id="specs" className="bg-[#F6F1EA] pt-14 md:pt-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Dimensions card */}
          <div className="rounded-[20px] border border-[#DDD1C3] bg-[#F0E8DF] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)] md:p-8">
            <div className="flex items-center gap-6 md:gap-8">
              {/* vertical roll (45 cm bracket on desktop) */}
              <div className="flex shrink-0 items-center gap-3">
                <div className="hidden h-[380px] items-center gap-2 sm:flex">
                  <span className="-rotate-90 text-[11px] tracking-wide text-[#7D7269]">
                    45 см
                  </span>
                  <span className="h-full w-px bg-[#DDD1C3]" />
                </div>
                <ZoomableImage
                  src="/gilam/stretch_vertical.png"
                  alt="GILAM PLYÖNKASI — рулон стретч-плёнки"
                  className="h-[320px] w-auto object-contain sm:h-[380px]"
                />
              </div>

              {/* dimensions */}
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#7B4A2C]">
                  Размер пленки
                </p>
                <div className="mt-5 divide-y divide-[#DDD1C3]">
                  {SPECS.map((s) => (
                    <div key={s.label} className="py-4 first:pt-0 last:pb-0">
                      <div className="text-3xl min-[360px]:text-4xl font-semibold leading-none text-[#7B4A2C] md:text-5xl">
                        {s.value}
                      </div>
                      <div className="mt-1.5 text-sm text-[#7D7269]">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Feature cards */}
          <div className="flex flex-col gap-4">
            {FEATURES.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-4 rounded-[20px] border border-[#DDD1C3] bg-[#F0E8DF] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8D8C7] text-[#7B4A2C]">
                  <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-[#2A1A14]">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#7D7269]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
