"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Check, ChevronDown } from "lucide-react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const localeShort: Record<Locale, string> = {
  ru: "RU",
  en: "EN",
  uz: "UZ",
};

export function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const t = useTranslations("language");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        aria-label={t("label")}
        disabled={pending}
        className={cn(
          "group inline-flex items-center gap-1 h-8 px-1.5 rounded-md lg:h-10 lg:px-2",
          "text-sm font-medium transition-colors",
          "focus:outline-none focus-visible:outline-none",
          "disabled:opacity-50",
          dark
            ? "text-[#0E5A4F] hover:text-[#0A4A42] data-[state=open]:text-[#0A4A42]"
            : "text-white/85 hover:text-white data-[state=open]:text-white"
        )}
      >
        <span className="tracking-wide leading-none">{localeShort[locale]}</span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180",
            dark
              ? "text-[#0E5A4F]/70 group-hover:text-[#0A4A42]"
              : "text-white/60 group-hover:text-white/80"
          )}
          aria-hidden="true"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="min-w-[12rem] shadow-xl shadow-primary/10"
      >
        {routing.locales.map((l) => {
          const active = l === locale;
          return (
            <DropdownMenuItem
              key={l}
              onSelect={() => switchTo(l)}
              className={cn(
                "gap-3 py-2 font-medium",
                active &&
                  (dark
                    ? "bg-[#0E5A4F]/10 text-[#0E5A4F] focus:bg-[#0E5A4F]/15 focus:text-[#0E5A4F]"
                    : "bg-brand/10 text-brand focus:bg-brand/15 focus:text-brand")
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "inline-flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold tracking-wide transition-colors",
                  active
                    ? dark
                      ? "bg-[#0E5A4F] text-white"
                      : "bg-brand text-white"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {localeShort[l]}
              </span>
              <span className="flex-1">{t(l)}</span>
              {active && <Check className="h-4 w-4 shrink-0" aria-hidden="true" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
