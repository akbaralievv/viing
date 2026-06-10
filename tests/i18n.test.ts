import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const LOCALES = ["ru", "en", "uz"] as const;

type Messages = Record<string, unknown>;

const load = (locale: string): Messages =>
  JSON.parse(readFileSync(`messages/${locale}.json`, "utf8"));

const flattenKeys = (obj: Messages, prefix = ""): string[] =>
  Object.entries(obj).flatMap(([key, value]) =>
    typeof value === "object" && value !== null
      ? flattenKeys(value as Messages, `${prefix}${key}.`)
      : [`${prefix}${key}`]
  );

const leafValues = (obj: Messages, prefix = ""): [string, unknown][] =>
  Object.entries(obj).flatMap(([key, value]) =>
    typeof value === "object" && value !== null
      ? leafValues(value as Messages, `${prefix}${key}.`)
      : [[`${prefix}${key}`, value] as [string, unknown]]
  );

describe("message catalogs", () => {
  const catalogs = LOCALES.map((locale) => ({ locale, messages: load(locale) }));

  it("have identical key sets across locales", () => {
    const [ru, ...rest] = catalogs;
    const ruKeys = flattenKeys(ru.messages).sort();
    for (const { locale, messages } of rest) {
      expect(flattenKeys(messages).sort(), `key set of ${locale} vs ru`).toEqual(ruKeys);
    }
  });

  it("have no empty values", () => {
    for (const { locale, messages } of catalogs) {
      for (const [key, value] of leafValues(messages)) {
        expect(typeof value, `${locale}:${key} must be a string`).toBe("string");
        expect((value as string).trim(), `${locale}:${key} must not be empty`).not.toBe("");
      }
    }
  });

  it("cover every API error code used by the contact form", async () => {
    // KNOWN_ERROR_CODES in quick-lead-form.tsx must each have a translation
    const source = readFileSync("src/components/quick-lead-form.tsx", "utf8");
    const block = source.match(/KNOWN_ERROR_CODES = new Set\(\[([^\]]+)\]\)/);
    expect(block, "KNOWN_ERROR_CODES set must exist").not.toBeNull();
    const codes = [...block![1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
    expect(codes.length).toBeGreaterThan(0);

    for (const { locale, messages } of catalogs) {
      const errors = (messages.form as Messages | undefined)?.errors as
        | Record<string, string>
        | undefined;
      expect(errors, `${locale}: form.errors must exist`).toBeDefined();
      for (const code of [...codes, "submitFailed"]) {
        expect(errors![code], `${locale}: form.errors.${code}`).toBeTruthy();
      }
    }
  });
});
