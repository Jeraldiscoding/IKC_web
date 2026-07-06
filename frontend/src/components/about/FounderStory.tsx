import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { aboutCopy } from "@/content/about";
import { Reveal } from "@/components/motion/Reveal";

export function FounderStory() {
  const { story } = aboutCopy;
  return (
    <Section>
      <Reveal className="grid items-center gap-10 md:grid-cols-2">
        <div className="flex justify-center">
          <div className="relative aspect-[4/5] w-64 max-w-full overflow-hidden rounded-3xl border border-cream-dark shadow-soft-lg">
            <Image
              src="/media/teacher.png"
              alt="Venetia Lim, founder and lead educator of Inclusive Kids Club"
              fill
              sizes="256px"
              className="object-cover"
            />
          </div>
        </div>
        <div>
          <h2>{story.heading}</h2>
          {story.paragraphs.map((para, i) => (
            <p key={i} className="mt-4">
              {para}
            </p>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
