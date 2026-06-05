import { useTranslations } from "next-intl";
import { whyUsIcons } from "@/lib/site-data";

type WhyUsItem = { title: string; description: string };

export function WhyUs() {
  const t = useTranslations("whyUs");
  const items = t.raw("items") as WhyUsItem[];

  return (
    <section id="why" className="scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-[2rem] font-bold text-primary mb-3">{t("title")}</h2>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((item, idx) => {
            const Icon = whyUsIcons[idx] ?? whyUsIcons[0];
            return (
              <li key={item.title}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-brand/10 text-brand shrink-0">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </span>
                  <h3 className="font-bold text-primary text-lg leading-tight">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
