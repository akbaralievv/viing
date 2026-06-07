import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GilamHero } from "@/components/gilam/hero";
import { GilamAdvantages } from "@/components/gilam/advantages";
import { GilamSpecs } from "@/components/gilam/specs";
import { GilamProduction } from "@/components/gilam/production";
import { GilamCta } from "@/components/gilam/cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "stretchFilm.meta" });
  return { title: t("title"), description: t("description") };
}

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
