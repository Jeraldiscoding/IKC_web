import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DoodleScatter } from "@/components/decor/DoodleScatter";
import { programmes, type ProgrammeAccent } from "@/content/programmes";
import { servicesCopy } from "@/content/services";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";

// Full class strings, never interpolated — Tailwind must be able to see them.
const accents: Record<
  ProgrammeAccent,
  { card: string; iconWrap: string; icon: string; rule: string; chip: string }
> = {
  terracotta: {
    card: "bg-terracotta-light/10",
    iconWrap: "bg-terracotta/15",
    icon: "text-terracotta",
    rule: "bg-terracotta",
    chip: "bg-terracotta/10 text-terracotta-dark",
  },
  mustard: {
    card: "bg-mustard-tint",
    iconWrap: "bg-mustard/25",
    icon: "text-mustard-dark",
    rule: "bg-mustard-dark",
    chip: "bg-mustard/20 text-mustard-dark",
  },
  sage: {
    card: "bg-sage-tint",
    iconWrap: "bg-sage/25",
    icon: "text-sage-dark",
    rule: "bg-sage-dark",
    chip: "bg-sage/25 text-sage-dark",
  },
  cream: {
    card: "bg-cream-dark/30",
    iconWrap: "bg-terracotta-light/20",
    icon: "text-terracotta-dark",
    rule: "bg-terracotta-light",
    chip: "bg-terracotta-light/20 text-terracotta-dark",
  },
};

/**
 * The four focus areas as a 2×2 bento of accent cards. These areas are parallel,
 * not a sequence, so no 01–04 numbering — the icon, accent underline and colour
 * carry each area's identity. Details are short chips, not sentences, so the
 * section scans in a glance instead of reading as four paragraphs of prose.
 */
export function TeachSection() {
  const { teach } = servicesCopy;
  return (
    <Section
      glow="warm"
      className="pt-0"
      decor={<DoodleScatter preset="teach" />}
    >
      <Reveal className="max-w-3xl">
        {/* Not "What we teach" — that is the h2 directly below it. */}
        <Eyebrow>Four focus areas</Eyebrow>
        <h2 className="mt-4">{teach.heading}</h2>
        <p className="mt-4 text-lg">{teach.intro}</p>
      </Reveal>

      <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2">
        {programmes.map((p) => {
          const Icon = p.icon;
          const a = accents[p.accent];
          return (
            <StaggerItem key={p.slug}>
              <HoverCard className="h-full">
                <article
                  className={`group flex h-full flex-col rounded-3xl p-7 ${a.card}`}
                >
                  <span
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 motion-reduce:transform-none ${a.iconWrap}`}
                  >
                    <Icon className={`h-7 w-7 ${a.icon}`} aria-hidden />
                  </span>

                  <h3 className="mt-5 text-xl">{p.title}</h3>
                  {/* Accent underline that grows on hover — each area's identity. */}
                  <span
                    className={`mt-3 block h-1 w-10 rounded-full transition-all duration-300 group-hover:w-16 motion-reduce:transition-none ${a.rule}`}
                    aria-hidden
                  />

                  <p className="mt-4 text-sm">{p.blurb}</p>

                  {/* Details as short chips — scannable keywords, not prose. */}
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.details.map((d) => (
                      <li
                        key={d}
                        className={`rounded-full px-3 py-1 text-xs font-medium ${a.chip}`}
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </article>
              </HoverCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
