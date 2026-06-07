import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { TozaKozaHero } from "@/components/toza-koza/hero";
import { TozaKozaPurity } from "@/components/toza-koza/purity";
import { TozaKozaLineup } from "@/components/toza-koza/lineup";
import { TozaKozaDesign } from "@/components/toza-koza/design";
import { TozaKozaSpecs } from "@/components/toza-koza/specs";
import { TozaKozaCta } from "@/components/toza-koza/cta";
import { TozaKozaProduction } from "@/components/toza-koza/production";

export const metadata: Metadata = {
  title: "TOZA KO'ZA — влажная туалетная бумага премиального качества",
  description:
    "TOZA KO'ZA — влажная туалетная бумага: 99% воды, без спирта, мягкие, смываемые, Halal Certified. Производство под брендом от VIING.",
};

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
