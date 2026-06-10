import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

/**
 * Error responses carry stable codes (`{ error: "<code>" }`) that the client
 * maps to localized messages via the `form.errors.*` translation keys.
 */
const err = (code: string, status: number) =>
  NextResponse.json({ error: code }, { status });

const rateLimitWindowMs = 60_000;
const rateLimitMax = 5;
// Best-effort, per-instance limiter (resets on restart; not shared between
// instances). Good enough for a contact form behind a single deployment.
const buckets = new Map<string, { count: number; reset: number }>();
const bucketsSweepAt = 500;

const checkRateLimit = (ip: string) => {
  const now = Date.now();
  // keep the map bounded: drop expired buckets once it grows
  if (buckets.size >= bucketsSweepAt) {
    for (const [key, bucket] of buckets) {
      if (bucket.reset < now) buckets.delete(key);
    }
  }
  const bucket = buckets.get(ip);
  if (!bucket || bucket.reset < now) {
    buckets.set(ip, { count: 1, reset: now + rateLimitWindowMs });
    return true;
  }
  if (bucket.count >= rateLimitMax) return false;
  bucket.count += 1;
  return true;
};

const escapeMarkdown = (value: string) =>
  value.replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, "\\$1");

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (!checkRateLimit(ip)) return err("tooManyRequests", 429);

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return err("invalidRequest", 400);
  }

  // honeypot filled in → pretend success, don't deliver
  if (typeof payload.website === "string" && payload.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  if (name.length < 2) return err("nameMin", 400);
  if (name.length > 80) return err("nameMax", 400);
  if (phone.length < 5) return err("phoneRequired", 400);
  if (phone.length > 32) return err("phoneInvalid", 400);
  if (message.length < 5) return err("messageMin", 400);
  if (message.length > 2000) return err("messageMax", 400);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return err("emailInvalid", 400);
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const text = [
    "*Новая заявка с сайта VIING*",
    "",
    `*Имя:* ${escapeMarkdown(name)}`,
    `*Телефон:* ${escapeMarkdown(phone)}`,
    email ? `*Email:* ${escapeMarkdown(email)}` : null,
    "",
    "*Сообщение:*",
    escapeMarkdown(message),
  ]
    .filter(Boolean)
    .join("\n");

  if (!botToken || !chatId) {
    console.warn("[contact] TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID not configured. Payload:", {
      name,
      phone,
      email,
      message,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const tgResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "MarkdownV2",
          disable_web_page_preview: true,
        }),
      }
    );

    if (!tgResponse.ok) {
      const detail = await tgResponse.text();
      console.error("[contact] Telegram delivery failed:", tgResponse.status, detail);
      return err("deliveryFailed", 502);
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("[contact] Telegram delivery error:", error);
    return err("deliveryFailed", 502);
  }
}
