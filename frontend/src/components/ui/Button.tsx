import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "inverse" | "outline" | "outlineInverse";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-heading font-semibold px-6 py-3 text-base transition-colors active:scale-[0.98]";
const variants: Record<Variant, string> = {
  primary: "bg-terracotta text-cream hover:bg-terracotta-dark shadow-soft",
  secondary: "bg-sage text-cream hover:bg-sage-dark",
  ghost: "bg-transparent text-terracotta hover:bg-cream-dark",
  // Outline pair: a quiet second choice beside a filled primary. `outline` on
  // light backgrounds, `outlineInverse` on the terracotta CTA band.
  outline: "bg-transparent border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-cream",
  outlineInverse: "bg-transparent border-2 border-cream/70 text-cream hover:bg-cream/15",
  // For use on a terracotta background (CtaBand). This MUST be a variant rather
  // than colour utilities passed through `className`: Tailwind resolves competing
  // utilities by CSS source order, not by the order they appear in the class
  // attribute, so `className="bg-cream"` does not reliably beat the variant's
  // `bg-terracotta`. Overriding that way previously produced terracotta text on a
  // terracotta background — an invisible button.
  inverse: "bg-cream text-terracotta hover:bg-cream-dark shadow-soft",
};

type Props = {
  href?: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"a"> & ComponentProps<"button">, "ref">;

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  ...rest
}: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (href) {
    const internal = href.startsWith("/");
    if (internal) {
      return (
        <Link href={href} className={cls} {...(rest as ComponentProps<"a">)}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={cls}
        target="_blank"
        rel="noopener noreferrer"
        {...(rest as ComponentProps<"a">)}
      >
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...(rest as ComponentProps<"button">)}>
      {children}
    </button>
  );
}
