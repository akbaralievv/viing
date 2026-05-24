import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site-config";
import { navKeys, navHrefs } from "@/lib/site-data";

type ServiceItem = { title: string };

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tServices = useTranslations("services");
  const tContact = useTranslations("contact");
  const serviceItems = tServices.raw("items") as ServiceItem[];
  const year = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <span
                aria-hidden="true"
                className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center"
              >
                <span className="text-white font-bold text-lg">V</span>
              </span>
              <span className="text-xl font-bold">{siteConfig.name}</span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed">{t("tagline")}</p>
          </div>

          <div>
            <h2 className="font-semibold mb-4">{t("servicesTitle")}</h2>
            <ul className="space-y-2 text-sm text-background/70">
              {serviceItems.map((service) => (
                <li key={service.title}>
                  <Link href="/#services" className="hover:text-primary transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-4">{t("companyTitle")}</h2>
            <ul className="space-y-2 text-sm text-background/70">
              {navKeys
                .filter((key) => key !== "contact")
                .map((key) => (
                  <li key={key}>
                    <Link href={navHrefs[key]} className="hover:text-primary transition-colors">
                      {tNav(key)}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-4">{t("contactsTitle")}</h2>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a
                  href={`tel:${siteConfig.contacts.phoneLink}`}
                  className="hover:text-primary transition-colors"
                >
                  {siteConfig.contacts.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contacts.email}`}
                  className="hover:text-primary transition-colors"
                >
                  {siteConfig.contacts.email}
                </a>
              </li>
              <li>{tContact("address")}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/15 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60">{t("copyright", { year })}</p>
          <nav className="flex gap-6 text-sm text-background/60" aria-label={t("legalNav")}>
            <Link href="/privacy" className="hover:text-primary transition-colors">
              {t("privacy")}
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              {t("terms")}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
