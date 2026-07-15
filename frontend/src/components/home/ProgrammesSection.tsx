import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DoodleScatter } from "@/components/decor/DoodleScatter";
import { programmes, type ProgrammeAccent } from "@/content/programmes";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";

// Full class strings, never interpolated — Tailwind must be able to see them.
const accents: Record<
  ProgrammeAccent,
  { tile: string; heading: string; body: string; iconWrap: string; icon: string; link: string }
> = {
  terracotta: {
    tile: "bg-terracotta border-terracotta",
    heading: "text-cream",
    body: "text-cream/85",
    iconWrap: "bg-cream/20",
    icon: "text-cream",
    link: "text-cream hover:text-white",
  },
  mustard: {
    tile: "bg-mustard-tint border-mustard/30",
    heading: "text-ink",
    body: "text-ink-muted",
    iconWrap: "bg-mustard/25",
    icon: "text-mustard-dark",
    link: "text-terracotta hover:text-terracotta-dark",
  },
  sage: {
    tile: "bg-sage-tint border-sage/30",
    heading: "text-ink",
    body: "text-ink-muted",
    iconWrap: "bg-sage/25",
    icon: "text-sage-dark",
    link: "text-terracotta hover:text-terracotta-dark",
  },
  cream: {
    tile: "bg-white border-cream-dark",
    heading: "text-ink",
    body: "text-ink-muted",
    iconWrap: "bg-terracotta/10",
    icon: "text-terracotta",
    link: "text-terracotta hover:text-terracotta-dark",
  },
};

export function ProgrammesSection() {
  return (
    <Section
      glow="cool"
      decor={<DoodleScatter preset="programmes" />}
    >
      <Reveal className="max-w-3xl">
        <Eyebrow>Our programmes</Eyebrow>
        <h2 className="mt-4">Small-group enrichment, built around your child</h2>
        <p className="mt-4 text-lg">
          Weekly classes, workshops and holiday programmes across four areas — each
          taught in calm, small groups for children with special needs.
        </p>
      </Reveal>

      <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {programmes.map((p, i) => {
          const Icon = p.icon;
          const a = accents[p.accent];
          // The first tile is the hero of the bento: double width and height on lg.
          const featured = i === 0;
          return (
            <StaggerItem
              key={p.slug}
              className={featured ? "lg:col-span-2 lg:row-span-2" : ""}
            >
              <HoverCard className="h-full">
                <div
                  className={`flex h-full flex-col rounded-3xl border p-7 shadow-soft ${a.tile} ${featured ? "lg:justify-center lg:p-10" : ""}`}
                >
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${a.iconWrap}`}
                  >
                    <Icon className={`h-6 w-6 ${a.icon}`} aria-hidden />
                  </span>
                  <h3 className={`mt-5 ${a.heading} ${featured ? "text-3xl" : "text-xl"}`}>
                    {p.title}
                  </h3>
                  <p className={`mt-2 flex-1 ${a.body} ${featured ? "text-base" : "text-sm"}`}>
                    {p.blurb}
                  </p>
                  {/* Four identical "Learn more" links are fine in context but ambiguous
                      for a screen-reader user tabbing through links out of context. */}
                  <Link
                    href="/services"
                    aria-label={`Learn more about ${p.title}`}
                    className={`mt-5 inline-flex items-center gap-1 text-sm font-semibold ${a.link}`}
                  >
                    Learn more <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </HoverCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
