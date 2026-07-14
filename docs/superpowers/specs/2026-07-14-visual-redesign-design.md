# IKC Visual Redesign — Design Spec

Date: 2026-07-14
Branch: `motion-redesign` (continues from the motion work already merged there)

## 1. Problem

The site is structurally sound (Next.js 16 App Router, Tailwind v4 theme tokens, `motion/react`
primitives, JSON-LD on every page) but visually monotonous, and it buries its strongest asset.

Concretely:

1. **Repeated section skeleton.** `BeliefSection`, `ProgrammesSection`, `DayAtIkcSection`,
   `GallerySection`, `TrustReasonsSection` and `GuidesTeaser` all render the same bone structure:
   centered `h2`, centered lede, then a grid of `Card` (white, `rounded-2xl`, `shadow-soft`).
   Six consecutive sections with identical rhythm is what reads as "plain" — not the palette,
   which is fine.
2. **Hero buries its media.** `Hero.tsx` is a centered text column; the photo sits below the CTAs
   at `mt-14`. Above the fold on a 1440x900 laptop a visitor sees a headline, a paragraph and two
   buttons — no children, no room, no video.
3. **Duplicated argument.** `BeliefSection` ("Safe / Capable / Included") and `TrustReasonsSection`
   ("Why families choose IKC") make the same case twice, ~400px apart.
4. **Static 3-up gallery.** `GallerySection` hard-codes exactly three tiles; it cannot grow.
5. **Unused brand asset.** `Images/IKC_Logo2.jpeg` exists but `SiteHeader` renders the site name as
   plain text.
6. **SEO left on the table.** `siteConfig.address` is the literal placeholder
   `"[Unit address, Singapore]"`; there is no `Organization` logo, no `Course` schema, no
   `VideoObject` schema despite two real videos, no OG image, and no breadcrumbs.

## 2. Goals

- Give the page a **deliberate rhythm** — alternate centered / asymmetric / full-bleed / rail —
  so consecutive sections stop looking alike.
- Put **video and photography above the fold** in the hero.
- Make the gallery a **horizontal snap-scroll rail** that scales past three items.
- Raise visual craft to "confident & editorial": real display type scale, section eyebrows,
  organic wave dividers, card variants, per-programme colour identity.
- Close the SEO gaps that cost real search traffic.

### Non-goals

- No change to the palette or the font pairing (Baloo 2 / Inter). Both work.
- No new dependencies. `motion`, `lucide-react`, Tailwind v4 are sufficient.
- No pricing section (no real data).
- No redesign of `/about`, `/services`, `/faq`, `/blog` beyond what falls out of shared
  primitives (`Section`, `Card`, `Button`) changing underneath them.

## 3. Placeholder data policy

The user has no real address, age groups or class times yet, and asked for dummy values.

**Rule: dummy data may appear in visible UI, but must NOT enter structured data.**

Emitting a fabricated street address in `LocalBusiness` JSON-LD is precisely the pattern Google
penalises as local-SEO spam. Therefore:

- Visible UI may render dummy values, each tagged with a `TODO(real-data)` comment so it is
  greppable before launch.
- `localBusinessSchema()` keeps `addressLocality: "Singapore"` / `addressCountry: "SG"` and
  **omits `streetAddress`** until a real one exists.
- `Course` schema stays generic (no fabricated `startDate` / age range).
- Testimonials render unmistakable `[PLACEHOLDER]` text — never realistic-looking fake quotes —
  and the section stays **commented out of `page.tsx`** until real quotes arrive.

## 4. Design system additions

All in `globals.css` `@theme` plus small components. No new packages.

| Primitive | What | Where |
|---|---|---|
| Display type scale | `h1` grows to `text-5xl`/`sm:text-6xl`/`lg:text-7xl`, tighter tracking | `globals.css` `@layer base` |
| Section eyebrow | Small uppercase tracked label above each `h2` | new `ui/Eyebrow.tsx` |
| Wave divider | Inline SVG arc between colour bands, replaces hard edges | new `decor/WaveDivider.tsx` |
| Card variants | `variant: "elevated" \| "tinted" \| "outlined"` instead of always-white | `ui/Card.tsx` (additive prop, defaults to current look) |
| Scroll rail | Draggable snap-scroll strip, edge fades, desktop arrows | new `ui/ScrollRail.tsx` |
| Programme colours | Each programme gets an accent from the existing palette | `content/programmes.ts` |

`Card`'s new `variant` prop **defaults to the current appearance**, so existing call sites on
`/about`, `/services` etc. keep working untouched.

## 5. Home page structure (after)

Order in `app/page.tsx`:

1. **`Hero`** — rewritten. Two-column at `lg:`, stacked on mobile.
   - Left: credential eyebrow, display `h1`, lede, two CTAs.
   - Right: `IKC_Vid2.mp4` autoplaying muted/looping in a rounded frame; `IKC_Photo1.jpeg`
     layered behind at an offset for depth; DISE badge overlapping the corner.
   - Existing `DriftingBlob` ambience retained.
2. **`TrustBar`** — kept, restyled as a slimmer strip.
3. **`WhyIkcSection`** — **new, replaces both `BeliefSection` and `TrustReasonsSection`.**
   The three-word promise (Safe / Capable / Included) as large asymmetric editorial blocks with
   oversized terracotta numerals, and the four concrete reasons as supporting chips beneath.
4. **`ProgrammesSection`** — bento grid with per-programme accent colour and varied tile sizes.
5. **`EducatorTeaser`** — kept; credential chips added.
6. **`DayAtIkcSection`** — narrated video kept (`controls`, not autoplay — it has audio); the four
   steps become a connected vertical timeline rather than four floating cards.
7. **`GallerySection`** — rebuilt on `ScrollRail`. Mixed photos + video, varied aspect ratios.
8. **`ScheduleSection`** — new. Dummy ages/times per §3. Sits next to the FAQ because it answers
   the same anxious-parent question.
9. **`FaqPreview`** — becomes a real accordion (`<details>`-based, no JS needed).
10. **`TestimonialsSection`** — new, built, **commented out** per §3.
11. **`GuidesTeaser`** — kept.
12. **`ClosingCta`** — strengthened into a full-bleed warm block.

`BeliefSection.tsx` and `TrustReasonsSection.tsx` are deleted; `homeCopy.belief` and
`homeCopy.trustReasons` merge into `homeCopy.why`.

## 6. SEO work

- **Fix `LocalBusiness`** — real `addressLocality`, `areaServed`, `Organization` `logo` pointing at
  the IKC logo. No fabricated street address (§3).
- **`Course` schema** for the four programmes (generic; no invented dates).
- **`VideoObject` schema** for `IKC_ADay.mp4` and `IKC_Vid2.mp4` — two real videos currently
  earning zero search credit.
- **OG image** — static `opengraph-image` so shared WhatsApp/Facebook links render a card.
- **`BreadcrumbList`** on inner pages.
- Move `Images/IKC_Logo2.jpeg` into `public/media/` and use it in `SiteHeader`.

## 7. Accessibility & performance

- All motion continues to respect `prefers-reduced-motion` via the existing `MotionProvider` /
  `Reveal` / `Stagger` primitives and `motion-reduce:` utilities.
- `ScrollRail` is keyboard-reachable: native scroll container with `tabIndex`, arrows are real
  `<button>`s with labels.
- Hero video is `muted` + `playsInline` + `loop` (autoplay-safe) and carries `aria-label`; the
  narrated `IKC_ADay.mp4` keeps `controls` and never autoplays.
- Hero video gets a `poster` so LCP isn't blocked on video bytes.
- FAQ accordion uses native `<details>`/`<summary>` — accessible by default, zero JS.
- Existing focus-visible ring is preserved.

## 8. Testing

The repo has vitest + Testing Library with per-component tests. Rules:

- Delete `BeliefProgrammes.test.tsx`'s belief cases and `TrustFaqGuidesCta.test.tsx`'s trust-reason
  cases; replace with tests for `WhyIkcSection`.
- New components (`ScrollRail`, `Eyebrow`, `WaveDivider`, `ScheduleSection`, `TestimonialsSection`)
  each get a test asserting they render their content and their a11y affordances.
- `Hero.test.tsx` updated: assert the video element is present and the h1/CTAs still render.
- Schema tests extended for `Course` / `VideoObject` / `Organization.logo`.
- A test asserts `localBusinessSchema()` does **not** emit a `streetAddress` while the placeholder
  is in force — this is the guard that keeps §3 honest.
- Full suite must pass before the branch is considered done.

## 9. Risks

- **Scope.** This touches most of the home page. Mitigation: `Card`/`Section` changes are additive
  and default to current behaviour, so other pages don't regress.
- **Hero LCP.** A video in the hero can hurt Largest Contentful Paint. Mitigation: `poster` image,
  `preload="metadata"`, and the layered still photo carries `priority`.
- **Dummy data shipping to production.** Mitigation: every dummy is tagged `TODO(real-data)`, and
  the schema test in §8 fails loudly if a fake address ever reaches JSON-LD.
