import { useTranslations } from "next-intl";
import { partnerLogos } from "@/lib/site-data";

export function Partners() {
  const t = useTranslations("partners");

  return (
    <section
      className="py-12 md:py-16 border-y border-border bg-muted/20"
      aria-label={t("title")}
    >
      <div className="container mx-auto px-4">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">
          {t("title")}
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {partnerLogos.map((name) => (
            <li
              key={name}
              className="text-lg md:text-xl font-semibold text-muted-foreground/70 hover:text-foreground transition-colors"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
