import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function Badge({
  children,
  icon: Icon,
  className = "",
}: {
  children: ReactNode;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-cream-dark px-4 py-2 text-sm font-semibold text-ink ${className}`}
    >
      {Icon ? <Icon className="h-4 w-4 text-terracotta" aria-hidden /> : null}
      {children}
    </span>
  );
}
