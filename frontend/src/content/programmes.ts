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
      "Everyday life and self-help skills — communication, routines, and independence — taught patiently in a calm, small-group setting.",
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
      "Literacy and numeracy support pitched to each child's pace, so learning feels achievable rather than overwhelming.",
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
      "Sensory-rich, hands-on activities — from baking to play-based tasks — that build confidence, motor skills and joy in learning.",
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
      "Themed school holiday programmes packed with baking, crafts and cooperative play, keeping routines warm and engaging when school is out.",
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
