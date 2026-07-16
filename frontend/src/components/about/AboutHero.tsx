import Image from "next/image";
import { Award, Users, Home } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Badge } from "@/components/ui/Badge";
import { Rings } from "@/components/decor/Rings";
import { aboutCopy } from "@/content/about";
import { Reveal } from "@/components/motion/Reveal";

export function AboutHero() {
  const { intro, founder } = aboutCopy;
  return (
    <Section
      glow="left"
      decor={
        <Rings className="absolute -right-16 -top-16 h-72 w-72 text-mustard/25 sm:h-96 sm:w-96" />
      }
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow>{intro.eyebrow}</Eyebrow>
            {/* The one h1 on the page — asserted by the about-page test. */}
            <h1 className="mt-4">{intro.heading}</h1>
            <p className="mt-5 max-w-xl text-lg">{intro.lede}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Badge icon={Award}>DISE-Certified (NIE)</Badge>
              <Badge icon={Users}>Small groups</Badge>
              <Badge icon={Home}>Home-based</Badge>
            </div>
          </Reveal>
        </div>

        {/* Layered photo: a tinted plate offset behind the portrait for depth,
            with a floating name badge over the corner. */}
        <Reveal delay={0.15}>
          <div className="relative mx-auto w-full max-w-sm">
            <div
              className="absolute -left-5 -top-5 h-full w-full rounded-3xl bg-sage-tint"
              aria-hidden
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-cream-dark shadow-soft-lg">
              <Image
                src="/media/teacher.png"
                alt={`${founder.name}, founder and lead educator of Inclusive Kids Club`}
                fill
                sizes="(max-width: 1024px) 90vw, 384px"
                priority
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 left-4 rounded-2xl border border-cream-dark bg-white/95 px-4 py-2 shadow-soft backdrop-blur">
              <p className="font-heading text-sm font-bold text-ink">{founder.name}</p>
              <p className="text-xs text-ink-muted">{founder.role}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
