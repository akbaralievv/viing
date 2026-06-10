import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function DasturxonCta() {
  const t = useTranslations("dasturxon");

  return (
    <section id="contacts" className="relative overflow-hidden bg-dast-sky">
      <Image
        src="/dasturxon/cta.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Light veil on mobile so the text reads over the ornament */}
      <div className="absolute inset-0 bg-white/40 min-[900px]:hidden" />

      <div className="relative z-10 container mx-auto px-4 py-5">
        <div className="grid items-center gap-10 min-[900px]:grid-cols-2">
          {/* Text + CTA */}
          <div>
            <h2
              className="text-3xl font-semibold uppercase leading-tight text-dast-ink"
              style={{ fontFamily: "Georgia, sans-serif" }}
            >
              {t("cta.heading")}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-dast-body md:text-lg">
              {t("cta.desc")}
            </p>
            <Link
              href="/#contact"
              className="mt-8 inline-flex items-center gap-2.5 rounded-[5px] bg-dast-navy px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-dast-navy-deep"
            >
              {t("cta.button")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Product */}
          <div className="hidden min-[900px]:block">
            <img
              src="/dasturxon/stretch.png"
              alt="DASTURXON PLYÖNKASI"
              loading="lazy"
              decoding="async"
              className="ml-auto w-full max-w-[400px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
