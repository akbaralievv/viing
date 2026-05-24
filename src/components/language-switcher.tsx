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
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t("label")}
        disabled={pending}
        className={cn(
          "group inline-flex items-center gap-2 h-10 px-3 rounded-full border border-border bg-background/60 backdrop-blur",
          "text-sm font-medium hover:border-primary/50 hover:bg-background transition-colors",
          "focus:outline-none focus-visible:outline-none data-[state=open]:border-primary/50 data-[state=open]:bg-background",
          "disabled:opacity-50"
        )}
      >
        <Globe className="w-4 h-4 text-primary" aria-hidden="true" />
        <span className="tracking-wide">{localeShort[locale]}</span>
        <ChevronDown
          className="w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
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
