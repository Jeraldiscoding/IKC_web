import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Doodle } from "@/components/decor/Doodle";
import { programmes, type ProgrammeAccent } from "@/content/programmes";
import { servicesCopy } from "@/content/services";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

// Full class strings, never interpolated — Tailwind must be able to see them.
const accents: Record<
  ProgrammeAccent,
  { ghost: string; icon: string; iconWrap: string; dot: string; rule: string; hover: string }
> = {
  terracotta: {
    ghost: "text-terracotta/20",
    icon: "text-terracotta",
    iconWrap: "bg-terracotta/10",
    dot: "bg-terracotta",
    rule: "bg-terracotta",
    hover: "hover:bg-terracotta/[0.05]",
  },
  mustard: {
    ghost: "text-mustard-dark/25",
    icon: "text-mustard-dark",
    iconWrap: "bg-mustard/20",
    dot: "bg-mustard-dark",
    rule: "bg-mustard-dark",
    hover: "hover:bg-mustard/[0.08]",
  },
  sage: {
    ghost: "text-sage-dark/25",
    icon: "text-sage-dark",
    iconWrap: "bg-sage/20",
    dot: "bg-sage-dark",
    rule: "bg-sage-dark",
    hover: "hover:bg-sage/[0.09]",
  },
  // Warm rather than neutral: a grey 04 beside three coloured siblings reads as
  // "disabled", not as a fourth equal option.
  cream: {
    ghost: "text-terracotta-light/40",
    icon: "text-terracotta-dark",
    iconWrap: "bg-terracotta-light/20",
    dot: "bg-terracotta-light",
    rule: "bg-terracotta-light",
    hover: "hover:bg-terracotta-light/[0.09]",
  },
};

/**
 * The four focus areas, as hairline-separated editorial rows rather than a grid
 * of cards. Four identical bordered boxes with four identical icon circles read
 * as filler; giving each area an oversized numeral in its own accent colour, an
 * accent underline, and a hover wash in that colour gives it presence instead.
 */
export function TeachSection() {
  const { teach } = servicesCopy;
  return (
    <Section
      glow="warm"
      className="pt-0"
      decor={
        <>
          <Doodle name="spark" className="absolute right-8 top-24 h-12 w-12 text-mustard/25" />
          <Doodle name="squiggle" className="absolute -left-4 bottom-16 h-16 w-40 text-sage/20" />
        </>
      }
    >
      <Reveal className="max-w-3xl">
        {/* Not "What we teach" — that is the h2 directly below it. */}
        <Eyebrow>Four focus areas</Eyebrow>
        <h2 className="mt-4">{teach.heading}</h2>
        <p className="mt-4 text-lg">{teach.intro}</p>
      </Reveal>

      <StaggerGroup className="mt-12 border-y border-cream-dark">
        {programmes.map((p, i) => {
          const Icon = p.icon;
          const a = accents[p.accent];
          return (
            <StaggerItem
              key={p.slug}
              as="article"
              className={`group grid gap-6 rounded-2xl px-4 py-10 transition-colors duration-300 motion-reduce:transition-none lg:grid-cols-[7rem_1fr_1fr] lg:gap-12 ${a.hover} ${i > 0 ? "border-t border-cream-dark" : ""}`}
            >
              {/* Index + icon: the colour identity for this area. */}
              <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-3">
                <span
                  className={`font-heading text-6xl font-bold leading-none ${a.ghost}`}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 motion-reduce:transform-none ${a.iconWrap}`}
                >
                  <Icon className={`h-6 w-6 ${a.icon}`} aria-hidden />
                </span>
              </div>

              <div>
                <h3 className="text-2xl">{p.title}</h3>
                {/* Accent underline: a short rule in the area's colour that grows
                    on hover, giving each area a distinct identity. */}
                <span
                  className={`mt-3 block h-1 w-10 rounded-full transition-all duration-300 group-hover:w-16 motion-reduce:transition-none ${a.rule}`}
                  aria-hidden
                />
                <p className="mt-4">{p.blurb}</p>
              </div>

              {/* Details as quiet dot-marked lines. A repeated check icon on every
                  bullet across four blocks is visual noise, not information. */}
              <ul className="space-y-3 lg:pt-1">
                {p.details.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm text-ink-muted">
                    <span
                      className={`mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full ${a.dot}`}
                      aria-hidden
                    />
                    <span>{d}</span>
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
