import Image from "next/image";
import { MoveHorizontal, ShieldCheck, type LucideIcon } from "lucide-react";

const FEATURES: { Icon: LucideIcon; title: string }[] = [
  { Icon: ShieldCheck, title: "Прочность\nи надежность" },
  { Icon: MoveHorizontal, title: "Высокая растяжимость\nдо 300%" },
];

export function GilamHero() {
  return (
    <section className="relative min-h-[100svh] bg-[#F6F1EA]">
      {/* Scene — desktop (>= 900px): roll + box on the right */}
      <Image
        src="/gilam/hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hidden object-cover object-center min-[900px]:block"
      />
      {/* Scene — mobile (< 900px): roll + box at the bottom */}
      <Image
        src="/gilam/hero_mobile.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="block object-cover object-bottom min-[900px]:hidden"
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto flex min-h-[100svh] flex-col justify-start px-4 pb-12 pt-24 md:pt-28 min-[900px]:justify-center">
        <div className="mt-4 max-w-xl min-[900px]:mt-0">
          <h1 className="font-helvetica text-[clamp(2.75rem,8vw,5.5rem)] font-bold uppercase leading-[0.95] tracking-tight text-[#2A1A14]">
            Gilam Plyönkasi
          </h1>
          <p className="mt-1 font-helvetica text-[clamp(1.5rem,4vw,2.75rem)] font-medium uppercase tracking-[0.08em] text-[#7B4A2C]">
            Sanoat
          </p>

          <p className="mt-5 max-w-md text-base leading-relaxed text-[#4A4038] md:text-lg">
            Промышленная стретч-пленка для надежной фиксации, защиты и безопасной
            транспортировки грузов.
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-5 [@media(max-width:1023px)_and_(max-height:849px)]:hidden">
            {FEATURES.map(({ Icon, title }) => (
              <li key={title} className="flex items-center gap-3">
                <Icon
                  className="h-8 w-8 shrink-0 text-[#6B2F12]"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span className="whitespace-pre-line text-sm font-medium leading-tight text-[#4A4038]">
                  {title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
