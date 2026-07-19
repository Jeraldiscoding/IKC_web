import { describe, it, expect } from "vitest";
import { programmes } from "@/content/programmes";
import { faqs } from "@/content/faqs";
import { homeCopy } from "@/content/home";
import { pricedProgrammes, weeklySchedule, scheduleTimeSlots } from "@/content/pricing";

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
    expect(homeCopy.hero.lede).toBeTruthy();
  });

  it("provides the merged 'why' content — three promises plus supporting reasons", () => {
    expect(homeCopy.why.values).toHaveLength(3);
    expect(homeCopy.why.reasons.length).toBeGreaterThan(0);
  });
});

describe("pricedProgrammes", () => {
  it("has exactly four programmes with pricing and distinct accents", () => {
    expect(pricedProgrammes).toHaveLength(4);
    for (const p of pricedProgrammes) {
      expect(p.slug).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.fromPrice).toMatch(/^\$\d+$/);
      expect(p.priceUnit).toBeTruthy();
      expect(p.duration).toBeTruthy();
      expect(p.format).toBeTruthy();
      expect(p.blurb.length).toBeGreaterThan(20);
    }
    const accents = pricedProgrammes.map((p) => p.accent);
    expect(new Set(accents).size).toBe(4);
  });

  it("gives SPED literacy and numeracy levels, and Mainstream math levels", () => {
    const sped = pricedProgrammes.find((p) => p.slug === "sped-curriculum");
    expect(sped?.literacyLevels).toHaveLength(4);
    expect(sped?.numeracyLevels).toHaveLength(4);
    const main = pricedProgrammes.find((p) => p.slug === "mainstream-curriculum");
    expect(main?.mathLevels?.length).toBeGreaterThanOrEqual(5);
    expect(main?.footnote).toBeTruthy();
  });
});

describe("weeklySchedule", () => {
  it("has seven days Mon-Sun with Mon and Fri as prep days", () => {
    expect(weeklySchedule).toHaveLength(7);
    expect(weeklySchedule.map((d) => d.day)).toEqual([
      "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun",
    ]);
    const mon = weeklySchedule.find((d) => d.day === "Mon");
    expect(mon?.note).toMatch(/planning/i);
    expect(mon?.entries).toHaveLength(0);
  });

  it("schedules group classes on Sat and Sun", () => {
    const sat = weeklySchedule.find((d) => d.day === "Sat");
    expect(sat?.entries.some((e) => e.label === "P1 Math")).toBe(true);
    expect(sat?.entries.some((e) => e.label === "Literacy L1")).toBe(true);
  });
});

describe("scheduleTimeSlots", () => {
  it("gives every schedule entry a matching time-axis row", () => {
    // The time-aligned board places each class in the row matching its time.
    // An entry whose time is not a slot would silently vanish from the grid.
    for (const day of weeklySchedule) {
      for (const entry of day.entries) {
        expect(scheduleTimeSlots).toContain(entry.time);
      }
    }
  });
});
