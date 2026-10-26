export type ExperienceEntry = {
  role: string;
  org: string;
  period: string;
  description?: string;
  /** Bullet points under the role. Kept to the few that matter to a parent. */
  highlights?: string[];
};

export type EducationEntry = {
  qualification: string;
  institution: string;
  period: string;
  /** Optional specialisation line, e.g. a concentration or track. */
  detail?: string;
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
  /** Optional formal qualifications, newest first. Also feeds Person JSON-LD. */
  education?: EducationEntry[];
};

export const educators: Educator[] = [
  {
    slug: "venetia-lim",
    name: "Venetia",
    title: "DISE Certified Educator (NIE)",
    initials: "VL",
    photo: "/media/teacher.png",
    bio: [
      "Venetia is a DISE certified educator, trained through Singapore's National Institute of Education (NIE), with experience supporting children with learning differences.",
      "With a calm, structured and patient approach, she plans every small group session around how each child learns best across functional skills, academics and hands on activities.",
    ],
    specialties: [
      "Functional skills",
      "Academic support",
      "Hands on & sensory learning",
      "Small group facilitation",
    ],
    experience: [
      {
        role: "Founder & Lead Educator",
        org: "Inclusive Kids Club",
        period: "Present",
        description:
          "Founded Inclusive Kids Club to bring warm, small group enrichment to children with learning differences in a calm, home based setting.",
      },
      {
        role: "Special Education Teacher (SPED Level 3, MOE framework)",
        org: "Metta School, Singapore",
        period: "Jul 2019 to Mar 2026",
        description:
          "Nearly seven years teaching in a Singapore special education (SPED) school.",
        highlights: [
          "Planned and taught academic and non academic lessons for students aged 7 to 18, adapting each lesson to how the child learns.",
          "Worked alongside occupational therapists, physiotherapists, speech and language therapists, psychologists and parents to support each child's development.",
          "Helped lead the Communication & Language curriculum team in 2024, shaping curriculum planning and assessment.",
        ],
      },
    ],
    // Newest first, so the SPED qualification — the one that matters most to a
    // parent — leads.
    education: [
      {
        qualification: "Diploma in Special Education (DISE, SST)",
        institution: "National Institute of Education, Singapore (NIE)",
        period: "2021 to 2022",
      },
      {
        qualification: "Bachelor of Science (Honours), Physics & Applied Physics",
        institution: "Nanyang Technological University (NTU)",
        period: "2016 to 2020",
        detail: "Concentration in Semiconductor Technology",
      },
    ],
  },
];
