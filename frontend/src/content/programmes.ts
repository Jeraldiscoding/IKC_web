import type { LucideIcon } from "lucide-react";
import { Sparkles, BookOpen, Hand, Sun } from "lucide-react";

export type Programme = {
  slug: string;
  title: string;
  blurb: string;
  icon: LucideIcon;
};

export const programmes: Programme[] = [
  {
    slug: "functional-skills",
    title: "Functional Skills",
    blurb:
      "Everyday life and self-help skills — communication, routines, and independence — taught patiently in a calm, small-group setting.",
    icon: Sparkles,
  },
  {
    slug: "academics",
    title: "Academics",
    blurb:
      "Literacy and numeracy support pitched to each child's pace, so learning feels achievable rather than overwhelming.",
    icon: BookOpen,
  },
  {
    slug: "hands-on-learning",
    title: "Hands-on Learning",
    blurb:
      "Sensory-rich, hands-on activities — from baking to play-based tasks — that build confidence, motor skills and joy in learning.",
    icon: Hand,
  },
  {
    slug: "holiday-programmes",
    title: "Holiday Programmes",
    blurb:
      "Themed school holiday programmes packed with baking, crafts and cooperative play, keeping routines warm and engaging when school is out.",
    icon: Sun,
  },
];
