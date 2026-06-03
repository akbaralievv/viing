import Image from "next/image";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { img } from "@/lib/catalog";

export function About() {
  const t = useTranslations("about");
  const advantages = t.raw("advantages") as string[];

  return (
    <section id="about" className="py-16 md:py-24 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border bg-secondary">
              <Image
                src={img("1586528116311-ad8dd3c8310d", 800, 600)}
                alt={t("title")}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute -bottom-5 -right-3 w-28 h-28 rounded-2xl bg-brand/10 -z-10"
            />
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-2xl md:text-[2rem] font-bold text-primary mb-5 leading-tight">
              {t("title")}
            </h2>
            <p className="text-muted-foreground mb-4">{t("p1")}</p>
            <p className="text-muted-foreground mb-8">{t("p2")}</p>

            <ul className="grid sm:grid-cols-2 gap-3.5">
              {advantages.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex items-center justify-center w-6 h-6 rounded-full bg-mint/25 text-primary shrink-0"
                  >
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
