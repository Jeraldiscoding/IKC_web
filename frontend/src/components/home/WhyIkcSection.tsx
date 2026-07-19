import type { LucideIcon } from "lucide-react";
import { ShieldCheck, Sprout, Users, Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DoodleScatter } from "@/components/decor/DoodleScatter";
import { homeCopy } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

// Full class strings, never interpolated. Each value gets its own accent so the
// three pillars read as distinct, and the same colours light up the matching
// words in the heading — a visual through-line from belief to proof.
type ValueStyle = { Icon: LucideIcon; card: string; iconWrap: string; icon: string; title: string; word: string };
const valueStyles: ValueStyle[] = [
  { Icon: ShieldCheck, card: "bg-sage-tint", iconWrap: "bg-sage/30", icon: "text-sage-dark", title: "text-sage-dark", word: "text-sage-dark" },
  { Icon: Sprout, card: "bg-mustard-tint", iconWrap: "bg-mustard/30", icon: "text-mustard-dark", title: "text-mustard-dark", word: "text-mustard-dark" },
  { Icon: Users, card: "bg-terracotta-light/15", iconWrap: "bg-terracotta/15", icon: "text-terracotta", title: "text-terracotta", word: "text-terracotta" },
];

// Light up "safe", "capable" and "included" in the heading in their value
// colours. Splits on the whole words so punctuation stays intact; if the copy
// ever changes, unmatched text simply renders plain.
const wordColour: Record<string, string> = {
  safe: valueStyles[0].word,
  capable: valueStyles[1].word,
  included: valueStyles[2].word,
};
function EmphasisedHeading({ text }: { text: string }) {
  const parts = text.split(/(\bsafe\b|\bcapable\b|\bincluded\b)/gi);
  return (
    <>
      {parts.map((part, i) => {
        const colour = wordColour[part.toLowerCase()];
        return colour ? (
          <span key={i} className={`font-bold ${colour}`}>
            {part}
          </span>
        ) : (
          part
        );
      })}
    </>
  );
}

export function WhyIkcSection() {
  const { why } = homeCopy;
  // `duo`, not `warm` — DayAtIkc directly above already uses `warm`, and two
  // identical glow arrangements in a row is the repetition these variants exist
  // to prevent.
  return (
    <Section glow="duo" decor={<DoodleScatter preset="why" />}>
      <Reveal className="max-w-3xl">
        <Eyebrow>{why.eyebrow}</Eyebrow>
        <h2 className="mt-4">
          <EmphasisedHeading text={why.heading} />
        </h2>
        <p className="mt-4 text-lg">{why.intro}</p>
      </Reveal>

      {/* The promise, as three bold accent pillars — icon, oversized title in
          its own colour, matching the highlighted words above. Parallel
          qualities, not a sequence, so no numerals. */}
      <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-3">
        {why.values.map((v, i) => {
          const s = valueStyles[i % valueStyles.length];
          const Icon = s.Icon;
          return (
            <StaggerItem key={v.title}>
              <div
                className={`group flex h-full flex-col rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-1 motion-reduce:transform-none ${s.card}`}
              >
                <span
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 motion-reduce:transform-none ${s.iconWrap}`}
                >
                  <Icon className={`h-7 w-7 ${s.icon}`} aria-hidden />
                </span>
                <h3 className={`mt-6 font-heading text-3xl font-bold ${s.title}`}>{v.title}</h3>
                <p className="mt-3 text-base">{v.body}</p>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerGroup>

      {/* The concrete reasons, as supporting chips. */}
      <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2">
        {why.reasons.map((r) => (
          <StaggerItem key={r.title} className="flex gap-3 rounded-2xl bg-cream-dark/25 p-6">
            <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage/25">
              <Check className="h-4 w-4 text-sage-dark" aria-hidden />
            </span>
            <div>
              <h3 className="text-lg">{r.title}</h3>
              <p className="mt-1 text-base">{r.body}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
