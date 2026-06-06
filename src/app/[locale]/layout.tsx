import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import { siteConfig } from "@/lib/site-config";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { FloatingContacts } from "@/components/floating-contacts";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Montserrat — display/headline font used on the case-study sections.
const montserrat = Montserrat({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#052439" },
  ],
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t("title"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: siteConfig.legalName }],
    creator: siteConfig.legalName,
    publisher: siteConfig.legalName,
    alternates: {
      canonical: locale === routing.defaultLocale ? "/" : `/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [
          l,
          l === routing.defaultLocale ? "/" : `/${l}`,
        ])
      ),
    },
    openGraph: {
      type: "website",
      locale: t("locale"),
      url: locale === routing.defaultLocale ? siteUrl : `${siteUrl}/${locale}`,
      siteName: siteConfig.name,
      title: t("ogTitle"),
      description: t("shortDescription"),
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: t("ogAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("shortDescription"),
      images: ["/og.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    formatDetection: {
      telephone: false,
      email: false,
      address: false,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "contact" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: tMeta("description"),
    foundingDate: String(siteConfig.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: t("address"),
      addressLocality: t("addressLocality"),
      addressCountry: siteConfig.contacts.addressCountry,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.contacts.phone,
        contactType: "sales",
        email: siteConfig.contacts.email,
        availableLanguage: ["ru", "uz", "en"],
      },
    ],
    sameAs: [siteConfig.contacts.telegram].filter(Boolean),
  };

  return (
    <html lang={locale} className={`${inter.variable} ${montserrat.variable}`}>
      <body suppressHydrationWarning className="flex min-h-screen flex-col antialiased">
        <NextIntlClientProvider>
          <Header />
          <div className="flex flex-1 flex-col">{children}</div>
          <Footer />
          <FloatingContacts />
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
