# Services Pricing & Schedule Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Services page's abstract "Formats" section with IKC's four real priced programmes and a responsive weekly class schedule, all driven from a single content module.

**Architecture:** One content module (`src/content/pricing.ts`) is the single source of truth for the four programmes and the weekly timetable. Two new server components render it — `ProgrammesSection` (accent cards with pricing + curriculum levels) and `ScheduleSection` (a 7-column weekly board on laptop that collapses to per-programme lists on phone). Both reuse existing UI/motion primitives. The old `FormatsSection` is deleted.

**Tech Stack:** Next.js App Router (React Server Components), TypeScript, Tailwind CSS v4 (`@theme` tokens in `globals.css`), `motion/react`, Vitest + React Testing Library, lucide-react icons.

## Global Constraints

- Reuse the four existing warm accent tokens only: `terracotta`, `mustard`, `sage`, `cream`. No new theme token. Source-image purple/red/orange are Canva defaults, not brand — do not carry over.
- Tailwind class names must appear as complete literal strings (never interpolated), so the JIT compiler can see them.
- Prices shown with a "From" prefix: "From $120" etc. Exact figures: 1-1 $120 (4 sessions for $450), Early Learners $65, SPED $80, Mainstream $100 — all "/ session".
- Single `<h1>` per page (already the section intro). New sections use `<h2>`; each programme uses `<h3>`. Do not add extra h1s.
- Programme/schedule copy is verbatim from the spec (`docs/superpowers/specs/2026-07-19-services-pricing-schedule-design.md`). Do not paraphrase curriculum descriptions.
- Keep `TeachSection`, `HowToJoinSection`, and `CtaBand` unchanged.
- Commit after each task with a Conventional Commits message ending with the Co-Authored-By trailer used in this repo.

---

## File Structure

- **Create** `frontend/src/content/pricing.ts` — data + types for programmes and weekly schedule.
- **Create** `frontend/src/components/services/ProgrammesSection.tsx` — programme/pricing cards.
- **Create** `frontend/src/components/services/ScheduleSection.tsx` — responsive weekly schedule.
- **Modify** `frontend/src/app/services/page.tsx` — swap sections.
- **Modify** `frontend/src/content/services.ts` — drop `formats` block + `ServiceFormat` type; refresh intro lede.
- **Modify** `frontend/src/app/services/__tests__/services-page.test.tsx` — replace formats assertions with programme/price/schedule assertions.
- **Modify** `frontend/src/content/__tests__/content.test.ts` — add pricing-module shape test.
- **Delete** `frontend/src/components/services/FormatsSection.tsx`.

All commands run from the `frontend/` directory.

---

## Task 1: Pricing content module

**Files:**
- Create: `frontend/src/content/pricing.ts`
- Test: `frontend/src/content/__tests__/content.test.ts` (append a new `describe`)

**Interfaces:**
- Consumes: nothing (leaf data module).
- Produces:
  - `type PricedProgrammeAccent = "terracotta" | "mustard" | "sage" | "cream"`
  - `type CurriculumLevel = { name: string; description: string }`
  - `type PricedProgramme = { slug: string; title: string; accent: PricedProgrammeAccent; fromPrice: string; priceUnit: string; packageNote?: string; duration: string; format: string; audience: string; blurb: string; literacyLevels?: CurriculumLevel[]; numeracyLevels?: CurriculumLevel[]; mathLevels?: string[]; footnote?: string }`
  - `type ScheduleEntry = { time: string; label: string; accent: PricedProgrammeAccent | "neutral" }`
  - `type ScheduleDay = { day: string; note?: string; entries: ScheduleEntry[] }`
  - `const pricedProgrammes: PricedProgramme[]` (length 4)
  - `const weeklySchedule: ScheduleDay[]` (length 7, Mon→Sun)

- [ ] **Step 1: Write the failing test**

Append to `frontend/src/content/__tests__/content.test.ts`:

```ts
import { pricedProgrammes, weeklySchedule } from "@/content/pricing";

describe("pricedProgrammes", () => {
  it("has exactly four programmes with pricing and distinct accents", () => {
    expect(pricedProgrammes).toHaveLength(4);
    for (const p of pricedProgrammes) {
      expect(p.slug).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.fromPrice).toMatch(/^\$\d+$/);
      expect(p.priceUnit).toBeTruthy();
      expect(p.duration).toBeTruthy();
      expect(p.format).toBeTruthy();
      expect(p.blurb.length).toBeGreaterThan(20);
    }
    const accents = pricedProgrammes.map((p) => p.accent);
    expect(new Set(accents).size).toBe(4);
  });

  it("gives SPED literacy and numeracy levels, and Mainstream math levels", () => {
    const sped = pricedProgrammes.find((p) => p.slug === "sped-curriculum");
    expect(sped?.literacyLevels).toHaveLength(4);
    expect(sped?.numeracyLevels).toHaveLength(4);
    const main = pricedProgrammes.find((p) => p.slug === "mainstream-curriculum");
    expect(main?.mathLevels?.length).toBeGreaterThanOrEqual(5);
    expect(main?.footnote).toBeTruthy();
  });
});

describe("weeklySchedule", () => {
  it("has seven days Mon-Sun with Mon and Fri as prep days", () => {
    expect(weeklySchedule).toHaveLength(7);
    expect(weeklySchedule.map((d) => d.day)).toEqual([
      "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun",
    ]);
    const mon = weeklySchedule.find((d) => d.day === "Mon");
    expect(mon?.note).toMatch(/planning/i);
    expect(mon?.entries).toHaveLength(0);
  });

  it("schedules group classes on Sat and Sun", () => {
    const sat = weeklySchedule.find((d) => d.day === "Sat");
    expect(sat?.entries.some((e) => e.label === "P1 Math")).toBe(true);
    expect(sat?.entries.some((e) => e.label === "Literacy L1")).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- content.test.ts`
Expected: FAIL — cannot resolve `@/content/pricing`.

- [ ] **Step 3: Write the content module**

Create `frontend/src/content/pricing.ts`:

```ts
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- content.test.ts`
Expected: PASS (all `describe` blocks green).

- [ ] **Step 5: Commit**

```bash
git add src/content/pricing.ts src/content/__tests__/content.test.ts
git commit -m "feat: add IKC pricing & weekly schedule content module

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 2: ProgrammesSection replaces FormatsSection

**Files:**
- Create: `frontend/src/components/services/ProgrammesSection.tsx`
- Modify: `frontend/src/app/services/page.tsx`
- Modify: `frontend/src/content/services.ts`
- Modify: `frontend/src/app/services/__tests__/services-page.test.tsx`
- Delete: `frontend/src/components/services/FormatsSection.tsx`

**Interfaces:**
- Consumes: `pricedProgrammes` from Task 1; `Section`, `Eyebrow`, `Reveal`, `StaggerGroup`, `StaggerItem`, `HoverCard`, `DoodleScatter` (existing).
- Produces: `export function ProgrammesSection(): JSX.Element` (no props).

- [ ] **Step 1: Confirm no other references to the Formats content**

Run: `grep -rn "FormatsSection\|servicesCopy.formats\|ServiceFormat" src`
Expected: only `page.tsx`, `FormatsSection.tsx`, `services.ts`, and `services-page.test.tsx`. If anything else appears, update it in this task too.

- [ ] **Step 2: Write the failing page test**

Replace the `"shows every programme area and format"` test in `frontend/src/app/services/__tests__/services-page.test.tsx` with:

```ts
import { pricedProgrammes } from "@/content/pricing";

it("shows every teaching focus area", () => {
  render(<ServicesPage />);
  for (const p of programmes) {
    expect(screen.getByText(p.title)).toBeInTheDocument();
  }
});

it("shows every priced programme with its 'from' price", () => {
  render(<ServicesPage />);
  for (const p of pricedProgrammes) {
    expect(screen.getByRole("heading", { name: p.title })).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(`From\\s*\\${p.fromPrice}`)).length).toBeGreaterThan(0);
  }
  expect(screen.getByText(/4 sessions for \$450/)).toBeInTheDocument();
});

it("no longer shows the old Formats copy", () => {
  render(<ServicesPage />);
  expect(screen.queryByText("Weekly Enrichment Classes")).not.toBeInTheDocument();
});
```

Keep the existing `"renders exactly one h1"` and `"has a closing CTA to WhatsApp"` tests. Remove the now-invalid `import { servicesCopy }` usage of `.formats` if present (the `servicesCopy` import may still be needed elsewhere; if unused after edits, delete the import).

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test -- services-page.test.tsx`
Expected: FAIL — `@/content/pricing` price text not found / `pricedProgrammes` headings missing.

- [ ] **Step 4: Create the ProgrammesSection component**

Create `frontend/src/components/services/ProgrammesSection.tsx`:

```tsx
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DoodleScatter } from "@/components/decor/DoodleScatter";
import { pricedProgrammes, type PricedProgrammeAccent } from "@/content/pricing";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";

// Full class strings, never interpolated — Tailwind must be able to see them.
const accents: Record<
  PricedProgrammeAccent,
  { card: string; price: string; chip: string; rule: string }
> = {
  terracotta: {
    card: "bg-terracotta-light/10",
    price: "text-terracotta",
    chip: "bg-terracotta/10 text-terracotta-dark",
    rule: "bg-terracotta",
  },
  mustard: {
    card: "bg-mustard-tint",
    price: "text-mustard-dark",
    chip: "bg-mustard/20 text-mustard-dark",
    rule: "bg-mustard-dark",
  },
  sage: {
    card: "bg-sage-tint",
    price: "text-sage-dark",
    chip: "bg-sage/25 text-sage-dark",
    rule: "bg-sage-dark",
  },
  cream: {
    card: "bg-cream-dark/30",
    price: "text-terracotta-dark",
    chip: "bg-terracotta-light/20 text-terracotta-dark",
    rule: "bg-terracotta-light",
  },
};

/**
 * The four real, priced programmes as accent cards. Price is framed "From $X"
 * so the page ages gracefully; SPED/Mainstream expose their curriculum levels
 * so parents see scope at a glance (and search engines see the keywords).
 */
export function ProgrammesSection() {
  return (
    <Section glow="warm" decor={<DoodleScatter preset="programmes" />}>
      <Reveal className="max-w-3xl">
        <Eyebrow>Programmes &amp; pricing</Eyebrow>
        <h2 className="mt-4">Classes built around your child</h2>
        <p className="mt-4 text-lg">
          Four ways to learn with us — individual or in a calm small group of no
          more than three. Prices are a guide; message us for current fees and
          availability.
        </p>
      </Reveal>

      <StaggerGroup className="mt-12 grid gap-6 lg:grid-cols-2">
        {pricedProgrammes.map((p) => {
          const a = accents[p.accent];
          return (
            <StaggerItem key={p.slug}>
              <HoverCard className="h-full">
                <article className={`flex h-full flex-col rounded-3xl p-8 ${a.card}`}>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl">{p.title}</h3>
                    <div className="shrink-0 text-right">
                      <p className={`font-heading text-2xl font-bold leading-none ${a.price}`}>
                        From {p.fromPrice}
                      </p>
                      <p className="mt-1 text-xs text-ink-muted">/ {p.priceUnit}</p>
                    </div>
                  </div>

                  <span
                    className={`mt-4 block h-1 w-10 rounded-full ${a.rule}`}
                    aria-hidden
                  />

                  <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
                    <div>
                      <dt className="sr-only">Duration</dt>
                      <dd>{p.duration}</dd>
                    </div>
                    <div>
                      <dt className="sr-only">Format</dt>
                      <dd>{p.format}</dd>
                    </div>
                    <div>
                      <dt className="sr-only">Suitable for</dt>
                      <dd>{p.audience}</dd>
                    </div>
                  </dl>

                  {p.packageNote ? (
                    <p className={`mt-3 inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium ${a.chip}`}>
                      {p.packageNote}
                    </p>
                  ) : null}

                  <p className="mt-5 text-sm">{p.blurb}</p>

                  {p.literacyLevels && p.numeracyLevels ? (
                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                      <LevelList heading="Literacy" levels={p.literacyLevels} rule={a.rule} />
                      <LevelList heading="Numeracy" levels={p.numeracyLevels} rule={a.rule} />
                    </div>
                  ) : null}

                  {p.mathLevels ? (
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {p.mathLevels.map((m) => (
                        <li
                          key={m}
                          className={`rounded-full px-3 py-1 text-xs font-medium ${a.chip}`}
                        >
                          {m}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {p.footnote ? (
                    <p className="mt-5 text-xs text-ink-muted">{p.footnote}</p>
                  ) : null}
                </article>
              </HoverCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}

function LevelList({
  heading,
  levels,
  rule,
}: {
  heading: string;
  levels: { name: string; description: string }[];
  rule: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-ink">{heading}</p>
      <ul className="mt-2 space-y-2">
        {levels.map((l) => (
          <li key={l.name} className="flex items-start gap-2 text-sm text-ink-muted">
            <span className={`mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full ${rule}`} aria-hidden />
            <span>
              <span className="font-medium text-ink">{l.name}</span> — {l.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 5: Wire ProgrammesSection into the page and remove FormatsSection**

In `frontend/src/app/services/page.tsx`: delete the `FormatsSection` import, add `import { ProgrammesSection } from "@/components/services/ProgrammesSection";`, and replace the `<FormatsSection />` line so the body reads:

```tsx
      {/* What we teach → real programmes & pricing → how to start. */}
      <TeachSection />
      <ProgrammesSection />
      <HowToJoinSection />
```

- [ ] **Step 6: Update services.ts copy and remove the formats block**

In `frontend/src/content/services.ts`: delete the `ServiceFormat` type, the `import ... CalendarDays, Palette, Sun` line, the `LucideIcon` import if now unused, and the entire `formats: { ... }` block. Replace the intro `lede` with:

```ts
    lede: "Individual and small-group classes — 1-1 support, an Early Learners Club, and SPED and mainstream curricula — led by a DISE-certified (NIE) special needs educator, in the format that suits your child.",
```

- [ ] **Step 7: Delete the old FormatsSection file**

```bash
git rm src/components/services/FormatsSection.tsx
```

- [ ] **Step 8: Run tests and typecheck**

Run: `npm test -- services-page.test.tsx content.test.ts`
Expected: PASS.
Run: `npx tsc --noEmit`
Expected: no errors (confirms no dangling `formats`/`FormatsSection` references).

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: replace Formats with real priced programmes on Services

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 3: ScheduleSection (responsive weekly board)

**Files:**
- Create: `frontend/src/components/services/ScheduleSection.tsx`
- Modify: `frontend/src/app/services/page.tsx`
- Modify: `frontend/src/app/services/__tests__/services-page.test.tsx`

**Interfaces:**
- Consumes: `weeklySchedule`, `pricedProgrammes` from Task 1; `Section`, `Eyebrow`, `Reveal`, `DoodleScatter` (existing, `schedule` preset).
- Produces: `export function ScheduleSection(): JSX.Element` (no props).

- [ ] **Step 1: Write the failing page test**

Add to `frontend/src/app/services/__tests__/services-page.test.tsx`:

```ts
it("shows the weekly schedule with representative class entries", () => {
  render(<ServicesPage />);
  // Entries appear in both the laptop board and the mobile lists, so use getAllByText.
  expect(screen.getAllByText("P1 Math").length).toBeGreaterThan(0);
  expect(screen.getAllByText("Literacy L1").length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Planning & Preparation/).length).toBeGreaterThan(0);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- services-page.test.tsx`
Expected: FAIL — schedule entries not rendered yet.

- [ ] **Step 3: Create the ScheduleSection component**

Create `frontend/src/components/services/ScheduleSection.tsx`:

```tsx
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DoodleScatter } from "@/components/decor/DoodleScatter";
import { Reveal } from "@/components/motion/Reveal";
import {
  weeklySchedule,
  pricedProgrammes,
  type ScheduleEntry,
  type PricedProgrammeAccent,
} from "@/content/pricing";

// Full class strings, never interpolated.
const chipClass: Record<PricedProgrammeAccent | "neutral", string> = {
  terracotta: "bg-terracotta/10 text-terracotta-dark",
  mustard: "bg-mustard/20 text-mustard-dark",
  sage: "bg-sage/25 text-sage-dark",
  cream: "bg-terracotta-light/20 text-terracotta-dark",
  neutral: "bg-cream-dark/50 text-ink-muted",
};

function Chip({ entry }: { entry: ScheduleEntry }) {
  return (
    <div className={`rounded-xl px-3 py-2 text-xs ${chipClass[entry.accent]}`}>
      <p className="font-semibold leading-tight">{entry.label}</p>
      <p className="mt-0.5 opacity-80">{entry.time}</p>
    </div>
  );
}

/**
 * Laptop: a 7-column weekly board (Mon→Sun), each day a column of time-stamped
 * chips. Phone: the board is hidden and the same data is regrouped per
 * programme, so a parent sees when *their* class runs without a horizontal grid.
 */
export function ScheduleSection() {
  return (
    <Section
      glow="cool"
      className="bg-cream-dark/20"
      decor={<DoodleScatter preset="schedule" />}
    >
      <Reveal className="max-w-3xl">
        <Eyebrow>Weekly schedule</Eyebrow>
        <h2 className="mt-4">When classes run</h2>
        <p className="mt-4 text-lg">
          1-1 sessions run Tuesday to Thursday; group classes run on weekends.
          Times are for 2026 and may change — message us to confirm a slot.
        </p>
      </Reveal>

      {/* Laptop board */}
      <div className="mt-12 hidden md:grid md:grid-cols-7 md:gap-3">
        {weeklySchedule.map((d) => (
          <div key={d.day} className="rounded-2xl border border-cream-dark bg-cream/60 p-3">
            <p className="text-center text-sm font-semibold text-ink">{d.day}</p>
            <div className="mt-3 space-y-2">
              {d.note ? (
                <p className="rounded-xl bg-cream-dark/40 px-3 py-4 text-center text-xs text-ink-muted">
                  {d.note}
                </p>
              ) : (
                d.entries.map((e, i) => <Chip key={`${e.label}-${i}`} entry={e} />)
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Phone: regrouped per programme */}
      <div className="mt-10 space-y-6 md:hidden">
        {pricedProgrammes.map((p) => {
          const slots = weeklySchedule.flatMap((d) =>
            d.entries
              .filter((e) => e.accent === p.accent)
              .map((e) => ({ day: d.day, ...e })),
          );
          if (slots.length === 0) return null;
          return (
            <div key={p.slug} className="rounded-2xl border border-cream-dark bg-cream/60 p-5">
              <p className="font-heading text-lg font-bold text-ink">{p.title}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-ink-muted">
                {slots.map((s, i) => (
                  <li key={`${s.label}-${i}`} className="flex justify-between gap-4">
                    <span>
                      <span className="font-medium text-ink">{s.day}</span> · {s.label}
                    </span>
                    <span className="shrink-0">{s.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        {weeklySchedule.some((d) => d.note) ? (
          <p className="text-sm text-ink-muted">
            Mondays &amp; Fridays are Planning &amp; Preparation days — no classes.
          </p>
        ) : null}
      </div>
    </Section>
  );
}
```

Note: on phone, the "Planning & Preparation" text is rendered by the closing note line so the test's `getAllByText(/Planning & Preparation/)` matches in both layouts.

- [ ] **Step 4: Wire ScheduleSection into the page**

In `frontend/src/app/services/page.tsx`, add `import { ScheduleSection } from "@/components/services/ScheduleSection";` and place it after `ProgrammesSection`:

```tsx
      <TeachSection />
      <ProgrammesSection />
      <ScheduleSection />
      <HowToJoinSection />
```

- [ ] **Step 5: Run tests and typecheck**

Run: `npm test -- services-page.test.tsx`
Expected: PASS.
Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add responsive weekly class schedule to Services

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 4: Full verification

**Files:** none (verification only).

- [ ] **Step 1: Run the whole test suite**

Run: `npm test`
Expected: all suites PASS.

- [ ] **Step 2: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: build succeeds, `/services` is statically generated. (If `.next` misbehaves from a prior dev session, `rm -rf .next` first — known Turbopack cache gotcha.)

- [ ] **Step 4: Visual check in dev**

Run: `npm run dev`, open `http://localhost:3000/services`. Confirm: four programme cards with "From $…" prices; SPED shows Literacy/Numeracy levels; Mainstream shows P1–P5 chips + English footnote; laptop shows the 7-column board; narrow the window below `md` and confirm it swaps to per-programme lists. No leftover "Weekly Enrichment Classes" copy.

- [ ] **Step 5: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: services pricing/schedule polish from verification

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review Notes

- **Spec coverage:** Content model (Task 1), ProgrammesSection with "from" prices + curriculum levels + Mainstream footnote (Task 2), Formats removal + lede refresh (Task 2), responsive schedule board/lists (Task 3), tests (Tasks 1–3), SEO heading hierarchy (h2/h3 in components), verification incl. build (Task 4). All spec sections map to a task.
- **Accents:** four distinct existing tokens (terracotta/mustard/sage/cream); no new theme token; chip/card/price classes are full literal strings.
- **Type consistency:** `pricedProgrammes`, `weeklySchedule`, `ScheduleEntry`, `PricedProgrammeAccent` names match across Tasks 1–3. `ProgrammesSection`/`ScheduleSection` are prop-less exports as declared.
- **Out of scope (unchanged):** Home/About/other pages, Workshops/Holiday copy, JSON-LD, booking flow.
