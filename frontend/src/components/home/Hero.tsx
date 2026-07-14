import Image from "next/image";
import { MessageCircle, ArrowRight, Award } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { waLink } from "@/lib/site-config";
import { homeCopy } from "@/content/home";
import { Blob } from "@/components/illustrations/Blob";
import { Reveal } from "@/components/motion/Reveal";
import { DriftingBlob } from "@/components/motion/DriftingBlob";

export function Hero() {
  const { hero } = homeCopy;
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-14 sm:pt-20">
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
        className="pointer-events-none absolute left-12 bottom-24 h-4 w-4 rounded-full bg-mustard/40"
        duration={8}
        distance={10}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <Reveal>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4">{hero.h1}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-lg lg:mx-0">{hero.lede}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Button href={waLink("Hi IKC, I'd like to find out more about your classes.")}>
                <MessageCircle className="h-4 w-4" aria-hidden /> {hero.primaryCtaLabel}
              </Button>
              <Button href="/services" variant="ghost">
                {hero.secondaryCtaLabel} <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Media: silent looping class clip in front, still photo layered behind for depth. */}
        <Reveal delay={0.15}>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            {/* Decorative only — the same photo carries a descriptive alt in the gallery,
                so announcing it twice would just be noise for a screen-reader user. */}
            <div className="absolute -right-4 -top-6 hidden w-2/3 rotate-3 sm:block">
              <Image
                src="/media/IKC_Photo1.jpeg"
                alt=""
                width={1600}
                height={1097}
                priority
                sizes="(max-width: 1024px) 40vw, 300px"
                aria-hidden
                className="h-auto w-full rounded-2xl border border-cream-dark object-cover opacity-90 shadow-soft"
              />
            </div>

            <video
              className="relative aspect-[4/5] w-full rounded-3xl border border-cream-dark object-cover shadow-soft-lg"
              poster="/media/hero-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="A child playing an interactive learning game on the big screen at Inclusive Kids Club"
            >
              <source src="/media/IKC_Vid2.mp4" type="video/mp4" />
            </video>

            <div className="absolute -bottom-5 left-4 flex items-center gap-2 rounded-full border border-cream-dark bg-white/95 px-4 py-2 shadow-soft backdrop-blur">
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
