"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function StaggerGroup({
  children,
  className,
  stagger = 0.12,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: keyof HTMLElementTagNameMap;
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: keyof HTMLElementTagNameMap;
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag className={className} variants={itemVariants}>
      {children}
    </MotionTag>
  );
}
