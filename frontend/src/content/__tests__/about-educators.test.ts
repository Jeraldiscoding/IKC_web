import { describe, it, expect } from "vitest";
import { aboutCopy } from "@/content/about";
import { educators } from "@/content/educators";

describe("aboutCopy", () => {
  it("provides the founding story and credential explanations", () => {
    expect(aboutCopy.story.paragraphs.length).toBeGreaterThanOrEqual(2);
    expect(aboutCopy.credentials.items.length).toBeGreaterThanOrEqual(3);
    expect(aboutCopy.cta.ctaLabel).toBeTruthy();
  });
});

describe("educators", () => {
  it("has at least one educator with required fields", () => {
    expect(educators.length).toBeGreaterThanOrEqual(1);
    for (const e of educators) {
      expect(e.slug).toBeTruthy();
      expect(e.name).toBeTruthy();
      expect(e.title).toMatch(/DISE/i);
      expect(e.bio.length).toBeGreaterThan(0);
      expect(e.specialties.length).toBeGreaterThan(0);
    }
  });
});
