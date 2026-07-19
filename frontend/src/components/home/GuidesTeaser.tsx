import { ArrowRight, FileText } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { homeCopy } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";

export function GuidesTeaser() {
  const { guides } = homeCopy;
  return (
    <Section glow="warm">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2>{guides.heading}</h2>
        <p className="mt-4">{guides.intro}</p>
      </Reveal>
      <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-3">
        {guides.topics.map((topic) => (
          <StaggerItem key={topic}>
            <HoverCard className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-cream-dark bg-white p-6">
                <FileText className="h-6 w-6 text-mustard-dark" aria-hidden />
                <p className="mt-3 font-heading font-semibold text-ink">{topic}</p>
                <p className="mt-2 text-xs uppercase tracking-wide text-ink-muted">Coming soon</p>
              </div>
            </HoverCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
      <div className="mt-8 text-center">
        <Button href="/resources" variant="ghost">
          Visit our resources <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
    </Section>
  );
}
