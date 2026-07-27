import { describe, it, expect, afterEach, vi } from "vitest";
import { eventSchemas } from "@/lib/event-schema";
import { siteConfig } from "@/lib/site-config";
import { workshops } from "@/content/workshops";

afterEach(() => {
  vi.useRealTimers();
});

function atTime(iso: string) {
  vi.useFakeTimers({ shouldAdvanceTime: true });
  vi.setSystemTime(new Date(iso));
}

describe("eventSchemas", () => {
  it("emits one Event per upcoming workshop with its real dates and offer", () => {
    atTime("2026-07-01T09:00:00+08:00");
    const events = eventSchemas();
    expect(events).toHaveLength(workshops.length);

    const event = events[0] as Record<string, unknown>;
    expect(event["@type"]).toBe("Event");
    expect(event.startDate).toBe(workshops[0].startsAt);
    expect(event.endDate).toBe(workshops[0].endsAt);
    expect(event.eventAttendanceMode).toBe(
      "https://schema.org/OfflineEventAttendanceMode",
    );

    // Google reads a bare number plus a separate currency, not "$85".
    const offers = event.offers as Record<string, unknown>;
    expect(offers.price).toBe("85");
    expect(offers.priceCurrency).toBe("SGD");
    expect(offers.url).toBeTruthy();
  });

  it("uses absolute image URLs, since crawlers do not resolve site-relative ones", () => {
    atTime("2026-07-01T09:00:00+08:00");
    const images = (eventSchemas()[0] as Record<string, unknown>).image as string[];
    expect(images[0]).toBe(`${siteConfig.url}${workshops[0].poster.src}`);
  });

  it("names the venue but never invents a street address for it", () => {
    atTime("2026-07-01T09:00:00+08:00");
    const location = (eventSchemas()[0] as Record<string, unknown>)
      .location as Record<string, unknown>;
    expect(location.name).toBe(workshops[0].venue);
    const address = location.address as Record<string, unknown>;
    expect(address.addressCountry).toBe("SG");
    expect(address.streetAddress).toBeUndefined();
  });

  it("emits nothing once every workshop has passed", () => {
    atTime("2099-01-01T00:00:00+08:00");
    expect(eventSchemas()).toHaveLength(0);
  });
});
