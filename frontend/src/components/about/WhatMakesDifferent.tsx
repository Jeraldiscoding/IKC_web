import { GraduationCap, Users, Home, HeartHandshake, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { aboutCopy } from "@/content/about";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";

// One icon + accent per point, in point order. Full class strings, never
// interpolated, so Tailwind can see them.
const accents: { icon: LucideIcon; tile: string; iconWrap: string; icon_: string }[] = [
  { icon: GraduationCap, tile: "bg-terracotta-light/15", iconWrap: "bg-terracotta/15", icon_: "text-terracotta" },
  { icon: Users, tile: "bg-mustard-tint", iconWrap: "bg-mustard/25", icon_: "text-mustard-dark" },
  { icon: Home, tile: "bg-sage-tint", iconWrap: "bg-sage/25", icon_: "text-sage-dark" },
  { icon: HeartHandshake, tile: "bg-terracotta-light/15", iconWrap: "bg-terracotta/15", icon_: "text-terracotta" },
];

export function WhatMakesDifferent() {
  const { different } = aboutCopy;
  return (
    <Section glow="cool" className="bg-cream-dark/20">
      <Reveal className="max-w-3xl">
        <Eyebrow>Why families choose us</Eyebrow>
        <h2 className="mt-4">{different.heading}</h2>
      </Reveal>
      <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2">
        {different.points.map((p, i) => {
          const a = accents[i % accents.length];
          const Icon = a.icon;
          return (
            <StaggerItem key={p.title}>
              <HoverCard className="h-full">
                <div className={`flex h-full flex-col rounded-3xl p-7 ${a.tile}`}>
                  <span
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${a.iconWrap}`}
                  >
                    <Icon className={`h-7 w-7 ${a.icon_}`} aria-hidden />
                  </span>
                  <h3 className="mt-5 text-xl">{p.title}</h3>
                  <p className="mt-2 text-base text-ink-muted">{p.body}</p>
                </div>
              </HoverCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
