"use client";

import { useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Horizontal snap-scrolling strip. Native overflow scrolling does the work, so
 * touch drag and keyboard arrows come free; the buttons are a desktop nicety.
 */
export function ScrollRail({
  children,
  label,
  className = "",
}: {
  children: ReactNode;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const nudge = (direction: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    // Optional call: jsdom (and very old browsers) have no scrollBy.
    el.scrollBy?.({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className={`relative ${className}`}>
      <div
        ref={ref}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      {/* Edge fades hint that there is more to scroll. */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-cream to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-cream to-transparent"
        aria-hidden
      />

      <div className="mt-4 hidden justify-end gap-2 md:flex">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label={`Scroll ${label} left`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream-dark bg-white text-ink shadow-soft transition-transform hover:scale-105 active:scale-95 motion-reduce:transition-none"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label={`Scroll ${label} right`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream-dark bg-white text-ink shadow-soft transition-transform hover:scale-105 active:scale-95 motion-reduce:transition-none"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
