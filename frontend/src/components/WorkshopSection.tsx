import Image from "next/image";
import { CalendarDays, Clock, MapPin, MessageCircle, Tag, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { waLink } from "@/lib/site-config";
import { upcomingWorkshops } from "@/content/workshops";

/**
 * A dated announcement for one-off workshops, shared by the home and Services
 * pages. Unlike the programme sections it is deliberately *not* a gateway to a
 * deeper page — a pop-up workshop has one date and one action, so everything a
 * parent needs to decide sits right here.
 *
 * Renders nothing once every workshop has passed, so an empty or out-of-date
 * announcement can never sit on the home page. That also means the section can
 * stay wired into both pages permanently — adding the next workshop is a single
 * entry in `content/workshops.ts`, with no component or page edits.
 */
export function WorkshopSection() {
  const workshop = upcomingWorkshops()[0];
  if (!workshop) return null;

  const { poster, signUpUrl, whatsappMessage } = workshop;
  // Sign-up goes to the form behind the poster's QR code, which is what a
  // parent on a laptop needs — nobody scans a QR off their own screen. Falls
  // back to the WhatsApp thread if a workshop is ever announced before its form
  // exists, so the CTA is never a dead button.
  const signUpHref = signUpUrl ?? waLink(whatsappMessage);

  const details = [
    { icon: CalendarDays, label: "Date", value: `${workshop.dateLabel}, ${workshop.dayLabel}` },
    { icon: Clock, label: "Time", value: workshop.timeLabel },
    { icon: Tag, label: "Fee", value: `${workshop.price} ${workshop.priceUnit}` },
    { icon: MapPin, label: "Where", value: `${workshop.venue} (${workshop.venueNote})` },
  ];

  return (
    <Section glow="warm" className="bg-mustard-tint">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
        {/* The poster carries the brand better than anything we could rebuild in
            markup, so it leads. Opening the full image in a new tab is the point
            rather than a nicety — parents forward these to each other, and the
            file is the thing they forward. */}
        <Reveal>
          <a
            href={poster.src}
            target="_blank"
            rel="noopener noreferrer"
            className="group mx-auto block w-full max-w-sm lg:max-w-none"
          >
            <Image
              src={poster.src}
              alt={poster.alt}
              width={poster.width}
              height={poster.height}
              sizes="(max-width: 1024px) 24rem, 34rem"
              className="w-full rounded-3xl border border-cream-dark shadow-soft-lg transition-transform group-hover:-translate-y-1"
            />
            <span className="mt-3 block text-center text-sm text-ink-muted lg:text-left">
              Tap to open the full poster
            </span>
          </a>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>{workshop.eyebrow}</Eyebrow>
            <h2 className="mt-4">{workshop.title}</h2>
            <p className="mt-4 text-lg">{workshop.blurb}</p>
          </Reveal>

          {/* A description list, not a bulleted list: these are labelled facts,
              and the label/value pairing is what `dt`/`dd` exist for. */}
          <StaggerGroup as="dl" className="mt-9 grid gap-5 sm:grid-cols-2">
            {details.map(({ icon: Icon, label, value }) => (
              <StaggerItem key={label} className="flex gap-3.5">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream-dark bg-cream">
                  <Icon className="h-4.5 w-4.5 text-terracotta" aria-hidden />
                </span>
                <div>
                  <dt className="font-heading text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
                    {label}
                  </dt>
                  <dd className="mt-1 font-semibold text-ink">{value}</dd>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button href={signUpHref}>
              Sign up for the workshop <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            {/* Only worth showing while sign-up lives somewhere other than
                WhatsApp — on the fallback path both buttons would open the
                same chat, which reads as a broken duplicate. */}
            {signUpUrl ? (
              <Button href={waLink(whatsappMessage)} variant="outline">
                <MessageCircle className="h-4 w-4" aria-hidden /> Ask us a question
              </Button>
            ) : null}
          </div>

          <p className="mt-5 text-sm text-ink-muted">{workshop.footnote}</p>
        </div>
      </div>
    </Section>
  );
}
