"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Result = "success" | "error";

// Error codes the API may return (see src/app/api/contact/route.ts); each has
// a matching `form.errors.*` translation key. Unknown codes fall back to
// `submitFailed`.
const KNOWN_ERROR_CODES = new Set([
  "tooManyRequests",
  "invalidRequest",
  "nameMin",
  "nameMax",
  "phoneRequired",
  "phoneInvalid",
  "messageMin",
  "messageMax",
  "emailInvalid",
  "deliveryFailed",
]);

export function QuickLeadForm() {
  const t = useTranslations("form");
  const tCta = useTranslations("cta");
  const tErrors = useTranslations("form.errors");
  const tDialog = useTranslations("form.dialog");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [result, setResult] = useState<Result>("success");
  const [resultMessage, setResultMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (name.trim().length < 2) {
      setError(tErrors("nameMin"));
      return;
    }
    if (phone.trim().length < 5) {
      setError(tErrors("phoneRequired"));
      return;
    }

    setSending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          message: comment.trim() || tCta("title"),
          website,
        }),
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { error?: string };
        const code =
          body.error && KNOWN_ERROR_CODES.has(body.error) ? body.error : "submitFailed";
        throw new Error(tErrors(code));
      }
      setResult("success");
      setResultMessage(tDialog("successMessage"));
      setDialogOpen(true);
      setName("");
      setPhone("");
      setComment("");
    } catch (err) {
      setResult("error");
      setResultMessage(err instanceof Error ? err.message : tErrors("submitFailed"));
      setDialogOpen(true);
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    "h-12 w-full rounded-lg border border-white/15 bg-white px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand";

  return (
    <>
      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-3" noValidate>
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="qlf-website">{t("honeypotLabel")}</label>
          <input
            id="qlf-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <input
          type="text"
          name="name"
          autoComplete="name"
          aria-label={t("name")}
          placeholder={t("namePlaceholder")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          inputMode="tel"
          aria-label={t("phone")}
          placeholder={t("phonePlaceholder")}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
        />
        <input
          type="text"
          name="comment"
          aria-label={t("message")}
          placeholder={t("messagePlaceholder")}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={cn(inputClass, "sm:col-span-2")}
        />

        {error && (
          <p className="sm:col-span-2 text-sm text-red-200" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={sending}
          className="sm:col-span-2 inline-flex items-center justify-center gap-2 h-12 rounded-lg bg-brand px-6 text-sm font-semibold text-brand-foreground hover:bg-brand-hover active:bg-brand-active active:scale-[0.99] transition-all duration-200 ease-out disabled:opacity-60"
        >
          {sending ? (
            t("submitting")
          ) : (
            <>
              {t("submit")}
              <Send className="w-4 h-4" aria-hidden="true" />
            </>
          )}
        </button>
      </form>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="text-center">
          <DialogHeader>
            <div
              className={cn(
                "mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full",
                result === "success"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-destructive/10 text-destructive"
              )}
            >
              {result === "success" ? (
                <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
              ) : (
                <AlertCircle className="h-8 w-8" aria-hidden="true" />
              )}
            </div>
            <DialogTitle>
              {result === "success" ? tDialog("successTitle") : tDialog("errorTitle")}
            </DialogTitle>
            <DialogDescription>{resultMessage}</DialogDescription>
          </DialogHeader>
          <Button type="button" className="mt-2 w-full h-12" onClick={() => setDialogOpen(false)}>
            {result === "success" ? tDialog("okButton") : tDialog("closeButton")}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
