import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema, webSiteSchema } from "@/lib/home-schema";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { BeliefSection } from "@/components/home/BeliefSection";
import { ProgrammesSection } from "@/components/home/ProgrammesSection";
import { EducatorTeaser } from "@/components/home/EducatorTeaser";
import { DayAtIkcSection } from "@/components/home/DayAtIkcSection";
import { GallerySection } from "@/components/home/GallerySection";
import { TrustReasonsSection } from "@/components/home/TrustReasonsSection";
import { FaqPreview } from "@/components/home/FaqPreview";
import { GuidesTeaser } from "@/components/home/GuidesTeaser";
import { ClosingCta } from "@/components/home/ClosingCta";

export const metadata: Metadata = pageMetadata({
  title: "Special Needs Enrichment Classes in Singapore",
  description:
    "Inclusive Kids Club is a home-based enrichment centre in Singapore offering small-group classes, workshops and school holiday programmes for children with special needs, led by a DISE-certified (NIE) SPED educator.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={webSiteSchema()} />
      <JsonLd data={faqPageSchema()} />
      <Hero />
      <TrustBar />
      <BeliefSection />
      <ProgrammesSection />
      <EducatorTeaser />
      <DayAtIkcSection />
      <GallerySection />
      <TrustReasonsSection />
      <FaqPreview />
      <GuidesTeaser />
      <ClosingCta />
    </>
  );
}
