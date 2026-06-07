import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TozaKozaHero } from "@/components/toza-koza/hero";
import { TozaKozaPurity } from "@/components/toza-koza/purity";
import { TozaKozaLineup } from "@/components/toza-koza/lineup";
import { TozaKozaDesign } from "@/components/toza-koza/design";
import { TozaKozaSpecs } from "@/components/toza-koza/specs";
import { TozaKozaCta } from "@/components/toza-koza/cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "wetWipes.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function WetWipesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main">
      <TozaKozaHero />
      <TozaKozaLineup />
      <TozaKozaPurity />
      <TozaKozaDesign />
      <TozaKozaSpecs />
      <TozaKozaCta />
    </main>
  );
}
