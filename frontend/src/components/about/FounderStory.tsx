import { Section } from "@/components/ui/Section";
import { Blob } from "@/components/illustrations/Blob";
import { aboutCopy } from "@/content/about";

export function FounderStory() {
  const { story } = aboutCopy;
  return (
    <Section>
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="relative flex justify-center">
          <Blob className="h-64 w-64 text-mustard/25" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-heading text-5xl font-bold text-mustard-dark/70">
              Play &amp; Grow
            </span>
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
      </div>
    </Section>
  );
}
