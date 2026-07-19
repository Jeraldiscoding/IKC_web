import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { aboutCopy } from "@/content/about";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

// Big monogram + accent per credential, in item order. Full class strings.
const accents = [
  { letter: "D", card: "bg-terracotta-light/10", badge: "bg-terracotta text-cream", rule: "bg-terracotta", text: "text-terracotta" },
  { letter: "N", card: "bg-mustard-tint", badge: "bg-mustard-dark text-cream", rule: "bg-mustard-dark", text: "text-mustard-dark" },
  { letter: "S", card: "bg-sage-tint", badge: "bg-sage-dark text-cream", rule: "bg-sage-dark", text: "text-sage-dark" },
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
              className={`group flex h-full flex-col rounded-3xl p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none ${a.card}`}
            >
              <span
                className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl font-heading text-2xl font-bold transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 motion-reduce:transform-none ${a.badge}`}
                aria-hidden
              >
                {a.letter}
              </span>
              <span
                className={`mt-5 block h-1 w-10 rounded-full transition-all duration-300 group-hover:w-16 motion-reduce:transition-none ${a.rule}`}
                aria-hidden
              />
              <dt className="mt-4 font-heading text-lg font-semibold text-ink">{item.term}</dt>
              <dd className="mt-2 flex flex-1 flex-col text-sm text-ink-muted">
                <span>{item.body}</span>
                {/* The payoff line — what the jargon means for the reader's
                    child. Pinned to the card bottom so it aligns across cards. */}
                <span className="mt-auto flex items-start gap-2 border-t border-ink/10 pt-4 font-semibold text-ink">
                  <svg
                    viewBox="0 0 20 20"
                    className={`mt-0.5 h-4 w-4 shrink-0 ${a.text}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M4 10h11M11 5l5 5-5 5" />
                  </svg>
                  {item.takeaway}
                </span>
              </dd>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
