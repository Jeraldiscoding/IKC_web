import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DoodleScatter } from "@/components/decor/DoodleScatter";
import { homeCopy } from "@/content/home";
import { faqs } from "@/content/faqs";
import { Reveal } from "@/components/motion/Reveal";

export function FaqPreview() {
  const { faqPreview } = homeCopy;
  const preview = faqs.slice(0, 4);
  return (
    <Section glow="right" className="bg-cream-dark/20" decor={<DoodleScatter preset="faq" />}>
      <Reveal className="mx-auto max-w-3xl text-center">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="mt-4">{faqPreview.heading}</h2>
        <p className="mt-4 text-lg">{faqPreview.intro}</p>
      </Reveal>

      {/* Native <details>/<summary>: keyboard support, screen-reader semantics and
          open/close state for free. A hand-rolled accordion would be strictly worse. */}
      <div className="mx-auto mt-10 max-w-3xl space-y-3">
        {preview.map((f, i) => (
          <details
            key={f.question}
            // Open the first by default so the section never reads as a wall of
            // closed bars — the visitor sees an answer without clicking.
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
            <p className="text-sm">{f.answer}</p>
          </details>
        ))}
      </div>

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
