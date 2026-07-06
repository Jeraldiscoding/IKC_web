import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { aboutCopy } from "@/content/about";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";

export function WhatMakesDifferent() {
  const { different } = aboutCopy;
  return (
    <Section className="bg-cream-dark/20">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2>{different.heading}</h2>
      </Reveal>
      <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2">
        {different.points.map((p) => (
          <StaggerItem key={p.title}>
            <HoverCard className="h-full">
              <Card className="h-full">
                <h3 className="text-xl text-terracotta">{p.title}</h3>
                <p className="mt-2 text-sm">{p.body}</p>
              </Card>
            </HoverCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
