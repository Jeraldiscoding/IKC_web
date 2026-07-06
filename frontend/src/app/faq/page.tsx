import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/lib/home-schema";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/CtaBand";
import { faqs } from "@/content/faqs";

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

      <Section className="text-center">
        <h1 className="mx-auto max-w-3xl">Frequently Asked Questions</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg">
          Common questions about our small-group special needs enrichment classes,
          holiday programmes and how to get started with Inclusive Kids Club in Singapore.
        </p>
      </Section>

      <Section className="pt-0">
        <dl className="mx-auto max-w-3xl space-y-4">
          {faqs.map((f) => (
            <div key={f.question} className="rounded-2xl border border-cream-dark bg-white p-6">
              <dt className="font-heading text-lg font-semibold text-ink">{f.question}</dt>
              <dd className="mt-2 text-sm text-ink-muted">{f.answer}</dd>
            </div>
          ))}
        </dl>
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
