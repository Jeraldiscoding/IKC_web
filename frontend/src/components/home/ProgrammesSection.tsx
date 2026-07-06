import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { programmes } from "@/content/programmes";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";

export function ProgrammesSection() {
  return (
    <Section glow="cool" className="bg-cream-dark/20">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2>Small-group enrichment, built around your child</h2>
        <p className="mt-4">
          Weekly classes, workshops and holiday programmes across four areas —
          each taught in calm, small groups for children with special needs.
        </p>
      </Reveal>
      <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {programmes.map((p, i) => {
          const Icon = p.icon;
          const featured = i === 0;
          return (
            <StaggerItem
              key={p.slug}
              className={featured ? "lg:col-span-2 lg:row-span-2" : ""}
            >
              <HoverCard className="h-full">
                <Card
                  className={`flex h-full flex-col ${featured ? "bg-mustard-tint lg:justify-center" : ""}`}
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/10 transition-transform hover:scale-110 motion-reduce:transition-none">
                    <Icon className="h-6 w-6 text-terracotta" aria-hidden />
                  </span>
                  <h3 className={`mt-4 ${featured ? "text-2xl" : "text-xl"}`}>{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm">{p.blurb}</p>
                  <Link
                    href="/services"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-terracotta hover:text-terracotta-dark"
                  >
                    Learn more <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Card>
              </HoverCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
