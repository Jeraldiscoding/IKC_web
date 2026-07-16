import { Quote } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { aboutCopy } from "@/content/about";
import { Reveal } from "@/components/motion/Reveal";

export function FounderStory() {
  const { story } = aboutCopy;
  // Split the prose so the pull-quote can sit between the first paragraph and
  // the rest, the way an editorial feature breaks up a long read.
  const [first, ...rest] = story.paragraphs;
  return (
    <Section glow="warm">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Eyebrow>Our story</Eyebrow>
          <h2 className="mt-4">{story.heading}</h2>
          <p className="mt-6 text-lg">{first}</p>
        </Reveal>

        {/* Pull-quote: an oversized mark and a terracotta rule make the single
            most important line the visual anchor of the section. */}
        <Reveal>
          <figure className="my-10 border-l-4 border-terracotta pl-6">
            <Quote className="h-8 w-8 text-terracotta/40" aria-hidden />
            <blockquote className="mt-3 font-heading text-2xl leading-snug text-ink sm:text-3xl">
              {story.pullQuote}
            </blockquote>
          </figure>
        </Reveal>

        <Reveal>
          {rest.map((para, i) => (
            <p key={i} className="mt-4 text-lg">
              {para}
            </p>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
