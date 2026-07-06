/**
 * Ambient background depth for a section: two large, heavily-blurred tinted
 * circles bleeding in from opposite corners. Purely decorative — sits behind
 * content, ignores pointer events, hidden from assistive tech. Static (no
 * motion) to stay calm and cheap. The parent section must be `relative` and
 * `overflow-hidden` so the blur is clipped to the section (Section handles
 * this when `glow` is set).
 */
export function SectionGlow() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="absolute -left-24 -top-16 h-72 w-72 rounded-full bg-mustard-tint opacity-60 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-sage-tint opacity-60 blur-3xl" />
    </div>
  );
}
