import { cn } from "@/lib/utils";

/**
 * VIING logo mark — renders the project asset /logo.svg
 * (blue gradient "V" + white arrow, made for dark backgrounds).
 * Size it via the height class; width keeps the SVG aspect ratio.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt=""
      aria-hidden="true"
      className={cn("block h-8 w-auto select-none", className)}
    />
  );
}
