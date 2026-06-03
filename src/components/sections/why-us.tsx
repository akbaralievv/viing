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
              <li key={item.title} className="text-center sm:text-left">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand/10 text-brand mb-4">
                  <Icon className="w-7 h-7" aria-hidden="true" />
                </span>
                <h3 className="font-bold text-primary text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
