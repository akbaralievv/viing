"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { products, productCategories, type CategorySlug } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const PER_PAGE = 10;

type Selected = CategorySlug | "all";

export function CatalogBrowser({
  initialCategory = "all",
}: {
  initialCategory?: Selected;
}) {
  const t = useTranslations("catalog");
  const tCat = useTranslations("catalog.categories");
  const tProd = useTranslations("catalog.products");

  const [category, setCategory] = useState<Selected>(initialCategory);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const pendingScroll = useRef(false);

  // Flagged by pagination only; the actual scroll runs in an effect after the
  // new page has rendered, so it fires reliably for next/prev and numbers alike.
  const goToPage = (p: number) => {
    if (p === page) return;
    pendingScroll.current = true;
    setPage(p);
  };

  // Products paired with their translated names so search can match the label.
  const withNames = useMemo(
    () => products.map((p) => ({ product: p, name: tProd(`${p.slug}.name`) })),
    [tProd]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return withNames.filter(({ product, name }) => {
      const inCategory = category === "all" || product.category === category;
      const inQuery = q === "" || name.toLowerCase().includes(q);
      return inCategory && inQuery;
    });
  }, [withNames, category, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pageCount);
  const start = (current - 1) * PER_PAGE;
  const pageItems = filtered.slice(start, start + PER_PAGE);

  useEffect(() => {
    if (!pendingScroll.current) return;
    pendingScroll.current = false;
    const el = topRef.current;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, [current]);

  const selectCategory = (next: Selected) => {
    setCategory(next);
    setPage(1);
    setFiltersOpen(false);
  };

  const resetAll = () => {
    setQuery("");
    setCategory("all");
    setPage(1);
  };

  const categoryList = (onPick?: () => void) => (
    <ul className="space-y-1">
      <li>
        <CategoryButton
          label={t("allProducts")}
          active={category === "all"}
          onClick={() => {
            selectCategory("all");
            onPick?.();
          }}
        />
      </li>
      {productCategories.map((c) => (
        <li key={c.slug}>
          <CategoryButton
            label={tCat(`${c.slug}.name`)}
            active={category === c.slug}
            onClick={() => {
              selectCategory(c.slug);
              onPick?.();
            }}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex flex-col gap-8 md:flex-row md:gap-10">
      {/* Sidebar — categories (>= 768px) */}
      <aside className="hidden md:block md:w-56 md:shrink-0">
        <div className="sticky top-24">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t("categoriesTitle")}
          </h2>
          {categoryList()}
        </div>
      </aside>

      {/* Main column */}
      <div ref={topRef} className="min-w-0 flex-1 scroll-mt-24">
        {/* Search + filters */}
        <div className="mb-6 flex items-center gap-3">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder={t("searchPlaceholder")}
              aria-label={t("searchPlaceholder")}
              className="h-11 pl-10"
            />
          </div>

          {/* Categories sheet — only below 768px */}
          <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="outline"
                aria-label={t("filters")}
                className="h-11 shrink-0 gap-2 max-[499px]:px-3"
              >
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                <span className="hidden min-[500px]:inline">{t("filters")}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px]">
              <SheetTitle className="mb-5 text-base">{t("categoriesTitle")}</SheetTitle>
              {categoryList()}
            </SheetContent>
          </Sheet>
        </div>

        {/* Results */}
        {pageItems.length > 0 ? (
          <ul className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {pageItems.map(({ product }) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl border border-border bg-secondary px-6 py-16 text-center">
            <p className="mb-1 text-lg font-semibold text-primary">{t("noResults")}</p>
            <p className="mb-6 text-sm text-muted-foreground">{t("noResultsHint")}</p>
            <Button variant="outline" onClick={resetAll}>
              {t("resetFilters")}
            </Button>
          </div>
        )}

        {/* Pagination */}
        {pageCount > 1 && (
          <Pagination
            page={current}
            pageCount={pageCount}
            onChange={goToPage}
            prevLabel={t("prevPage")}
            nextLabel={t("nextPage")}
          />
        )}
      </div>
    </div>
  );
}

function CategoryButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      className={cn(
        "w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
        active
          ? "bg-brand/10 text-brand"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      )}
    >
      {label}
    </button>
  );
}

function Pagination({
  page,
  pageCount,
  onChange,
  prevLabel,
  nextLabel,
}: {
  page: number;
  pageCount: number;
  onChange: (p: number) => void;
  prevLabel: string;
  nextLabel: string;
}) {
  const pages = pageRange(page, pageCount);

  return (
    <nav className="mt-10 flex items-center justify-center gap-1.5" aria-label="Pagination">
      <PagerButton ariaLabel={prevLabel} disabled={page <= 1} onClick={() => onChange(page - 1)}>
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </PagerButton>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-1.5 text-sm text-muted-foreground">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={cn(
              "h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition-colors",
              p === page
                ? "bg-brand text-white"
                : "border border-border text-foreground hover:border-brand/40 hover:text-brand"
            )}
          >
            {p}
          </button>
        )
      )}

      <PagerButton
        ariaLabel={nextLabel}
        disabled={page >= pageCount}
        onClick={() => onChange(page + 1)}
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </PagerButton>
    </nav>
  );
}

function PagerButton({
  children,
  ariaLabel,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  ariaLabel: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:border-brand/40 hover:text-brand disabled:pointer-events-none disabled:opacity-40"
    >
      {children}
    </button>
  );
}

/** Page numbers with ellipses, e.g. 1 … 4 5 6 … 12 */
function pageRange(page: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out: (number | "...")[] = [1];
  const left = Math.max(2, page - 1);
  const right = Math.min(total - 1, page + 1);
  if (left > 2) out.push("...");
  for (let i = left; i <= right; i++) out.push(i);
  if (right < total - 1) out.push("...");
  out.push(total);
  return out;
}
