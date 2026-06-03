import Image from "next/image";
import { useTranslations } from "next-intl";
import { QuickLeadForm } from "@/components/quick-lead-form";

export function CtaBanner() {
  const t = useTranslations("cta");

  return (
    <section id="contact" className="py-16 md:py-24 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-10 md:px-12 md:py-14">
          <Image
            src="/banner.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="object-cover"
          />
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-[2rem] font-bold text-white leading-tight mb-3">
                {t("title")}
              </h2>
              <p className="text-white/80 max-w-md">{t("subtitle")}</p>
            </div>
            <div>
              <QuickLeadForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
