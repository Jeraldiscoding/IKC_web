import { MessageCircle, ArrowRight, Award } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CalendlyPopupButton } from "@/components/CalendlyPopupButton";
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
            <h1>{hero.h1}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-lg lg:mx-0">{hero.lede}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
              {/* Booking is the primary action, above the fold — parents no
                  longer have to scroll to the closing CTA to reach it. */}
              <CalendlyPopupButton
                text="Book a consultation"
                className="bg-terracotta text-cream hover:bg-terracotta-dark shadow-soft"
              />
              <Button
                href={waLink("Hi IKC, I'd like to find out more about your classes.")}
                variant="outline"
              >
                <MessageCircle className="h-4 w-4" aria-hidden /> {hero.primaryCtaLabel}
              </Button>
              <Button href="/services" variant="ghost">
                {hero.secondaryCtaLabel} <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Media: the silent looping class clip, with a soft tinted plate behind it
            for depth. (A layered photo was tried here and only peeked out as a thin
            strip — it read as a rendering glitch, not as depth.) */}
        <Reveal delay={0.15}>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              className="absolute -right-5 -top-5 h-full w-full rounded-3xl bg-mustard-tint"
              aria-hidden
            />

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
