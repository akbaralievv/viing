import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * Hero back-link: an outlined arrow circle, pinned just below the fixed header
 * and aligned to the page container's left edge. Colors come from the
 * `className` text color (the circle border and arrow inherit via currentColor),
 * so it adapts to each hero background.
 */
export function BackButton({
  ariaLabel,
  className,
}: {
  ariaLabel: string;
  className?: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-[88px] z-20 md:top-[104px]">
      <div className="container mx-auto px-4">
        <Link
          href="/cases"
          aria-label={ariaLabel}
          className={cn(
            "group pointer-events-auto inline-flex items-center text-sm font-medium tracking-wide transition-colors",
            className
          )}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-current transition-transform duration-300 ease-out group-hover:-translate-x-1">
            <ArrowLeft className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
        </Link>
      </div>
    </div>
  );
}
