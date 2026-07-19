import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/CtaBand";
import { TeachSection } from "@/components/services/TeachSection";
import { ProgrammesSection } from "@/components/services/ProgrammesSection";
import { ScheduleSection } from "@/components/services/ScheduleSection";
import { HowToJoinSection } from "@/components/services/HowToJoinSection";
import { servicesCopy } from "@/content/services";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = pageMetadata({
  title: "Services — Enrichment Classes, Workshops & Holiday Programmes",
  description:
    "Small-group enrichment classes, workshops and school holiday programmes for children with special needs in Singapore — functional skills, academics and hands-on sensory learning.",
  path: "/services",
});

export default function ServicesPage() {
  const { intro, cta } = servicesCopy;
  return (
    <>
      <Section glow="center" className="text-center">
        <Reveal>
          <h1 className="mx-auto max-w-3xl">{intro.heading}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg">{intro.lede}</p>
        </Reveal>
      </Section>

      {/* What we teach → real programmes & pricing → how to start. */}
      <TeachSection />
      <ProgrammesSection />
      <ScheduleSection />
      <HowToJoinSection />

      <CtaBand
        heading={cta.heading}
        body={cta.body}
        ctaLabel={cta.ctaLabel}
        message={cta.message}
      />
    </>
  );
}
