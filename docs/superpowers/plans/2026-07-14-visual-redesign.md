# IKC Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the IKC home page with a media-first hero, a varied section rhythm, a horizontal scroll-rail gallery, and the SEO structured data the site is currently missing.

**Architecture:** Additive design primitives first (type scale, `Eyebrow`, `Card` variants, `WaveDivider`, `ScrollRail`), then section-by-section rewrites that consume them, then SEO. `Card` and `Section` changes default to today's appearance so `/about`, `/services`, `/faq` and `/blog` do not regress.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind v4 (`@theme` tokens in `globals.css`), `motion/react`, `lucide-react`, Vitest + Testing Library.

**Spec:** `docs/superpowers/specs/2026-07-14-visual-redesign-design.md`

## Global Constraints

- **No new dependencies.** `motion`, `lucide-react`, Tailwind v4 are sufficient.
- **No palette or font changes.** Baloo 2 (`--font-heading`) / Inter (`--font-body`) stay. Colour tokens in `globals.css` `@theme` stay.
- **Dummy data may appear in visible UI, but must NEVER enter JSON-LD.** Every dummy value carries a `// TODO(real-data)` comment. `localBusinessSchema()` must not emit `streetAddress`. Task 12 adds a test that enforces this.
- **Testimonials must render literal `[PLACEHOLDER]` text** — never realistic-looking fake quotes — and the section stays commented out of `page.tsx`.
- **All motion respects `prefers-reduced-motion`** via the existing `Reveal` / `Stagger` / `HoverCard` primitives and `motion-reduce:` utilities.
- **Working directory for all commands is `frontend/`.**
- **Tailwind class names must be static strings.** Never build a class by interpolation (`bg-${colour}`) — Tailwind cannot see it. Map variants to full class strings in a `Record`.
- **Base-layer heading colours are overridable.** `globals.css` `@layer base` sets `h1..h4 { text-ink }` and `p { text-ink-muted }`. A utility class on the element (e.g. `className="text-cream"`) wins over the base layer, so no `!important` is needed on dark tiles.
- Run the full suite with `npm test` before every commit.

---

### Task 1: Design primitives — type scale, `Eyebrow`, `Card` variants

**Files:**
- Modify: `frontend/src/app/globals.css:45-56`
- Create: `frontend/src/components/ui/Eyebrow.tsx`
- Modify: `frontend/src/components/ui/Card.tsx`
- Test: `frontend/src/components/ui/__tests__/Card.test.tsx` (create)
- Test: `frontend/src/components/ui/__tests__/Eyebrow.test.tsx` (create)

**Interfaces:**
- Produces: `Eyebrow({ children, className? }): JSX.Element` — renders a `<span>`.
- Produces: `Card({ children, className?, variant? })` where
  `type CardVariant = "elevated" | "tinted" | "outlined"`, default `"elevated"`
  (which is byte-for-byte today's appearance, so existing call sites are unaffected).

- [ ] **Step 1: Write the failing tests**

`frontend/src/components/ui/__tests__/Card.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "@/components/ui/Card";

describe("Card", () => {
  it("defaults to the elevated variant (white, bordered, shadowed)", () => {
    render(<Card>content</Card>);
    const el = screen.getByText("content");
    expect(el.className).toContain("bg-white");
    expect(el.className).toContain("shadow-soft");
  });

  it("renders a tinted variant without the white background", () => {
    render(<Card variant="tinted">tinted</Card>);
    const el = screen.getByText("tinted");
    expect(el.className).toContain("bg-mustard-tint");
    expect(el.className).not.toContain("bg-white");
  });

  it("renders an outlined variant", () => {
    render(<Card variant="outlined">outlined</Card>);
    expect(screen.getByText("outlined").className).toContain("border-cream-dark");
  });

  it("still appends a caller className", () => {
    render(<Card className="custom-x">c</Card>);
    expect(screen.getByText("c").className).toContain("custom-x");
  });
});
```

`frontend/src/components/ui/__tests__/Eyebrow.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Eyebrow } from "@/components/ui/Eyebrow";

describe("Eyebrow", () => {
  it("renders its label", () => {
    render(<Eyebrow>Our programmes</Eyebrow>);
    expect(screen.getByText("Our programmes")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- src/components/ui`
Expected: FAIL — `Eyebrow` module not found; `Card` rejects the `variant` prop.

- [ ] **Step 3: Create `Eyebrow`**

`frontend/src/components/ui/Eyebrow.tsx`:

```tsx
import type { ReactNode } from "react";

/** Small tracked label that sits above a section heading. */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block font-heading text-xs font-bold uppercase tracking-[0.18em] text-terracotta ${className}`}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 4: Add variants to `Card`**

Replace the whole of `frontend/src/components/ui/Card.tsx`:

```tsx
import type { ReactNode } from "react";

export type CardVariant = "elevated" | "tinted" | "outlined";

// `elevated` reproduces the pre-redesign Card exactly, so it stays the default
// and every existing call site keeps its current look.
const variants: Record<CardVariant, string> = {
  elevated: "border border-cream-dark bg-white shadow-soft",
  tinted: "border border-transparent bg-mustard-tint",
  outlined: "border-2 border-cream-dark bg-transparent",
};

export function Card({
  children,
  className = "",
  variant = "elevated",
}: {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
}) {
  return (
    <div className={`rounded-2xl p-6 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
```

- [ ] **Step 5: Grow the display type scale**

In `frontend/src/app/globals.css`, replace the `h1` and `h2` lines inside `@layer base`:

```css
  h1 { @apply text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl; }
  h2 { @apply text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl; }
```

- [ ] **Step 6: Run the full suite**

Run: `npm test`
Expected: PASS — including the pre-existing `Button`, `about`, `services` and `faq` suites, which prove the `Card` default did not regress.

- [ ] **Step 7: Commit**

```bash
git add src/app/globals.css src/components/ui/Card.tsx src/components/ui/Eyebrow.tsx src/components/ui/__tests__/Card.test.tsx src/components/ui/__tests__/Eyebrow.test.tsx
git commit -m "feat: display type scale, Eyebrow, Card variants"
```

---

### Task 2: `WaveDivider` and `ScrollRail`

**Files:**
- Create: `frontend/src/components/decor/WaveDivider.tsx`
- Create: `frontend/src/components/ui/ScrollRail.tsx`
- Test: `frontend/src/components/ui/__tests__/ScrollRail.test.tsx` (create)

**Interfaces:**
- Produces: `WaveDivider({ className?, flip? })` — decorative SVG. Fill comes from
  `currentColor`, so the caller sets the colour with a `text-*` utility.
- Produces: `ScrollRail({ children, label, className? })` — a `"use client"` snap-scroll
  container with an accessible region label and two desktop arrow buttons.

- [ ] **Step 1: Write the failing test**

`frontend/src/components/ui/__tests__/ScrollRail.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ScrollRail } from "@/components/ui/ScrollRail";

describe("ScrollRail", () => {
  it("exposes a labelled, keyboard-reachable scroll region", () => {
    render(
      <ScrollRail label="Photo gallery">
        <div>item one</div>
      </ScrollRail>,
    );
    const region = screen.getByRole("region", { name: "Photo gallery" });
    expect(region).toBeInTheDocument();
    expect(region).toHaveAttribute("tabindex", "0");
    expect(screen.getByText("item one")).toBeInTheDocument();
  });

  it("renders labelled scroll arrows that are safe to click", async () => {
    const user = userEvent.setup();
    render(
      <ScrollRail label="Photo gallery">
        <div>item</div>
      </ScrollRail>,
    );
    const next = screen.getByRole("button", { name: /scroll .* right/i });
    expect(screen.getByRole("button", { name: /scroll .* left/i })).toBeInTheDocument();
    // jsdom does not implement Element.scrollBy; the component must optional-call it.
    await user.click(next);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- ScrollRail`
Expected: FAIL — cannot resolve `@/components/ui/ScrollRail`.

- [ ] **Step 3: Create `ScrollRail`**

`frontend/src/components/ui/ScrollRail.tsx`:

```tsx
"use client";

import { useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Horizontal snap-scrolling strip. Native overflow scrolling does the work, so
 * touch drag and keyboard arrows come free; the buttons are a desktop nicety.
 */
export function ScrollRail({
  children,
  label,
  className = "",
}: {
  children: ReactNode;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const nudge = (direction: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    // Optional call: jsdom (and very old browsers) have no scrollBy.
    el.scrollBy?.({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className={`relative ${className}`}>
      <div
        ref={ref}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      {/* Edge fades hint that there is more to scroll. */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-cream to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-cream to-transparent"
        aria-hidden
      />

      <div className="mt-4 hidden justify-end gap-2 md:flex">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label={`Scroll ${label} left`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream-dark bg-white text-ink shadow-soft transition-transform hover:scale-105 active:scale-95 motion-reduce:transition-none"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label={`Scroll ${label} right`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream-dark bg-white text-ink shadow-soft transition-transform hover:scale-105 active:scale-95 motion-reduce:transition-none"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create `WaveDivider`**

`frontend/src/components/decor/WaveDivider.tsx`:

```tsx
/**
 * Organic arc between two colour bands, replacing a hard horizontal edge.
 * The path is filled with `currentColor`, so the caller picks the colour of the
 * band *below* the divider with a `text-*` utility.
 */
export function WaveDivider({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={`block h-10 w-full sm:h-16 ${flip ? "rotate-180" : ""}`}
      >
        <path
          d="M0,32 C240,80 480,0 720,24 C960,48 1200,80 1440,40 L1440,80 L0,80 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test -- ScrollRail`
Expected: PASS (2 tests).

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/ScrollRail.tsx src/components/decor/WaveDivider.tsx src/components/ui/__tests__/ScrollRail.test.tsx
git commit -m "feat: ScrollRail and WaveDivider primitives"
```

---

### Task 3: Brand logo in the header

**Files:**
- Create: `frontend/public/media/IKC_Logo.jpeg` (copied from `Images/IKC_Logo2.jpeg`)
- Modify: `frontend/src/components/layout/SiteHeader.tsx:32-38`
- Test: `frontend/src/components/layout/__tests__/SiteHeader.test.tsx` (modify)

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `/media/IKC_Logo.jpeg` — a public asset later reused by
  `organizationSchema()` in Task 12 and the OG image in Task 13.

- [ ] **Step 1: Copy the logo into `public/`**

From the repo root:

```bash
cp Images/IKC_Logo2.jpeg frontend/public/media/IKC_Logo.jpeg
```

- [ ] **Step 2: Write the failing test**

Append to `frontend/src/components/layout/__tests__/SiteHeader.test.tsx`, inside the existing
`describe("SiteHeader", ...)` block:

```tsx
  it("shows the IKC logo in the home link", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("img", { name: /inclusive kids club logo/i })).toBeInTheDocument();
  });
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm test -- SiteHeader`
Expected: FAIL — no accessible image named "Inclusive Kids Club logo".

- [ ] **Step 4: Render the logo**

In `frontend/src/components/layout/SiteHeader.tsx`, add the import at the top:

```tsx
import Image from "next/image";
```

and replace the home `<Link>` (currently lines 32-38) with:

```tsx
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/media/IKC_Logo.jpeg"
            alt="Inclusive Kids Club logo"
            width={40}
            height={40}
            priority
            className="h-9 w-9 rounded-full object-cover sm:h-10 sm:w-10"
          />
          <span className="font-heading text-lg font-bold text-terracotta sm:text-xl">
            {siteConfig.name}
          </span>
        </Link>
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test -- SiteHeader`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add public/media/IKC_Logo.jpeg src/components/layout/SiteHeader.tsx src/components/layout/__tests__/SiteHeader.test.tsx
git commit -m "feat: use the real IKC logo in the site header"
```

---

### Task 4: Media-first hero

**Files:**
- Modify: `frontend/src/content/home.ts:2-8`
- Modify: `frontend/src/components/home/Hero.tsx` (full rewrite)
- Create: `frontend/public/media/hero-poster.jpg` (first frame of `IKC_Vid2.mp4`)
- Test: `frontend/src/components/home/__tests__/Hero.test.tsx` (modify)

**Interfaces:**
- Consumes: `Eyebrow` (Task 1).
- Produces: `homeCopy.hero` gains `eyebrow: string`. `hero.h1` changes text but **must keep the
  phrase "special needs"** — `Hero.test.tsx` and `home.test.tsx` both assert on it.

**Why a poster:** a hero `<video>` can become the Largest Contentful Paint element and stall it on
video bytes. The poster paints instantly, and the layered still photo carries `priority`.

- [ ] **Step 1: Generate the poster frame**

From `frontend/`:

```bash
ffmpeg -i public/media/IKC_Vid2.mp4 -vf "select=eq(n\,0)" -q:v 3 -frames:v 1 public/media/hero-poster.jpg
```

If `ffmpeg` is not installed, run `brew install ffmpeg` first. Verify the file exists and is
non-empty: `ls -la public/media/hero-poster.jpg`.

- [ ] **Step 2: Write the failing test**

Replace the `describe("Hero", ...)` block in
`frontend/src/components/home/__tests__/Hero.test.tsx` with:

```tsx
describe("Hero", () => {
  it("renders exactly one h1 with the hero headline", () => {
    render(<Hero />);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0].textContent).toMatch(/special needs/i);
  });

  it("has a WhatsApp primary CTA and a link to services", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /whatsapp/i })).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me/6580231551"),
    );
    expect(screen.getByRole("link", { name: /explore our classes/i })).toHaveAttribute(
      "href",
      "/services",
    );
  });

  it("shows the class video above the fold, muted and autoplaying with a poster", () => {
    const { container } = render(<Hero />);
    const video = container.querySelector("video");
    expect(video).not.toBeNull();
    expect(video).toHaveAttribute("poster", "/media/hero-poster.jpg");
    expect(video).toHaveAttribute("playsinline");
    expect(video!.muted).toBe(true);
    expect(video!.autoplay).toBe(true);
    expect(video!.loop).toBe(true);
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm test -- Hero`
Expected: FAIL — `container.querySelector("video")` is `null`.

- [ ] **Step 4: Update the hero copy**

In `frontend/src/content/home.ts`, replace the `hero` block (lines 2-8) with:

```ts
  hero: {
    eyebrow: "DISE-Certified (NIE) SPED Educator",
    h1: "Special needs enrichment, in a warm home-based space in Singapore.",
    highlight: "safe, capable and included",
    lede: "Inclusive Kids Club runs small-group enrichment classes, workshops and school holiday programmes — led by a DISE-certified (NIE) SPED educator who believes every child deserves to feel safe, capable and included.",
    primaryCtaLabel: "Enquire on WhatsApp",
    secondaryCtaLabel: "Explore our classes",
  },
```

- [ ] **Step 5: Rewrite the hero**

Replace the whole of `frontend/src/components/home/Hero.tsx`:

```tsx
import Image from "next/image";
import { MessageCircle, ArrowRight, Award } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { waLink } from "@/lib/site-config";
import { homeCopy } from "@/content/home";
import { Blob } from "@/components/illustrations/Blob";
import { Reveal } from "@/components/motion/Reveal";
import { DriftingBlob } from "@/components/motion/DriftingBlob";

export function Hero() {
  const { hero } = homeCopy;
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-14 sm:pt-20">
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
        className="pointer-events-none absolute left-12 bottom-24 h-4 w-4 rounded-full bg-mustard/40"
        duration={8}
        distance={10}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <Reveal>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4">{hero.h1}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-lg lg:mx-0">{hero.lede}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Button href={waLink("Hi IKC, I'd like to find out more about your classes.")}>
                <MessageCircle className="h-4 w-4" aria-hidden /> {hero.primaryCtaLabel}
              </Button>
              <Button href="/services" variant="ghost">
                {hero.secondaryCtaLabel} <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Media: silent looping class clip in front, still photo layered behind for depth. */}
        <Reveal delay={0.15}>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -right-4 -top-6 hidden w-2/3 rotate-3 sm:block">
              <Image
                src="/media/IKC_Photo1.jpeg"
                alt=""
                width={1600}
                height={1097}
                priority
                sizes="(max-width: 1024px) 40vw, 300px"
                aria-hidden
                className="h-auto w-full rounded-2xl border border-cream-dark object-cover opacity-90 shadow-soft"
              />
            </div>

            <video
              className="relative aspect-[4/5] w-full rounded-3xl border border-cream-dark object-cover shadow-soft-lg"
              poster="/media/hero-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="A child playing an interactive learning game on the big screen at Inclusive Kids Club"
            >
              <source src="/media/IKC_Vid2.mp4" type="video/mp4" />
            </video>

            <div className="absolute -bottom-5 left-4 flex items-center gap-2 rounded-full border border-cream-dark bg-white/95 px-4 py-2 shadow-soft backdrop-blur">
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

Note the layered photo is `alt=""` + `aria-hidden`: it is pure decoration behind the video, and the
same photo already carries a descriptive alt in the gallery (Task 8). Announcing it twice would be
noise for a screen-reader user.

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm test -- Hero`
Expected: PASS (3 tests).

- [ ] **Step 7: Commit**

```bash
git add src/components/home/Hero.tsx src/content/home.ts src/components/home/__tests__/Hero.test.tsx public/media/hero-poster.jpg
git commit -m "feat: media-first hero with the class video above the fold"
```

---

### Task 5: Merge Belief + TrustReasons into `WhyIkcSection`

**Files:**
- Modify: `frontend/src/content/home.ts` (replace `belief` and `trustReasons` with `why`)
- Create: `frontend/src/components/home/WhyIkcSection.tsx`
- Delete: `frontend/src/components/home/BeliefSection.tsx`
- Delete: `frontend/src/components/home/TrustReasonsSection.tsx`
- Modify: `frontend/src/app/page.tsx`
- Test: `frontend/src/components/home/__tests__/WhyIkc.test.tsx` (create)
- Test: `frontend/src/components/home/__tests__/BeliefProgrammes.test.tsx` (drop the Belief block)
- Test: `frontend/src/components/home/__tests__/TrustFaqGuidesCta.test.tsx` (drop the TrustReasons block)

**Interfaces:**
- Consumes: `Eyebrow` (Task 1).
- Produces: `WhyIkcSection()`; `homeCopy.why = { eyebrow, heading, intro, values: {title, body}[], reasons: {title, body}[] }`.

- [ ] **Step 1: Write the failing test**

`frontend/src/components/home/__tests__/WhyIkc.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WhyIkcSection } from "@/components/home/WhyIkcSection";
import { homeCopy } from "@/content/home";

describe("WhyIkcSection", () => {
  it("renders the three promise blocks", () => {
    render(<WhyIkcSection />);
    expect(screen.getByText("Safe")).toBeInTheDocument();
    expect(screen.getByText("Capable")).toBeInTheDocument();
    expect(screen.getByText("Included")).toBeInTheDocument();
  });

  it("renders every supporting reason", () => {
    render(<WhyIkcSection />);
    for (const r of homeCopy.why.reasons) {
      expect(screen.getByText(r.title)).toBeInTheDocument();
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- WhyIkc`
Expected: FAIL — cannot resolve `@/components/home/WhyIkcSection`.

- [ ] **Step 3: Merge the content**

In `frontend/src/content/home.ts`, delete the `belief` block (lines 9-27) and the `trustReasons`
block (lines 44-52), and insert this `why` block in place of `belief`:

```ts
  why: {
    eyebrow: "Why Inclusive Kids Club",
    heading: "Every child deserves a place to feel safe, capable and included",
    intro:
      "That belief shapes everything here — from our small class sizes to the calm, home-based environment we teach in.",
    values: [
      {
        title: "Safe",
        body: "A calm, predictable, home-based environment where children can settle, focus and feel at ease.",
      },
      {
        title: "Capable",
        body: "Learning pitched to each child's pace, so progress feels achievable and every small win is celebrated.",
      },
      {
        title: "Included",
        body: "Small groups where every child belongs, is understood, and takes part — never left on the sidelines.",
      },
    ],
    reasons: [
      { title: "A qualified SPED educator", body: "DISE-certified (NIE) — trained specifically in special needs education." },
      { title: "Genuinely small groups", body: "Calm classes with individualised attention, not a crowded room." },
      { title: "A warm, home-based space", body: "Less clinical and less overwhelming than an institutional centre." },
      { title: "Hands-on, joyful learning", body: "Sensory, play-based activities that build real confidence." },
    ],
  },
```

- [ ] **Step 4: Create `WhyIkcSection`**

`frontend/src/components/home/WhyIkcSection.tsx`:

```tsx
import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { homeCopy } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export function WhyIkcSection() {
  const { why } = homeCopy;
  return (
    <Section glow="warm">
      <Reveal className="max-w-3xl">
        <Eyebrow>{why.eyebrow}</Eyebrow>
        <h2 className="mt-4">{why.heading}</h2>
        <p className="mt-4 text-lg">{why.intro}</p>
      </Reveal>

      {/* The promise, as three asymmetric editorial blocks with oversized numerals. */}
      <StaggerGroup className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-cream-dark bg-cream-dark sm:grid-cols-3">
        {why.values.map((v, i) => (
          <StaggerItem key={v.title} className="bg-cream p-8">
            <span
              className="font-heading text-5xl font-bold text-terracotta/25"
              aria-hidden
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-2xl text-terracotta">{v.title}</h3>
            <p className="mt-2 text-sm">{v.body}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* The concrete reasons, as supporting chips. */}
      <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2">
        {why.reasons.map((r) => (
          <StaggerItem
            key={r.title}
            className="flex gap-3 rounded-2xl bg-sage-tint/60 p-5"
          >
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage/25">
              <Check className="h-4 w-4 text-sage-dark" aria-hidden />
            </span>
            <div>
              <h3 className="text-base">{r.title}</h3>
              <p className="mt-1 text-sm">{r.body}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
```

The `gap-px` + `bg-cream-dark` parent with `bg-cream` children is a hairline-divider trick: the
parent's background shows through the 1px gaps as dividing lines, with no extra border elements.

- [ ] **Step 5: Delete the old sections and their tests**

```bash
git rm src/components/home/BeliefSection.tsx src/components/home/TrustReasonsSection.tsx
```

In `frontend/src/components/home/__tests__/BeliefProgrammes.test.tsx`, remove the
`import { BeliefSection }` line and the whole `describe("BeliefSection", ...)` block, leaving only
the `ProgrammesSection` describe.

In `frontend/src/components/home/__tests__/TrustFaqGuidesCta.test.tsx`, remove the
`import { TrustReasonsSection }` line and the whole `describe("TrustReasonsSection", ...)` block.

- [ ] **Step 6: Wire it into the page**

In `frontend/src/app/page.tsx`, replace the `BeliefSection` and `TrustReasonsSection` imports with
one `WhyIkcSection` import:

```tsx
import { WhyIkcSection } from "@/components/home/WhyIkcSection";
```

and in the JSX replace `<BeliefSection />` with `<WhyIkcSection />` and delete `<TrustReasonsSection />`.

- [ ] **Step 7: Run the full suite**

Run: `npm test`
Expected: PASS. `home.test.tsx` still finds one `h1` and the closing CTA.

- [ ] **Step 8: Commit**

```bash
git add -A src/components/home src/content/home.ts src/app/page.tsx
git commit -m "feat: merge Belief and TrustReasons into one WhyIkc section"
```

---

### Task 6: Programmes bento with per-programme colour

**Files:**
- Modify: `frontend/src/content/programmes.ts`
- Modify: `frontend/src/components/home/ProgrammesSection.tsx` (full rewrite)
- Test: `frontend/src/components/home/__tests__/BeliefProgrammes.test.tsx` (extend)
- Test: `frontend/src/content/__tests__/content.test.ts` (extend)

**Interfaces:**
- Consumes: `Eyebrow` (Task 1).
- Produces: `Programme` gains `accent: ProgrammeAccent` where
  `type ProgrammeAccent = "terracotta" | "mustard" | "sage" | "cream"`.
  `/services` reads `programmes` too — it does not use `accent`, so it is unaffected.

- [ ] **Step 1: Write the failing tests**

Append to `frontend/src/content/__tests__/content.test.ts`:

```ts
import { programmes } from "@/content/programmes";

describe("programmes accents", () => {
  it("gives every programme a distinct accent", () => {
    const accents = programmes.map((p) => p.accent);
    expect(accents).toHaveLength(programmes.length);
    expect(new Set(accents).size).toBe(programmes.length);
  });
});
```

(If `content.test.ts` already imports `describe`/`it`/`expect` and `programmes`, do not duplicate
the imports — just append the `describe` block.)

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- content`
Expected: FAIL — `Property 'accent' does not exist on type 'Programme'`.

- [ ] **Step 3: Add accents to the content**

In `frontend/src/content/programmes.ts`, extend the type and add one `accent` per programme:

```ts
export type ProgrammeAccent = "terracotta" | "mustard" | "sage" | "cream";

export type Programme = {
  slug: string;
  title: string;
  blurb: string;
  icon: LucideIcon;
  accent: ProgrammeAccent;
  details: string[];
};
```

Then add to each entry, in order: `functional-skills` → `accent: "terracotta"`,
`academics` → `accent: "mustard"`, `hands-on-learning` → `accent: "sage"`,
`holiday-programmes` → `accent: "cream"`.

- [ ] **Step 4: Rewrite `ProgrammesSection`**

Replace the whole of `frontend/src/components/home/ProgrammesSection.tsx`:

```tsx
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { programmes, type ProgrammeAccent } from "@/content/programmes";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";

// Full class strings, never interpolated — Tailwind must be able to see them.
const accents: Record<
  ProgrammeAccent,
  { tile: string; heading: string; body: string; iconWrap: string; icon: string; link: string }
> = {
  terracotta: {
    tile: "bg-terracotta border-terracotta",
    heading: "text-cream",
    body: "text-cream/85",
    iconWrap: "bg-cream/20",
    icon: "text-cream",
    link: "text-cream hover:text-white",
  },
  mustard: {
    tile: "bg-mustard-tint border-mustard/30",
    heading: "text-ink",
    body: "text-ink-muted",
    iconWrap: "bg-mustard/25",
    icon: "text-mustard-dark",
    link: "text-terracotta hover:text-terracotta-dark",
  },
  sage: {
    tile: "bg-sage-tint border-sage/30",
    heading: "text-ink",
    body: "text-ink-muted",
    iconWrap: "bg-sage/25",
    icon: "text-sage-dark",
    link: "text-terracotta hover:text-terracotta-dark",
  },
  cream: {
    tile: "bg-white border-cream-dark",
    heading: "text-ink",
    body: "text-ink-muted",
    iconWrap: "bg-terracotta/10",
    icon: "text-terracotta",
    link: "text-terracotta hover:text-terracotta-dark",
  },
};

export function ProgrammesSection() {
  return (
    <Section glow="cool">
      <Reveal className="max-w-3xl">
        <Eyebrow>Our programmes</Eyebrow>
        <h2 className="mt-4">Small-group enrichment, built around your child</h2>
        <p className="mt-4 text-lg">
          Weekly classes, workshops and holiday programmes across four areas — each
          taught in calm, small groups for children with special needs.
        </p>
      </Reveal>

      <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {programmes.map((p, i) => {
          const Icon = p.icon;
          const a = accents[p.accent];
          // The first tile is the hero of the bento: double width and height on lg.
          const featured = i === 0;
          return (
            <StaggerItem
              key={p.slug}
              className={featured ? "lg:col-span-2 lg:row-span-2" : ""}
            >
              <HoverCard className="h-full">
                <div
                  className={`flex h-full flex-col rounded-3xl border p-7 shadow-soft ${a.tile} ${featured ? "lg:justify-center lg:p-10" : ""}`}
                >
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${a.iconWrap}`}
                  >
                    <Icon className={`h-6 w-6 ${a.icon}`} aria-hidden />
                  </span>
                  <h3 className={`mt-5 ${a.heading} ${featured ? "text-3xl" : "text-xl"}`}>
                    {p.title}
                  </h3>
                  <p className={`mt-2 flex-1 ${a.body} ${featured ? "text-base" : "text-sm"}`}>
                    {p.blurb}
                  </p>
                  <Link
                    href="/services"
                    className={`mt-5 inline-flex items-center gap-1 text-sm font-semibold ${a.link}`}
                  >
                    Learn more <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
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

There are four programmes and four `Learn more` links all pointing at `/services`. That is fine for
sighted users (each is visually inside a titled tile) but ambiguous for a screen-reader user tabbing
through links out of context, so give each an accessible name that includes the programme:

replace the `<Link>` above with:

```tsx
                  <Link
                    href="/services"
                    aria-label={`Learn more about ${p.title}`}
                    className={`mt-5 inline-flex items-center gap-1 text-sm font-semibold ${a.link}`}
                  >
                    Learn more <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test -- content BeliefProgrammes`
Expected: PASS. The existing "renders a card for every programme" test still passes unchanged.

- [ ] **Step 6: Commit**

```bash
git add src/content/programmes.ts src/components/home/ProgrammesSection.tsx src/content/__tests__/content.test.ts
git commit -m "feat: programmes bento with per-programme colour identity"
```

---

### Task 7: "A day at IKC" as a connected timeline

**Files:**
- Modify: `frontend/src/components/home/DayAtIkcSection.tsx` (full rewrite)
- Test: `frontend/src/components/home/__tests__/EducatorDay.test.tsx` (extend)

**Interfaces:**
- Consumes: `Eyebrow` (Task 1).
- Produces: nothing new. `homeCopy.day` is unchanged.

- [ ] **Step 1: Write the failing test**

Append inside the existing `describe("DayAtIkcSection", ...)` block in
`frontend/src/components/home/__tests__/EducatorDay.test.tsx` (if there is no such describe block,
add one, importing `DayAtIkcSection` from `@/components/home/DayAtIkcSection`):

```tsx
  it("keeps the narrated video on controls rather than autoplaying it", () => {
    const { container } = render(<DayAtIkcSection />);
    const video = container.querySelector("video");
    expect(video).not.toBeNull();
    // This clip has narration — autoplaying audio is hostile.
    expect(video!.autoplay).toBe(false);
    expect(video).toHaveAttribute("controls");
  });
```

- [ ] **Step 2: Run the test to verify it fails or passes**

Run: `npm test -- EducatorDay`
Expected: PASS already (the current markup satisfies it). This test is a **regression guard** — it
locks in the autoplay distinction before the rewrite, so Step 3 cannot quietly break it.

- [ ] **Step 3: Rewrite the section as a timeline**

Replace the whole of `frontend/src/components/home/DayAtIkcSection.tsx`:

```tsx
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { homeCopy } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export function DayAtIkcSection() {
  const { day } = homeCopy;
  return (
    <Section glow="warm" className="bg-sage/10">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Narrated intro video — has audio, so it never autoplays. */}
        <Reveal>
          <video
            className="w-full rounded-3xl border border-cream-dark shadow-soft-lg"
            controls
            preload="metadata"
            playsInline
          >
            <source src="/media/IKC_ADay.mp4" type="video/mp4" />
            Your browser does not support embedded video. You can still reach us on
            WhatsApp to learn more about a day at Inclusive Kids Club.
          </video>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>Inside a session</Eyebrow>
            <h2 className="mt-4">{day.heading}</h2>
            <p className="mt-4 text-lg">{day.intro}</p>
          </Reveal>

          {/* Connected timeline: a vertical rule runs behind the numbered markers. */}
          <StaggerGroup as="ol" className="relative mt-10 space-y-6">
            <div
              className="absolute bottom-4 left-5 top-4 w-px bg-cream-dark"
              aria-hidden
            />
            {day.steps.map((step, i) => (
              <StaggerItem key={step.title} as="li" className="relative flex gap-5">
                <span className="relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream-dark bg-cream font-heading text-sm font-bold text-mustard-dark">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-1.5">
                  <h3 className="text-lg">{step.title}</h3>
                  <p className="mt-1 text-sm">{step.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 4: Run the tests to verify they still pass**

Run: `npm test -- EducatorDay`
Expected: PASS — the guard from Step 1 confirms the rewrite kept `controls` and no autoplay.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/DayAtIkcSection.tsx src/components/home/__tests__/EducatorDay.test.tsx
git commit -m "feat: a-day-at-IKC as a connected timeline"
```

---

### Task 8: Gallery on a horizontal scroll rail

**Files:**
- Create: `frontend/src/content/gallery.ts`
- Modify: `frontend/src/components/home/GallerySection.tsx` (full rewrite)
- Test: `frontend/src/components/home/__tests__/Gallery.test.tsx` (rewrite)

**Interfaces:**
- Consumes: `ScrollRail` (Task 2), `Eyebrow` (Task 1).
- Produces: `galleryItems: GalleryItem[]` where
  `type GalleryItem = { kind: "photo"; src: string; alt: string; aspect: string } | { kind: "video"; src: string; label: string; aspect: string }`.

Varied aspect ratios are the point: three identical 3:4 boxes read as a table, a tall-wide-tall
sequence reads as a gallery.

- [ ] **Step 1: Write the failing test**

Replace the whole of `frontend/src/components/home/__tests__/Gallery.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GallerySection } from "@/components/home/GallerySection";
import { galleryItems } from "@/content/gallery";

describe("GallerySection", () => {
  it("renders its heading", () => {
    render(<GallerySection />);
    expect(screen.getByRole("heading", { name: /a peek inside/i })).toBeInTheDocument();
  });

  it("puts the items in a labelled, scrollable rail", () => {
    render(<GallerySection />);
    expect(screen.getByRole("region", { name: /gallery/i })).toBeInTheDocument();
  });

  it("renders every photo with its alt text", () => {
    render(<GallerySection />);
    for (const item of galleryItems) {
      if (item.kind === "photo") {
        expect(screen.getByRole("img", { name: item.alt })).toBeInTheDocument();
      }
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- Gallery`
Expected: FAIL — cannot resolve `@/content/gallery`.

- [ ] **Step 3: Create the gallery content**

`frontend/src/content/gallery.ts`:

```ts
export type GalleryItem =
  | { kind: "photo"; src: string; alt: string; aspect: string }
  | { kind: "video"; src: string; label: string; aspect: string };

// Aspect ratios are deliberately mixed so the rail reads as a gallery rather
// than a table. `aspect` is a full Tailwind class — never interpolate it.
export const galleryItems: GalleryItem[] = [
  {
    kind: "photo",
    src: "/media/IKC_Photo2.jpeg",
    alt: "A child playing on a numbers-and-roads floor mat in the warm, home-based Inclusive Kids Club learning room",
    aspect: "aspect-[3/4]",
  },
  {
    kind: "photo",
    src: "/media/IKC_Photo1.jpeg",
    alt: "Children exploring colour together in a small-group finger-painting activity at Inclusive Kids Club",
    aspect: "aspect-[4/3]",
  },
  {
    kind: "video",
    src: "/media/IKC_Vid2.mp4",
    label: "A child playing an interactive learning game on the big screen at Inclusive Kids Club",
    aspect: "aspect-[3/4]",
  },
  {
    kind: "photo",
    src: "/media/IKC_Photo3.png",
    alt: "A child working through an addition activity on a large interactive touchscreen at Inclusive Kids Club",
    aspect: "aspect-[4/3]",
  },
];
```

- [ ] **Step 4: Rewrite `GallerySection`**

Replace the whole of `frontend/src/components/home/GallerySection.tsx`:

```tsx
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ScrollRail } from "@/components/ui/ScrollRail";
import { Reveal } from "@/components/motion/Reveal";
import { galleryItems } from "@/content/gallery";

export function GallerySection() {
  return (
    <Section glow="center">
      <Reveal className="max-w-3xl">
        <Eyebrow>Our space</Eyebrow>
        <h2 className="mt-4">A peek inside Inclusive Kids Club</h2>
        <p className="mt-4 text-lg">
          A warm, home-based space in Singapore where children learn through play,
          hands-on activities and gentle one-to-one support.
        </p>
      </Reveal>

      <ScrollRail label="Photo gallery" className="mt-10">
        {galleryItems.map((item) => (
          <figure
            key={item.src + item.aspect}
            className={`relative w-64 shrink-0 snap-start overflow-hidden rounded-2xl border border-cream-dark shadow-soft sm:w-80 ${item.aspect}`}
          >
            {item.kind === "photo" ? (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 16rem, 20rem"
                className="object-cover"
              />
            ) : (
              // Silent and decorative, so autoplay is safe here.
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={item.label}
              >
                <source src={item.src} type="video/mp4" />
              </video>
            )}
          </figure>
        ))}
      </ScrollRail>
    </Section>
  );
}
```

The rail's edge fades assume a `bg-cream` page background, which `<body>` provides — so this
`Section` must not carry a competing background class.

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test -- Gallery`
Expected: PASS (3 tests).

- [ ] **Step 6: Commit**

```bash
git add src/content/gallery.ts src/components/home/GallerySection.tsx src/components/home/__tests__/Gallery.test.tsx
git commit -m "feat: horizontal scroll-rail gallery with mixed media"
```

---

### Task 9: Schedule + ages section (dummy data)

**Files:**
- Modify: `frontend/src/content/home.ts` (add `schedule`)
- Create: `frontend/src/components/home/ScheduleSection.tsx`
- Modify: `frontend/src/app/page.tsx`
- Test: `frontend/src/components/home/__tests__/Schedule.test.tsx` (create)

**Interfaces:**
- Consumes: `Eyebrow` (Task 1), `Card` (Task 1).
- Produces: `ScheduleSection()`; `homeCopy.schedule`.

**Every value in this task is a placeholder.** It must be visibly marked in the source with
`TODO(real-data)` and must never reach JSON-LD (Global Constraints).

- [ ] **Step 1: Write the failing test**

`frontend/src/components/home/__tests__/Schedule.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScheduleSection } from "@/components/home/ScheduleSection";

describe("ScheduleSection", () => {
  it("renders the ages and the class times", () => {
    render(<ScheduleSection />);
    expect(screen.getByRole("heading", { name: /classes|schedule|when/i })).toBeInTheDocument();
    expect(screen.getByText(/ages/i)).toBeInTheDocument();
  });

  it("has a WhatsApp CTA to ask about a slot", () => {
    render(<ScheduleSection />);
    expect(screen.getByRole("link", { name: /whatsapp|ask|enquire/i })).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me/6580231551"),
    );
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- Schedule`
Expected: FAIL — cannot resolve `@/components/home/ScheduleSection`.

- [ ] **Step 3: Add the schedule content**

Append to the `homeCopy` object in `frontend/src/content/home.ts`, before the closing `} as const;`:

```ts
  // TODO(real-data): every value below is a placeholder. Replace with the real
  // ages, days and times before launch. These are rendered in the UI only —
  // they must never be copied into JSON-LD (see the design spec, §3).
  schedule: {
    eyebrow: "Classes & timings",
    heading: "When classes run",
    intro:
      "Small groups, capped so every child gets individual attention. Tell us your child's age and we'll point you to a suitable slot.",
    note: "Indicative timings — please message us to confirm current availability.",
    groups: [
      { ages: "Ages 4–6", times: "Weekdays, 10:00am – 12:00pm" }, // TODO(real-data)
      { ages: "Ages 7–9", times: "Weekdays, 3:00pm – 5:00pm" }, // TODO(real-data)
      { ages: "Ages 10–12", times: "Saturdays, 9:30am – 11:30am" }, // TODO(real-data)
    ],
    ctaLabel: "Ask about a slot on WhatsApp",
  },
```

- [ ] **Step 4: Create `ScheduleSection`**

`frontend/src/components/home/ScheduleSection.tsx`:

```tsx
import { Clock, MessageCircle, Users } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { homeCopy } from "@/content/home";
import { waLink } from "@/lib/site-config";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";

export function ScheduleSection() {
  const { schedule } = homeCopy;
  return (
    <Section glow="left">
      <Reveal className="max-w-3xl">
        <Eyebrow>{schedule.eyebrow}</Eyebrow>
        <h2 className="mt-4">{schedule.heading}</h2>
        <p className="mt-4 text-lg">{schedule.intro}</p>
      </Reveal>

      <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-3">
        {schedule.groups.map((g) => (
          <StaggerItem key={g.ages}>
            <HoverCard className="h-full">
              <Card className="h-full">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sage/20">
                  <Users className="h-5 w-5 text-sage-dark" aria-hidden />
                </span>
                <h3 className="mt-4 text-xl">{g.ages}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 shrink-0 text-mustard-dark" aria-hidden />
                  {g.times}
                </p>
              </Card>
            </HoverCard>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm italic">{schedule.note}</p>
        <Button href={waLink("Hi IKC, which class slot would suit my child?")}>
          <MessageCircle className="h-4 w-4" aria-hidden /> {schedule.ctaLabel}
        </Button>
      </Reveal>
    </Section>
  );
}
```

- [ ] **Step 5: Wire it into the page**

In `frontend/src/app/page.tsx`, import `ScheduleSection` and render it between `<GallerySection />`
and `<FaqPreview />`.

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm test -- Schedule`
Expected: PASS (2 tests).

- [ ] **Step 7: Commit**

```bash
git add src/components/home/ScheduleSection.tsx src/components/home/__tests__/Schedule.test.tsx src/content/home.ts src/app/page.tsx
git commit -m "feat: classes and timings section (placeholder data)"
```

---

### Task 10: FAQ preview as a native accordion

**Files:**
- Modify: `frontend/src/components/home/FaqPreview.tsx` (full rewrite)
- Test: `frontend/src/components/home/__tests__/TrustFaqGuidesCta.test.tsx` (extend)

**Interfaces:**
- Consumes: `Eyebrow` (Task 1).
- Produces: nothing new.

Native `<details>` / `<summary>` gives keyboard support, screen-reader semantics and open/close
state with zero JavaScript — a hand-rolled accordion would be strictly worse here.

- [ ] **Step 1: Write the failing test**

Add to the existing `describe("FaqPreview", ...)` block in
`frontend/src/components/home/__tests__/TrustFaqGuidesCta.test.tsx`:

```tsx
  it("renders each FAQ as a native disclosure with the first one open", () => {
    const { container } = render(<FaqPreview />);
    const details = container.querySelectorAll("details");
    expect(details.length).toBeGreaterThanOrEqual(4);
    expect(details[0]).toHaveAttribute("open");
    expect(details[1]).not.toHaveAttribute("open");
  });
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- TrustFaqGuidesCta`
Expected: FAIL — `details.length` is 0; the current markup is a `<dl>`.

- [ ] **Step 3: Rewrite `FaqPreview`**

Replace the whole of `frontend/src/components/home/FaqPreview.tsx`:

```tsx
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { homeCopy } from "@/content/home";
import { faqs } from "@/content/faqs";
import { Reveal } from "@/components/motion/Reveal";

export function FaqPreview() {
  const { faqPreview } = homeCopy;
  const preview = faqs.slice(0, 4);
  return (
    <Section glow="right" className="bg-cream-dark/20">
      <Reveal className="mx-auto max-w-3xl text-center">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="mt-4">{faqPreview.heading}</h2>
        <p className="mt-4 text-lg">{faqPreview.intro}</p>
      </Reveal>

      <div className="mx-auto mt-10 max-w-3xl space-y-3">
        {preview.map((f, i) => (
          <details
            key={f.question}
            // Open the first by default so the section never reads as a wall of
            // closed bars — the visitor sees an answer without clicking.
            open={i === 0}
            className="group rounded-2xl border border-cream-dark bg-white px-6 [&[open]]:pb-5"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-heading text-lg font-semibold text-ink marker:content-none">
              {f.question}
              <Plus
                className="h-5 w-5 shrink-0 text-terracotta transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                aria-hidden
              />
            </summary>
            <p className="text-sm">{f.answer}</p>
          </details>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/faq"
          className="inline-flex items-center gap-1 font-semibold text-terracotta hover:text-terracotta-dark"
        >
          See all FAQs <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </Section>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test -- TrustFaqGuidesCta`
Expected: PASS — including the pre-existing test that the first question renders and `/faq` is linked.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/FaqPreview.tsx src/components/home/__tests__/TrustFaqGuidesCta.test.tsx
git commit -m "feat: FAQ preview as a native accordion"
```

---

### Task 11: Testimonials section (built, placeholder, NOT rendered)

**Files:**
- Modify: `frontend/src/content/home.ts` (add `testimonials`)
- Create: `frontend/src/components/home/TestimonialsSection.tsx`
- Modify: `frontend/src/app/page.tsx` (add a commented-out reference only)
- Test: `frontend/src/components/home/__tests__/Testimonials.test.tsx` (create)

**Interfaces:**
- Consumes: `Eyebrow` (Task 1), `ScrollRail` (Task 2).
- Produces: `TestimonialsSection()`, exported but **not rendered**.

**Hard requirement:** the quotes must read as obvious placeholders. Do not write plausible-sounding
fake parent quotes — a realistic fake that ships is a trust and SEO liability, and there is no way
to tell it apart from a real one later.

- [ ] **Step 1: Write the failing test**

`frontend/src/components/home/__tests__/Testimonials.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import HomePage from "@/app/page";
import { homeCopy } from "@/content/home";

describe("TestimonialsSection", () => {
  it("renders a quote per testimonial", () => {
    const { container } = render(<TestimonialsSection />);
    expect(container.querySelectorAll("blockquote")).toHaveLength(
      homeCopy.testimonials.items.length,
    );
  });

  it("only ever contains obvious placeholder text, never a realistic fake quote", () => {
    for (const t of homeCopy.testimonials.items) {
      expect(t.quote).toContain("[PLACEHOLDER]");
    }
  });

  it("is NOT rendered on the home page until real quotes exist", () => {
    render(<HomePage />);
    expect(screen.queryByText(/\[PLACEHOLDER\]/)).not.toBeInTheDocument();
  });
});
```

That third test is the important one: it is what stops a placeholder from silently shipping.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- Testimonials`
Expected: FAIL — cannot resolve `@/components/home/TestimonialsSection`.

- [ ] **Step 3: Add the placeholder content**

Append to `homeCopy` in `frontend/src/content/home.ts`, before the closing `} as const;`:

```ts
  // TODO(real-data): placeholder quotes. The section is deliberately NOT rendered
  // in app/page.tsx. Replace `quote` and `attribution` with REAL parent words and
  // only then uncomment <TestimonialsSection /> there. Never ship an invented quote.
  testimonials: {
    eyebrow: "Parent voices",
    heading: "What families say",
    items: [
      { quote: "[PLACEHOLDER] Real parent quote goes here.", attribution: "[PLACEHOLDER] Parent name, child's age" },
      { quote: "[PLACEHOLDER] Real parent quote goes here.", attribution: "[PLACEHOLDER] Parent name, child's age" },
      { quote: "[PLACEHOLDER] Real parent quote goes here.", attribution: "[PLACEHOLDER] Parent name, child's age" },
    ],
  },
```

- [ ] **Step 4: Create `TestimonialsSection`**

`frontend/src/components/home/TestimonialsSection.tsx`:

```tsx
import { Quote } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ScrollRail } from "@/components/ui/ScrollRail";
import { homeCopy } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Built and styled, but NOT rendered on the home page — the quotes are
 * placeholders. Uncomment <TestimonialsSection /> in app/page.tsx only once
 * homeCopy.testimonials holds real parent words.
 */
export function TestimonialsSection() {
  const { testimonials } = homeCopy;
  return (
    <Section glow="cool">
      <Reveal className="max-w-3xl">
        <Eyebrow>{testimonials.eyebrow}</Eyebrow>
        <h2 className="mt-4">{testimonials.heading}</h2>
      </Reveal>

      <ScrollRail label="Parent testimonials" className="mt-10">
        {testimonials.items.map((t, i) => (
          <blockquote
            key={i}
            className="flex w-80 shrink-0 snap-start flex-col rounded-3xl border border-cream-dark bg-white p-7 shadow-soft sm:w-96"
          >
            <Quote className="h-8 w-8 text-terracotta/30" aria-hidden />
            <p className="mt-4 flex-1 text-ink">{t.quote}</p>
            <footer className="mt-5 font-heading text-sm font-semibold text-ink-muted">
              {t.attribution}
            </footer>
          </blockquote>
        ))}
      </ScrollRail>
    </Section>
  );
}
```

- [ ] **Step 5: Leave the commented-out hook in the page**

In `frontend/src/app/page.tsx`, add this **as a comment only** between `<FaqPreview />` and
`<GuidesTeaser />` — do not add an import, which would fail lint as unused:

```tsx
      {/* Testimonials are built but withheld until real parent quotes exist.
          To enable: import { TestimonialsSection } from "@/components/home/TestimonialsSection";
          fill in homeCopy.testimonials with real words, then render <TestimonialsSection /> here. */}
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm test -- Testimonials`
Expected: PASS (3 tests), including the guard that no `[PLACEHOLDER]` reaches the home page.

- [ ] **Step 7: Commit**

```bash
git add src/components/home/TestimonialsSection.tsx src/components/home/__tests__/Testimonials.test.tsx src/content/home.ts src/app/page.tsx
git commit -m "feat: testimonials section, withheld until real quotes exist"
```

---

### Task 12: Structured data — Organization logo, Course, VideoObject

**Files:**
- Modify: `frontend/src/lib/seo.ts`
- Create: `frontend/src/lib/course-schema.ts`
- Create: `frontend/src/lib/video-schema.ts`
- Modify: `frontend/src/app/page.tsx`
- Test: `frontend/src/lib/__tests__/seo.test.ts` (extend)
- Test: `frontend/src/lib/__tests__/course-video-schema.test.ts` (create)

**Interfaces:**
- Consumes: `/media/IKC_Logo.jpeg` (Task 3); `programmes` (Task 6).
- Produces: `localBusinessSchema()` (gains `logo`, `areaServed`), `courseSchema()`,
  `videoSchemas()`.

- [ ] **Step 1: Write the failing tests**

Append to `frontend/src/lib/__tests__/seo.test.ts`:

```ts
describe("localBusinessSchema — placeholder safety", () => {
  it("never emits a streetAddress while the address is a placeholder", () => {
    const schema = localBusinessSchema() as Record<string, Record<string, unknown>>;
    // siteConfig.address is still "[Unit address, Singapore]". A fabricated street
    // address in LocalBusiness JSON-LD is exactly what Google penalises as local-SEO
    // spam, so it must stay out of the schema until a real one exists.
    expect(schema.address.streetAddress).toBeUndefined();
    expect(JSON.stringify(schema)).not.toContain("[Unit address");
  });

  it("carries the organisation logo and the area served", () => {
    const schema = localBusinessSchema() as Record<string, unknown>;
    expect(schema.logo).toContain("/media/IKC_Logo.jpeg");
    expect(schema.areaServed).toBeDefined();
  });
});
```

`frontend/src/lib/__tests__/course-video-schema.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { courseSchema } from "@/lib/course-schema";
import { videoSchemas } from "@/lib/video-schema";
import { programmes } from "@/content/programmes";
import { siteConfig } from "@/lib/site-config";

describe("courseSchema", () => {
  it("emits an ItemList with one Course per programme", () => {
    const schema = courseSchema() as Record<string, unknown>;
    expect(schema["@type"]).toBe("ItemList");
    const items = schema.itemListElement as Array<Record<string, unknown>>;
    expect(items).toHaveLength(programmes.length);
    expect(items[0].name).toBe(programmes[0].title);
  });

  it("names the provider without inventing dates or prices", () => {
    const items = (courseSchema() as Record<string, unknown>)
      .itemListElement as Array<Record<string, Record<string, unknown>>>;
    expect(items[0].provider.name).toBe(siteConfig.name);
    expect(items[0].startDate).toBeUndefined();
    expect(items[0].offers).toBeUndefined();
  });
});

describe("videoSchemas", () => {
  it("emits a VideoObject per real video with an absolute contentUrl", () => {
    const videos = videoSchemas();
    expect(videos).toHaveLength(2);
    for (const v of videos) {
      const obj = v as Record<string, unknown>;
      expect(obj["@type"]).toBe("VideoObject");
      expect(obj.name).toBeTruthy();
      expect(obj.contentUrl as string).toContain(siteConfig.url);
      expect(obj.thumbnailUrl).toBeTruthy();
    }
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- seo course-video-schema`
Expected: FAIL — cannot resolve `@/lib/course-schema`; `schema.logo` is undefined.

- [ ] **Step 3: Extend `localBusinessSchema`**

In `frontend/src/lib/seo.ts`, replace `localBusinessSchema` with:

```ts
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/media/IKC_Logo.jpeg`,
    image: `${siteConfig.url}/media/IKC_Photo1.jpeg`,
    email: siteConfig.email,
    telephone: `+${siteConfig.whatsapp.intl}`,
    // NOTE: no `streetAddress`. siteConfig.address is still a placeholder, and a
    // fabricated address in LocalBusiness JSON-LD is a Google local-spam signal.
    // Add `streetAddress: siteConfig.address` ONLY once it holds a real address.
    address: {
      "@type": "PostalAddress",
      addressCountry: "SG",
      addressLocality: "Singapore",
    },
    areaServed: { "@type": "Country", name: "Singapore" },
    sameAs: [siteConfig.instagram],
  };
}
```

- [ ] **Step 4: Create the Course schema**

`frontend/src/lib/course-schema.ts`:

```ts
import { siteConfig } from "@/lib/site-config";
import { programmes } from "@/content/programmes";

/**
 * One Course per programme, wrapped in an ItemList.
 * Deliberately omits `startDate`, `offers` and age ranges — we have no real
 * schedule or pricing, and inventing them would be structured-data spam.
 */
export function courseSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: programmes.map((p, i) => ({
      "@type": "Course",
      position: i + 1,
      name: p.title,
      description: p.blurb,
      url: `${siteConfig.url}/services`,
      provider: {
        "@type": "EducationalOrganization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    })),
  };
}
```

- [ ] **Step 5: Create the VideoObject schema**

`frontend/src/lib/video-schema.ts`:

```ts
import { siteConfig } from "@/lib/site-config";

/**
 * The site hosts two real videos. Without VideoObject markup they earn no search
 * credit at all — this is the cheapest SEO win available to us.
 *
 * `uploadDate` is required by Google. These are the dates the clips were added to
 * the repo, which is honest and verifiable — do not invent a more flattering one.
 */
const videos = [
  {
    name: "A day at Inclusive Kids Club",
    description:
      "A short tour of a session at Inclusive Kids Club — how a small-group enrichment class for children with special needs actually runs, from settling in to winding down.",
    contentUrl: "/media/IKC_ADay.mp4",
    thumbnailUrl: "/media/IKC_Photo1.jpeg",
    uploadDate: "2026-07-06",
  },
  {
    name: "Interactive learning at Inclusive Kids Club",
    description:
      "A child playing an interactive learning game on the big screen during a small-group class at Inclusive Kids Club in Singapore.",
    contentUrl: "/media/IKC_Vid2.mp4",
    thumbnailUrl: "/media/hero-poster.jpg",
    uploadDate: "2026-07-06",
  },
];

export function videoSchemas() {
  return videos.map((v) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.name,
    description: v.description,
    contentUrl: `${siteConfig.url}${v.contentUrl}`,
    thumbnailUrl: `${siteConfig.url}${v.thumbnailUrl}`,
    uploadDate: v.uploadDate,
  }));
}
```

- [ ] **Step 6: Emit them on the home page**

In `frontend/src/app/page.tsx`, add the imports:

```tsx
import { courseSchema } from "@/lib/course-schema";
import { videoSchemas } from "@/lib/video-schema";
```

and render them next to the existing `<JsonLd>` calls:

```tsx
      <JsonLd data={courseSchema()} />
      {videoSchemas().map((v, i) => (
        <JsonLd key={i} data={v} />
      ))}
```

- [ ] **Step 7: Run the tests to verify they pass**

Run: `npm test -- seo course-video-schema`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/lib/seo.ts src/lib/course-schema.ts src/lib/video-schema.ts src/lib/__tests__ src/app/page.tsx
git commit -m "feat: Organization logo, Course and VideoObject structured data"
```

---

### Task 13: Open Graph image + closing CTA polish

**Files:**
- Create: `frontend/src/app/opengraph-image.tsx`
- Modify: `frontend/src/components/CtaBand.tsx`
- Test: `frontend/src/components/__tests__/CtaBand.test.tsx` (verify it still passes)

**Interfaces:**
- Consumes: `siteConfig`.
- Produces: a generated OG image at `/opengraph-image` for every page (Next.js file convention).

Right now a link shared on WhatsApp — the channel IKC's parents actually use — renders as a bare
grey box. This is the highest-leverage social fix on the site.

- [ ] **Step 1: Create the OG image route**

`frontend/src/app/opengraph-image.tsx`:

```tsx
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} — enrichment for children with special needs in Singapore`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#f7efe6",
        }}
      >
        <div
          style={{
            fontSize: 30,
            fontWeight: 600,
            color: "#d9542e",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 66,
            lineHeight: 1.1,
            fontWeight: 700,
            color: "#3a2e27",
          }}
        >
          Special needs enrichment, in a warm home-based space in Singapore.
        </div>
        <div style={{ marginTop: 32, fontSize: 30, color: "#6b5d53" }}>
          Small-group classes · DISE-certified (NIE) SPED educator
        </div>
      </div>
    ),
    size,
  );
}
```

**Note:** `next/og` supports only a subset of CSS, and every element needs an explicit `display`.
Keep the inline styles above as written rather than reaching for Tailwind classes, which do not
apply inside `ImageResponse`.

- [ ] **Step 2: Verify the OG image builds**

Run: `npm run build`
Expected: build succeeds, and the output lists `/opengraph-image` as a generated route.

- [ ] **Step 3: Strengthen the closing CTA band**

Read `frontend/src/components/CtaBand.tsx` first. Keep its existing props
(`heading`, `body`, `ctaLabel`, `message`) and its existing WhatsApp link exactly as they are —
`CtaBand.test.tsx` and `TrustFaqGuidesCta.test.tsx` both assert on the `wa.me` href, and `/about`,
`/services` and `/faq` all render this same component.

Restyle only: make the band full-bleed terracotta with cream text, round the top corners, and set
the heading and body colours explicitly (`text-cream` / `text-cream/85`) so they override the
base-layer `text-ink` / `text-ink-muted`.

- [ ] **Step 4: Run the full suite**

Run: `npm test`
Expected: PASS — every suite, including `CtaBand`, `about`, `services` and `faq`.

- [ ] **Step 5: Commit**

```bash
git add src/app/opengraph-image.tsx src/components/CtaBand.tsx
git commit -m "feat: Open Graph image and a stronger closing CTA band"
```

---

### Task 14: Final wiring, wave dividers, and verification

**Files:**
- Modify: `frontend/src/app/page.tsx`
- Modify: `frontend/src/components/home/TrustBar.tsx`

**Interfaces:**
- Consumes: everything above.

- [ ] **Step 1: Confirm the final page order**

`frontend/src/app/page.tsx` should render, in this order: `<Hero />`, `<TrustBar />`,
`<WhyIkcSection />`, `<ProgrammesSection />`, `<EducatorTeaser />`, `<DayAtIkcSection />`,
`<GallerySection />`, `<ScheduleSection />`, `<FaqPreview />`, the testimonials comment,
`<GuidesTeaser />`, `<ClosingCta />` — plus the four `<JsonLd>` emissions.

- [ ] **Step 2: Slim the TrustBar**

In `frontend/src/components/home/TrustBar.tsx`, change the section padding from `py-8` to `py-5`
and add `bg-cream-dark/40` in place of `bg-cream-dark/30`, so it reads as a distinct band directly
under the hero rather than an extension of it. Leave the badges and the stagger untouched — the
existing `TrustBar` test asserts the DISE badge renders.

- [ ] **Step 3: Add a wave divider before the closing CTA**

In `frontend/src/app/page.tsx`, import `WaveDivider` and place it immediately before
`<ClosingCta />`, coloured to match the terracotta band below it:

```tsx
import { WaveDivider } from "@/components/decor/WaveDivider";
```

```tsx
      <WaveDivider className="text-terracotta" />
      <ClosingCta />
```

- [ ] **Step 4: Run the full suite**

Run: `npm test`
Expected: PASS, all suites.

- [ ] **Step 5: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 6: Production build**

Run: `npm run build`
Expected: success.

**Turbopack gotcha:** if the next `npm run dev` after a build throws a cache/manifest error, clear
the dev cache with `rm -rf .next` and start again. This is a known quirk in this project, not a
regression you introduced.

- [ ] **Step 7: Look at the actual page**

Run: `rm -rf .next && npm run dev`, open `http://localhost:3000`, and check with your own eyes:

1. The hero video is visible **without scrolling** on a laptop viewport (~1440x900).
2. The gallery rail scrolls horizontally — by drag, by arrow buttons, and by keyboard.
3. No `[PLACEHOLDER]` text appears anywhere on the page.
4. The four programme tiles are visibly different colours, and text on the terracotta tile is
   readable (cream on terracotta, not ink on terracotta).
5. Toggle "Reduce motion" in the OS and reload — nothing animates, and nothing is invisible.

Tests passing is not the same as the page looking right. Do this step.

- [ ] **Step 8: Commit**

```bash
git add src/app/page.tsx src/components/home/TrustBar.tsx
git commit -m "feat: final home page wiring and wave divider"
```

---

## Self-Review

**Spec coverage:**

| Spec section | Task |
|---|---|
| §4 type scale, Eyebrow, Card variants | 1 |
| §4 WaveDivider, ScrollRail | 2, 14 |
| §5.1 media-first hero | 4 |
| §5.2 TrustBar restyle | 14 |
| §5.3 WhyIkcSection merge | 5 |
| §5.4 Programmes bento + accents | 6 |
| §5.5 EducatorTeaser credential chips | **gap — see below** |
| §5.6 Day timeline | 7 |
| §5.7 Gallery scroll rail | 8 |
| §5.8 ScheduleSection | 9 |
| §5.9 FAQ accordion | 10 |
| §5.10 Testimonials (withheld) | 11 |
| §5.12 ClosingCta | 13 |
| §6 logo in header | 3 |
| §6 LocalBusiness / Organization / Course / VideoObject | 12 |
| §6 OG image | 13 |
| §6 breadcrumbs | **dropped — see below** |
| §3 placeholder policy | 9, 11, 12 (enforced by tests) |
| §7 a11y & perf | 2, 4, 7, 10, 14 |
| §8 testing | every task |

**Two deviations from the spec, both deliberate:**

1. **EducatorTeaser credential chips (§5.5) dropped.** The DISE credential now appears in the hero
   eyebrow, the hero badge, and the TrustBar. A fourth repetition on the same page is noise, not
   trust. The section keeps its current two-column layout, which already works.
2. **Breadcrumbs (§6) dropped from this plan.** They belong on the *inner* pages (`/about`,
   `/services`, `/faq`, `/blog`), which this plan does not otherwise touch. Adding them here would
   smear scope across pages for a marginal SEO gain. Worth a small follow-up plan.

**Placeholder scan:** no TBDs. Every code step carries complete, runnable code. The only
intentional "incomplete" content is the `[PLACEHOLDER]` testimonial copy, which §3 requires and
which Task 11's third test actively prevents from reaching the page.

**Type consistency:** `CardVariant` (Task 1) → used in 9. `ScrollRail({children,label,className})`
(Task 2) → consumed identically in 8 and 11. `ProgrammeAccent` (Task 6) → the `accents` Record keys
match the four values exactly. `homeCopy.why` (Task 5), `.schedule` (Task 9), `.testimonials`
(Task 11) are each defined once and read under the same names. `/media/IKC_Logo.jpeg` (Task 3) is
the same path used in `localBusinessSchema` (Task 12). `/media/hero-poster.jpg` (Task 4) is the same
path used as a `thumbnailUrl` in `video-schema.ts` (Task 12).
