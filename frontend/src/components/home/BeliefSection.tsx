import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { homeCopy } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";

export function BeliefSection() {
  const { belief } = homeCopy;
  return (
    <Section glow>
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2>{belief.heading}</h2>
        <p className="mt-4">{belief.intro}</p>
      </Reveal>
      <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-3">
        {belief.values.map((v) => (
          <StaggerItem key={v.title}>
            <HoverCard className="h-full">
              <Card className="h-full text-center">
                <h3 className="text-terracotta">{v.title}</h3>
                <p className="mt-3">{v.body}</p>
              </Card>
            </HoverCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
