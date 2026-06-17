import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DasturxonHero } from "@/components/dasturxon/hero";
import { DasturxonAdvantages } from "@/components/dasturxon/advantages";
import { DasturxonSpecs } from "@/components/dasturxon/specs";
import { DasturxonUsage } from "@/components/dasturxon/usage";
import { DasturxonProduction } from "@/components/dasturxon/production";
import { DasturxonCta } from "@/components/dasturxon/cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dasturxon.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function FoodClingFilmPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main">
      <DasturxonHero />
      <DasturxonAdvantages />
      <DasturxonUsage />
      <DasturxonSpecs />
      <DasturxonProduction />
      <DasturxonCta />
    </main>
  );
}
