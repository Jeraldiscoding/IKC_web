import type { ReactNode } from "react";

/** Small tracked label that sits above a section heading. */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block font-heading text-xs font-bold uppercase tracking-[0.18em] text-terracotta ${className}`}
    >
      {children}
    </span>
  );
}
