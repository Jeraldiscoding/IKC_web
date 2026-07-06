import Image from "next/image";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { waLink } from "@/lib/site-config";
import { homeCopy } from "@/content/home";
import { Blob } from "@/components/illustrations/Blob";

export function Hero() {
  const { hero } = homeCopy;
  return (
    <section className="relative overflow-hidden px-5 pb-8 pt-20 sm:pt-28">
      <Blob className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 text-mustard/30" />
      <Blob className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 text-sage/30" />
      <div className="relative mx-auto max-w-4xl text-center">
        <h1 className="mx-auto max-w-3xl">{hero.h1}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-muted">{hero.lede}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href={waLink("Hi IKC, I'd like to find out more about your classes.")}>
            <MessageCircle className="h-4 w-4" aria-hidden /> {hero.primaryCtaLabel}
          </Button>
          <Button href="/services" variant="ghost">
            {hero.secondaryCtaLabel} <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>

        {/* Real class photo — faces not shown, keeping children's privacy. */}
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
        </div>
      </div>
    </section>
  );
}
