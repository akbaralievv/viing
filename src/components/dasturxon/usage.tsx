import { useTranslations } from "next-intl";
import { ZoomableImage } from "../zoomable-image";

const IMAGES = [
  "/dasturxon/use-supermarket.webp",
  "/dasturxon/use-meat.webp",
  "/dasturxon/use-restaurant.webp",
  "/dasturxon/use-production.webp",
  "/dasturxon/use-home.webp",
];

export function DasturxonUsage() {
  const t = useTranslations("dasturxon");
  const items = t.raw("usage.items") as { title: string; desc: string }[];

  return (
    <section className="bg-white pt-14 md:pt-20">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <h2
          className="text-center text-2xl font-medium uppercase tracking-wide text-dast-ink md:text-[2rem]"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {t("usage.heading")}
        </h2>

        {/* Cards — image on top, caption below */}
        <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
          {items.map(({ title, desc }, i) => (
            <article key={title} className="text-center">
              <div className="overflow-hidden rounded">
                <ZoomableImage
                  src={IMAGES[i]}
                  alt={title}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-base font-bold uppercase tracking-wide text-dast-ink">
                {title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-dast-muted">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
