import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DoodleScatter } from "@/components/decor/DoodleScatter";
import { programmes, type ProgrammeAccent } from "@/content/programmes";
import { servicesCopy } from "@/content/services";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

// Full class strings, never interpolated — Tailwind must be able to see them.
const accents: Record<ProgrammeAccent, { rule: string; chip: string; hover: string }> = {
  terracotta: {
    rule: "bg-terracotta",
    chip: "bg-terracotta/10 text-terracotta-dark",
    hover: "hover:bg-terracotta/[0.05]",
  },
  mustard: {
    rule: "bg-mustard-dark",
    chip: "bg-mustard/20 text-mustard-dark",
    hover: "hover:bg-mustard/[0.07]",
  },
  sage: {
    rule: "bg-sage-dark",
    chip: "bg-sage/25 text-sage-dark",
    hover: "hover:bg-sage/[0.08]",
  },
  cream: {
    rule: "bg-terracotta-light",
    chip: "bg-terracotta-light/20 text-terracotta-dark",
    hover: "hover:bg-terracotta-light/[0.08]",
  },
};

/**
 * The four focus areas as flat, hairline-separated editorial rows — deliberately
 * a different structure from the filled Programmes & pricing cards directly
 * above, so the two sections don't read as the same grid twice. Each row lays
 * out title, blurb and keyword chips across three columns on desktop; the accent
 * lives in the underline and a soft hover wash rather than a card fill.
 */
export function TeachSection() {
  const { teach } = servicesCopy;
  return (
    <Section glow="warm" decor={<DoodleScatter preset="teach" />}>
      <Reveal className="max-w-3xl">
        {/* Not "What we teach" — that is the h2 directly below it. */}
        <Eyebrow>Four focus areas</Eyebrow>
        <h2 className="mt-4">{teach.heading}</h2>
        <p className="mt-4 text-lg">{teach.intro}</p>
      </Reveal>

      <StaggerGroup className="mt-12 border-t border-cream-dark">
        {programmes.map((p) => {
          const a = accents[p.accent];
          return (
            <StaggerItem
              key={p.slug}
              as="article"
              className={`grid items-start gap-5 rounded-2xl border-b border-cream-dark px-4 py-8 transition-colors duration-300 motion-reduce:transition-none lg:grid-cols-[1.1fr_1.5fr_1.2fr] lg:gap-10 ${a.hover}`}
            >
              {/* Title + accent underline: the area's identity. */}
              <div>
                <h3 className="font-heading text-2xl font-bold text-ink">{p.title}</h3>
                <span
                  className={`mt-3 block h-1 w-12 rounded-full ${a.rule}`}
                  aria-hidden
                />
              </div>

              <p className="text-base text-ink-muted lg:pt-1">{p.blurb}</p>

              {/* Details as short chips — scannable keywords, not prose. */}
              <ul className="flex flex-wrap gap-2 lg:pt-1">
                {p.details.map((d) => (
                  <li
                    key={d}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${a.chip}`}
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
