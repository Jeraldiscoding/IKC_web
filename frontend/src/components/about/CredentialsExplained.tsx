import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { aboutCopy } from "@/content/about";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

// One accent per credential, in item order. Full class strings.
const accents = [
  { card: "bg-terracotta-light/10", rule: "bg-terracotta", text: "text-terracotta" },
  { card: "bg-mustard-tint", rule: "bg-mustard-dark", text: "text-mustard-dark" },
  { card: "bg-sage-tint", rule: "bg-sage-dark", text: "text-sage-dark" },
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

      {/* A glossary that decodes dense jargon: each acronym leads with its full
          term over an accent underline, then a plain-language payoff line. */}
      <StaggerGroup as="dl" className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
        {credentials.items.map((item, i) => {
          const a = accents[i % accents.length];
          return (
            <StaggerItem
              key={item.term}
              className={`group flex h-full flex-col rounded-3xl p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none ${a.card}`}
            >
              <dt className="font-heading text-xl font-semibold text-ink">{item.term}</dt>
              <span
                className={`mt-3 block h-1 w-10 rounded-full transition-all duration-300 group-hover:w-16 motion-reduce:transition-none ${a.rule}`}
                aria-hidden
              />
              <dd className="mt-4 flex flex-1 flex-col text-sm text-ink-muted">
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
