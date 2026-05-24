import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { processIcons } from "@/lib/site-data";

type Step = { title: string; description: string };

export function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as Step[];

  return (
    <section id="process" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">{t("badge")}</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("title1")} <span className="text-primary">{t("title2")}</span> {t("title3")}
          </h2>
          <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
        </div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = processIcons[idx] ?? processIcons[0];
            return (
              <li
                key={step.title}
                className="relative bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="text-4xl font-bold text-primary/15 leading-none">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
