import type { LucideIcon } from "lucide-react";
import { Sparkles, BookOpen, Hand, Sun } from "lucide-react";

export type ProgrammeAccent = "terracotta" | "mustard" | "sage" | "cream";

export type Programme = {
  slug: string;
  title: string;
  blurb: string;
  icon: LucideIcon;
  accent: ProgrammeAccent;
  details: string[];
};

export const programmes: Programme[] = [
  {
    slug: "functional-skills",
    title: "Functional Skills",
    blurb:
      "Everyday life skills — communication, routines and independence — taught patiently in small groups.",
    icon: Sparkles,
    accent: "terracotta",
    details: [
      "Communication and social interaction",
      "Daily-living and self-help routines",
      "Following instructions and building independence",
      "Emotional regulation and coping strategies",
    ],
  },
  {
    slug: "academics",
    title: "Academics",
    blurb:
      "Literacy and numeracy, paced to each child so learning feels achievable, not overwhelming.",
    icon: BookOpen,
    accent: "mustard",
    details: [
      "Early literacy and reading readiness",
      "Numeracy and everyday maths",
      "Attention, focus and task completion",
      "Confidence with school-style learning",
    ],
  },
  {
    slug: "hands-on-learning",
    title: "Hands-on Learning",
    blurb:
      "Sensory, hands-on activities — from baking to play — that build motor skills and confidence.",
    icon: Hand,
    accent: "sage",
    details: [
      "Baking, crafts and creative play",
      "Fine and gross motor-skill building",
      "Sensory exploration in a safe setting",
      "Turn-taking and cooperative play",
    ],
  },
  {
    slug: "holiday-programmes",
    title: "Holiday Programmes",
    blurb:
      "Themed holiday sessions of baking, crafts and play that keep routines going when school's out.",
    icon: Sun,
    accent: "cream",
    details: [
      "Themed activities across the school holidays",
      "Baking, arts and hands-on projects",
      "Social play with familiar small groups",
      "Keeps routines steady when school is out",
    ],
  },
];
