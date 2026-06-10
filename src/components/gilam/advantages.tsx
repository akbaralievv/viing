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
    <section id="advantages" className="bg-gilam-cream pt-14 md:pt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-px bg-gilam-line md:grid-cols-3 lg:grid-cols-6">
          {items.map(({ title, desc }, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={title}
                className="flex flex-col items-center bg-gilam-cream px-4 py-8 text-center"
              >
                <Icon
                  className="h-9 w-9 text-gilam-brown"
                  strokeWidth={1.4}
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-base font-semibold text-gilam-ink">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gilam-muted">
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
