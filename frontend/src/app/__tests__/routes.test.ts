import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { siteConfig } from "@/lib/site-config";

describe("sitemap", () => {
  it("returns 6 entries and includes the home URL", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(6);
    expect(entries.some((entry) => entry.url === siteConfig.url)).toBe(true);
  });
});

describe("robots", () => {
  it("allows '/' and points sitemap at the site URL", () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    expect(rules.some((rule) => rule.allow === "/")).toBe(true);
    expect(result.sitemap).toBe(`${siteConfig.url}/sitemap.xml`);
  });
});
