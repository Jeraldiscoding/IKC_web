import { Clock, MessageCircle, Users } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { homeCopy } from "@/content/home";
import { waLink } from "@/lib/site-config";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";

export function ScheduleSection() {
  const { schedule } = homeCopy;
  return (
    <Section glow="left">
      <Reveal className="max-w-3xl">
        <Eyebrow>{schedule.eyebrow}</Eyebrow>
        <h2 className="mt-4">{schedule.heading}</h2>
        <p className="mt-4 text-lg">{schedule.intro}</p>
      </Reveal>

      <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-3">
        {schedule.groups.map((g) => (
          <StaggerItem key={g.ages}>
            <HoverCard className="h-full">
              <Card className="h-full">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sage/20">
                  <Users className="h-5 w-5 text-sage-dark" aria-hidden />
                </span>
                <h3 className="mt-4 text-xl">{g.ages}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 shrink-0 text-mustard-dark" aria-hidden />
                  {g.times}
                </p>
              </Card>
            </HoverCard>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm italic">{schedule.note}</p>
        <Button href={waLink("Hi IKC, which class slot would suit my child?")}>
          <MessageCircle className="h-4 w-4" aria-hidden /> {schedule.ctaLabel}
        </Button>
      </Reveal>
    </Section>
  );
}
