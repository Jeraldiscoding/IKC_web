# Motion & Structural Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add gentle, accessible motion and bolder structure (bento layouts, layered hero) to the IKC site, inspired by berriesworld.com, without changing copy or breaking SSR/SEO.

**Architecture:** A small set of Client Component motion primitives in `src/components/motion/` (Reveal, StaggerGroup/StaggerItem, HoverCard, DriftingBlob) built on the `motion` library. Pages/sections stay Server Components and wrap these primitives around existing content. Reduced-motion is enforced app-wide via `<MotionConfig reducedMotion="user">` in the root layout.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, `motion` (Framer Motion), Vitest + Testing Library, lucide-react.

## Global Constraints

- **Motion register:** gentle & playful only — slow drifts (8–12s), soft fades/rises, subtle hover lifts. No fast/bouncy/flashing motion.
- **Accessibility:** every animation must respect OS "reduce motion" (enforced via `MotionConfig reducedMotion="user"` — do not bypass it per-component).
- **Palette locked:** terracotta / mustard / sage / cream / ink only. New utilities may only be *lighter tints* of these — no new hues.
- **Fonts locked:** Baloo 2 (`--font-baloo`) / Inter (`--font-inter`).
- **No content changes:** copy in `src/content/*` is not edited.
- **No invented facts:** no numeric stats/counters anywhere.
- **Preserve SSR/SEO:** only motion primitives carry `"use client"`; pages/sections stay Server Components.
- **Preserve tests:** existing ~20 tests must still pass; content text and heading structure unchanged.
- **All commands run from** `frontend/` (the Next.js app root).

---

### Task 1: Install `motion`, add IntersectionObserver test mock, enforce reduced-motion app-wide

**Files:**
- Modify: `frontend/package.json` (via install)
- Modify: `frontend/vitest.setup.ts`
- Modify: `frontend/src/app/layout.tsx`
- Create: `frontend/src/components/motion/MotionProvider.tsx`

**Interfaces:**
- Produces: `MotionProvider` — `function MotionProvider({ children }: { children: ReactNode }): JSX.Element`, a Client Component wrapping children in `<MotionConfig reducedMotion="user">`.

- [ ] **Step 1: Install the motion library**

Run (from `frontend/`):
```bash
npm install motion
```
Expected: `motion` appears under `dependencies` in `frontend/package.json`.

- [ ] **Step 2: Add an IntersectionObserver mock to the test setup**

`whileInView` reveals rely on `IntersectionObserver`, which JSDOM does not implement. Replace `frontend/vitest.setup.ts` with:

```ts
import "@testing-library/jest-dom";

// JSDOM has no IntersectionObserver; Motion's whileInView needs it.
// This mock immediately reports the element as intersecting so reveal
// animations settle to their visible state in tests.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  constructor(private cb: IntersectionObserverCallback) {}
  observe = (target: Element) => {
    this.cb(
      [{ isIntersecting: true, target } as IntersectionObserverEntry],
      this,
    );
  };
  unobserve = () => {};
  disconnect = () => {};
  takeRecords = () => [];
}

globalThis.IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver;
```

- [ ] **Step 3: Run the existing suite to confirm the mock is harmless**

Run: `npm test`
Expected: PASS (same as before — no behavioral change yet).

- [ ] **Step 4: Create the MotionProvider client component**

Create `frontend/src/components/motion/MotionProvider.tsx`:

```tsx
"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

/**
 * App-wide motion settings. `reducedMotion="user"` makes every Motion
 * animation honour the OS "reduce motion" setting automatically — a hard
 * requirement for our special-needs audience.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
```

- [ ] **Step 5: Wrap the app body in MotionProvider**

In `frontend/src/app/layout.tsx`, add the import and wrap `<main>` (leave `SiteHeader`/`SiteFooter`/`WhatsAppBubble` inside so their animations inherit the config too).

Add import after the existing `WhatsAppBubble` import (line 9):
```tsx
import { MotionProvider } from "@/components/motion/MotionProvider";
```

Replace the body's children block:
```tsx
      <body className="flex min-h-screen flex-col bg-cream text-ink font-body antialiased">
        <JsonLd data={localBusinessSchema()} />
        <MotionProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <WhatsAppBubble />
        </MotionProvider>
      </body>
```

- [ ] **Step 6: Verify build/tests still pass**

Run: `npm test`
Expected: PASS.
Run: `npm run build`
Expected: build completes with no type errors.

- [ ] **Step 7: Commit**

```bash
git add frontend/package.json frontend/package-lock.json frontend/vitest.setup.ts frontend/src/app/layout.tsx frontend/src/components/motion/MotionProvider.tsx
git commit -m "feat: add motion library, reduced-motion provider, IO test mock"
```

---

### Task 2: Motion primitives — Reveal, StaggerGroup/StaggerItem, HoverCard, DriftingBlob

**Files:**
- Create: `frontend/src/components/motion/Reveal.tsx`
- Create: `frontend/src/components/motion/Stagger.tsx`
- Create: `frontend/src/components/motion/HoverCard.tsx`
- Create: `frontend/src/components/motion/DriftingBlob.tsx`
- Test: `frontend/src/components/motion/__tests__/motion.test.tsx`

**Interfaces:**
- Consumes: `motion/react` (`motion`, `Variants`).
- Produces:
  - `Reveal({ children, delay?, className?, as? })` — fades + rises children into view once. `as` defaults to `"div"`.
  - `StaggerGroup({ children, className?, stagger? })` — parent that cascades `StaggerItem` children (default `stagger` = 0.12s).
  - `StaggerItem({ children, className? })` — one cascaded child.
  - `HoverCard({ children, className? })` — lift + subtle scale on hover/tap.
  - `DriftingBlob({ children, className?, duration?, distance? })` — slow infinite float/rotate loop wrapping arbitrary children (e.g. a `<Blob />` or a decorative dot).

- [ ] **Step 1: Write the failing test**

Create `frontend/src/components/motion/__tests__/motion.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";
import { DriftingBlob } from "@/components/motion/DriftingBlob";

describe("motion primitives", () => {
  it("Reveal renders its children", () => {
    render(<Reveal>hello reveal</Reveal>);
    expect(screen.getByText("hello reveal")).toBeInTheDocument();
  });

  it("StaggerGroup renders each StaggerItem child", () => {
    render(
      <StaggerGroup>
        <StaggerItem>one</StaggerItem>
        <StaggerItem>two</StaggerItem>
      </StaggerGroup>,
    );
    expect(screen.getByText("one")).toBeInTheDocument();
    expect(screen.getByText("two")).toBeInTheDocument();
  });

  it("HoverCard renders its children", () => {
    render(<HoverCard>card body</HoverCard>);
    expect(screen.getByText("card body")).toBeInTheDocument();
  });

  it("DriftingBlob renders its children", () => {
    render(<DriftingBlob><span>blobby</span></DriftingBlob>);
    expect(screen.getByText("blobby")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- motion.test`
Expected: FAIL (modules not found).

- [ ] **Step 3: Implement `Reveal`**

Create `frontend/src/components/motion/Reveal.tsx`:

```tsx
"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/** Fade + gentle rise into view, once. */
export function Reveal({ children, delay = 0, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: Implement `StaggerGroup` / `StaggerItem`**

Create `frontend/src/components/motion/Stagger.tsx`:

```tsx
"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function StaggerGroup({
  children,
  className,
  stagger = 0.12,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 5: Implement `HoverCard`**

Create `frontend/src/components/motion/HoverCard.tsx`:

```tsx
"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

/** Soft lift + subtle scale on hover/tap. Gentle spring, no bounce overshoot. */
export function HoverCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 6: Implement `DriftingBlob`**

Create `frontend/src/components/motion/DriftingBlob.tsx`:

```tsx
"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

/**
 * Wraps decorative children (a Blob SVG, a dot/ring) in a slow, subtle,
 * infinite float + rotate loop. Purely ambient — never wrap content.
 */
export function DriftingBlob({
  children,
  className,
  duration = 10,
  distance = 14,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
}) {
  return (
    <motion.div
      className={className}
      aria-hidden
      animate={{ y: [0, -distance, 0], rotate: [0, 4, 0] }}
      transition={{ duration, ease: "easeInOut", repeat: Infinity }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 7: Run tests to verify they pass**

Run: `npm test -- motion.test`
Expected: PASS (4 tests).

- [ ] **Step 8: Commit**

```bash
git add frontend/src/components/motion
git commit -m "feat: add Reveal, Stagger, HoverCard, DriftingBlob motion primitives"
```

---

### Task 3: Palette tint utilities

**Files:**
- Modify: `frontend/src/app/globals.css:4-21`

**Interfaces:**
- Produces: CSS custom colours `--color-mustard-tint`, `--color-sage-tint` (very light washes), usable as Tailwind utilities `bg-mustard-tint`, `bg-sage-tint`, etc.

- [ ] **Step 1: Add tint variables to the `@theme` block**

In `frontend/src/app/globals.css`, inside the `@theme { ... }` block, add after the `--color-sage-dark` line (line 14):

```css
  --color-mustard-tint: #f6ead2;
  --color-sage-tint: #e7ece3;
```

- [ ] **Step 2: Verify the utilities compile**

Run: `npm run build`
Expected: build succeeds (Tailwind v4 generates `bg-mustard-tint` / `bg-sage-tint` from the theme vars).

- [ ] **Step 3: Commit**

```bash
git add frontend/src/app/globals.css
git commit -m "feat: add soft mustard/sage tint utilities for bento accents"
```

---

### Task 4: Hero — layered shapes, entrance motion, overlapping trust badge

**Files:**
- Modify: `frontend/src/components/home/Hero.tsx`
- Test: `frontend/src/components/home/__tests__/Hero.test.tsx` (existing — must still pass)

**Interfaces:**
- Consumes: `Reveal`, `DriftingBlob` (Task 2); existing `Blob`, `Button`, `homeCopy`, `waLink`.
- Note: Hero remains a Server Component; it renders client primitives as children. Keep the single `<h1>`, the WhatsApp CTA, and the `/services` link intact (existing tests assert these).

- [ ] **Step 1: Confirm existing Hero tests currently pass**

Run: `npm test -- Hero.test`
Expected: PASS (baseline before edit).

- [ ] **Step 2: Rewrite the Hero**

Replace the contents of `frontend/src/components/home/Hero.tsx`:

```tsx
import Image from "next/image";
import { MessageCircle, ArrowRight, Award } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { waLink } from "@/lib/site-config";
import { homeCopy } from "@/content/home";
import { Blob } from "@/components/illustrations/Blob";
import { Reveal } from "@/components/motion/Reveal";
import { DriftingBlob } from "@/components/motion/DriftingBlob";

export function Hero() {
  const { hero } = homeCopy;
  return (
    <section className="relative overflow-hidden px-5 pb-10 pt-20 sm:pt-28">
      {/* Ambient drifting shapes */}
      <DriftingBlob
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 text-mustard/30"
        duration={11}
      >
        <Blob className="h-full w-full" />
      </DriftingBlob>
      <DriftingBlob
        className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 text-sage/30"
        duration={13}
        distance={18}
      >
        <Blob className="h-full w-full" />
      </DriftingBlob>
      <DriftingBlob
        className="pointer-events-none absolute right-10 top-24 h-6 w-6 rounded-full bg-terracotta/30"
        duration={9}
        distance={12}
      >
        <span className="sr-only" />
      </DriftingBlob>
      <DriftingBlob
        className="pointer-events-none absolute left-12 bottom-24 h-4 w-4 rounded-full bg-mustard/40"
        duration={8}
        distance={10}
      >
        <span className="sr-only" />
      </DriftingBlob>

      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal>
          <h1 className="mx-auto max-w-3xl">{hero.h1}</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-muted">{hero.lede}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href={waLink("Hi IKC, I'd like to find out more about your classes.")}>
              <MessageCircle className="h-4 w-4" aria-hidden /> {hero.primaryCtaLabel}
            </Button>
            <Button href="/services" variant="ghost">
              {hero.secondaryCtaLabel} <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </Reveal>

        {/* Real class photo — faces not shown, keeping children's privacy. */}
        <Reveal delay={0.3}>
          <div className="relative mx-auto mt-14 max-w-3xl">
            <Image
              src="/media/IKC_Photo1.jpeg"
              alt="Children exploring colour together in a small-group finger-painting activity at Inclusive Kids Club"
              width={1600}
              height={1097}
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="h-auto w-full rounded-3xl border border-cream-dark object-cover shadow-soft-lg"
            />
            {/* Overlapping depth badge */}
            <div className="absolute -bottom-5 left-4 flex items-center gap-2 rounded-full border border-cream-dark bg-white/95 px-4 py-2 shadow-soft backdrop-blur sm:left-8">
              <Award className="h-5 w-5 text-terracotta" aria-hidden />
              <span className="font-heading text-sm font-semibold text-ink">
                DISE-Certified (NIE)
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Run Hero tests**

Run: `npm test -- Hero.test`
Expected: PASS (single h1, WhatsApp CTA, `/services` link all intact).

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/home/Hero.tsx
git commit -m "feat: layered hero with drifting shapes, entrance motion, depth badge"
```

---

### Task 5: TrustBar — staggered badge entrance + hover lift

**Files:**
- Modify: `frontend/src/components/home/TrustBar.tsx`
- Test: existing `frontend/src/components/home/__tests__/Hero.test.tsx` (TrustBar block must still pass)

**Interfaces:**
- Consumes: `StaggerGroup`, `StaggerItem`, `HoverCard` (Task 2); existing `Badge`, `items`.
- Note: keep the `DISE-Certified` text (existing test asserts it).

- [ ] **Step 1: Rewrite TrustBar**

Replace `frontend/src/components/home/TrustBar.tsx`:

```tsx
import { Award, ShieldCheck, Users, Home } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";

const items = [
  { icon: Award, label: "DISE-Certified (NIE)" },
  { icon: ShieldCheck, label: "Registered Singapore Business" },
  { icon: Users, label: "Small Group Classes" },
  { icon: Home, label: "Warm Home-Based Setting" },
];

export function TrustBar() {
  return (
    <section className="border-y border-cream-dark bg-cream-dark/30 px-5 py-8">
      <StaggerGroup className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-3">
        {items.map((it) => (
          <StaggerItem key={it.label}>
            <HoverCard>
              <Badge icon={it.icon}>{it.label}</Badge>
            </HoverCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
```

- [ ] **Step 2: Run tests**

Run: `npm test -- Hero.test`
Expected: PASS (DISE badge still found).

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/TrustBar.tsx
git commit -m "feat: stagger + hover-lift the trust bar badges"
```

---

### Task 6: Programmes — bento layout + hover + stagger reveal

**Files:**
- Modify: `frontend/src/components/home/ProgrammesSection.tsx`
- Test: existing `frontend/src/components/home/__tests__/BeliefProgrammes.test.tsx` (must still pass — a card per programme)

**Interfaces:**
- Consumes: `Reveal`, `StaggerGroup`, `StaggerItem`, `HoverCard`; existing `Section`, `Card`, `programmes`.
- Note: keep every `p.title` rendered. Bento = first programme featured (spans 2 columns on `lg`); reading order stays source order.

- [ ] **Step 1: Rewrite ProgrammesSection**

Replace `frontend/src/components/home/ProgrammesSection.tsx`:

```tsx
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { programmes } from "@/content/programmes";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";

export function ProgrammesSection() {
  return (
    <Section className="bg-cream-dark/20">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2>Small-group enrichment, built around your child</h2>
        <p className="mt-4">
          Weekly classes, workshops and holiday programmes across four areas —
          each taught in calm, small groups for children with special needs.
        </p>
      </Reveal>
      <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {programmes.map((p, i) => {
          const Icon = p.icon;
          const featured = i === 0;
          return (
            <StaggerItem
              key={p.slug}
              className={featured ? "lg:col-span-2 lg:row-span-2" : ""}
            >
              <HoverCard className="h-full">
                <Card
                  className={`flex h-full flex-col ${featured ? "bg-mustard-tint lg:justify-center" : ""}`}
                >
                  <span className="group inline-flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/10 transition-transform hover:scale-110">
                    <Icon className="h-6 w-6 text-terracotta" aria-hidden />
                  </span>
                  <h3 className={`mt-4 ${featured ? "text-2xl" : "text-xl"}`}>{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm">{p.blurb}</p>
                  <Link
                    href="/services"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-terracotta hover:text-terracotta-dark"
                  >
                    Learn more <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Card>
              </HoverCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
```

- [ ] **Step 2: Run tests**

Run: `npm test -- BeliefProgrammes.test`
Expected: PASS (a card for every programme title).

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/ProgrammesSection.tsx
git commit -m "feat: bento programmes grid with hover lift and stagger reveal"
```

---

### Task 7: TrustReasons — bento variety + hover + stagger reveal

**Files:**
- Modify: `frontend/src/components/home/TrustReasonsSection.tsx`
- Test: existing `frontend/src/components/home/__tests__/TrustFaqGuidesCta.test.tsx` (must still pass)

**Interfaces:**
- Consumes: `Reveal`, `StaggerGroup`, `StaggerItem`, `HoverCard`; existing `Section`, `homeCopy`.
- Note: keep every reason `title`/`body`. Alternate emphasis: index 0 and 3 span wider on `sm` for rhythm.

- [ ] **Step 1: Confirm baseline test passes**

Run: `npm test -- TrustFaqGuidesCta.test`
Expected: PASS.

- [ ] **Step 2: Rewrite TrustReasonsSection**

Replace `frontend/src/components/home/TrustReasonsSection.tsx`:

```tsx
import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { homeCopy } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";

export function TrustReasonsSection() {
  const { trustReasons } = homeCopy;
  return (
    <Section>
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2>{trustReasons.heading}</h2>
      </Reveal>
      <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-6">
        {trustReasons.reasons.map((r, i) => {
          const wide = i === 0 || i === 3;
          const accent = i % 2 === 1;
          return (
            <StaggerItem
              key={r.title}
              className={wide ? "sm:col-span-4" : "sm:col-span-2"}
            >
              <HoverCard className="h-full">
                <div
                  className={`flex h-full gap-4 rounded-2xl border border-cream-dark p-6 ${accent ? "bg-sage-tint" : "bg-white"}`}
                >
                  <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage/20">
                    <Check className="h-5 w-5 text-sage-dark" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-lg">{r.title}</h3>
                    <p className="mt-1 text-sm">{r.body}</p>
                  </div>
                </div>
              </HoverCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
```

- [ ] **Step 3: Run tests**

Run: `npm test -- TrustFaqGuidesCta.test`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/home/TrustReasonsSection.tsx
git commit -m "feat: bento trust-reasons grid with hover lift and stagger reveal"
```

---

### Task 8: Remaining home sections — scroll reveals

**Files:**
- Modify: `frontend/src/components/home/BeliefSection.tsx`
- Modify: `frontend/src/components/home/EducatorTeaser.tsx`
- Modify: `frontend/src/components/home/DayAtIkcSection.tsx`
- Modify: `frontend/src/components/home/FaqPreview.tsx`
- Modify: `frontend/src/components/home/GuidesTeaser.tsx`
- Modify: `frontend/src/components/home/ClosingCta.tsx`
- Test: existing home tests must still pass.

**Interfaces:**
- Consumes: `Reveal`, and for list/step grids `StaggerGroup`/`StaggerItem`/`HoverCard`.
- Note: This task applies a consistent, gentle pattern — do not change any copy or heading levels. For each file: wrap the section's heading/intro block in `<Reveal>`, and if it renders a grid/list of cards, wrap the grid in `<StaggerGroup>` and each item in `<StaggerItem>` (add `<HoverCard>` around card-like items). Read each file first and apply the wrappers around the existing JSX without altering the inner markup.

- [ ] **Step 1: Read all six files**

Run: read each of the six files listed above to capture their exact current JSX.

- [ ] **Step 2: Apply Reveal to each heading/intro block**

For every file, add at the top:
```tsx
import { Reveal } from "@/components/motion/Reveal";
```
Wrap the existing heading/intro container (the element currently holding the `<h2>`/`<h3>` and intro `<p>`) in `<Reveal className={...moved from that element}>`. Move the wrapper's layout classes onto the `Reveal` so layout is unchanged.

- [ ] **Step 3: Apply Stagger + HoverCard to card/step grids**

For files that render a grid or list (`BeliefSection` values, `DayAtIkcSection` steps, `GuidesTeaser` topics), add:
```tsx
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";
```
Replace the grid container element with `<StaggerGroup className={...its classes}>`, wrap each mapped item in `<StaggerItem key={...}>`, and wrap card-like items in `<HoverCard className="h-full">`. Keep every text node (titles/bodies) unchanged.

- [ ] **Step 4: Run the full home test suite**

Run: `npm test -- home`
Expected: PASS (all existing content assertions hold).

- [ ] **Step 5: Run the complete suite**

Run: `npm test`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/components/home
git commit -m "feat: gentle scroll reveals + stagger across remaining home sections"
```

---

### Task 9: Services page — reveals, stagger, hover, step count-in

**Files:**
- Modify: `frontend/src/app/services/page.tsx`
- Test: existing `frontend/src/app/services/__tests__/services-page.test.tsx` (must still pass)

**Interfaces:**
- Consumes: `Reveal`, `StaggerGroup`, `StaggerItem`, `HoverCard`.
- Note: keep all headings and content. Wrap each section's heading block in `Reveal`; wrap the three card grids (`teach`, `formats`, `howToJoin` steps) in `StaggerGroup`, each card/step in `StaggerItem` + `HoverCard`.

- [ ] **Step 1: Confirm baseline**

Run: `npm test -- services-page`
Expected: PASS.

- [ ] **Step 2: Apply the wrappers**

Add imports at the top of `frontend/src/app/services/page.tsx`:
```tsx
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";
```
Then, without changing any text:
- Wrap each `<div className="mx-auto max-w-3xl text-center">…</div>` heading block (and the top `<Section className="text-center">` inner content) in `<Reveal>`.
- Replace each grid container (`<div className="mt-12 grid …">` for `teach` and `formats`, and `<ol className="mt-12 grid …">` for `howToJoin`) with `<StaggerGroup className="…same classes…">` (keep `<ol>` semantics by passing no `as`; wrap the existing `<ol>` inside the StaggerGroup instead if simpler — preserve the ordered-list element).
- Wrap each mapped `<Card>`/`<li>` in `<StaggerItem key={…}>`, and card-like items additionally in `<HoverCard className="h-full">`.

- [ ] **Step 3: Run tests**

Run: `npm test -- services-page`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/app/services/page.tsx
git commit -m "feat: reveals, stagger and hover on the services page"
```

---

### Task 10: About, FAQ, Blog pages — scroll reveals

**Files:**
- Modify: `frontend/src/app/about/page.tsx`
- Modify: `frontend/src/app/faq/page.tsx`
- Modify: `frontend/src/app/blog/page.tsx`
- Modify (if it renders card/section lists): `frontend/src/components/about/FounderStory.tsx`, `frontend/src/components/about/WhatMakesDifferent.tsx`, `frontend/src/components/about/CredentialsExplained.tsx`
- Test: existing about/faq/blog page tests must still pass.

**Interfaces:**
- Consumes: `Reveal`, `StaggerGroup`, `StaggerItem`.
- Note: FAQ list items reveal on scroll (wrap the `<dl>` in `StaggerGroup`, each `<div>` FAQ entry in `StaggerItem`). About sections and blog list get `Reveal` on headings and stagger on any card lists. No copy changes.

- [ ] **Step 1: Read the page + about section files**

Run: read all files listed above to capture exact JSX.

- [ ] **Step 2: Apply Reveal to page headings/intros**

In each page, import `Reveal` and wrap the top `<Section className="text-center">` heading/intro content in `<Reveal>`.

- [ ] **Step 3: Stagger the FAQ list and blog list**

In `frontend/src/app/faq/page.tsx`, import `StaggerGroup`/`StaggerItem`, wrap the `<dl className="mx-auto max-w-3xl space-y-4">` in `<StaggerGroup className="mx-auto max-w-3xl space-y-4">` (moving classes) and each FAQ `<div>` in `<StaggerItem>`. Do the same pattern for the blog post list in `frontend/src/app/blog/page.tsx`.

- [ ] **Step 4: Apply Reveal to about sub-sections**

In each about component that renders a distinct block, wrap its outer content in `<Reveal>` (heading + body). Keep markup otherwise identical.

- [ ] **Step 5: Run the relevant tests**

Run: `npm test -- about faq blog`
Expected: PASS.

- [ ] **Step 6: Run full suite**

Run: `npm test`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add frontend/src/app/about frontend/src/app/faq frontend/src/app/blog frontend/src/components/about
git commit -m "feat: scroll reveals on about, faq and blog pages"
```

---

### Task 11: Header — scroll-reactive shrink + smooth mobile menu

**Files:**
- Modify: `frontend/src/components/layout/SiteHeader.tsx`
- Test: existing `frontend/src/components/layout/__tests__/SiteHeader.test.tsx` (must still pass)

**Interfaces:**
- Consumes: `motion/react` (`motion`, `AnimatePresence`), React `useState`/`useEffect`.
- Note: header is already a Client Component. Keep all nav links, the logo link, and the mobile menu toggle (existing tests). Add: (a) a scroll listener that sets a `scrolled` boolean past ~8px; when scrolled, reduce vertical padding and deepen shadow/background; (b) animate the mobile menu open/close with `AnimatePresence` + height/opacity.

- [ ] **Step 1: Confirm baseline test passes**

Run: `npm test -- SiteHeader.test`
Expected: PASS.

- [ ] **Step 2: Rewrite SiteHeader**

Replace `frontend/src/components/layout/SiteHeader.tsx`:

```tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig, waLink } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-cream-dark backdrop-blur transition-all duration-300 ${
        scrolled ? "bg-cream/95 shadow-soft" : "bg-cream/90"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <Link
          href="/"
          className="font-heading text-xl font-bold text-terracotta"
          onClick={() => setOpen(false)}
        >
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-ink hover:text-terracotta"
            >
              {item.label}
            </Link>
          ))}
          <Button href={waLink("Hi IKC, I'd like to ask about your classes.")} variant="primary">
            <MessageCircle className="h-4 w-4" aria-hidden /> Chat with us
          </Button>
        </nav>

        <button
          type="button"
          className="lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-nav"
            className="overflow-hidden border-t border-cream-dark bg-cream px-5 lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <ul className="flex flex-col gap-3 py-4">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-1 font-semibold text-ink hover:text-terracotta"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
```

- [ ] **Step 3: Run tests**

Run: `npm test -- SiteHeader.test`
Expected: PASS (nav links + toggle behavior preserved).

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/layout/SiteHeader.tsx
git commit -m "feat: scroll-reactive header shrink + animated mobile menu"
```

---

### Task 12: WhatsApp bubble — gentle attention pulse

**Files:**
- Modify: `frontend/src/components/layout/WhatsAppBubble.tsx`
- Test: existing `frontend/src/components/layout/__tests__/WhatsAppBubble.test.tsx` (must still pass)

**Interfaces:**
- Consumes: `motion/react` (`motion`).
- Note: keep the anchor's `href`, `aria-label`, and label text. Convert the `<a>` to `motion.a` with a slow, subtle scale pulse (respects reduced-motion via the app-wide `MotionConfig`).

- [ ] **Step 1: Confirm baseline test passes**

Run: `npm test -- WhatsAppBubble.test`
Expected: PASS.

- [ ] **Step 2: Rewrite WhatsAppBubble**

Replace `frontend/src/components/layout/WhatsAppBubble.tsx`:

```tsx
"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { waLink } from "@/lib/site-config";

export function WhatsAppBubble() {
  return (
    <motion.a
      href={waLink("Hi IKC, I need some help — I'd like to ask about your classes.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Need help? Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-heading font-semibold text-white shadow-soft-lg"
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle className="h-5 w-5" aria-hidden />
      <span className="hidden sm:inline">Need help? Chat with us</span>
    </motion.a>
  );
}
```

- [ ] **Step 3: Run tests + full suite**

Run: `npm test -- WhatsAppBubble.test`
Expected: PASS.
Run: `npm test`
Expected: PASS (entire suite green).

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/layout/WhatsAppBubble.tsx
git commit -m "feat: gentle attention pulse on the WhatsApp bubble"
```

---

### Task 13: Final verification

**Files:** none (verification only)

- [ ] **Step 1: Full test suite**

Run: `npm test`
Expected: PASS (all suites).

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: build completes, no type errors, all pages still statically/serverside rendered.

- [ ] **Step 3: Manual dev check (reduced-motion)**

Run: `npm run dev`, open the site, and verify:
- Hero shapes drift gently; badge overlaps the photo.
- Cards lift on hover; sections reveal on scroll; header shrinks on scroll.
- With OS "Reduce Motion" enabled, animations are suppressed/minimal.

If `.next` misbehaves after a prior build (known Turbopack cache gotcha), run `rm -rf .next` then `npm run dev` again.

- [ ] **Step 4: Commit any final tweaks**

```bash
git add -A
git commit -m "chore: motion redesign final polish"
```

---

## Self-Review Notes

- **Spec coverage:** Foundation/primitives (Tasks 1–2), palette tints (Task 3), hero (Task 4), trust bar (Task 5), programmes bento (Task 6), trust-reasons bento (Task 7), remaining home reveals (Task 8), services (Task 9), about/faq/blog (Task 10), header (Task 11), WhatsApp bubble (Task 12), verification (Task 13). All spec sections mapped.
- **Reduced-motion:** enforced once in Task 1 via `MotionConfig`; every later animation inherits it.
- **No invented stats:** trust bar (Task 5) animates existing badges only.
- **Type consistency:** primitive prop names (`children`, `className`, `delay`, `stagger`, `duration`, `distance`) are used identically wherever consumed.
- **SSR preserved:** only `motion/`, `SiteHeader`, `WhatsAppBubble`, `MotionProvider` carry `"use client"`; pages/sections stay server components.
