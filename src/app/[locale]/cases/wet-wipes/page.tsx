import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { TozaKozaHero } from "@/components/toza-koza/hero";

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
    </main>
  );
}
