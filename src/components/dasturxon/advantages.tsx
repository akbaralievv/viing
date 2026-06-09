import { Box, Hand, Leaf, ShieldCheck, Sparkles, Wind, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const ICONS: LucideIcon[] = [Box, Leaf, Sparkles, Wind, ShieldCheck, Hand];

export function DasturxonAdvantages() {
  const t = useTranslations("dasturxon");
  const labels = t.raw("advantages") as string[];

  return (
    <section className="bg-[#F8F6F2] pb-14 md:pb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-px bg-[#DCE2EA] sm:grid-cols-3 lg:grid-cols-6">
          {labels.map((label, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={label}
                className="flex flex-col items-center bg-[#F8F6F2] px-4 py-8 text-center"
              >
                <Icon
                  className="h-9 w-9 text-[#1F426E]"
                  strokeWidth={1.4}
                  aria-hidden="true"
                />
                <span className="mt-4 text-sm font-medium leading-tight text-[#223B63]">
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
