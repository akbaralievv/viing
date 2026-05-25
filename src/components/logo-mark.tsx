import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex items-center justify-center bg-gradient-to-br from-primary to-amber-600 rounded-xl text-white",
        className
      )}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        className="w-[70%] h-[70%]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.5 10 L16 22.5 L23.5 10"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
