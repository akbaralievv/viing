import { ShieldCheck, BadgeCheck, Wallet, Headset } from "lucide-react";
import { IconBox, IconFactory, IconWeb, IconTruck } from "@/components/hero-icons";

export const navKeys = ["catalog", "brand", "contact"] as const;
export type NavKey = (typeof navKeys)[number];

export const navHrefs: Record<NavKey, string> = {
  catalog: "/catalog",
  brand: "/brand",
  contact: "/#contact",
};

/** Hero stat blocks — value & label live in messages under hero.stats.<key>. */
export const heroStats = [
  { key: "products", icon: IconBox },
  { key: "suppliers", icon: IconFactory },
  { key: "experience", icon: IconWeb },
  { key: "delivery", icon: IconTruck },
] as const;

/** "Почему выбирают VIING" — titles & descriptions live in messages under whyUs.items[]. */
export const whyUsIcons = [ShieldCheck, BadgeCheck, Wallet, Headset] as const;
