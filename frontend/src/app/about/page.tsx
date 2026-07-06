import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/CtaBand";
import { FounderStory } from "@/components/about/FounderStory";
import { WhatMakesDifferent } from "@/components/about/WhatMakesDifferent";
import { CredentialsExplained } from "@/components/about/CredentialsExplained";
import { aboutCopy } from "@/content/about";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = pageMetadata({
  title: "About — Our DISE-Certified Special Needs Educator",
  description:
    "Meet the DISE-certified (NIE) special needs educator behind Inclusive Kids Club, a home-based enrichment centre in Singapore built on keeping every child safe, capable and included.",
  path: "/about",
});

export default function AboutPage() {
  const { intro, cta } = aboutCopy;
  return (
    <>
      <Section glow="center" className="text-center">
        <Reveal>
          <h1 className="mx-auto max-w-3xl">{intro.heading}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg">{intro.lede}</p>
        </Reveal>
      </Section>
      <FounderStory />
      <WhatMakesDifferent />
      <CredentialsExplained />
      <CtaBand
        heading={cta.heading}
        body={cta.body}
        ctaLabel={cta.ctaLabel}
        message={cta.message}
      />
    </>
  );
}
