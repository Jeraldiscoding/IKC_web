import Image from "next/image";
import { Section } from "@/components/ui/Section";

export function GallerySection() {
  return (
    <Section glow="center">
      <div className="mx-auto max-w-3xl text-center">
        <h2>A peek inside Inclusive Kids Club</h2>
        <p className="mt-4">
          A warm, home-based space in Singapore where children learn through play,
          hands-on activities and gentle one-to-one support.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {/* Home-based play space */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-cream-dark shadow-soft">
          <Image
            src="/media/IKC_Photo2.jpeg"
            alt="A child playing on a numbers-and-roads floor mat in the warm, home-based Inclusive Kids Club learning room"
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
        
        {/* Short looping clip — silent, decorative, so it autoplays. */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-cream-dark shadow-soft">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="A child playing an interactive learning game on the big screen at Inclusive Kids Club"
          >
            <source src="/media/IKC_Vid2.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Interactive academics */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-cream-dark shadow-soft">
          <Image
            src="/media/IKC_Photo3.png"
            alt="A child working through an addition activity on a large interactive touchscreen at Inclusive Kids Club"
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      </div>
    </Section>
  );
}
