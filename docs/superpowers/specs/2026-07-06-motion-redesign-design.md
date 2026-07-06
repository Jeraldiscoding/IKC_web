# IKC Website — Motion & Structural Redesign

**Date:** 2026-07-06
**Status:** Approved, ready for planning

## Goal

The site is well-built but visually static and a little plain. Add a "fun,
attention-grabbing" layer — motion, depth, and bolder structure — inspired by
berriesworld.com, **while respecting that the audience is families of children
with special needs (SPED).** Motion must feel gentle and calming, never
hyperactive, and must honour `prefers-reduced-motion`.

## Constraints & Principles

- **Gentle & playful, not bold/energetic.** Smooth scroll-reveals, soft hover
  lifts, slow-drifting shapes, subtle icon nudges. No flashing, fast, or bouncy
  motion.
- **Accessibility first.** Every animation site-wide must respect the OS
  "reduce motion" setting. This is a hard requirement for the SPED audience.
- **Brand palette stays.** Terracotta / mustard / sage / cream (from the IKC
  logo) and fonts (Baloo / Inter) are locked. Only *softer tint variants* of
  existing colours may be added — no new hues.
- **No invented facts.** No fabricated stats/numbers (this is a live business
  site). Trust bar animates existing qualitative badges only.
- **Preserve SSR/SEO.** Pages and sections stay Server Components; motion lives
  in small Client Component primitives used as wrappers.
- **Preserve existing tests.** ~20 component tests exist; motion must not break
  RTL queries or content/DOM structure.
- **Hero moderate, not oversized.** Berries' hero is too big — keep IKC's hero
  roughly its current scale; add depth/motion, not size.

## Architecture

### New dependency
- `motion` (the modern Framer Motion package; import from `motion/react`). Only
  new runtime dependency.

### Motion primitives — `src/components/motion/`
All are Client Components (`"use client"`). They are the *only* new client
components; everything else stays server-rendered and passes them children.

- **`Reveal`** — fade + rise into view on scroll, animates once
  (`whileInView`, `viewport={{ once: true }}`). Wraps headings, paragraphs,
  cards. Accepts optional `delay`.
- **`StaggerGroup` / `StaggerItem`** — parent cascades children in sequence via
  `staggerChildren`. For card grids and lists.
- **`HoverCard`** — lift + shadow-grow + slight scale on hover/tap
  (`whileHover`, `whileTap`). Wraps cards at the section level; the base `Card`
  component itself stays a plain unchanged Server Component.
- **`DriftingBlob`** — wraps the existing `Blob` SVG in a slow (8–12s) subtle
  infinite float/rotate loop. Also used for small floating accent shapes
  (dots/rings).

### App-wide reduced-motion
Wrap the app in `<MotionConfig reducedMotion="user">` in `layout.tsx` so all
Motion animations respect the OS setting automatically — no per-component
opt-out needed.

### Testing support
Add an `IntersectionObserver` mock to `vitest.setup.ts` (JSDOM lacks it), so
scroll-triggered reveals don't throw in tests.

## Feature Areas

### 1. Hero (`components/home/Hero.tsx`)
- Keep roughly current scale and all copy. Add depth + motion, not size.
- Existing two blobs become `DriftingBlob`s (slow ambient float).
- Add 2–3 small floating accent shapes (dots/rings in mustard/sage) drifting
  gently in the background.
- Class photo: subtle scale-in + fade entrance, soft rounded frame.
- One small **overlapping trust badge** card anchored to a photo corner (e.g.
  "DISE-Certified (NIE)" + Award icon) that floats in slightly after the photo,
  adding depth.
- Headline + lede animate in on load with a short stagger.
- CTA hover: WhatsApp icon does a small wiggle; "Explore" arrow nudges right.

### 2. Card sections — bento + motion
Restructure uniform grids into varied bento rhythm; collapse to single column on
mobile without harming reading order / screen-reader order.

- **Programmes** (`ProgrammesSection.tsx`): bento with one featured (larger)
  card, rest around it. `HoverCard` lift; icon gentle scale/bounce on hover;
  stagger reveal on scroll.
- **Trust Reasons** (`TrustReasonsSection.tsx`): varied 2-col bento with
  alternating emphasis; same hover + stagger.
- **Services page** (`services/page.tsx`): "What we teach", "Formats", and
  "How to join" get `Reveal` + `StaggerGroup` + `HoverCard`. Numbered steps get
  a subtle count-in.

### 3. Trust bar (`components/home/TrustBar.tsx`)
- Existing 4 qualitative badges only — **no numbers invented.**
- Badges stagger in when scrolled into view; each icon does a subtle one-time
  pop/count-in; gentle hover lift per badge.

### 4. Header (`components/layout/SiteHeader.tsx`)
- Scroll-reactive sticky header: subtly shrinks padding and deepens
  shadow/background opacity after scrolling past the top.
- Mobile menu open/close: smooth height + fade transition instead of the current
  instant toggle.

### 5. Site-wide reveals
Apply `Reveal` / stagger consistently and gently to remaining sections and
pages so nothing feels static:
- Home: Belief, Day-at-IKC steps, Educator teaser, FAQ preview, Guides, Closing
  CTA.
- Other pages: About, FAQ (list items reveal on scroll), Blog.

### 6. WhatsApp bubble (`components/layout/WhatsAppBubble.tsx`)
- Subtle attention pulse on the floating bubble (reduced-motion respected) to
  gently draw the eye to the primary conversion action.

### 7. Palette tweak (small)
- Add 1–2 soft tint utilities (very light mustard/sage washes) derived from
  existing brand colours, for alternating section backgrounds and bento accent
  cards. Core terracotta/mustard/sage/cream unchanged.

## Out of Scope
- No copy/content changes.
- No new brand hues.
- No numeric stats/counters.
- No unrelated refactors beyond what these changes touch.

## Success Criteria
- Site feels alive and playful on scroll and hover, in a calm/gentle register.
- Hero has more depth (layered shapes, overlapping badge) at roughly current
  scale.
- Programmes & Trust Reasons render as bento layouts, responsive to single
  column on mobile.
- With OS "reduce motion" on, animations are suppressed/minimised site-wide.
- Existing test suite passes (with IntersectionObserver mock added); reading
  order and SEO/SSR preserved.
