# Services page — real programmes, pricing & class schedule

**Date:** 2026-07-19
**Status:** Approved (design), pending implementation plan
**Scope:** Additive update to the existing Services page. No sitewide redesign.

## Problem

The Services page currently runs on placeholder abstractions:

- A **Formats** section (Weekly Enrichment / Workshops / Holiday Programmes).
- A **What we teach** section (Functional Skills / Academics / Hands-on / Holiday).

IKC has since supplied real, structured business data (six images under
`Images/Pricings/Schedules/`): four concrete priced programmes and a 2026 weekly
class schedule. This real data does not map cleanly onto the abstract Formats
section, and partly contradicts it. Parents currently cannot see what IKC
actually offers, what it costs, or when classes run.

## Goal

Show IKC's real programmes, indicative pricing, and weekly schedule on the
Services page — accurately, on-brand, responsive, and SEO-useful — without a
wider redesign. The existing **What we teach** and **How to get started**
sections remain untouched.

## Decisions (from brainstorming)

1. **Replace** the abstract Formats section with a real *Programmes & pricing*
   section driven by the four actual offerings. The Formats file is deleted.
2. **Prices** are shown with a softening "From" prefix (e.g. "From $120 /
   session") so the page ages gracefully as fees change. The 1-1 4-session
   package is a sub-note.
3. **Schedule** renders two ways from one data source: a 7-column weekly board
   on laptop, and per-programme schedule lists on phone.
4. **Curriculum depth**: SPED and Mainstream cards list their levels *with* the
   short descriptions from the images.

## Key design principle: one source of truth

The programmes and the weekly schedule are defined once as plain data in a new
content module and rendered by multiple components. The same facts are never
hand-written in two places, so the laptop board and the phone lists can never
drift apart.

### Why a weekly board, not a rigid time-grid

The source timetable image uses fixed time rows × 7 days. The underlying data
resists that: weekday **1-1 slots** (2–3.30pm, 4–5.30pm, 90 min) do not align
with weekend **group slots** (60/90-min blocks from 9.30am). A shared time axis
would produce misaligned and empty cells and break on mobile. Instead, the
laptop rendering is a **7-column weekly board** — Mon→Sun side by side, each day
a column of its own time-stamped sessions. It reads as the whole week at a
glance (a real CSS grid) without inventing precision the data lacks.

## Data model — `src/content/pricing.ts`

```ts
export type PricedProgrammeAccent = "terracotta" | "mustard" | "sage" | "cream";

export type CurriculumLevel = { name: string; description: string };

export type PricedProgramme = {
  slug: string;
  title: string;
  accent: PricedProgrammeAccent;
  fromPrice: string;        // "$120"
  priceUnit: string;        // "session"
  packageNote?: string;     // "4 sessions for $450"
  duration: string;         // "90 mins"
  format: string;           // "Individual" | "Small group (max 3)"
  audience: string;         // "Following the Singapore syllabus or needing extra support"
  blurb: string;
  literacyLevels?: CurriculumLevel[];   // SPED only
  numeracyLevels?: CurriculumLevel[];   // SPED only
  mathLevels?: string[];                // Mainstream only ("P1 Math" ...)
  footnote?: string;        // Mainstream: no general English tuition
};

export type ScheduleEntry = {
  time: string;                 // "2.00 – 3.30pm"
  label: string;                // "1-1 Classes" | "Literacy L1" | "P1 Math"
  accent: PricedProgrammeAccent | "neutral";
};

export type ScheduleDay = {
  day: string;                  // "Mon"
  note?: string;                // "Planning & Preparation Day"
  entries: ScheduleEntry[];
};

export const pricedProgrammes: PricedProgramme[];
export const weeklySchedule: ScheduleDay[];   // Mon → Sun
```

Accents reuse the four existing warm palette tokens for brand cohesion — the
bright red/purple/orange/grey in the source images are Canva defaults, not the
site's identity, so they are deliberately not carried over. Mapping: 1-1 →
terracotta, Early Learners → mustard, SPED → sage, Mainstream → cream. No new
theme token is introduced.

### Programme content (verbatim from images)

- **1-1 Classes** — from $120/session; 4 sessions for $450; 90 mins; Individual.
  "Individualised lessons tailored to your child's learning needs and pace.
  Suitable for students following the Singapore syllabus or those requiring
  additional support to build confidence, strengthen foundational skills, and
  master key concepts in Numeracy and Literacy."
- **Early Learners Club** — from $65/session; 60 mins; Small group (max 3); ages
  3–6. "Designed to prepare children for a smooth and confident transition into
  Primary 1. Through structured, engaging activities, children develop essential
  school-readiness skills such as fine motor, attention, following routines,
  independence, and staying on task."
- **SPED Curriculum** — from $80/session; 60 mins; Small group (max 3); suitable
  for SPED school students. Literacy L1–4 and Numeracy L1–4 with descriptions:
  - Literacy L1: Building letter awareness and early literacy
  - Literacy L2: Decoding and blending CVC words
  - Literacy L3: Expanding vocabulary and reading confidence
  - Literacy L4: Reading, writing and communicating in sentences
  - Numeracy L1: Number awareness (1–10), counting and matching
  - Numeracy L2: Number recognition (1–20) and simple operations
  - Numeracy L3: Applying numeracy (1–100) to everyday maths
  - Numeracy L4: Solving problems and thinking mathematically (1–1000)
- **Mainstream Curriculum** — from $100/session; 90 mins; Small group (max 3);
  suitable for mainstream school students. "MOE-aligned Mathematics classes that
  build strong conceptual understanding, problem-solving skills, and confidence
  through engaging, structured lessons." Levels: P1, P2, P3, P4 Math and P5
  Foundation Math. Footnote: "We are currently not offering general P1–P5
  English tuition — our focus is targeted literacy intervention for struggling
  readers."

### Weekly schedule content (verbatim from images)

- **Mon** — Planning & Preparation Day (no classes)
- **Tue** — 1-1 Classes 2.00–3.30pm; 1-1 Classes 4.00–5.30pm
- **Wed** — Trial Assessments (1-1); 1-1 Classes 4.00–5.30pm
- **Thu** — 1-1 Classes 2.00–3.30pm; 1-1 Classes 4.00–5.30pm
- **Fri** — Planning & Preparation Day (no classes)
- **Sat** — Early Learners 9.30–10.30am; Literacy L1 10.30–11.30am; Numeracy L1
  11.30–12.30pm; Literacy L3 12.30–1.30pm; Numeracy L3 1.30–2.30pm; P1 Math
  3.00–4.30pm; P2 Math 4.30–6.00pm; P5 Foundation Math 6.00–7.30pm
- **Sun** — Early Learners 9.30–10.30am; Literacy L2 10.30–11.30am; Numeracy L2
  11.30–12.30pm; Literacy L4 12.30–1.30pm; Numeracy L4 1.30–2.30pm; P3 Math
  3.00–4.30pm; P4 Math 4.30–6.00pm

## Components

All new components live in `src/components/services/` and reuse existing
primitives (`Section`, `Eyebrow`, `HoverCard`, `Reveal`, `Stagger`,
`DoodleScatter`) and accent classes.

### `ProgrammesSection.tsx`

- Replaces the visual role of the deleted `FormatsSection`.
- Eyebrow "Programmes & pricing", h2, short intro.
- Four programme cards from `pricedProgrammes`. Each card: title, "From $X /
  session" price with package sub-note, a meta row (duration · format ·
  audience), blurb, and — for SPED/Mainstream — a compact levels list with
  descriptions. Mainstream footnote rendered as small print.
- One h3 per programme; levels are plain lists, not further headings.

### `ScheduleSection.tsx`

- Eyebrow "Weekly schedule", h2, short intro, and a small "Group classes run
  Sat & Sun · 1-1 sessions Tue–Thu" helper line.
- **Laptop (`md:` and up):** 7-column CSS-grid board. Column header per day;
  each column stacks its time-stamped entries as small accent-tinted chips.
  Mon/Fri render a muted "Planning & Preparation" state.
- **Phone (below `md:`):** the board is hidden; a per-programme accordion/list
  renders instead, each programme showing its day(s) and times, pulled from the
  same `weeklySchedule` data by filtering on accent/label.
- Both renderings derive from `weeklySchedule` — no duplicated timetable text.

## Page wiring — `src/app/services/page.tsx`

1. Remove the `FormatsSection` import and usage; delete
   `src/components/services/FormatsSection.tsx`.
2. Insert `<ProgrammesSection />` then `<ScheduleSection />` after
   `<TeachSection />`, before `<HowToJoinSection />`.
3. Update the intro `lede` in `src/content/services.ts` to reference real
   programmes/pricing rather than abstract formats. Remove the now-unused
   `formats` block and its `ServiceFormat` type from `services.ts`.
4. Keep `TeachSection`, `HowToJoinSection`, and `CtaBand` unchanged.

## SEO

- Programme titles, prices, formats, and level descriptions expand the
  "functional skills training / small group enrichment / SPED curriculum
  Singapore" keyword surface named in the README strategy table.
- Heading hierarchy preserved: single page H1, h2 per section, h3 per programme.
- No new JSON-LD required for this change; existing page metadata stays. (A
  future `Course`/`OfferCatalog` schema is out of scope here.)

## Testing

Extend `src/app/services/__tests__/services-page.test.tsx`:

- Asserts the four programme titles render.
- Asserts each "from" price string renders (e.g. "$120", "$65", "$80", "$100").
- Asserts the 1-1 package note ("$450") renders.
- Asserts a representative schedule entry renders (e.g. "P1 Math", "Literacy L1").
- Asserts no leftover Formats copy ("Weekly Enrichment Classes") remains.

If `src/content/__tests__/content.test.ts` snapshots or shape-checks content
modules, add minimal coverage that `pricedProgrammes` has four entries and
`weeklySchedule` has seven days.

## Out of scope

- Sitewide redesign or changes to Home / About / other pages.
- Workshops and Holiday Programme copy (dropped from Services for now; may return
  later as their own content).
- Structured-data (JSON-LD) markup for courses/offers.
- A booking or payment flow — WhatsApp remains the sole CTA.

## Files touched

- **New:** `src/content/pricing.ts`,
  `src/components/services/ProgrammesSection.tsx`,
  `src/components/services/ScheduleSection.tsx`
- **Edited:** `src/app/services/page.tsx`, `src/content/services.ts`,
  `src/app/services/__tests__/services-page.test.tsx`, possibly
  `src/content/__tests__/content.test.ts`. No theme-config change (existing
  accents reused).
- **Deleted:** `src/components/services/FormatsSection.tsx`
