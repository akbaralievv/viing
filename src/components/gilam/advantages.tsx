import {
  Coins,
  Droplet,
  Lock,
  Maximize2,
  Package,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const ADVANTAGES: { Icon: LucideIcon; title: string; desc: string }[] = [
  {
    Icon: ShieldCheck,
    title: "Прочность",
    desc: "Надежно удерживает груз на паллете",
  },
  {
    Icon: Maximize2,
    title: "Растяжение",
    desc: "Высокая эластичность до 300%",
  },
  {
    Icon: Lock,
    title: "Фиксация",
    desc: "Стабильность и надежная фиксация",
  },
  {
    Icon: Droplet,
    title: "Защита от влаги",
    desc: "Препятствует попаданию влаги, пыли и грязи",
  },
  {
    Icon: Package,
    title: "Защита груза",
    desc: "Сохраняет товарный вид и качество продукции",
  },
  {
    Icon: Coins,
    title: "Экономичность",
    desc: "Снижает расход материала и затраты на упаковку",
  },
];

export function GilamAdvantages() {
  return (
    <section id="advantages" className="bg-[#F6F1EA] pt-14 md:pt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-px bg-[#DDD1C3] md:grid-cols-3 lg:grid-cols-6">
          {ADVANTAGES.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col items-center bg-[#F6F1EA] px-4 py-8 text-center"
            >
              <Icon
                className="h-9 w-9 text-[#7B4A2C]"
                strokeWidth={1.4}
                aria-hidden="true"
              />
              <h3 className="mt-4 text-base font-semibold text-[#2A1A14]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#7D7269]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
