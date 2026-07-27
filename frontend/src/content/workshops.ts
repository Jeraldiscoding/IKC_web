export type Workshop = {
  slug: string;
  eyebrow: string;
  title: string;
  blurb: string;
  /**
   * ISO 8601 with Singapore's +08:00 offset. Written out in full so the times
   * are unambiguous no matter where the build machine or the reader sits — a
   * bare "2026-08-23T18:00" would be read as UTC, which would both push the
   * Event schema eight hours off and keep the workshop on the page after it
   * ended. These two feed the Event JSON-LD as well as the expiry check.
   */
  startsAt: string;
  endsAt: string;
  /** Human-facing labels. Kept separate from `endsAt` so the copy can read the
   *  way the poster reads, rather than being formatted out of the timestamp. */
  dateLabel: string;
  dayLabel: string;
  timeLabel: string;
  price: string;
  priceUnit: string;
  venue: string;
  venueNote: string;
  poster: { src: string; alt: string; width: number; height: number };
  /**
   * Where the poster's "Scan to sign up!" QR code points — the sign-up form.
   *
   * Stays nullable on purpose: a future workshop may be announced before its
   * form exists, and `null` makes WorkshopSection fall back to WhatsApp rather
   * than ship a dead button.
   */
  signUpUrl: string | null;
  /** Prefilled WhatsApp text, used as the fallback CTA and the quiet second choice. */
  whatsappMessage: string;
  footnote: string;
};

export const workshops: Workshop[] = [
  {
    slug: "ready-for-oral-success",
    eyebrow: "Pop-up workshop",
    title: "Ready for Oral Success!",
    blurb:
      "Storytelling and Show & Tell come first in this fun, play-based workshop, where children create their own slime while developing communication, confidence, and social skills.",
    startsAt: "2026-08-23T16:00:00+08:00",
    endsAt: "2026-08-23T18:00:00+08:00",
    dateLabel: "23 August 2026",
    dayLabel: "Sunday",
    timeLabel: "4 – 6pm",
    price: "$85",
    priceUnit: "per child",
    venue: "Blue Herring Academy",
    venueNote: "Near Kovan MRT",
    poster: {
      src: "/media/workshop-oral-success.jpg",
      // Describes what the poster *says*, not what it looks like — a screen
      // reader user needs the date, price and venue, not "a colourful flyer".
      alt: "Poster for the Inclusive Kids Club pop-up workshop 'Ready for Oral Success!' on Sunday 23 August 2026, 4 to 6pm, $85 per child, hosted at Blue Herring Academy near Kovan MRT.",
      width: 1080,
      height: 1440,
    },
    signUpUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSdGOU87JxSZpwcKdFUPcfACdyhCWEYfeMA7_vJvgie9VO9vWg/viewform?pli=1",
    whatsappMessage:
      "Hi IKC, I'd like to sign my child up for the Ready for Oral Success workshop on 23 August 2026.",
    footnote: "Workshop independently organised by IKC.",
  },
];

/**
 * Workshops that have not finished yet.
 *
 * Note on timing: the pages that call this are statically rendered, so `now` is
 * the moment of the *build*, not the moment a parent loads the page. A finished
 * workshop therefore disappears on the next deploy rather than the instant it
 * ends — good enough here, and it means no stale event survives a routine
 * content update. If it ever needs to be exact, add `export const revalidate`
 * to the page so Next.js re-renders it on a schedule.
 */
export function upcomingWorkshops(now: Date = new Date()): Workshop[] {
  return workshops.filter((w) => new Date(w.endsAt) > now);
}
