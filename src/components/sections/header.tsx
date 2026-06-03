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
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      // hide when scrolling down past a threshold, reveal when scrolling up
      if (y > lastY && y > 120) setHidden(true);
      else if (y < lastY) setHidden(false);
      lastY = y <= 0 ? 0 : y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // never keep the bar hidden while the mobile menu is open
  useEffect(() => {
    if (isMenuOpen) setHidden(false);
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground transition-[transform,box-shadow,border-color] duration-300 ease-out ${
        hidden && !isMenuOpen ? "-translate-y-full" : "translate-y-0"
      } ${scrolled ? "shadow-lg border-b border-white/10" : "border-b border-transparent"}`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-brand focus:px-3 focus:py-2 focus:text-brand-foreground"
      >
        {t("skipToContent")}
      </a>
      <div className="container mx-auto px-4 h-16 md:h-[72px] flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label={t("homeAria")}>
          <LogoMark className="h-8 md:h-9" />
          <span className="text-xl md:text-[1.35rem] font-semibold tracking-widest text-white">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label={t("menuTitle")}>
          {navKeys.map((key) => (
            <Link
              key={key}
              href={navHrefs[key]}
              className="whitespace-nowrap text-sm font-medium text-white/75 hover:text-white"
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <LanguageSwitcher />
          <Button asChild variant="brand" className="hidden lg:inline-flex">
            <Link href="/#contact">{t("getOffer")}</Link>
          </Button>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label={t("openMenu")}
                className="text-white hover:bg-white/10 hover:text-white"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetTitle asChild>
                <VisuallyHidden>{t("menuTitle")}</VisuallyHidden>
              </SheetTitle>
              <nav className="flex flex-col gap-1 mt-10" aria-label={t("menuTitle")}>
                {navKeys.map((key) => (
                  <Link
                    key={key}
                    href={navHrefs[key]}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-base font-medium py-3 border-b border-border hover:text-brand transition-colors"
                  >
                    {t(key)}
                  </Link>
                ))}
                <Button asChild className="mt-6">
                  <Link href="/#contact" onClick={() => setIsMenuOpen(false)}>
                    {t("getOffer")}
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
