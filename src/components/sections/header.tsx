"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { LanguageSwitcher } from "@/components/language-switcher";
import { LogoMark } from "@/components/logo-mark";
import { navKeys, navHrefs } from "@/lib/site-data";
import { siteConfig } from "@/lib/site-config";

export function Header() {
  const t = useTranslations("nav");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b transition-colors ${
        scrolled ? "border-border" : "border-border/50"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        {t("skipToContent")}
      </a>
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label={t("homeAria")}>
          <LogoMark className="w-10 h-10 md:w-12 md:h-12" />
          <span className="text-xl md:text-2xl font-bold tracking-tight">{siteConfig.name}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6" aria-label={t("menuTitle")}>
          {navKeys.map((key) => (
            <Link
              key={key}
              href={navHrefs[key]}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Button asChild className="hidden lg:inline-flex">
            <Link href="/#contact">{t("contactCta")}</Link>
          </Button>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label={t("openMenu")}>
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetTitle asChild>
                <VisuallyHidden>{t("menuTitle")}</VisuallyHidden>
              </SheetTitle>
              <nav className="flex flex-col gap-4 mt-8" aria-label={t("menuTitle")}>
                {navKeys.map((key) => (
                  <Link
                    key={key}
                    href={navHrefs[key]}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium py-2 border-b border-border hover:text-primary transition-colors"
                  >
                    {t(key)}
                  </Link>
                ))}
                <Button asChild className="mt-4">
                  <Link href="/#contact" onClick={() => setIsMenuOpen(false)}>
                    {t("contactCta")}
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
