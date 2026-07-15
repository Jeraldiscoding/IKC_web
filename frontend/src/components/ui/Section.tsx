import type { ReactNode } from "react";
import { SectionGlow, type GlowVariant } from "@/components/decor/SectionGlow";

export function Section({
  children,
  className = "",
  id,
  glow = false,
  decor,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  /**
   * Renders ambient blurred tint blobs behind the content for depth.
   * `true` uses the default arrangement; pass a variant name to vary it.
   */
  glow?: boolean | GlowVariant;
  /**
   * Full-bleed decorative layer (e.g. childlike Doodles) that sits above the
   * glow but behind the content, clipped to the section. Non-interactive.
   */
  decor?: ReactNode;
}) {
  const clip = glow || decor;
  return (
    <section
      id={id}
      className={`relative px-5 py-16 sm:py-20 ${clip ? "overflow-hidden" : ""} ${className}`}
    >
      {glow ? <SectionGlow variant={glow === true ? "duo" : glow} /> : null}
      {decor ? (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {decor}
        </div>
      ) : null}
      {/* `relative` lifts content above the decorative layers. */}
      <div className="relative mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
