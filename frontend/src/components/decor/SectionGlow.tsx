/**
 * Ambient background depth: large, heavily-blurred tinted circles bleeding in
 * from the edges of a section. Purely decorative — sits behind content, ignores
 * pointer events, hidden from assistive tech, and static (no motion) to stay
 * calm and cheap. The parent must be `relative` + `overflow-hidden` so the blur
 * is clipped to the section — `Section` handles that when `glow` is set.
 *
 * Several `variant` arrangements exist so neighbouring sections can differ and
 * the page never reads as one repeated pattern. Each entry is a full Tailwind
 * class string for one blurred blob (position + size + colour + blur).
 */
export type GlowVariant = "duo" | "warm" | "cool" | "left" | "right" | "center";

const variants: Record<GlowVariant, string[]> = {
  duo: [
    "-left-24 -top-16 h-72 w-72 bg-mustard-tint opacity-70 blur-3xl",
    "-bottom-20 -right-20 h-80 w-80 bg-sage-tint opacity-70 blur-3xl",
  ],
  warm: [
    "-left-20 -top-20 h-80 w-80 bg-mustard-tint opacity-70 blur-3xl",
    "right-1/4 -bottom-24 h-64 w-64 bg-terracotta-light/25 opacity-70 blur-3xl",
    "right-10 top-1/3 h-40 w-40 bg-mustard/20 opacity-60 blur-2xl",
  ],
  cool: [
    "-right-24 -top-16 h-80 w-80 bg-sage-tint opacity-75 blur-3xl",
    "-left-16 bottom-0 h-64 w-64 bg-mustard-tint opacity-60 blur-3xl",
    "left-1/3 top-10 h-40 w-40 bg-sage/20 opacity-60 blur-2xl",
  ],
  left: [
    "-left-28 top-0 h-96 w-96 bg-mustard-tint opacity-70 blur-3xl",
    "-left-10 -bottom-16 h-56 w-56 bg-sage-tint opacity-60 blur-3xl",
  ],
  right: [
    "-right-28 top-0 h-96 w-96 bg-sage-tint opacity-70 blur-3xl",
    "-right-10 -bottom-16 h-56 w-56 bg-mustard-tint opacity-60 blur-3xl",
  ],
  center: [
    "left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 bg-mustard-tint opacity-50 blur-3xl",
    "-left-16 -bottom-16 h-56 w-56 bg-sage-tint opacity-50 blur-3xl",
    "-right-16 -top-16 h-56 w-56 bg-terracotta-light/20 opacity-60 blur-3xl",
  ],
};

export function SectionGlow({ variant = "duo" }: { variant?: GlowVariant }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {variants[variant].map((cls, i) => (
        <div key={i} className={`absolute rounded-full ${cls}`} />
      ))}
    </div>
  );
}
