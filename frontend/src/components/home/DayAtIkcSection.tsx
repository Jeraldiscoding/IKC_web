import { Section } from "@/components/ui/Section";
import { homeCopy } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";

export function DayAtIkcSection() {
  const { day } = homeCopy;
  return (
    <Section className="bg-sage/10">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2>{day.heading}</h2>
        <p className="mt-4">{day.intro}</p>
      </Reveal>

      <div className="mt-12 grid items-center gap-10 md:grid-cols-2">
        {/* Intro video — has narration, so it plays with controls (not autoplay). */}
        <div className="flex justify-center">
          <video
            className="w-full max-w-xs rounded-3xl border border-cream-dark shadow-soft-lg"
            controls
            preload="metadata"
            playsInline
          >
            <source src="/media/IKC_ADay.mp4" type="video/mp4" />
            Your browser does not support embedded video. You can still reach us on
            WhatsApp to learn more about a day at Inclusive Kids Club.
          </video>
        </div>

        {/* The four steps of a session */}
        <StaggerGroup as="ol" className="space-y-4">
          {day.steps.map((step, i) => (
            <StaggerItem key={step.title} as="li">
              <HoverCard className="h-full">
                <div className="flex gap-4 rounded-2xl bg-white p-5 shadow-soft">
                  <span className="font-heading text-2xl font-bold text-mustard-dark">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg">{step.title}</h3>
                    <p className="mt-1 text-sm">{step.body}</p>
                  </div>
                </div>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </Section>
  );
}
