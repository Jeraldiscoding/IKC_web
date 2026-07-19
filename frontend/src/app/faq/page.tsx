import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/lib/home-schema";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/CtaBand";
import { faqs } from "@/content/faqs";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = pageMetadata({
  title: "FAQ — Special Needs Enrichment in Singapore",
  description:
    "Answers to common questions about Inclusive Kids Club's small-group special needs enrichment classes, holiday programmes, class sizes, and how to enrol in Singapore.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      {/* Reuses the same FAQPage structured data as the Home preview so Google
          can surface these questions as rich results. */}
      <JsonLd data={faqPageSchema()} />

      <Section glow="center" className="text-center">
        <Reveal>
          <h1 className="mx-auto max-w-3xl">Frequently Asked Questions</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg">
            Common questions about our small-group special needs enrichment classes,
            holiday programmes and how to get started with Inclusive Kids Club in Singapore.
          </p>
        </Reveal>
      </Section>

      {/* Native <details>/<summary> accordion: each question is a clickable bar
          that drops down to its answer — with keyboard support and screen-reader
          semantics for free. The first opens by default so the page never reads
          as a wall of closed bars. */}
      <Section glow="warm" className="pt-0">
        <StaggerGroup className="mx-auto max-w-3xl space-y-3">
          {faqs.map((f, i) => (
            <StaggerItem key={f.question}>
              <details
                open={i === 0}
                className="group rounded-2xl border border-cream-dark bg-white px-6 [&[open]]:pb-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-heading text-lg font-semibold text-ink marker:content-none">
                  {f.question}
                  <Plus
                    className="h-5 w-5 shrink-0 text-terracotta transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                    aria-hidden
                  />
                </summary>
                <p className="text-sm text-ink-muted">{f.answer}</p>
              </details>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <CtaBand
        heading="Still have a question?"
        body="If your question isn't answered here, just ask — we're happy to help you figure out if Inclusive Kids Club is right for your child."
        ctaLabel="Ask us on WhatsApp"
        message="Hi IKC, I have a question that isn't on your FAQ page."
      />
    </>
  );
}
