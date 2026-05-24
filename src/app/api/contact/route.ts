import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

const rateLimitWindowMs = 60_000;
const rateLimitMax = 5;
const buckets = new Map<string, { count: number; reset: number }>();

const checkRateLimit = (ip: string) => {
  const now = Date.now();
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

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Слишком много запросов. Попробуйте позже." },
      { status: 429 }
    );
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Неверный формат запроса" }, { status: 400 });
  }

  if (typeof payload.website === "string" && payload.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  if (name.length < 2 || name.length > 80) {
    return NextResponse.json({ error: "Укажите имя (от 2 символов)" }, { status: 400 });
  }
  if (phone.length < 5 || phone.length > 32) {
    return NextResponse.json({ error: "Укажите корректный телефон" }, { status: 400 });
  }
  if (message.length < 5 || message.length > 2000) {
    return NextResponse.json(
      { error: "Сообщение должно быть от 5 до 2000 символов" },
      { status: 400 }
    );
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Некорректный email" }, { status: 400 });
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
      return NextResponse.json(
        { error: "Не удалось доставить заявку. Напишите нам напрямую." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] Telegram delivery error:", err);
    return NextResponse.json(
      { error: "Сервис временно недоступен. Попробуйте позже." },
      { status: 502 }
    );
  }
}
