import { describe, it, expect } from "vitest";
import { programmes } from "@/content/programmes";
import { faqs } from "@/content/faqs";
import { homeCopy } from "@/content/home";

describe("programmes", () => {
  it("has exactly four programmes with required fields", () => {
    expect(programmes).toHaveLength(4);
    for (const p of programmes) {
      expect(p.slug).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.blurb.length).toBeGreaterThan(20);
      expect(p.icon).toBeTruthy();
    }
  });
});

describe("programmes accents", () => {
  it("gives every programme a distinct accent", () => {
    const accents = programmes.map((p) => p.accent);
    expect(accents).toHaveLength(programmes.length);
    expect(new Set(accents).size).toBe(programmes.length);
  });
});

describe("faqs", () => {
  it("has at least six question/answer pairs", () => {
    expect(faqs.length).toBeGreaterThanOrEqual(6);
    for (const f of faqs) {
      expect(f.question.endsWith("?")).toBe(true);
      expect(f.answer.length).toBeGreaterThan(20);
    }
  });
});

describe("homeCopy", () => {
  it("provides hero content", () => {
    expect(homeCopy.hero.h1).toBeTruthy();
    expect(homeCopy.hero.eyebrow).toBeTruthy();
  });

  it("provides the merged 'why' content — three promises plus supporting reasons", () => {
    expect(homeCopy.why.values).toHaveLength(3);
    expect(homeCopy.why.reasons.length).toBeGreaterThan(0);
  });
});
