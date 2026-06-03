import { MapPin, Phone, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LogoMark } from "@/components/logo-mark";
import { TelegramIcon, WhatsappIcon } from "@/components/social-icons";
import { siteConfig } from "@/lib/site-config";
import { categories, type Category } from "@/lib/catalog";

function categoryHref(category: Category): string {
  if (category.kind === "products") return `/catalog/${category.slug}`;
  return category.href ?? "/catalog";
}

export function Footer() {
  const t = useTranslations("footer");
  const tCat = useTranslations("catalog.categories");
  const tContact = useTranslations("contact");
  const services = t.raw("services") as string[];
  // Targets in the same order as footer.services in messages:
  // [Поиск производителей, Производство под брендом, Контроль качества, Логистика и доставка, Таможенное оформление]
  const serviceHrefs = ["/catalog", "/brand", "/#why", "/#contact", "/#contact"];
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-14 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:pr-6">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
              <LogoMark className="h-12 w-auto" />
              <span className="text-xl font-semibold tracking-widest text-white">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-sm text-white/65 leading-relaxed mb-6">{t("tagline")}</p>
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.contacts.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 hover:bg-brand transition-colors"
              >
                <TelegramIcon className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.contacts.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 hover:bg-brand transition-colors"
              >
                <WhatsappIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-4">{t("catalogTitle")}</h2>
            <ul className="space-y-2.5 text-sm text-white/65">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link href={categoryHref(category)} className="hover:text-white transition-colors">
                    {tCat(`${category.slug}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-4">{t("servicesTitle")}</h2>
            <ul className="space-y-2.5 text-sm text-white/65">
              {services.map((service, i) => (
                <li key={service}>
                  <Link
                    href={serviceHrefs[i] ?? "/#contact"}
                    className="hover:text-white transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-4">{t("companyTitle")}</h2>
            <ul className="space-y-2.5 text-sm text-white/65">
              <li>
                <Link href="/#why" className="hover:text-white transition-colors">
                  {t("company.advantages")}
                </Link>
              </li>
              <li>
                <Link href="/brand" className="hover:text-white transition-colors">
                  {t("company.brand")}
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white transition-colors">
                  {t("company.contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-4">{t("contactsTitle")}</h2>
            <ul className="space-y-3 text-sm text-white/65">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-white/50" aria-hidden="true" />
                <span>{tContact("address")}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 shrink-0 text-white/50" aria-hidden="true" />
                <a
                  href={`mailto:${siteConfig.contacts.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contacts.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 shrink-0 text-white/50" aria-hidden="true" />
                <a
                  href={`tel:${siteConfig.contacts.phoneLink}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contacts.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-7 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50">{t("copyright", { year })}</p>
          <nav className="flex gap-6 text-sm text-white/50" aria-label={t("legalNav")}>
            <Link href="/privacy" className="hover:text-white transition-colors">
              {t("privacy")}
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              {t("terms")}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
