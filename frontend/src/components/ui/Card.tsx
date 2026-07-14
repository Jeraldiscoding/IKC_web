import type { ReactNode } from "react";

export type CardVariant = "elevated" | "tinted" | "outlined";

// `elevated` reproduces the pre-redesign Card exactly, so it stays the default
// and every existing call site keeps its current look.
const variants: Record<CardVariant, string> = {
  elevated: "border border-cream-dark bg-white shadow-soft",
  tinted: "border border-transparent bg-mustard-tint",
  outlined: "border-2 border-cream-dark bg-transparent",
};

export function Card({
  children,
  className = "",
  variant = "elevated",
}: {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
}) {
  return (
    <div className={`rounded-2xl p-6 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
