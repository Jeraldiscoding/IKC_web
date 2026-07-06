"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

/**
 * Wraps decorative children (a Blob SVG, a dot/ring) in a slow, subtle,
 * infinite float + rotate loop. Purely ambient — never wrap content.
 */
export function DriftingBlob({
  children,
  className,
  duration = 10,
  distance = 14,
}: {
  children?: ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
}) {
  return (
    <motion.div
      className={className}
      aria-hidden
      animate={{ y: [0, -distance, 0], rotate: [0, 4, 0] }}
      transition={{ duration, ease: "easeInOut", repeat: Infinity }}
    >
      {children}
    </motion.div>
  );
}
