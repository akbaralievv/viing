import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ZoomableImage } from "@/components/zoomable-image";

export function GilamCta() {
  const t = useTranslations("stretchFilm");

  return (
    <section id="contacts" className="relative overflow-hidden">
      <Image
        src="/gilam/cta-back.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Darkening: veil below 900px, dark-to-clear gradient from 900px */}
      <div className="absolute inset-0 bg-black/10 min-[900px]:hidden" />

      <div className="relative z-10 container mx-auto px-4 py-5">
        <div className="grid items-center gap-10 min-[900px]:grid-cols-2">
          {/* Text + CTA */}
          <div>
            <h2 className="font-cormorant text-3xl font-semibold uppercase leading-tight text-white">
              {t("cta.heading")}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/85 md:text-lg">
              {t("cta.desc")}
            </p>
            <Link
              href="/#contact"
              className="mt-8 inline-flex items-center gap-2.5 rounded-[5px] bg-amber-cta px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-amber-cta-deep"
            >
              {t("cta.button")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Product */}
          <div className="hidden min-[900px]:block">
            <ZoomableImage
              src="/gilam/stretch-horizontal.png"
              alt="GILAM PLYÖNKASI"
              className="ml-auto w-full max-w-[420px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
