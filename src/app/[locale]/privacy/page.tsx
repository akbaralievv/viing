import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return {
    title: `${t("title")} | ${siteConfig.name}`,
    description: t("intro", { url: siteConfig.url }),
    robots: { index: false, follow: true },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "privacy" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const section2List = t.raw("section2List") as string[];

  return (
    <main id="main" className="container mx-auto px-4 pt-28 md:pt-32 pb-16 max-w-3xl">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        {tNav("back")}
      </Link>
      <h1 className="text-3xl md:text-4xl font-bold mb-6">{t("title")}</h1>
      <p className="text-muted-foreground mb-6">{t("intro", { url: siteConfig.url })}</p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">{t("section1Title")}</h2>
      <p className="text-muted-foreground mb-4">{t("section1Body")}</p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">{t("section2Title")}</h2>
      <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
        {section2List.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">{t("section3Title")}</h2>
      <p className="text-muted-foreground mb-4">{t("section3Body")}</p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">{t("section4Title")}</h2>
      <p className="text-muted-foreground mb-4">{t("section4Body")}</p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">{t("section5Title")}</h2>
      <p className="text-muted-foreground">
        {t("section5Body")}{" "}
        <a href={`mailto:${siteConfig.contacts.email}`} className="text-primary hover:underline">
          {siteConfig.contacts.email}
        </a>
        .
      </p>
    </main>
  );
}
