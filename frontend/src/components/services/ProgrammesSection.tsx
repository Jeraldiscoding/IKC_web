import type { LucideIcon } from "lucide-react";
import { User, Users, Blocks, HeartHandshake, GraduationCap, Clock } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DoodleScatter } from "@/components/decor/DoodleScatter";
import { pricedProgrammes, type PricedProgrammeAccent } from "@/content/pricing";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";

// Full class strings, never interpolated — Tailwind must be able to see them.
const accents: Record<
  PricedProgrammeAccent,
  { card: string; price: string; chip: string; rule: string; iconWrap: string; icon: string }
> = {
  terracotta: {
    card: "bg-terracotta-light/10",
    price: "text-terracotta",
    chip: "bg-terracotta/10 text-terracotta-dark",
    rule: "bg-terracotta",
    iconWrap: "bg-terracotta/15",
    icon: "text-terracotta",
  },
  mustard: {
    card: "bg-mustard-tint",
    price: "text-mustard-dark",
    chip: "bg-mustard/20 text-mustard-dark",
    rule: "bg-mustard-dark",
    iconWrap: "bg-mustard/25",
    icon: "text-mustard-dark",
  },
  sage: {
    card: "bg-sage-tint",
    price: "text-sage-dark",
    chip: "bg-sage/25 text-sage-dark",
    rule: "bg-sage-dark",
    iconWrap: "bg-sage/25",
    icon: "text-sage-dark",
  },
  cream: {
    card: "bg-cream-dark/30",
    price: "text-terracotta-dark",
    chip: "bg-terracotta-light/20 text-terracotta-dark",
    rule: "bg-terracotta-light",
    iconWrap: "bg-terracotta-light/20",
    icon: "text-terracotta-dark",
  },
};

// A recognisable face per programme, mapped by slug so the content stays clean.
const programmeIcon: Record<string, LucideIcon> = {
  "one-to-one": User,
  "early-learners": Blocks,
  "sped-curriculum": HeartHandshake,
  "mainstream-curriculum": GraduationCap,
};

/**
 * The four real, priced programmes as accent cards. Price is framed "From $X"
 * so the page ages gracefully; the meta reads as quick icon chips, and SPED /
 * Mainstream expose their curriculum levels as compact ladders so parents see
 * scope at a glance (and search engines see the keywords) without a wall of text.
 */
export function ProgrammesSection() {
  return (
    <Section glow="warm" decor={<DoodleScatter preset="programmes" />}>
      <Reveal className="max-w-3xl">
        <Eyebrow>Programmes &amp; pricing</Eyebrow>
        <h2 className="mt-4">Classes built around your child</h2>
        <p className="mt-4 text-lg">
          Four ways to learn with us — individual or in a calm small group of no
          more than three. Prices are a guide; message us for current fees and
          availability.
        </p>
      </Reveal>

      <StaggerGroup className="mt-12 grid gap-6 lg:grid-cols-2">
        {pricedProgrammes.map((p) => {
          const a = accents[p.accent];
          const Icon = programmeIcon[p.slug] ?? User;
          const FormatIcon = p.format.toLowerCase().includes("individual") ? User : Users;
          return (
            <StaggerItem key={p.slug}>
              <HoverCard className="h-full">
                <article className={`flex h-full flex-col rounded-3xl p-8 ${a.card}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${a.iconWrap}`}
                      >
                        <Icon className={`h-6 w-6 ${a.icon}`} aria-hidden />
                      </span>
                      <h3 className="text-2xl">{p.title}</h3>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className={`font-heading text-2xl font-bold leading-none ${a.price}`}>
                        From {p.fromPrice}
                      </p>
                      <p className="mt-1 text-xs text-ink-muted">/ {p.priceUnit}</p>
                    </div>
                  </div>

                  {/* Meta as quick icon chips instead of a run-on line. */}
                  <div className="mt-5 flex flex-wrap gap-2 text-xs text-ink-muted">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/70 px-3 py-1">
                      <Clock className="h-3.5 w-3.5" aria-hidden /> {p.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/70 px-3 py-1">
                      <FormatIcon className="h-3.5 w-3.5" aria-hidden /> {p.format}
                    </span>
                  </div>
                  <p className="mt-3 text-sm">
                    <span className="font-medium text-ink">Best for:</span>{" "}
                    <span className="text-ink-muted">{p.audience}</span>
                  </p>

                  {p.packageNote ? (
                    <p className={`mt-3 inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium ${a.chip}`}>
                      {p.packageNote}
                    </p>
                  ) : null}

                  <p className="mt-5 text-sm">{p.blurb}</p>

                  {p.literacyLevels && p.numeracyLevels ? (
                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                      <LevelLadder heading="Literacy" levels={p.literacyLevels} badge={a.chip} />
                      <LevelLadder heading="Numeracy" levels={p.numeracyLevels} badge={a.chip} />
                    </div>
                  ) : null}

                  {p.mathLevels ? (
                    <div className="mt-6">
                      <p className="text-xs font-semibold uppercase tracking-wide text-ink">
                        Levels
                      </p>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {p.mathLevels.map((m) => (
                          <li
                            key={m}
                            className={`rounded-full px-3 py-1 text-xs font-medium ${a.chip}`}
                          >
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {p.footnote ? (
                    <p className="mt-5 text-xs text-ink-muted">{p.footnote}</p>
                  ) : null}
                </article>
              </HoverCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}

/**
 * A curriculum track (Literacy / Numeracy) as a compact ladder: a small level
 * badge (L1…L4) beside its description. Levels are a real progression, so the
 * badge order carries meaning here.
 */
function LevelLadder({
  heading,
  levels,
  badge,
}: {
  heading: string;
  levels: { name: string; description: string }[];
  badge: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-ink">{heading}</p>
      <ul className="mt-3 space-y-2.5">
        {levels.map((l) => (
          <li key={l.name} className="flex items-start gap-2.5 text-sm text-ink-muted">
            <span
              className={`inline-flex h-5 min-w-[1.6rem] shrink-0 items-center justify-center rounded-md px-1 text-[0.65rem] font-bold ${badge}`}
            >
              {l.name.split(" ").pop()}
            </span>
            <span>{l.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
