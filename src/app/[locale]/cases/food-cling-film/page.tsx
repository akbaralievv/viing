import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { DasturxonHero } from "@/components/dasturxon/hero";
import { DasturxonAdvantages } from "@/components/dasturxon/advantages";
import { DasturxonSpecs } from "@/components/dasturxon/specs";
import { DasturxonUsage } from "@/components/dasturxon/usage";
import { DasturxonProduction } from "@/components/dasturxon/production";
import { DasturxonCta } from "@/components/dasturxon/cta";

export const metadata: Metadata = {
  title: "DASTURXON PLYÖNKASI — пищевая стретч-плёнка",
  description:
    "DASTURXON PLYÖNKASI — пищевая плёнка для хранения продуктов и сохранения свежести. 100 метров. Производство под брендом от VIING.",
};

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
      <DasturxonSpecs />
      <DasturxonUsage />
      <DasturxonProduction />
      <DasturxonCta />
    </main>
  );
}
