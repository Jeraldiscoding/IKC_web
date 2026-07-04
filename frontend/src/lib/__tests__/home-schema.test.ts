import { describe, it, expect } from "vitest";
import { faqPageSchema, webSiteSchema } from "@/lib/home-schema";
import { faqs } from "@/content/faqs";

describe("faqPageSchema", () => {
  it("is a FAQPage with one entry per FAQ", () => {
    const s = faqPageSchema() as Record<string, unknown>;
    expect(s["@type"]).toBe("FAQPage");
    expect((s.mainEntity as unknown[]).length).toBe(faqs.length);
  });
});

describe("webSiteSchema", () => {
  it("is a WebSite with the site name", () => {
    const s = webSiteSchema() as Record<string, unknown>;
    expect(s["@type"]).toBe("WebSite");
    expect(s.name).toBeTruthy();
  });
});
