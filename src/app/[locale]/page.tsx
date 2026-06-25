import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Categories } from "@/components/sections/categories";
import { Popular } from "@/components/sections/popular";
import { BrandCta } from "@/components/sections/brand-cta";
import { WhyUs } from "@/components/sections/why-us";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/lib/site-config";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tContact = await getTranslations({ locale, namespace: "contact" });

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.legalName,
    image: `${siteConfig.url}/hero.webp`,
    telephone: siteConfig.contacts.phone,
    email: siteConfig.contacts.email,
    url: siteConfig.url,
    address: {
      "@type": "PostalAddress",
      streetAddress: tContact("address"),
      addressLocality: tContact("addressLocality"),
      addressCountry: siteConfig.contacts.addressCountry,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "15:00",
      },
    ],
  };

  return (
    <main id="main">
      <Hero />
      <Reveal><Categories /></Reveal>
      <Reveal><Popular /></Reveal>
      <Reveal><BrandCta /></Reveal>
      <Reveal><WhyUs /></Reveal>
      <Reveal><CtaBanner /></Reveal>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
    </main>
  );
}
