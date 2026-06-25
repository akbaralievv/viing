import {
  SprayCan,
  Package,
  Home,
  Coffee,
  Sparkles,
  PackageCheck,
  type LucideIcon,
} from "lucide-react";

const UNSPLASH = "https://images.unsplash.com/photo-";

/** Build a sized Unsplash URL. Replace the ids below with real product photos when available. */
export const img = (id: string, w = 600, h = 600) =>
  `${UNSPLASH}${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

export type CategorySlug =
  | "hygiene"
  | "packaging"
  | "home"
  | "horeca"
  | "private-label"
  | "custom";

export type Category = {
  slug: CategorySlug;
  icon: LucideIcon;
  /** Display count, e.g. "1 248". Empty for non-listing categories. */
  count: string;
  image: string;
  /** "products" categories have a listing page; "link" ones jump elsewhere. */
  kind: "products" | "link";
  href?: string;
};

export const categories: Category[] = [
  { slug: "hygiene", icon: SprayCan, count: "1 248", image: "/categories/hygiene.webp", kind: "products" },
  { slug: "packaging", icon: Package, count: "842", image: "/categories/packaging.webp", kind: "products" },
  { slug: "home", icon: Home, count: "2 153", image: "/categories/home.webp", kind: "products" },
  { slug: "horeca", icon: Coffee, count: "1 004", image: "/categories/horeca.webp", kind: "products" },
  { slug: "private-label", icon: Sparkles, count: "956", image: "/categories/private-label.webp", kind: "link", href: "/brand" },
  { slug: "custom", icon: PackageCheck, count: "", image: "/categories/custom.webp", kind: "link", href: "/#contact" },
];

/** Resolve an image: a local public path (starts with "/") is used as-is,
 *  otherwise the value is treated as an Unsplash photo id. */
export const imageSrc = (image: string, w = 600, h = 600) =>
  image.startsWith("/") ? image : img(image, w, h);

export const categoryImage = (category: Category) => imageSrc(category.image, 600, 400);

export type Product = {
  slug: string;
  category: CategorySlug;
  image: string;
};

export const products: Product[] = [
  // Гигиена
  { slug: "wet-wipes", category: "hygiene", image: "/products/wet-wipes.webp" },
  { slug: "paper-towels", category: "hygiene", image: "/products/paper-towels.webp" },
  { slug: "liquid-soap", category: "hygiene", image: "/products/liquid-soap.webp" },
  { slug: "hand-sanitizer", category: "hygiene", image: "/products/liquid-soap.webp" },
  // Упаковочные материалы
  { slug: "pvc-food-film", category: "packaging", image: "/products/pvc-food-film.webp" },
  { slug: "stretch-film-hand", category: "packaging", image: "/products/stretch-film-hand.webp" },
  { slug: "stretch-film-machine", category: "packaging", image: "/products/stretch-film-machine.webp" },
  { slug: "packing-tape", category: "packaging", image: "/products/stretch-film-machine.webp" },
  // Товары для дома
  { slug: "trash-bags", category: "home", image: "/products/trash-bags.webp" },
  { slug: "cleaning-set", category: "home", image: "/products/cleaning-set.webp" },
  { slug: "dish-sponges", category: "home", image: "/products/cleaning-set.webp" },
  { slug: "household-gloves", category: "home", image: "/products/household-gloves.webp" },
  // Бизнес и HoReCa
  { slug: "paper-cups", category: "horeca", image: "/products/paper-cups.webp" },
  { slug: "food-containers", category: "horeca", image: "/products/pvc-food-film.webp" },
  { slug: "wooden-cutlery", category: "horeca", image: "/products/paper-cups.webp" },
  { slug: "dispenser-napkins", category: "horeca", image: "/products/paper-towels.webp" },
];

/** Curated set shown in the "Популярные товары" block on the home page. */
export const popularSlugs = [
  "wet-wipes",
  "pvc-food-film",
  "stretch-film-hand",
  "paper-cups",
  "trash-bags",
  "cleaning-set",
] as const;

export const productCategories = categories.filter((c) => c.kind === "products");

export const getCategory = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);

export const getProduct = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const productsByCategory = (slug: string): Product[] =>
  products.filter((p) => p.category === slug);

export const popularProducts = (): Product[] =>
  popularSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));
