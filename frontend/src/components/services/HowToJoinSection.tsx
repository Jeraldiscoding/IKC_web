import { MessageCircle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DoodleScatter } from "@/components/decor/DoodleScatter";
import { Button } from "@/components/ui/Button";
import { servicesCopy } from "@/content/services";
import { waLink } from "@/lib/site-config";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

/**
 * A connected stepper, not four floating cards. Getting started is a *sequence*,
 * and four equal boxes actively hide that — the connecting rule is the whole point.
 */
export function HowToJoinSection() {
  const { howToJoin } = servicesCopy;
  return (
    <Section
      glow="left"
      className="bg-cream-dark/20"
      decor={<DoodleScatter preset="howToJoin" />}
    >
      <Reveal className="max-w-3xl">
        <Eyebrow>Getting started</Eyebrow>
        <h2 className="mt-4">{howToJoin.heading}</h2>
        <p className="mt-4 text-lg">
          Four steps, and the first one is just a message. No forms, no commitment.
        </p>
      </Reveal>

      <div className="relative mt-14">
        {/* The rule that makes it a sequence. Sits behind the numbered nodes and
            spans only the middle of the row so it never runs past the end nodes. */}
        <div
          className="absolute left-6 right-6 top-6 hidden h-px bg-cream-dark md:block"
          aria-hidden
        />

        <StaggerGroup as="ol" className="relative grid gap-10 md:grid-cols-4 md:gap-6">
          {howToJoin.steps.map((step, i) => (
            <StaggerItem key={step.title} as="li" className="flex gap-5 md:block">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cream-dark bg-cream font-heading text-base font-bold text-terracotta shadow-soft">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="md:mt-6 md:pr-4">
                <h3 className="text-lg">{step.title}</h3>
                <p className="mt-1.5 text-sm">{step.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      <Reveal className="mt-12">
        <Button href={waLink("Hi IKC, I'd like to find out how to get started.")}>
          <MessageCircle className="h-4 w-4" aria-hidden /> Start with a message
        </Button>
      </Reveal>
    </Section>
  );
}
