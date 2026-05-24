import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { serviceIcons } from "@/lib/site-data";

type ServiceItem = { title: string; description: string };

export function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as ServiceItem[];

  return (
    <section id="services" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">{t("badge")}</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("title1")} <span className="text-primary">{t("title2")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((service, idx) => {
            const Icon = serviceIcons[idx] ?? serviceIcons[0];
            return (
              <li key={service.title}>
                <Card className="group h-full p-6 hover:border-primary/40 bg-card">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
