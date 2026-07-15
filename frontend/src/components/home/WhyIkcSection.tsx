import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DoodleScatter } from "@/components/decor/DoodleScatter";
import { homeCopy } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export function WhyIkcSection() {
  const { why } = homeCopy;
  // `duo`, not `warm` — DayAtIkc directly above already uses `warm`, and two
  // identical glow arrangements in a row is the repetition these variants exist
  // to prevent.
  return (
    <Section
      glow="duo"
      decor={<DoodleScatter preset="why" />}
    >
      <Reveal className="max-w-3xl">
        <Eyebrow>{why.eyebrow}</Eyebrow>
        <h2 className="mt-4">{why.heading}</h2>
        <p className="mt-4 text-lg">{why.intro}</p>
      </Reveal>

      {/* The promise, as three asymmetric editorial blocks with oversized numerals.
          `gap-px` over a `bg-cream-dark` parent lets the parent show through as
          hairline dividers — no extra border elements needed. */}
      <StaggerGroup className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-cream-dark bg-cream-dark sm:grid-cols-3">
        {why.values.map((v, i) => (
          <StaggerItem key={v.title} className="bg-cream p-8">
            <span className="font-heading text-6xl font-bold text-terracotta/25" aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-2xl text-terracotta">{v.title}</h3>
            <p className="mt-2 text-base">{v.body}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* The concrete reasons, as supporting chips. */}
      <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2">
        {why.reasons.map((r) => (
          <StaggerItem key={r.title} className="flex gap-3 rounded-2xl bg-sage-tint/60 p-6">
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
