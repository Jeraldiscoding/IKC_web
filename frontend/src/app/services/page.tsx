import type { Metadata } from "next";
import { Check } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { CtaBand } from "@/components/CtaBand";
import { programmes } from "@/content/programmes";
import { servicesCopy } from "@/content/services";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";

export const metadata: Metadata = pageMetadata({
  title: "Services — Enrichment Classes, Workshops & Holiday Programmes",
  description:
    "Small-group enrichment classes, workshops and school holiday programmes for children with special needs in Singapore — functional skills, academics and hands-on sensory learning.",
  path: "/services",
});

export default function ServicesPage() {
  const { intro, teach, formats, howToJoin, cta } = servicesCopy;
  return (
    <>
      <Section className="text-center">
        <Reveal>
          <h1 className="mx-auto max-w-3xl">{intro.heading}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg">{intro.lede}</p>
        </Reveal>
      </Section>

      {/* What we teach — 4 focus areas with detail */}
      <Section className="pt-0">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2>{teach.heading}</h2>
          <p className="mt-4">{teach.intro}</p>
        </Reveal>
        <StaggerGroup className="mt-12 grid gap-6 lg:grid-cols-2">
          {programmes.map((p) => {
            const Icon = p.icon;
            return (
              <StaggerItem key={p.slug}>
                <HoverCard className="h-full">
                  <Card className="flex h-full flex-col">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/10">
                        <Icon className="h-6 w-6 text-terracotta" aria-hidden />
                      </span>
                      <h3 className="text-xl">{p.title}</h3>
                    </div>
                    <p className="mt-3 text-sm">{p.blurb}</p>
                    <ul className="mt-4 space-y-2">
                      {p.details.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-sm text-ink-muted">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-dark" aria-hidden />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </HoverCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Section>

      {/* Ways to learn — formats */}
      <Section className="bg-cream-dark/20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2>{formats.heading}</h2>
          <p className="mt-4">{formats.intro}</p>
        </Reveal>
        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-3">
          {formats.items.map((f) => {
            const Icon = f.icon;
            return (
              <StaggerItem key={f.title}>
                <HoverCard className="h-full">
                  <Card className="h-full text-center">
                    <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-sage/20">
                      <Icon className="h-6 w-6 text-sage-dark" aria-hidden />
                    </span>
                    <h3 className="mt-4 text-lg">{f.title}</h3>
                    <p className="mt-2 text-sm">{f.body}</p>
                  </Card>
                </HoverCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Section>

      {/* How to get started — steps */}
      <Section>
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2>{howToJoin.heading}</h2>
        </Reveal>
        <StaggerGroup as="ol" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howToJoin.steps.map((step, i) => (
            <StaggerItem key={step.title} as="li">
              <HoverCard className="h-full">
                <div className="h-full rounded-2xl bg-white p-6 shadow-soft">
                  <span className="font-heading text-2xl font-bold text-mustard-dark">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-lg">{step.title}</h3>
                  <p className="mt-1 text-sm">{step.body}</p>
                </div>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <CtaBand
        heading={cta.heading}
        body={cta.body}
        ctaLabel={cta.ctaLabel}
        message={cta.message}
      />
    </>
  );
}
