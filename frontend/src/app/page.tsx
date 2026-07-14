import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema, webSiteSchema } from "@/lib/home-schema";
import { courseSchema } from "@/lib/course-schema";
import { videoSchemas } from "@/lib/video-schema";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { WhyIkcSection } from "@/components/home/WhyIkcSection";
import { ProgrammesSection } from "@/components/home/ProgrammesSection";
import { EducatorTeaser } from "@/components/home/EducatorTeaser";
import { DayAtIkcSection } from "@/components/home/DayAtIkcSection";
import { GallerySection } from "@/components/home/GallerySection";
import { ScheduleSection } from "@/components/home/ScheduleSection";
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
      <JsonLd data={courseSchema()} />
      {videoSchemas().map((v, i) => (
        <JsonLd key={i} data={v} />
      ))}
      {/* Section order follows the questions a parent actually asks, in order:
          1. Is this for my child?        Hero
          2. Are you qualified?           TrustBar
          3. What happens to my child?    DayAtIkc  — the biggest anxiety, so it comes early
          4. Why does that work?          WhyIkc
          5. What exactly do you offer?   Programmes
          6. Who will be with my child?   EducatorTeaser
          7. What does the place look like? Gallery
          8. Does the timing suit us?     Schedule
          9. Anything still worrying me?  Faq
         Show before explain: the concrete session walkthrough lands harder than
         the argument for it, so it precedes the argument. */}
      <Hero />
      <TrustBar />
      <DayAtIkcSection />
      <WhyIkcSection />
      <ProgrammesSection />
      <EducatorTeaser />
      <GallerySection />
      <ScheduleSection />
      <FaqPreview />
      {/* Testimonials are built but withheld until real parent quotes exist.
          To enable: import { TestimonialsSection } from "@/components/home/TestimonialsSection";
          fill in homeCopy.testimonials with real words, then render <TestimonialsSection /> here. */}
      <GuidesTeaser />
      <ClosingCta />
    </>
  );
}
