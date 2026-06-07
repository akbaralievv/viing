import Image from "next/image";
import {
  Check,
  Droplets,
  Factory,
  FlaskConical,
  Layers,
  Package,
  ShieldCheck,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

const STEPS: { icon: LucideIcon; label: string }[] = [
  { icon: FlaskConical, label: "Разработка рецептуры" },
  { icon: Layers, label: "Подготовка материалов" },
  { icon: Factory, label: "Производство полотна" },
  { icon: Droplets, label: "Пропитка и нарезка" },
  { icon: Package, label: "Упаковка и запайка" },
  { icon: ShieldCheck, label: "Контроль качества" },
  { icon: Warehouse, label: "Склад и логистика" },
];

const ADVANTAGES = [
  "Современное оборудование",
  "Международные стандарты качества",
  "Гибкие условия сотрудничества (OEM / ODM / Private Label)",
  "Быстрая доставка по всему миру",
];

export function TozaKozaProduction() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/tozaKoza/factory.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Readability overlays: uniform veil on mobile, white-to-clear gradient on desktop */}
      <div className="absolute inset-0 bg-white/85 lg:hidden" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-white via-white/85 to-transparent lg:block" />

      <div className="relative z-10 container mx-auto px-4 py-14 md:py-20">
        {/* Heading */}
        <h2 className="text-center font-cormorant text-2xl font-bold uppercase tracking-wide text-[#052439] md:text-[2.25rem]">
          Производство и качество VIING
        </h2>

        <div className="mt-8 flex flex-col gap-10 lg:mt-10 lg:flex-row lg:items-stretch lg:gap-10">
          {/* Left: subtitle + process steps */}
          <div className="lg:flex lg:flex-1 lg:flex-col lg:justify-between">
            <p className="max-w-md text-base leading-relaxed text-[#4D5563] md:text-lg">
              Мы обеспечиваем полный цикл производства и строгий контроль качества
              на каждом этапе.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-x-3 gap-y-7 min-[600px]:grid-cols-4 lg:mt-12 lg:grid-cols-7 lg:gap-x-2">
              {STEPS.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#CFC8B8] bg-white/70 text-[#0E5A4F]">
                    <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className="mt-2.5 text-xs leading-tight text-[#3F4A52]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: advantages card */}
          <div className="flex flex-col justify-center rounded-2xl bg-[#0B3D32] p-6 shadow-[0_20px_50px_rgba(11,61,50,0.25)] md:p-8 lg:w-[340px] lg:shrink-0">
            <ul className="space-y-5">
              {ADVANTAGES.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Check
                      className="h-3.5 w-3.5 text-[#6FC9A6]"
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-sm leading-relaxed text-white/90">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
