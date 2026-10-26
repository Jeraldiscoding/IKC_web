import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/CtaBand";
import { WaveDivider } from "@/components/decor/WaveDivider";
import { AboutHero } from "@/components/about/AboutHero";
import { FounderStory } from "@/components/about/FounderStory";
import { WhatMakesDifferent } from "@/components/about/WhatMakesDifferent";
import { CredentialsExplained } from "@/components/about/CredentialsExplained";
import { aboutCopy } from "@/content/about";

export const metadata: Metadata = pageMetadata({
  title: "About: Our DISE Certified Educator",
  description:
    "Meet the DISE certified (NIE) educator behind Inclusive Kids Club, a home based enrichment centre in Singapore supporting children with learning differences to feel safe, capable and included.",
  path: "/about",
});

export default function AboutPage() {
  const { cta } = aboutCopy;
  return (
    <>
      <AboutHero />
      <FounderStory />
      {/* Curve into the tinted "different" band, then back out — gives the page
          rhythm instead of hard horizontal section edges. */}
      <WaveDivider className="-mb-px text-cream-dark/20" />
      <WhatMakesDifferent />
      <WaveDivider flip className="-mt-px text-cream-dark/20" />
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
