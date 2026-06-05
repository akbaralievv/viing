import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({
  items,
  light = false,
}: {
  items: Crumb[];
  /** Use on dark/image backgrounds — switches to light text. */
  light?: boolean;
}) {
  return (
    <nav aria-label="breadcrumb" className="mb-6 text-sm">
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1.5",
          light ? "text-white/65" : "text-muted-foreground"
        )}
      >
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors",
                    light ? "hover:text-white" : "hover:text-brand"
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={
                    isLast
                      ? light
                        ? "font-medium text-white"
                        : "font-medium text-foreground"
                      : undefined
                  }
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight
                  className={cn(
                    "w-3.5 h-3.5",
                    light ? "text-white/40" : "text-muted-foreground/50"
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
