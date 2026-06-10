import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

describe("static assets", () => {
  const sources = walk("src").filter((p) => /\.(tsx?|css)$/.test(p));
  const haystack = sources.map((p) => readFileSync(p, "utf8")).join("\n");

  it("every image path referenced in src exists in public/", () => {
    const refs = [
      ...new Set(
        (haystack.match(/"\/[a-zA-Z0-9_/.\-]+\.(png|jpe?g|svg|webp|avif)"/g) ?? []).map(
          (s) => s.slice(1, -1)
        )
      ),
    ];
    expect(refs.length).toBeGreaterThan(0);
    const missing = refs.filter((ref) => !existsSync(join("public", ref)));
    expect(missing, `missing assets: ${missing.join(", ")}`).toEqual([]);
  });

  it("dynamically referenced toza-koza icons exist", () => {
    // icon arrays reference bare file names rendered via /toza-koza/icons/${name}
    const iconNames = [
      ...new Set(
        [...haystack.matchAll(/"([a-z0-9-]+\.svg)"/g)]
          .map((m) => m[1])
          .filter((name) => !name.includes("/"))
      ),
    ];
    const missing = iconNames.filter(
      (name) => !existsSync(join("public", "toza-koza", "icons", name))
    );
    expect(missing, `missing icons: ${missing.join(", ")}`).toEqual([]);
  });
});
