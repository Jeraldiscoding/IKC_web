import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { aboutCopy } from "@/content/about";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

// Big monogram + accent per credential, in item order. Full class strings.
const accents = [
  { letter: "D", badge: "bg-terracotta text-cream", rule: "bg-terracotta" },
  { letter: "N", badge: "bg-mustard-dark text-cream", rule: "bg-mustard-dark" },
  { letter: "S", badge: "bg-sage-dark text-cream", rule: "bg-sage-dark" },
];

export function CredentialsExplained() {
  const { credentials } = aboutCopy;
  return (
    <Section glow="right">
      <Reveal className="mx-auto max-w-3xl text-center">
        <Eyebrow>In plain language</Eyebrow>
        <h2 className="mt-4">{credentials.heading}</h2>
        <p className="mt-4 text-lg">{credentials.intro}</p>
      </Reveal>

      {/* A glossary: each acronym gets an oversized monogram tile — a clear,
          typographic design device that turns dense jargon into something scannable. */}
      <StaggerGroup as="dl" className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
        {credentials.items.map((item, i) => {
          const a = accents[i % accents.length];
          return (
            <StaggerItem
              key={item.term}
              className="flex h-full flex-col rounded-3xl border border-cream-dark bg-white p-7 shadow-soft"
            >
              <span
                className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl font-heading text-2xl font-bold ${a.badge}`}
                aria-hidden
              >
                {a.letter}
              </span>
              <span className={`mt-5 block h-1 w-10 rounded-full ${a.rule}`} aria-hidden />
              <dt className="mt-4 font-heading text-lg font-semibold text-ink">{item.term}</dt>
              <dd className="mt-2 text-base text-ink-muted">{item.body}</dd>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
