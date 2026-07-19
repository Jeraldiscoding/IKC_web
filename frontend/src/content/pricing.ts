export type PricedProgrammeAccent = "terracotta" | "mustard" | "sage" | "cream";

export type CurriculumLevel = { name: string; description: string };

export type PricedProgramme = {
  slug: string;
  title: string;
  accent: PricedProgrammeAccent;
  fromPrice: string; // "$120"
  priceUnit: string; // "session"
  packageNote?: string;
  duration: string;
  format: string;
  audience: string;
  blurb: string;
  literacyLevels?: CurriculumLevel[];
  numeracyLevels?: CurriculumLevel[];
  mathLevels?: string[];
  footnote?: string;
};

export type ScheduleEntry = {
  time: string;
  label: string;
  accent: PricedProgrammeAccent | "neutral";
};

export type ScheduleDay = {
  day: string;
  note?: string;
  entries: ScheduleEntry[];
};

export const pricedProgrammes: PricedProgramme[] = [
  {
    slug: "one-to-one",
    title: "1-1 Classes",
    accent: "terracotta",
    fromPrice: "$120",
    priceUnit: "session",
    packageNote: "4 sessions for $450",
    duration: "90 mins",
    format: "Individual",
    audience: "Following the Singapore syllabus, or needing extra support",
    blurb:
      "Individualised lessons tailored to your child's learning needs and pace. Suitable for students following the Singapore syllabus or those requiring additional support to build confidence, strengthen foundational skills, and master key concepts in Numeracy and Literacy.",
  },
  {
    slug: "early-learners",
    title: "Early Learners Club",
    accent: "mustard",
    fromPrice: "$65",
    priceUnit: "session",
    duration: "60 mins",
    format: "Small group (max 3)",
    audience: "Pre-schoolers aged 3–6",
    blurb:
      "Designed to prepare children for a smooth and confident transition into Primary 1. Through structured, engaging activities, children develop essential school-readiness skills such as fine motor, attention, following routines, independence, and staying on task.",
  },
  {
    slug: "sped-curriculum",
    title: "SPED Curriculum",
    accent: "sage",
    fromPrice: "$80",
    priceUnit: "session",
    duration: "60 mins",
    format: "Small group (max 3)",
    audience: "SPED school students",
    blurb:
      "Small-group literacy and numeracy across four levels each, meeting children where they are and building steadily toward reading, writing and everyday maths.",
    literacyLevels: [
      { name: "Literacy L1", description: "Building letter awareness and early literacy" },
      { name: "Literacy L2", description: "Decoding and blending CVC words" },
      { name: "Literacy L3", description: "Expanding vocabulary and reading confidence" },
      { name: "Literacy L4", description: "Reading, writing and communicating in sentences" },
    ],
    numeracyLevels: [
      { name: "Numeracy L1", description: "Number awareness (1–10), counting and matching" },
      { name: "Numeracy L2", description: "Number recognition (1–20) and simple operations" },
      { name: "Numeracy L3", description: "Applying numeracy (1–100) to everyday maths" },
      { name: "Numeracy L4", description: "Solving problems and thinking mathematically (1–1000)" },
    ],
  },
  {
    slug: "mainstream-curriculum",
    title: "Mainstream Curriculum",
    accent: "cream",
    fromPrice: "$100",
    priceUnit: "session",
    duration: "90 mins",
    format: "Small group (max 3)",
    audience: "Mainstream school students",
    blurb:
      "MOE-aligned Mathematics classes that build strong conceptual understanding, problem-solving skills, and confidence through engaging, structured lessons.",
    mathLevels: ["P1 Math", "P2 Math", "P3 Math", "P4 Math", "P5 Foundation Math"],
    footnote:
      "We are currently not offering general P1–P5 English tuition — our focus is targeted literacy intervention for struggling readers.",
  },
];

export const weeklySchedule: ScheduleDay[] = [
  { day: "Mon", note: "Planning & Preparation Day", entries: [] },
  {
    day: "Tue",
    entries: [
      { time: "2.00 – 3.30pm", label: "1-1 Classes", accent: "terracotta" },
      { time: "4.00 – 5.30pm", label: "1-1 Classes", accent: "terracotta" },
    ],
  },
  {
    day: "Wed",
    entries: [
      { time: "By appointment", label: "Trial Assessments", accent: "terracotta" },
      { time: "4.00 – 5.30pm", label: "1-1 Classes", accent: "terracotta" },
    ],
  },
  {
    day: "Thu",
    entries: [
      { time: "2.00 – 3.30pm", label: "1-1 Classes", accent: "terracotta" },
      { time: "4.00 – 5.30pm", label: "1-1 Classes", accent: "terracotta" },
    ],
  },
  { day: "Fri", note: "Planning & Preparation Day", entries: [] },
  {
    day: "Sat",
    entries: [
      { time: "9.30 – 10.30am", label: "Early Learners Club", accent: "mustard" },
      { time: "10.30 – 11.30am", label: "Literacy L1", accent: "sage" },
      { time: "11.30 – 12.30pm", label: "Numeracy L1", accent: "sage" },
      { time: "12.30 – 1.30pm", label: "Literacy L3", accent: "sage" },
      { time: "1.30 – 2.30pm", label: "Numeracy L3", accent: "sage" },
      { time: "3.00 – 4.30pm", label: "P1 Math", accent: "cream" },
      { time: "4.30 – 6.00pm", label: "P2 Math", accent: "cream" },
      { time: "6.00 – 7.30pm", label: "P5 Foundation Math", accent: "cream" },
    ],
  },
  {
    day: "Sun",
    entries: [
      { time: "9.30 – 10.30am", label: "Early Learners Club", accent: "mustard" },
      { time: "10.30 – 11.30am", label: "Literacy L2", accent: "sage" },
      { time: "11.30 – 12.30pm", label: "Numeracy L2", accent: "sage" },
      { time: "12.30 – 1.30pm", label: "Literacy L4", accent: "sage" },
      { time: "1.30 – 2.30pm", label: "Numeracy L4", accent: "sage" },
      { time: "3.00 – 4.30pm", label: "P3 Math", accent: "cream" },
      { time: "4.30 – 6.00pm", label: "P4 Math", accent: "cream" },
    ],
  },
];
