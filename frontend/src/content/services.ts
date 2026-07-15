import type { LucideIcon } from "lucide-react";
import { CalendarDays, Palette, Sun } from "lucide-react";

export type ServiceFormat = {
  title: string;
  body: string;
  icon: LucideIcon;
};

export const servicesCopy = {
  intro: {
    heading: "Enrichment classes, workshops & holiday programmes",
    lede: "Calm, small-group learning across functional skills, academics and hands-on play — led by a DISE-certified (NIE) special needs educator, in the format that suits your child.",
  },
  teach: {
    heading: "What we teach",
    intro:
      "Four areas that work together — chosen and paced around what your child needs most.",
  },
  formats: {
    heading: "Ways to learn with us",
    intro: "Choose the rhythm that fits your family.",
    items: [
      {
        title: "Weekly Enrichment Classes",
        body: "Regular small-group sessions that build skills steadily over time, with the consistency and routine many children thrive on.",
        icon: CalendarDays,
      },
      {
        title: "Workshops",
        body: "Focused, themed sessions on a specific skill or activity — a great way to try Inclusive Kids Club or target a particular area.",
        icon: Palette,
      },
      {
        title: "School Holiday Programmes",
        body: "Themed holiday sessions packed with baking, crafts and cooperative play, keeping learning warm and engaging when school is out.",
        icon: Sun,
      },
    ] as ServiceFormat[],
  },
  howToJoin: {
    heading: "How to get started",
    steps: [
      { title: "Say hello", body: "Message us on WhatsApp — no forms, no pressure." },
      { title: "Tell us about your child", body: "Share a little about your child's needs, age and interests." },
      { title: "Find the right fit", body: "We'll honestly recommend a suitable class, workshop or programme." },
      { title: "Start learning", body: "Your child joins a calm, small group and begins to play and grow." },
    ],
  },
  cta: {
    heading: "Not sure which option is right?",
    body: "Tell us about your child and we'll help you choose the class, workshop or holiday programme that fits best.",
    ctaLabel: "Ask us on WhatsApp",
    message: "Hi IKC, I'd like help choosing the right service for my child.",
  },
} as const;
