import Image from "next/image";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { aboutImages } from "@/lib/site-data";

export function About() {
  const t = useTranslations("about");
  const tImages = useTranslations("about.images");
  const advantages = t.raw("advantages") as string[];

  return (
    <section id="about" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-500/20 rounded-full blur-xl"
            />
            <div className="relative grid grid-cols-2 gap-4">
              {aboutImages.map((image) => (
                <div
                  key={image.src}
                  className={`relative h-64 rounded-2xl overflow-hidden ${image.offset}`}
                >
                  <Image
                    src={image.src}
                    alt={tImages(image.altKey)}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              {t("badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("title1")} <span className="text-primary">{t("title2")}</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6">{t("p1")}</p>
            <p className="text-muted-foreground text-lg mb-8">{t("p2")}</p>

            <ul className="grid sm:grid-cols-2 gap-4">
              {advantages.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0"
                  >
                    <Check className="w-4 h-4" />
                  </span>
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
