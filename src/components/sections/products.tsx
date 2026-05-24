import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { productImages } from "@/lib/site-data";

type ProductCategory = { category: string; items: string[] };

export function Products() {
  const t = useTranslations("products");
  const items = t.raw("items") as ProductCategory[];

  return (
    <section id="products" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">{t("badge")}</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("title1")} <span className="text-primary">{t("title2")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((product, idx) => (
            <li key={product.category}>
              <Card className="group h-full overflow-hidden hover:border-primary/40">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={productImages[idx] ?? productImages[0]}
                    alt={product.category}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-background to-transparent"
                  />
                  <h3 className="absolute bottom-4 left-4 text-xl font-semibold">
                    {product.category}
                  </h3>
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    {product.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <span
                          aria-hidden="true"
                          className="w-1.5 h-1.5 bg-primary rounded-full"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </li>
          ))}
        </ul>

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline" className="h-14 px-8">
            <Link href="/#contact">
              {t("cta")}
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
