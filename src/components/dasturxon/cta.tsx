import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";

const ITEMS = ["OEM / ODM", "Private Label", "Производство под заказ"];

export function DasturxonCta() {
  return (
    <section id="contacts" className="relative overflow-hidden bg-[#EEF2F8]">
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
              className="text-3xl font-semibold uppercase leading-tight text-[#223B63]"
              style={{ fontFamily: "Georgia, sans-serif" }}
            >
              Готовы запустить свой собственный бренд?
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#344B68] md:text-lg">
              VIING — ваш надёжный партнёр в создании высококачественной продукции мирового уровня.
            </p>
            <Link
              href="/#contact"
              className="mt-8 inline-flex items-center gap-2.5 rounded-[5px] bg-[#1F426E] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#15314F]"
            >
              Обсудить проект
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Product */}
          <div className="hidden min-[900px]:block">
            <img
              src="/dasturxon/stretch.png"
              alt="DASTURXON PLYÖNKASI"
              className="ml-auto w-full max-w-[400px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
