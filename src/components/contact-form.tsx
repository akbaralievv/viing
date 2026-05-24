"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, Send, AlertCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type FieldName = "name" | "phone" | "email" | "message" | "consent";
type FieldErrors = Partial<Record<FieldName, string>>;
type SubmissionStatus = "success" | "error";

type Errors = ReturnType<typeof useTranslations<"form.errors">>;

const validateForm = (
  data: { name: string; phone: string; email: string; message: string; consent: boolean },
  tErrors: Errors
): FieldErrors => {
  const errors: FieldErrors = {};
  const name = data.name.trim();
  const phone = data.phone.trim();
  const email = data.email.trim();
  const message = data.message.trim();

  if (name.length < 2) errors.name = tErrors("nameMin");
  else if (name.length > 80) errors.name = tErrors("nameMax");

  if (phone.length < 5) errors.phone = tErrors("phoneRequired");
  else if (!/^[+\d][\d\s()\-]{4,30}$/.test(phone))
    errors.phone = tErrors("phoneInvalid");

  if (email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = tErrors("emailInvalid");

  if (message.length < 5) errors.message = tErrors("messageMin");
  else if (message.length > 2000) errors.message = tErrors("messageMax");

  if (!data.consent) errors.consent = tErrors("consentRequired");

  return errors;
};

export function ContactForm() {
  const t = useTranslations("form");
  const tErrors = useTranslations("form.errors");
  const tDialog = useTranslations("form.dialog");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    website: "",
    consent: false,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [resultStatus, setResultStatus] = useState<SubmissionStatus>("success");
  const [resultMessage, setResultMessage] = useState("");

  const fieldRefs = {
    name: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
    consent: useRef<HTMLLabelElement>(null),
  };

  const focusFirstError = (errs: FieldErrors) => {
    const order: FieldName[] = ["name", "phone", "email", "message", "consent"];
    for (const key of order) {
      if (errs[key]) {
        const node = fieldRefs[key].current;
        if (node) {
          node.scrollIntoView({ behavior: "smooth", block: "center" });
          window.setTimeout(() => {
            if ("focus" in node) (node as HTMLElement).focus({ preventScroll: true });
          }, 320);
        }
        return;
      }
    }
  };

  const updateField = <K extends FieldName>(field: K, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const next = validateForm({ ...formData, [field]: value }, tErrors);
      setErrors((prev) => ({ ...prev, [field]: next[field] }));
    }
  };

  const markTouched = (field: FieldName) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const next = validateForm(formData, tErrors);
    setErrors((prev) => ({ ...prev, [field]: next[field] }));
  };

  const reset = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      message: "",
      website: "",
      consent: false,
    });
    setErrors({});
    setTouched({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(formData, tErrors);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTouched({
        name: true,
        phone: true,
        email: true,
        message: true,
        consent: true,
      });
      focusFirstError(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          website: formData.website,
        }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || tErrors("submitFailed"));
      }

      setResultStatus("success");
      setResultMessage(tDialog("successMessage"));
      setDialogOpen(true);
      reset();
    } catch (err) {
      setResultStatus("error");
      setResultMessage(err instanceof Error ? err.message : tErrors("submitFailed"));
      setDialogOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field: FieldName) =>
    cn(
      "h-12",
      errors[field] &&
        "border-destructive focus-visible:border-destructive bg-destructive/5"
    );

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website">{t("honeypotLabel")}</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            {t("name")} <span className="text-destructive">*</span>
          </label>
          <Input
            id="name"
            name="name"
            ref={fieldRefs.name}
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            onBlur={() => markTouched("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass("name")}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-sm text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              {t("phone")} <span className="text-destructive">*</span>
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              ref={fieldRefs.phone}
              autoComplete="tel"
              inputMode="tel"
              placeholder={t("phonePlaceholder")}
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              onBlur={() => markTouched("phone")}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={inputClass("phone")}
            />
            {errors.phone && (
              <p id="phone-error" className="mt-1.5 text-sm text-destructive">
                {errors.phone}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              {t("email")}
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              ref={fieldRefs.email}
              autoComplete="email"
              placeholder={t("emailPlaceholder")}
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              onBlur={() => markTouched("email")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={inputClass("email")}
            />
            {errors.email && (
              <p id="email-error" className="mt-1.5 text-sm text-destructive">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            {t("message")} <span className="text-destructive">*</span>
          </label>
          <Textarea
            id="message"
            name="message"
            ref={fieldRefs.message}
            placeholder={t("messagePlaceholder")}
            rows={4}
            value={formData.message}
            onChange={(e) => updateField("message", e.target.value)}
            onBlur={() => markTouched("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(
              errors.message &&
                "border-destructive focus-visible:border-destructive bg-destructive/5"
            )}
          />
          {errors.message && (
            <p id="message-error" className="mt-1.5 text-sm text-destructive">
              {errors.message}
            </p>
          )}
        </div>

        <label
          ref={fieldRefs.consent}
          className={cn(
            "flex items-start gap-3 text-sm cursor-pointer select-none rounded-lg p-2 -mx-2 transition-colors",
            errors.consent
              ? "text-destructive bg-destructive/5"
              : "text-muted-foreground"
          )}
        >
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={(e) => {
              updateField("consent", e.target.checked);
              setTouched((prev) => ({ ...prev, consent: true }));
            }}
            className={cn(
              "mt-1 h-4 w-4 rounded border-input text-primary focus:outline-none focus-visible:outline-none focus:ring-0",
              errors.consent && "border-destructive"
            )}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <span>
            {t("consent")}{" "}
            <Link
              href="/privacy"
              className="text-primary hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {t("consentLink")}
            </Link>
            .
            {errors.consent && (
              <span id="consent-error" className="block mt-1 font-medium">
                {errors.consent}
              </span>
            )}
          </span>
        </label>

        <Button type="submit" className="w-full h-14 text-base" disabled={submitting}>
          {submitting ? (
            t("submitting")
          ) : (
            <>
              {t("submit")}
              <Send aria-hidden="true" />
            </>
          )}
        </Button>
      </form>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="text-center">
          <DialogHeader>
            <div
              className={cn(
                "mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full",
                resultStatus === "success"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-destructive/10 text-destructive"
              )}
            >
              {resultStatus === "success" ? (
                <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
              ) : (
                <AlertCircle className="h-8 w-8" aria-hidden="true" />
              )}
            </div>
            <DialogTitle>
              {resultStatus === "success"
                ? tDialog("successTitle")
                : tDialog("errorTitle")}
            </DialogTitle>
            <DialogDescription>{resultMessage}</DialogDescription>
          </DialogHeader>
          <Button
            type="button"
            className="mt-2 w-full h-12"
            onClick={() => setDialogOpen(false)}
          >
            {resultStatus === "success" ? tDialog("okButton") : tDialog("closeButton")}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
