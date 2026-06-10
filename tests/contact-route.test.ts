import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "../src/app/api/contact/route";

let ipCounter = 0;

/** Build a POST request from a unique IP so tests don't trip the rate limiter. */
const makeRequest = (
  body: unknown,
  { ip, raw }: { ip?: string; raw?: string } = {}
) => {
  ipCounter += 1;
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip ?? `10.0.0.${ipCounter}`,
    },
    body: raw ?? JSON.stringify(body),
  });
};

const valid = {
  name: "Алишер",
  phone: "+998 90 123 45 67",
  message: "Нужна партия влажных салфеток",
  website: "",
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("POST /api/contact", () => {
  it("accepts a valid payload without Telegram env (delivered: false)", async () => {
    vi.stubEnv("TELEGRAM_BOT_TOKEN", "");
    vi.stubEnv("TELEGRAM_CHAT_ID", "");
    const res = await POST(makeRequest(valid));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, delivered: false });
  });

  it("silently accepts honeypot submissions without delivering", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const res = await POST(makeRequest({ ...valid, website: "spam.example" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON with invalidRequest", async () => {
    const res = await POST(makeRequest(null, { raw: "{not json" }));
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("invalidRequest");
  });

  it.each([
    [{ ...valid, name: "A" }, "nameMin"],
    [{ ...valid, name: "x".repeat(81) }, "nameMax"],
    [{ ...valid, phone: "123" }, "phoneRequired"],
    [{ ...valid, phone: "1".repeat(33) }, "phoneInvalid"],
    [{ ...valid, message: "ok" }, "messageMin"],
    [{ ...valid, message: "x".repeat(2001) }, "messageMax"],
    [{ ...valid, email: "not-an-email" }, "emailInvalid"],
  ])("returns 400 with a stable error code (%#)", async (payload, code) => {
    const res = await POST(makeRequest(payload));
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe(code);
  });

  it("rate-limits the 6th request from one IP with tooManyRequests", async () => {
    const ip = "203.0.113.77";
    vi.stubEnv("TELEGRAM_BOT_TOKEN", "");
    vi.stubEnv("TELEGRAM_CHAT_ID", "");
    for (let i = 0; i < 5; i++) {
      const res = await POST(makeRequest(valid, { ip }));
      expect(res.status).toBe(200);
    }
    const blocked = await POST(makeRequest(valid, { ip }));
    expect(blocked.status).toBe(429);
    expect((await blocked.json()).error).toBe("tooManyRequests");
  });

  it("delivers to Telegram with MarkdownV2 escaping", async () => {
    vi.stubEnv("TELEGRAM_BOT_TOKEN", "token");
    vi.stubEnv("TELEGRAM_CHAT_ID", "42");
    const fetchSpy = vi.fn(async () => new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchSpy);

    const res = await POST(
      makeRequest({ ...valid, name: "ООО «Ромашка» (опт)", message: "Цена + сроки!" })
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, delivered: true });

    expect(fetchSpy).toHaveBeenCalledOnce();
    const [url, init] = fetchSpy.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://api.telegram.org/bottoken/sendMessage");
    const body = JSON.parse(init.body as string);
    expect(body.chat_id).toBe("42");
    expect(body.parse_mode).toBe("MarkdownV2");
    // MarkdownV2 special characters must be escaped
    expect(body.text).toContain("\\(опт\\)");
    expect(body.text).toContain("Цена \\+ сроки\\!");
  });

  it("maps Telegram failures to deliveryFailed (502)", async () => {
    vi.stubEnv("TELEGRAM_BOT_TOKEN", "token");
    vi.stubEnv("TELEGRAM_CHAT_ID", "42");
    vi.stubGlobal("fetch", vi.fn(async () => new Response("err", { status: 500 })));

    const res = await POST(makeRequest(valid));
    expect(res.status).toBe(502);
    expect((await res.json()).error).toBe("deliveryFailed");
  });
});
