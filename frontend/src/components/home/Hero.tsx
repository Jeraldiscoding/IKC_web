import Image from "next/image";
import { MessageCircle, ArrowRight, Award } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { waLink } from "@/lib/site-config";
import { homeCopy } from "@/content/home";
import { Blob } from "@/components/illustrations/Blob";
import { Reveal } from "@/components/motion/Reveal";
import { DriftingBlob } from "@/components/motion/DriftingBlob";

export function Hero() {
  const { hero } = homeCopy;
  return (
    <section className="relative overflow-hidden px-5 pb-10 pt-20 sm:pt-28">
      {/* Ambient drifting shapes */}
      <DriftingBlob
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 text-mustard/30"
        duration={11}
      >
        <Blob className="h-full w-full" />
      </DriftingBlob>
      <DriftingBlob
        className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 text-sage/30"
        duration={13}
        distance={18}
      >
        <Blob className="h-full w-full" />
      </DriftingBlob>
      <DriftingBlob
        className="pointer-events-none absolute right-10 top-24 h-6 w-6 rounded-full bg-terracotta/30"
        duration={9}
        distance={12}
      />
      <DriftingBlob
        className="pointer-events-none absolute left-12 bottom-24 h-4 w-4 rounded-full bg-mustard/40"
        duration={8}
        distance={10}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal>
          <h1 className="mx-auto max-w-3xl">{hero.h1}</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-muted">{hero.lede}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href={waLink("Hi IKC, I'd like to find out more about your classes.")}>
              <MessageCircle className="h-4 w-4" aria-hidden /> {hero.primaryCtaLabel}
            </Button>
            <Button href="/services" variant="ghost">
              {hero.secondaryCtaLabel} <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </Reveal>

        {/* Real class photo — faces not shown, keeping children's privacy. */}
        <Reveal delay={0.3}>
          <div className="relative mx-auto mt-14 max-w-3xl">
            <Image
              src="/media/IKC_Photo1.jpeg"
              alt="Children exploring colour together in a small-group finger-painting activity at Inclusive Kids Club"
              width={1600}
              height={1097}
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="h-auto w-full rounded-3xl border border-cream-dark object-cover shadow-soft-lg"
            />
            {/* Overlapping depth badge */}
            <div className="absolute -bottom-5 left-4 flex items-center gap-2 rounded-full border border-cream-dark bg-white/95 px-4 py-2 shadow-soft backdrop-blur sm:left-8">
              <Award className="h-5 w-5 text-terracotta" aria-hidden />
              <span className="font-heading text-sm font-semibold text-ink">
                DISE-Certified (NIE)
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
