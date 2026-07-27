import { describe, it, expect } from "vitest";
import { workshops, upcomingWorkshops, type Workshop } from "@/content/workshops";

describe("workshops content", () => {
  it("gives every workshop the fields the section and the Event schema read", () => {
    for (const w of workshops) {
      expect(w.slug).toBeTruthy();
      expect(w.title).toBeTruthy();
      expect(w.blurb.length).toBeGreaterThan(20);
      expect(w.price).toMatch(/^\$\d+$/);
      expect(w.priceUnit).toBeTruthy();
      expect(w.venue).toBeTruthy();
      expect(w.poster.src).toMatch(/^\/media\//);
      expect(w.poster.width).toBeGreaterThan(0);
      expect(w.poster.height).toBeGreaterThan(0);
      // The alt text stands in for the poster entirely for a screen reader, so
      // it has to carry the details rather than describe the artwork.
      expect(w.poster.alt.length).toBeGreaterThan(60);
      expect(w.whatsappMessage).toBeTruthy();
      // The CTA renders this href verbatim, so a relative path or a bare
      // "docs.google.com/..." paste would silently resolve against our own
      // domain and 404 instead of reaching the form.
      if (w.signUpUrl !== null) {
        expect(w.signUpUrl).toMatch(/^https:\/\//);
        expect(() => new URL(w.signUpUrl as string)).not.toThrow();
      }
    }
  });

  it("uses explicit-offset timestamps that parse and run start → end", () => {
    for (const w of workshops) {
      // A missing offset would be parsed as UTC and silently shift the event by
      // eight hours in both the schema and the expiry check.
      expect(w.startsAt).toMatch(/[+-]\d{2}:\d{2}$/);
      expect(w.endsAt).toMatch(/[+-]\d{2}:\d{2}$/);
      const start = new Date(w.startsAt);
      const end = new Date(w.endsAt);
      expect(Number.isNaN(start.getTime())).toBe(false);
      expect(Number.isNaN(end.getTime())).toBe(false);
      expect(end.getTime()).toBeGreaterThan(start.getTime());
    }
  });

  it("has a unique slug per workshop", () => {
    const slugs = workshops.map((w) => w.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("upcomingWorkshops", () => {
  const workshop = workshops.find((w) => w.slug === "ready-for-oral-success") as Workshop;

  it("keeps a workshop that has not ended yet", () => {
    const during = new Date("2026-08-23T17:00:00+08:00");
    expect(upcomingWorkshops(during).map((w) => w.slug)).toContain(workshop.slug);
  });

  it("drops a workshop the moment it ends, in Singapore time", () => {
    const justAfter = new Date("2026-08-23T18:00:01+08:00");
    expect(upcomingWorkshops(justAfter).map((w) => w.slug)).not.toContain(workshop.slug);
  });

  it("returns an empty list once everything has passed", () => {
    const farFuture = new Date("2099-01-01T00:00:00+08:00");
    expect(upcomingWorkshops(farFuture)).toHaveLength(0);
  });
});
