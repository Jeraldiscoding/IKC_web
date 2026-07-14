import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { WaveDivider } from "@/components/decor/WaveDivider";
import { homeCopy } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export function DayAtIkcSection() {
  const { day } = homeCopy;
  return (
    <>
      {/* Organic curve into the sage band, instead of a hard horizontal edge.
          `text-*` sets the fill, which is the colour of the band below. */}
      <WaveDivider className="-mb-px text-sage/10" />
      <Section glow="warm" className="bg-sage/10">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Narrated intro video — has audio, so it never autoplays.
            The clip is portrait, so it needs a max-width or it fills the whole
            column and swamps the timeline beside it. */}
        <Reveal>
          <video
            className="mx-auto w-full max-w-sm rounded-3xl border border-cream-dark shadow-soft-lg"
            controls
            preload="metadata"
            playsInline
          >
            <source src="/media/IKC_ADay.mp4" type="video/mp4" />
            Your browser does not support embedded video. You can still reach us on
            WhatsApp to learn more about a day at Inclusive Kids Club.
          </video>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>Inside a session</Eyebrow>
            <h2 className="mt-4">{day.heading}</h2>
            <p className="mt-4 text-lg">{day.intro}</p>
          </Reveal>

          {/* Connected timeline: a vertical rule runs behind the numbered markers. */}
          <StaggerGroup as="ol" className="relative mt-10 space-y-6">
            <div className="absolute bottom-4 left-5 top-4 w-px bg-cream-dark" aria-hidden />
            {day.steps.map((step, i) => (
              <StaggerItem key={step.title} as="li" className="relative flex gap-5">
                <span className="relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream-dark bg-cream font-heading text-sm font-bold text-mustard-dark">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-1.5">
                  <h3 className="text-lg">{step.title}</h3>
                  <p className="mt-1 text-sm">{step.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
      </Section>
      {/* Flipped: the fill sits at the top, so the sage band curves back out into
          cream instead of ending on a hard horizontal edge. */}
      <WaveDivider flip className="-mt-px text-sage/10" />
    </>
  );
}
