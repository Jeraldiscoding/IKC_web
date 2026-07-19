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
import { ClosingCta } from "@/components/home/ClosingCta";

// Lead with the brand AND what it is — a parent who has never heard of
// "Inclusive Kids Club" still learns it's a special needs enrichment centre.
// `absolute` bypasses the "%s · IKC" template so the brand isn't repeated.
const homeTitle =
  "Inclusive Kids Club — Special Needs Enrichment Centre in Singapore";
export const metadata: Metadata = {
  ...pageMetadata({
    title: homeTitle,
    description:
      "Inclusive Kids Club is a home-based enrichment centre in Singapore offering small-group classes, workshops and school holiday programmes for children with special needs, led by a DISE-certified (NIE) SPED educator.",
    path: "/",
  }),
  title: { absolute: homeTitle },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={webSiteSchema()} />
      <JsonLd data={faqPageSchema()} />
      <JsonLd data={courseSchema()} />
      {videoSchemas().map((v, i) => (
        <JsonLd key={i} data={v} />
      ))}
      {/* The home page is a lean highlight reel that answers a parent's first
          questions and routes them to the deeper pages — it deliberately does NOT
          reproduce whole pages. Order follows the questions they ask, in order:
            1. Is this for my child?           Hero
            2. Are you qualified?              TrustBar
            3. What happens to my child?       DayAtIkc  (show before explain)
            4. What does the place look like?  Gallery   (warm space, then belief)
            5. Why does that work?             WhyIkc
            6. What do you offer?              Programmes
            7. Who will teach my child?        EducatorTeaser
            8. How do I start?                 ClosingCta
          Detail lives on its own page: full schedule/formats on /services, the
          FAQ on /faq, guides on /resources — all reachable from the nav and the CTAs.
          The FAQ JSON-LD below stays for SEO even though the visual FAQ moved. */}
      <Hero />
      <TrustBar />
      <DayAtIkcSection />
      <GallerySection />
      <WhyIkcSection />
      <ProgrammesSection />
      <EducatorTeaser />
      <ClosingCta />
    </>
  );
}
