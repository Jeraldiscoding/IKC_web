export type ExperienceEntry = {
  role: string;
  org: string;
  period: string;
  description?: string;
};

export type Educator = {
  slug: string;
  name: string;
  title: string;
  initials: string;
  /** Optional portrait path under /public. Falls back to `initials` if absent. */
  photo?: string;
  bio: string[];
  specialties: string[];
  /** Optional career history, shown as a timeline. */
  experience?: ExperienceEntry[];
};

export const educators: Educator[] = [
  {
    slug: "venetia-lim",
    name: "Venetia",
    title: "DISE-Certified Special Needs Educator (NIE)",
    initials: "VL",
    photo: "/media/teacher.png",
    bio: [
      "Venetia is a DISE-certified special needs educator, trained through Singapore's National Institute of Education (NIE).",
      "With a calm, structured and patient approach, she plans every small-group session around how each child learns best across functional skills, academics and hands-on activities.",
    ],
    specialties: [
      "Functional skills",
      "Academic support",
      "Hands-on & sensory learning",
      "Small-group facilitation",
    ],
    experience: [
      {
        role: "Founder & Lead Educator",
        org: "Inclusive Kids Club",
        period: "Now",
        description:
          "Founded Inclusive Kids Club to bring warm, small-group enrichment to children with special needs in a calm, home-based setting.",
      },
      {
        role: "Special Needs Educator",
        org: "SPED School",
        period: "7 years",
        description:
          "Taught and supported children with special needs at a Singapore special education (SPED) school for seven years.",
      },
    ],
  },
];
