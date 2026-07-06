"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/** Fade + gentle rise into view, once. */
export function Reveal({ children, delay = 0, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
