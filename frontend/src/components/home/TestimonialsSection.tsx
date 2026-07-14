import { Quote } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ScrollRail } from "@/components/ui/ScrollRail";
import { homeCopy } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Built and styled, but NOT rendered on the home page — the quotes are
 * placeholders. Uncomment <TestimonialsSection /> in app/page.tsx only once
 * homeCopy.testimonials holds real parent words.
 */
export function TestimonialsSection() {
  const { testimonials } = homeCopy;
  return (
    <Section glow="cool">
      <Reveal className="max-w-3xl">
        <Eyebrow>{testimonials.eyebrow}</Eyebrow>
        <h2 className="mt-4">{testimonials.heading}</h2>
      </Reveal>

      <ScrollRail label="Parent testimonials" className="mt-10">
        {testimonials.items.map((t, i) => (
          <blockquote
            key={i}
            className="flex w-80 shrink-0 snap-start flex-col rounded-3xl border border-cream-dark bg-white p-7 shadow-soft sm:w-96"
          >
            <Quote className="h-8 w-8 text-terracotta/30" aria-hidden />
            <p className="mt-4 flex-1 text-ink">{t.quote}</p>
            <footer className="mt-5 font-heading text-sm font-semibold text-ink-muted">
              {t.attribution}
            </footer>
          </blockquote>
        ))}
      </ScrollRail>
    </Section>
  );
}
