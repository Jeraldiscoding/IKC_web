import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Doodle } from "@/components/decor/Doodle";
import { ScrollRail } from "@/components/ui/ScrollRail";
import { Reveal } from "@/components/motion/Reveal";
import { galleryItems } from "@/content/gallery";

export function GallerySection() {
  return (
    <Section
      glow="center"
      decor={
        <>
          <Doodle
            name="loop"
            className="absolute left-4 top-8 h-16 w-16 text-terracotta/45 sm:h-24 sm:w-24"
          />
          <Doodle
            name="rainbow"
            className="absolute right-8 top-16 hidden h-16 w-24 text-mustard/50 sm:block"
          />
        </>
      }
    >
      <Reveal className="max-w-3xl">
        <Eyebrow>Our space</Eyebrow>
        <h2 className="mt-4">A peek inside Inclusive Kids Club</h2>
        <p className="mt-4 text-lg">
          A warm, home-based space in Singapore where children learn through play,
          hands-on activities and gentle one-to-one support.
        </p>
      </Reveal>

      <ScrollRail label="Photo gallery" className="mt-10">
        {galleryItems.map((item) => (
          <figure
            key={item.src + item.aspect}
            className={`relative w-64 shrink-0 snap-start overflow-hidden rounded-2xl border border-cream-dark shadow-soft sm:w-80 ${item.aspect}`}
          >
            {item.kind === "photo" ? (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 16rem, 20rem"
                className="object-cover"
              />
            ) : (
              // Silent and decorative, so autoplay is safe here.
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={item.label}
              >
                <source src={item.src} type="video/mp4" />
              </video>
            )}
          </figure>
        ))}
      </ScrollRail>
    </Section>
  );
}
