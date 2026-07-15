import { Doodle } from "@/components/decor/Doodle";

/**
 * Per-section doodle arrangements. Each preset is a deliberately different
 * cluster — different motifs, colours, positions and density — so the sections
 * stop feeling like one stamped template. Stars, squiggles and confetti carry
 * most of the playfulness; each preset mixes at least two motif families.
 *
 * `sm:block` hides the edge pieces on mobile, where there is no room to scatter.
 */
export type ScatterPreset =
  | "why"
  | "programmes"
  | "day"
  | "gallery"
  | "schedule"
  | "teach"
  | "formats"
  | "howToJoin"
  | "faq";

export function DoodleScatter({ preset }: { preset: ScatterPreset }) {
  switch (preset) {
    case "why":
      return (
        <>
          <Doodle name="spark" className="absolute right-8 top-8 h-16 w-16 text-mustard/60 sm:h-24 sm:w-24" />
          <Doodle name="squiggle" className="absolute -left-6 bottom-16 hidden h-14 w-52 text-sage/45 sm:block" />
          <Doodle name="star" className="absolute right-1/4 bottom-10 hidden h-10 w-10 text-terracotta/40 lg:block" />
          <Doodle name="dots" className="absolute left-10 top-14 hidden h-10 w-10 text-terracotta/50 sm:block" />
        </>
      );
    case "programmes":
      return (
        <>
          <Doodle name="star" className="absolute right-10 top-8 h-14 w-14 text-terracotta/45 sm:h-20 sm:w-20" />
          <Doodle name="squiggle" className="absolute left-6 top-10 hidden h-12 w-44 text-mustard/45 sm:block" />
          <Doodle name="dots" className="absolute right-1/3 bottom-12 hidden h-10 w-10 text-sage-dark/45 lg:block" />
        </>
      );
    case "day":
      return (
        <>
          <Doodle name="star" className="absolute right-8 top-10 h-14 w-14 text-terracotta/45 sm:h-16 sm:w-16" />
          <Doodle name="burst" className="absolute left-8 bottom-16 hidden h-12 w-12 text-mustard/55 sm:block" />
          <Doodle name="dots" className="absolute right-1/4 top-24 hidden h-9 w-9 text-sage-dark/40 lg:block" />
        </>
      );
    case "gallery":
      return (
        <>
          <Doodle name="loop" className="absolute left-4 top-8 h-16 w-16 text-terracotta/45 sm:h-24 sm:w-24" />
          <Doodle name="rainbow" className="absolute right-8 top-14 hidden h-16 w-24 text-mustard/50 sm:block" />
          <Doodle name="star" className="absolute right-1/3 bottom-24 hidden h-11 w-11 text-sage-dark/45 lg:block" />
          <Doodle name="dots" className="absolute left-1/4 top-6 hidden h-10 w-10 text-mustard/55 lg:block" />
        </>
      );
    case "schedule":
      return (
        <>
          <Doodle name="star" className="absolute right-8 top-10 h-14 w-14 text-mustard/55 sm:h-20 sm:w-20" />
          <Doodle name="wave" className="absolute -left-4 bottom-12 hidden h-10 w-48 text-sage/45 sm:block" />
          <Doodle name="dots" className="absolute right-1/4 bottom-16 hidden h-9 w-9 text-terracotta/45 lg:block" />
        </>
      );
    case "teach":
      return (
        <>
          <Doodle name="spark" className="absolute right-8 top-16 h-16 w-16 text-mustard/55 sm:h-20 sm:w-20" />
          <Doodle name="squiggle" className="absolute -left-6 top-1/3 hidden h-14 w-52 text-sage/40 sm:block" />
          <Doodle name="star" className="absolute right-12 bottom-24 hidden h-12 w-12 text-terracotta/40 lg:block" />
          <Doodle name="dots" className="absolute left-1/4 bottom-10 hidden h-10 w-10 text-mustard/50 lg:block" />
        </>
      );
    case "formats":
      return (
        <>
          <Doodle name="rainbow" className="absolute right-6 top-8 hidden h-16 w-28 text-sage/50 sm:block" />
          <Doodle name="star" className="absolute left-8 top-10 h-12 w-12 text-mustard/55 sm:h-16 sm:w-16" />
          <Doodle name="dots" className="absolute right-1/3 bottom-8 hidden h-10 w-10 text-terracotta/45 lg:block" />
        </>
      );
    case "howToJoin":
      return (
        <>
          <Doodle name="path" className="absolute right-6 top-8 hidden h-18 w-44 text-terracotta/45 sm:block" />
          <Doodle name="star" className="absolute left-8 bottom-14 h-12 w-12 text-mustard/55 sm:h-16 sm:w-16" />
          <Doodle name="squiggle" className="absolute right-1/4 bottom-10 hidden h-10 w-40 text-sage/40 lg:block" />
        </>
      );
    case "faq":
      return (
        <>
          <Doodle name="squiggle" className="absolute left-8 top-10 hidden h-12 w-44 text-mustard/45 sm:block" />
          <Doodle name="star" className="absolute right-10 top-12 h-12 w-12 text-terracotta/45 sm:h-16 sm:w-16" />
          <Doodle name="dots" className="absolute right-1/4 bottom-10 hidden h-10 w-10 text-sage-dark/45 lg:block" />
        </>
      );
  }
}
