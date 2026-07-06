import type { ReactNode } from "react";
import { SectionGlow, type GlowVariant } from "@/components/decor/SectionGlow";

export function Section({
  children,
  className = "",
  id,
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  /**
   * Renders ambient blurred tint blobs behind the content for depth.
   * `true` uses the default arrangement; pass a variant name to vary it.
   */
  glow?: boolean | GlowVariant;
}) {
  return (
    <section
      id={id}
      className={`relative px-5 py-16 sm:py-20 ${glow ? "overflow-hidden" : ""} ${className}`}
    >
      {glow ? <SectionGlow variant={glow === true ? "duo" : glow} /> : null}
      {/* `relative` lifts content above the decorative glow layer. */}
      <div className="relative mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
