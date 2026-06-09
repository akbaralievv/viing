"use client";

import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { LanguageSwitcher } from "@/components/language-switcher";
import { LogoMark } from "@/components/logo-mark";
import { navKeys, navHrefs } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Active nav link by route (home matches "/" exactly; in-page anchors never match).
  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Mobile menu: close first, then navigate after the Sheet's close animation
  // (~300ms) so the route change doesn't overlap the closing menu (it flickered).
const pendingHref = useRef<string | null>(null);

const navigateFromMenu = (href: string) => {
  pendingHref.current = href;
  setIsMenuOpen(false);
};

  const lastY = useRef(0);
  const navGraceUntil = useRef(0);

  // On route change: reveal the bar and briefly ignore the navigation scroll jump
  // (e.g. landing on #contact) so it isn't mistaken for a user scroll-down.
  useEffect(() => {
    setHidden(false);
    navGraceUntil.current = Date.now() + 700;
    lastY.current = window.scrollY;
  }, [pathname]);

  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      // hide on scroll down, reveal on scroll up — but not during the post-nav grace
      if (Date.now() >= navGraceUntil.current) {
        if (y > lastY.current && y > 120) setHidden(true);
        else if (y < lastY.current) setHidden(false);
      }
      lastY.current = y <= 0 ? 0 : y;
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
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out",
        hidden && !isMenuOpen ? "-translate-y-full" : "translate-y-0",
        "bg-primary text-primary-foreground",
        scrolled ? "shadow-lg border-b border-white/10" : "border-b border-transparent"
      )}
    >
      <div className="container mx-auto px-4 h-16 md:h-[72px] flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center shrink-0" aria-label={t("homeAria")}>
          <LogoMark className="h-[1.7rem] md:h-[2rem] lg:h-7 xl:h-[2rem]" />
        </Link>

        <nav className="hidden lg:flex items-center lg:gap-4 xl:gap-7" aria-label={t("menuTitle")}>
          {navKeys.map((key) => {
            const active = isActive(navHrefs[key]);
            return (
              <Link
                key={key}
                href={navHrefs[key]}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative whitespace-nowrap text-[13px] xl:text-sm font-medium transition-colors",
                  "after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:rounded-full after:content-['']",
                  "after:bg-brand hover:text-white",
                  active ? "text-white after:w-full" : "text-white/75 after:w-0"
                )}
              >
                {t(key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-2 xl:gap-3">
          <LanguageSwitcher />
          <Button
            asChild
            variant="outline"
            className={cn(
              "hidden lg:inline-flex lg:h-9 lg:px-3.5 lg:text-[13px] xl:h-10 xl:px-5 xl:text-sm",
              "border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white hover:border-white/50"
            )}
          >
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
            <SheetContent  onAnimationEnd={() => {
              if (!isMenuOpen && pendingHref.current) {
                router.push(pendingHref.current);
              }
            }} side="right" className="w-[300px]">
              <SheetTitle asChild>
                <VisuallyHidden>{t("menuTitle")}</VisuallyHidden>
              </SheetTitle>
              <nav className="flex flex-col gap-1 mt-10" aria-label={t("menuTitle")}>
                {navKeys.map((key) => {
                  const active = isActive(navHrefs[key]);
                  return (
                    <Link
                      key={key}
                      href={navHrefs[key]}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateFromMenu(navHrefs[key]);
                      }}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "text-base font-medium py-3 border-b border-border transition-colors hover:text-brand",
                        active ? "text-brand" : "text-foreground"
                      )}
                    >
                      {t(key)}
                    </Link>
                  );
                })}
                <Button asChild className="mt-6">
                  <Link
                    href="/#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateFromMenu("/#contact");
                    }}
                  >
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
