import { cn } from "@/lib/utils";

/**
 * VIING logo — renders /logo_text.svg (ship "V" mark + "VIING" wordmark,
 * light-colored, made for dark backgrounds). Includes the wordmark, so no
 * separate text label is needed. Size it via the height class.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src="/logo_text.svg"
      alt=""
      aria-hidden="true"
      className={cn("block h-8 w-auto select-none", className)}
    />
  );
}
