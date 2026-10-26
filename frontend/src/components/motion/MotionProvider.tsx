"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

/**
 * App-wide motion settings. `reducedMotion="user"` makes every Motion
 * animation honour the OS "reduce motion" setting automatically — a hard
 * accessibility requirement for our audience.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
