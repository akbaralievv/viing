import {
  Globe,
  Truck,
  Package,
  Tag,
  Shield,
  MessageSquare,
  ClipboardList,
  Factory,
  ShipWheel,
  HeadphonesIcon,
} from "lucide-react";

export const navKeys = ["about", "services", "products", "process", "faq", "contact"] as const;
export type NavKey = (typeof navKeys)[number];

export const navHrefs: Record<NavKey, string> = {
  about: "/#about",
  services: "/#services",
  products: "/#products",
  process: "/#process",
  faq: "/#faq",
  contact: "/#contact",
};

export const serviceIcons = [Globe, Truck, Tag, Package] as const;

export const whyUsIcons = [Shield, Truck, Package] as const;

export const processIcons = [
  MessageSquare,
  ClipboardList,
  Factory,
  ShipWheel,
  HeadphonesIcon,
] as const;

export const productImages = [
  "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=400&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&auto=format&q=80",
] as const;

export const aboutImages = [
  {
    src: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&h=520&fit=crop&auto=format&q=80",
    altKey: "warehouse",
    offset: "",
  },
  {
    src: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=400&h=520&fit=crop&auto=format&q=80",
    altKey: "shipping",
    offset: "mt-8",
  },
  {
    src: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=400&h=520&fit=crop&auto=format&q=80",
    altKey: "production",
    offset: "-mt-8",
  },
  {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=520&fit=crop&auto=format&q=80",
    altKey: "team",
    offset: "",
  },
] as const;

export const partnerLogos = [
  "Alibaba",
  "DHL",
  "Maersk",
  "Sinotrans",
  "FESCO",
  "CMA CGM",
] as const;

export const stats = [
  { value: "10+", key: "years" },
  { value: "500+", key: "partners" },
  { value: "50+", key: "countries" },
] as const;

export const heroSecondaryStats = [
  { value: "1000+", key: "suppliers" },
  { value: "50K+", key: "products" },
  { value: "99%", key: "successRate" },
  { value: "24/7", key: "support" },
] as const;

export const heroImage =
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&h=750&fit=crop&auto=format&q=80";
