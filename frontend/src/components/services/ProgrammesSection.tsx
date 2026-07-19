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
  { card: string; price: string; chip: string; rule: string }
> = {
  terracotta: {
    card: "bg-terracotta-light/10",
    price: "text-terracotta",
    chip: "bg-terracotta/10 text-terracotta-dark",
    rule: "bg-terracotta",
  },
  mustard: {
    card: "bg-mustard-tint",
    price: "text-mustard-dark",
    chip: "bg-mustard/20 text-mustard-dark",
    rule: "bg-mustard-dark",
  },
  sage: {
    card: "bg-sage-tint",
    price: "text-sage-dark",
    chip: "bg-sage/25 text-sage-dark",
    rule: "bg-sage-dark",
  },
  cream: {
    card: "bg-cream-dark/30",
    price: "text-terracotta-dark",
    chip: "bg-terracotta-light/20 text-terracotta-dark",
    rule: "bg-terracotta-light",
  },
};

/**
 * The four real, priced programmes as accent cards. Price is framed "From $X"
 * so the page ages gracefully; SPED/Mainstream expose their curriculum levels
 * so parents see scope at a glance (and search engines see the keywords).
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
          return (
            <StaggerItem key={p.slug}>
              <HoverCard className="h-full">
                <article className={`flex h-full flex-col rounded-3xl p-8 ${a.card}`}>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl">{p.title}</h3>
                    <div className="shrink-0 text-right">
                      <p className={`font-heading text-2xl font-bold leading-none ${a.price}`}>
                        From {p.fromPrice}
                      </p>
                      <p className="mt-1 text-xs text-ink-muted">/ {p.priceUnit}</p>
                    </div>
                  </div>

                  <span
                    className={`mt-4 block h-1 w-10 rounded-full ${a.rule}`}
                    aria-hidden
                  />

                  <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
                    <div>
                      <dt className="sr-only">Duration</dt>
                      <dd>{p.duration}</dd>
                    </div>
                    <div>
                      <dt className="sr-only">Format</dt>
                      <dd>{p.format}</dd>
                    </div>
                    <div>
                      <dt className="sr-only">Suitable for</dt>
                      <dd>{p.audience}</dd>
                    </div>
                  </dl>

                  {p.packageNote ? (
                    <p className={`mt-3 inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium ${a.chip}`}>
                      {p.packageNote}
                    </p>
                  ) : null}

                  <p className="mt-5 text-sm">{p.blurb}</p>

                  {p.literacyLevels && p.numeracyLevels ? (
                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                      <LevelList heading="Literacy" levels={p.literacyLevels} rule={a.rule} />
                      <LevelList heading="Numeracy" levels={p.numeracyLevels} rule={a.rule} />
                    </div>
                  ) : null}

                  {p.mathLevels ? (
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {p.mathLevels.map((m) => (
                        <li
                          key={m}
                          className={`rounded-full px-3 py-1 text-xs font-medium ${a.chip}`}
                        >
                          {m}
                        </li>
                      ))}
                    </ul>
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

function LevelList({
  heading,
  levels,
  rule,
}: {
  heading: string;
  levels: { name: string; description: string }[];
  rule: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-ink">{heading}</p>
      <ul className="mt-2 space-y-2">
        {levels.map((l) => (
          <li key={l.name} className="flex items-start gap-2 text-sm text-ink-muted">
            <span className={`mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full ${rule}`} aria-hidden />
            <span>
              <span className="font-medium text-ink">{l.name}</span> — {l.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
