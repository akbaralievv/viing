import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function TozaKozaCta() {
  const t = useTranslations("wetWipes");

  return (
    <section className="relative overflow-hidden">
      <Image
        src="/tozaKoza/cta-back.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Darkening veil — below 900px only */}
      <div className="absolute inset-0 bg-black/55 min-[900px]:hidden" />

      <div className="relative z-10 container mx-auto px-4 py-5">
        <div className="max-w-xl">
          <h2 className="font-cormorant text-3xl font-bold uppercase leading-tight text-white">
            {t("cta.heading")}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/85 md:text-lg">
            {t("cta.desc")}
          </p>
          <Link
            href="/#contact"
            className="mt-8 inline-flex items-center gap-2.5 rounded-[5px] bg-[#d49038] px-6 py-3.5 text-sm font-semibold text-[#fff] transition-colors"
          >
            {t("cta.button")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
