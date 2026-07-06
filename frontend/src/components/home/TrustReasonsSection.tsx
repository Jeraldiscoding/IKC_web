import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { homeCopy } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";

export function TrustReasonsSection() {
  const { trustReasons } = homeCopy;
  return (
    <Section glow="cool">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2>{trustReasons.heading}</h2>
      </Reveal>
      <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-6">
        {trustReasons.reasons.map((r, i) => {
          const wide = i === 0 || i === 3;
          const accent = i % 2 === 1;
          return (
            <StaggerItem
              key={r.title}
              className={wide ? "sm:col-span-4" : "sm:col-span-2"}
            >
              <HoverCard className="h-full">
                <div
                  className={`flex h-full gap-4 rounded-2xl border border-cream-dark p-6 ${accent ? "bg-sage-tint" : "bg-white"}`}
                >
                  <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage/20">
                    <Check className="h-5 w-5 text-sage-dark" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-lg">{r.title}</h3>
                    <p className="mt-1 text-sm">{r.body}</p>
                  </div>
                </div>
              </HoverCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
