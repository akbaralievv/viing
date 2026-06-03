"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/site-config";
import { TelegramIcon, WhatsappIcon } from "@/components/social-icons";
import { cn } from "@/lib/utils";

export function FloatingContacts() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div ref={ref} className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <div
        className={cn(
          "flex flex-col items-end gap-3 transition-all duration-300 ease-out",
          open
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-3 opacity-0 pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <a
          href={siteConfig.contacts.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={open ? 0 : -1}
          aria-label={t("writeWhatsapp")}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-[box-shadow,filter] duration-200 hover:shadow-xl hover:brightness-110"
        >
          <WhatsappIcon className="h-6 w-6" />
        </a>
        <a
          href={siteConfig.contacts.telegram}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={open ? 0 : -1}
          aria-label={t("writeTelegram")}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#229ED9] text-white shadow-lg transition-[box-shadow,filter] duration-200 hover:shadow-xl hover:brightness-110"
        >
          <TelegramIcon className="h-6 w-6" />
        </a>
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={t("contact")}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition-[background-color,box-shadow] duration-200 ease-out hover:bg-primary/90 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        <MessageCircle
          aria-hidden="true"
          className={cn(
            "h-6 w-6 transition-all duration-200 ease-out",
            open ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
          )}
        />
        <X
          aria-hidden="true"
          className={cn(
            "absolute h-6 w-6 transition-all duration-200 ease-out",
            open ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
          )}
        />
      </button>
    </div>
  );
}
