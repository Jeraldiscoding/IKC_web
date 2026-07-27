import { siteConfig } from "@/lib/site-config";
import { upcomingWorkshops } from "@/content/workshops";

/**
 * One `Event` per upcoming workshop — the schema type behind Google's event
 * rich results (date, price and venue shown directly in search).
 *
 * Only *upcoming* workshops are emitted. A past event left in the markup is
 * both useless and a quality signal against the page, and reusing
 * `upcomingWorkshops()` means the schema and the visible section can never
 * disagree about what is still running.
 *
 * Returns an array because there may be none — callers should map over it, and
 * a page with no workshop then emits no Event markup at all.
 */
export function eventSchemas() {
  return upcomingWorkshops().map((w) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${w.title} — ${w.eyebrow}`,
    description: w.blurb,
    startDate: w.startsAt,
    endDate: w.endsAt,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: [`${siteConfig.url}${w.poster.src}`],
    location: {
      "@type": "Place",
      name: w.venue,
      // No `streetAddress`: the poster only gives "near Kovan MRT", and this is
      // a third-party venue. Same rule as localBusinessSchema — never invent an
      // address for structured data.
      address: {
        "@type": "PostalAddress",
        addressLocality: "Singapore",
        addressCountry: "SG",
      },
    },
    organizer: {
      "@type": "EducationalOrganization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    // `performer` is intentionally omitted — we have no named individual to
    // credit for this workshop.
    offers: {
      "@type": "Offer",
      price: w.price.replace(/^\$/, ""),
      priceCurrency: "SGD",
      availability: "https://schema.org/InStock",
      // Falls back to the page itself while the poster's sign-up link is
      // unknown, so the offer always resolves somewhere real.
      url: w.signUpUrl ?? siteConfig.url,
    },
  }));
}
