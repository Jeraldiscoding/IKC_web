import { GraduationCap } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { aboutCopy } from "@/content/about";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export function CredentialsExplained() {
  const { credentials } = aboutCopy;
  return (
    <Section>
      <Reveal className="mx-auto max-w-3xl text-center">
        <GraduationCap className="mx-auto h-12 w-12 text-sage-dark" aria-hidden />
        <h2 className="mt-4">{credentials.heading}</h2>
        <p className="mt-4">{credentials.intro}</p>
      </Reveal>
      <StaggerGroup as="dl" className="mx-auto mt-10 max-w-3xl space-y-4">
        {credentials.items.map((item) => (
          <StaggerItem
            key={item.term}
            className="rounded-2xl border border-cream-dark bg-white p-6"
          >
            <dt className="font-heading text-lg font-semibold text-ink">{item.term}</dt>
            <dd className="mt-2 text-sm text-ink-muted">{item.body}</dd>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
