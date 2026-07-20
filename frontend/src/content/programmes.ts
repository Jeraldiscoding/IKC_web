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
      "Everyday life skills: Communication, routines and independence, all taught patiently in small groups.",
    icon: Sparkles,
    accent: "terracotta",
    details: [
      "Communication",
      "Daily-living routines",
      "Following instructions",
      "Emotional regulation",
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
      "Early literacy",
      "Everyday numeracy",
      "Attention & focus",
      "School-style confidence",
    ],
  },
  {
    slug: "hands-on-learning",
    title: "Hands-on Learning",
    blurb:
      "Sensory activities like playdough, crafts and cooperative games that build motor skills, social skills and confidence.",
    icon: Hand,
    accent: "sage",
    details: [
      "Crafts",
      "Motor skills",
      "Sensory play",
      "Turn-taking",
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
      "Holiday themes",
      "Arts & projects",
      "Small-group play",
      "Steady routines",
    ],
  },
];
