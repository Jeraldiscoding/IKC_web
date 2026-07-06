import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { homeCopy } from "@/content/home";
import { faqs } from "@/content/faqs";
import { Reveal } from "@/components/motion/Reveal";

export function FaqPreview() {
  const { faqPreview } = homeCopy;
  const preview = faqs.slice(0, 4);
  return (
    <Section glow="right" className="bg-cream-dark/20">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2>{faqPreview.heading}</h2>
        <p className="mt-4">{faqPreview.intro}</p>
      </Reveal>
      <dl className="mx-auto mt-10 max-w-3xl space-y-4">
        {preview.map((f) => (
          <div key={f.question} className="rounded-2xl border border-cream-dark bg-white p-6">
            <dt className="font-heading text-lg font-semibold text-ink">{f.question}</dt>
            <dd className="mt-2 text-sm text-ink-muted">{f.answer}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-8 text-center">
        <Link
          href="/faq"
          className="inline-flex items-center gap-1 font-semibold text-terracotta hover:text-terracotta-dark"
        >
          See all FAQs <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </Section>
  );
}
