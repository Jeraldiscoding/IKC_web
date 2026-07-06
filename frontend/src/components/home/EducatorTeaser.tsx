import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { homeCopy } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";

export function EducatorTeaser() {
  const { educator } = homeCopy;
  return (
    <Section glow="left">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="flex justify-center">
          <div className="relative aspect-[4/5] w-64 max-w-full overflow-hidden rounded-3xl border border-cream-dark shadow-soft-lg">
            <Image
              src="/media/teacher.png"
              alt="Venetia Lim, the DISE-certified (NIE) special needs educator at Inclusive Kids Club"
              fill
              sizes="256px"
              className="object-cover"
            />
          </div>
        </div>
        <Reveal>
          <h2>{educator.heading}</h2>
          <p className="mt-4">{educator.body}</p>
          <div className="mt-6">
            <Button href="/about" variant="secondary">
              {educator.ctaLabel} <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
