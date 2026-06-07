import {
  Coins,
  Droplet,
  Lock,
  Maximize2,
  Package,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

const ICONS: LucideIcon[] = [
  ShieldCheck,
  Maximize2,
  Lock,
  Droplet,
  Package,
  Coins,
];

export function GilamAdvantages() {
  const t = useTranslations("stretchFilm");
  const items = t.raw("advantages") as { title: string; desc: string }[];

  return (
    <section id="advantages" className="bg-[#F6F1EA] pt-14 md:pt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-px bg-[#DDD1C3] md:grid-cols-3 lg:grid-cols-6">
          {items.map(({ title, desc }, i) => {
            const Icon = ICONS[i];
            return (
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
                <p className="mt-2 text-sm leading-relaxed text-[#7D7269]">
                  {desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
