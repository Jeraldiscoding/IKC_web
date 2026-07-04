import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-heading font-semibold px-6 py-3 text-base transition-transform active:scale-[0.98]";
const variants: Record<Variant, string> = {
  primary: "bg-terracotta text-cream hover:bg-terracotta-dark shadow-soft",
  secondary: "bg-sage text-cream hover:bg-sage-dark",
  ghost: "bg-transparent text-terracotta hover:bg-cream-dark",
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
