"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

/** Soft lift + subtle scale on hover/tap. Gentle spring, no bounce overshoot. */
export function HoverCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 300, damping: 34 }}
    >
      {children}
    </motion.div>
  );
}
