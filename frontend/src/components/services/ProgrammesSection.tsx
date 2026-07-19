import { ChevronDown, Info, Tag } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DoodleScatter } from "@/components/decor/DoodleScatter";
import { pricedProgrammes, type PricedProgrammeAccent } from "@/content/pricing";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";

// Full class strings, never interpolated — Tailwind must be able to see them.
// Cards sit on a deeper accent wash so each reads as a defined block; the chips
// flip to light cream pills so they still pop against the darker card.
const accents: Record<
  PricedProgrammeAccent,
  { card: string; price: string; chip: string; rule: string }
> = {
  terracotta: {
    card: "bg-terracotta-light/[0.18]",
    price: "text-terracotta",
    chip: "bg-cream/80 text-terracotta-dark",
    rule: "bg-terracotta",
  },
  mustard: {
    card: "bg-mustard/[0.18]",
    price: "text-mustard-dark",
    chip: "bg-cream/80 text-mustard-dark",
    rule: "bg-mustard-dark",
  },
  sage: {
    card: "bg-sage/[0.18]",
    price: "text-sage-dark",
    chip: "bg-cream/80 text-sage-dark",
    rule: "bg-sage-dark",
  },
  cream: {
    card: "bg-cream-dark/50",
    price: "text-terracotta-dark",
    chip: "bg-cream/80 text-terracotta-dark",
    rule: "bg-terracotta-light",
  },
};

/**
 * The four real, priced programmes as accent cards. The title leads big, the
 * "From $X" price reads as a guide, and the meta (time, format, days) sits as
 * quiet chips. SPED / Mainstream expose their curriculum levels as compact
 * ladders so parents see scope without a wall of text.
 */
export function ProgrammesSection() {
  return (
    <Section glow="warm" decor={<DoodleScatter preset="programmes" />}>
      <Reveal className="max-w-3xl">
        <Eyebrow>Programmes &amp; pricing</Eyebrow>
        <h2 className="mt-4">Classes built around your child</h2>
        <p className="mt-4 text-lg">
          Four ways to learn with us: One-to-one, or in a calm small group of no
          more than three. Prices are a guide; message us for current fees and a
          spot that fits.
        </p>
      </Reveal>

      {/*
        Cards use a 7-row subgrid (StaggerItem → HoverCard → article) so that
        header, rule, blurb, chips, package badge, "Best for", and the extras
        block each land on the same row across the two cards sharing a grid
        row — regardless of which optional fields a given programme has.
        Rows with no content for a card just sit empty at that shared height.
      */}
      <StaggerGroup className="mt-12 grid gap-6 lg:grid-cols-2">
        {pricedProgrammes.map((p) => {
          const a = accents[p.accent];
          const hasExtras = (p.literacyLevels && p.numeracyLevels) || p.mathLevels || p.footnote;
          return (
            <StaggerItem key={p.slug} className="grid grid-rows-subgrid [grid-row:span_7]">
              <HoverCard className="grid h-full grid-rows-subgrid [grid-row:1/-1]">
                <article
                  className={`grid h-full grid-rows-subgrid [grid-row:1/-1] gap-y-4 rounded-3xl p-8 ${a.card}`}
                >
                  <div className="flex items-start justify-between gap-4 [grid-row:1]">
                    <h3 className="font-heading text-[1.75rem] font-bold leading-tight">
                      {p.title}
                    </h3>
                    <div className="shrink-0 text-right">
                      <p className="text-[0.7rem] font-medium uppercase tracking-wide text-ink-muted">
                        From
                      </p>
                      <p className={`font-heading text-3xl font-bold leading-none ${a.price}`}>
                        {p.fromPrice}
                      </p>
                      <p className="mt-1 text-xs text-ink-muted">per {p.priceUnit}</p>
                    </div>
                  </div>

                  <span
                    className={`block h-1 w-12 self-start rounded-full [grid-row:2] ${a.rule}`}
                    aria-hidden
                  />

                  {/* Lead with the human line, then the quick facts. */}
                  <p className="text-sm [grid-row:3]">{p.blurb}</p>

                  <div className="flex flex-wrap content-start gap-2 text-xs font-medium text-ink-muted [grid-row:4]">
                    <span className="rounded-full bg-cream/80 px-3 py-1">{p.duration}</span>
                    <span className="rounded-full bg-cream/80 px-3 py-1">{p.format}</span>
                    <span className="rounded-full bg-cream/80 px-3 py-1">{p.schedule}</span>
                  </div>

                  {/* The package deal, pulled out as a bold accent badge so the
                      saving is impossible to miss. */}
                  {p.packageNote ? (
                    <p
                      className={`inline-flex w-fit items-center gap-1.5 self-start rounded-full px-3.5 py-1.5 text-xs font-bold text-cream shadow-sm [grid-row:5] ${a.rule}`}
                    >
                      <Tag className="h-3.5 w-3.5" aria-hidden /> Save with a package ·{" "}
                      {p.packageNote}
                    </p>
                  ) : null}

                  <p className="self-start text-sm [grid-row:6]">
                    <span className="font-medium text-ink">Best for:</span>{" "}
                    <span className="text-ink-muted">{p.audience}</span>
                  </p>

                  {/* SPED levels / math levels / footnote — whichever apply,
                      stacked together in the shared extras row. */}
                  {hasExtras ? (
                    <div className="self-start space-y-4 [grid-row:7]">
                      {p.literacyLevels && p.numeracyLevels ? (
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                          <summary
                            className={`flex cursor-pointer list-none items-center justify-between gap-2 rounded-xl bg-cream/60 px-4 py-2.5 text-sm font-semibold ${a.price}`}
                          >
                            <span>Literacy L1–L4 · Numeracy L1–L4</span>
                            <ChevronDown
                              className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                              aria-hidden
                            />
                          </summary>
                          <div className="mt-4 grid gap-6 sm:grid-cols-2">
                            <LevelLadder
                              heading="Literacy"
                              levels={p.literacyLevels}
                              badge={a.chip}
                            />
                            <LevelLadder
                              heading="Numeracy"
                              levels={p.numeracyLevels}
                              badge={a.chip}
                            />
                          </div>
                        </details>
                      ) : null}

                      {p.mathLevels ? (
                        <div>
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
                        <p className="flex items-start gap-2.5 rounded-xl border border-terracotta-light/40 bg-cream/70 p-3.5 text-xs leading-relaxed text-ink">
                          <Info className={`mt-0.5 h-4 w-4 shrink-0 ${a.price}`} aria-hidden />
                          <span>{p.footnote}</span>
                        </p>
                      ) : null}
                    </div>
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
