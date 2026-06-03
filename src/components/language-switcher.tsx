"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Check, Globe, ChevronDown } from "lucide-react";
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

export function LanguageSwitcher() {
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
          "group inline-flex items-center gap-1.5 h-8 px-2.5 rounded-full border border-white/20 bg-white/10 lg:gap-2 lg:h-10 lg:px-3",
          "text-xs font-medium text-white hover:bg-white/15 transition-colors lg:text-sm",
          "focus:outline-none focus-visible:outline-none data-[state=open]:bg-white/15 data-[state=open]:border-white/30",
          "disabled:opacity-50"
        )}
      >
        <Globe className="w-3.5 h-3.5 text-white/90 lg:w-4 lg:h-4" aria-hidden="true" />
        <span className="tracking-wide leading-none">{localeShort[locale]}</span>
        <ChevronDown
          className="w-3 h-3 text-white/60 transition-transform duration-200 group-data-[state=open]:rotate-180 lg:w-3.5 lg:h-3.5"
          aria-hidden="true"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[11rem]">
        {routing.locales.map((l) => {
          const active = l === locale;
          return (
            <DropdownMenuItem
              key={l}
              onSelect={() => switchTo(l)}
              className={cn(
                "justify-between font-medium",
                active && "bg-primary/10 text-primary focus:bg-primary/15"
              )}
            >
              <span className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "inline-flex items-center justify-center w-7 h-6 rounded-md border border-border text-[10px] font-bold tracking-wider",
                    active ? "border-primary/40 bg-primary/10 text-primary" : "text-muted-foreground"
                  )}
                  aria-hidden="true"
                >
                  {localeShort[l]}
                </span>
                {t(l)}
              </span>
              {active && <Check className="w-4 h-4" aria-hidden="true" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
