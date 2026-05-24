import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";

type FaqItem = { question: string; answer: string };

export function Faq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FaqItem[];

  return (
    <section id="faq" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">{t("badge")}</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("title1")} <span className="text-primary">{t("title2")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {items.map((item, idx) => (
            <details
              key={item.question}
              className="group bg-card border border-border rounded-2xl overflow-hidden open:border-primary/40 transition-colors"
              {...(idx === 0 ? { open: true } : {})}
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer p-5 md:p-6 list-none">
                <h3 className="font-semibold text-base md:text-lg pr-4">{item.question}</h3>
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center transition-transform group-open:rotate-45"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14" />
                    <path d="M5 12h14" />
                  </svg>
                </span>
              </summary>
              <div className="px-5 md:px-6 pb-5 md:pb-6 text-muted-foreground leading-relaxed">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
