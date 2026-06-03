export const siteConfig = {
  name: "VIING",
  legalName: "VIING MCHJ XK",
  url: "https://viing.tech",
  founded: 2014,
  contacts: {
    phone: "+998 93 314 32 23",
    phoneLink: "+998933143223",
    email: "info@viing.tech",
    telegram: "https://t.me/+998933143223",
    whatsapp: "https://wa.me/998933143223",
    instagram: "https://instagram.com/viing.uz",
    linkedin: "https://www.linkedin.com/company/viing",
    addressCountry: "UZ",
  },
} as const;

export type SiteConfig = typeof siteConfig;
