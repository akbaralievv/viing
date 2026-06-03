"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ProductCard } from "@/components/product-card";
import { popularProducts } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function Popular() {
  const t = useTranslations("popular");
  const items = popularProducts();
  const trackRef = useRef<HTMLUListElement>(null);
  const [pages, setPages] = useState(1);
  const [active, setActive] = useState(0);
  const drag = useRef({ down: false, moved: false, startX: 0, startLeft: 0 });

  const update = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 4 ? Math.round(max / el.clientWidth) + 1 : 1;
    setPages(p);
    setActive(max > 0 ? Math.round((el.scrollLeft / max) * (p - 1)) : 0);
  };

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setActive(max > 0 ? Math.round((el.scrollLeft / max) * (pages - 1)) : 0);
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const left = pages > 1 ? (i / (pages - 1)) * max : 0;
    el.scrollTo({ left, behavior: "smooth" });
  };

  // drag-to-scroll (mouse only; touch uses native scrolling)
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = { down: true, moved: false, startX: e.clientX, startLeft: el.scrollLeft };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  };
  const endDrag = () => {
    drag.current.down = false;
  };
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <section id="popular" className="py-16 md:py-24 bg-secondary scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between gap-4 mb-8 md:mb-10">
          <h2 className="text-2xl md:text-[2rem] font-bold text-primary">{t("title")}</h2>
          <Link
            href="/catalog"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:gap-2.5 transition-all whitespace-nowrap"
          >
            {t("viewAll")}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <ul
          ref={trackRef}
          onScroll={onScroll}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={onClickCapture}
          className="flex gap-5 overflow-x-auto py-4 no-scrollbar cursor-grab select-none active:cursor-grabbing"
        >
          {items.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              className="w-full shrink-0 min-[500px]:w-[calc((100%_-_1.25rem)/2)] md:w-[calc((100%_-_2.5rem)/3)] lg:w-[calc((100%_-_3.75rem)/4)]"
            />
          ))}
        </ul>

        {pages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`${i + 1}`}
                aria-current={i === active}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === active ? "w-6 bg-brand" : "w-2 bg-primary/20 hover:bg-primary/40"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
