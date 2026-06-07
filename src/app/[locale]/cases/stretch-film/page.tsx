import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { GilamHero } from "@/components/gilam/hero";
import { GilamAdvantages } from "@/components/gilam/advantages";
import { GilamSpecs } from "@/components/gilam/specs";
import { GilamProduction } from "@/components/gilam/production";
import { GilamCta } from "@/components/gilam/cta";

export const metadata: Metadata = {
  title: "GILAM PLYÖNKASI SANOAT — промышленная стретч-плёнка",
  description:
    "Промышленная стретч-плёнка для надёжной фиксации, защиты и безопасной транспортировки грузов. 45 см × 200 м × 50 мкм. Производство под брендом от VIING.",
};

export default async function StretchFilmPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main">
      <GilamHero />
      <GilamAdvantages />
      <GilamSpecs />
      <GilamProduction />
      <GilamCta />
    </main>
  );
}
