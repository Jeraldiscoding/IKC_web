export type Educator = {
  slug: string;
  name: string;
  title: string;
  initials: string;
  bio: string[];
  specialties: string[];
};

export const educators: Educator[] = [
  {
    slug: "lead-educator",
    // TODO: replace with the educator's real name once confirmed.
    name: "Our Lead Educator",
    title: "DISE-Certified Special Needs Educator (NIE)",
    initials: "IKC",
    bio: [
      "Inclusive Kids Club is led by a DISE-certified special needs educator, trained through Singapore's National Institute of Education (NIE).",
      "With a calm, structured and patient approach, our educator plans every small-group session around how each child learns best — across functional skills, academics and hands-on activities.",
    ],
    specialties: [
      "Functional skills",
      "Academic support",
      "Hands-on & sensory learning",
      "Small-group facilitation",
    ],
  },
];
