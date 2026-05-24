"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/site-config";
import { TelegramIcon, WhatsappIcon } from "@/components/sections/contact";

export function FloatingContacts() {
  const t = useTranslations("nav");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 z-40 flex flex-col gap-3 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-2"
      }`}
      aria-hidden={!visible}
    >
      <a
        href={siteConfig.contacts.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:bg-[#1FB955] transition-colors"
        aria-label={t("writeWhatsapp")}
      >
        <WhatsappIcon className="w-7 h-7" />
      </a>
      <a
        href={siteConfig.contacts.telegram}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#229ED9] text-white flex items-center justify-center hover:bg-[#1B8DC0] transition-colors"
        aria-label={t("writeTelegram")}
      >
        <TelegramIcon className="w-7 h-7" />
      </a>
    </div>
  );
}
