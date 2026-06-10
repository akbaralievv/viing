import { Box, Hand, Leaf, ShieldCheck, Sparkles, Wind, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const ICONS: LucideIcon[] = [Box, Leaf, Sparkles, Wind, ShieldCheck, Hand];

export function DasturxonAdvantages() {
  const t = useTranslations("dasturxon");
  const labels = t.raw("advantages") as string[];

  return (
    <section className="bg-dast-cream pb-14 md:pb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-px bg-dast-line sm:grid-cols-3 lg:grid-cols-6">
          {labels.map((label, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={label}
                className="flex flex-col items-center bg-dast-cream px-4 py-8 text-center"
              >
                <Icon
                  className="h-9 w-9 text-dast-navy"
                  strokeWidth={1.4}
                  aria-hidden="true"
                />
                <span className="mt-4 text-sm font-medium leading-tight text-dast-ink">
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
