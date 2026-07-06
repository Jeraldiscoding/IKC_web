import type { ReactNode } from "react";
import { SectionGlow } from "@/components/decor/SectionGlow";

export function Section({
  children,
  className = "",
  id,
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Renders ambient blurred tint blobs behind the content for depth. */
  glow?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative px-5 py-16 sm:py-20 ${glow ? "overflow-hidden" : ""} ${className}`}
    >
      {glow ? <SectionGlow /> : null}
      {/* `relative` lifts content above the decorative glow layer. */}
      <div className="relative mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
