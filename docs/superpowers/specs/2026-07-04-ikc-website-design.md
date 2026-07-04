# IKC Website — Design Spec

**Date**: 2026-07-04
**Status**: Approved, pending final user review before implementation planning

## 1. Project Summary

Build a professional, warm, trustworthy marketing website for **Inclusive Kids Club (IKC)**, a home-based enrichment centre in Singapore for children with special needs. The teacher is a DISE-certified SPED educator (NIE). IKC is a registered Singapore business offering weekly enrichment classes, workshops, and holiday programmes (functional skills, academics, hands-on learning).

Core belief driving tone and design: *every child deserves a space where they feel safe, capable, and included*; classes are kept small to preserve a calm, supportive environment.

Primary goals:
1. Look professional, clean, and trustworthy — explicitly **not** generic "AI slop."
2. Rank well in search for special-needs-enrichment-related queries in Singapore.
3. Present a lot of information (programmes, credentials, FAQs, blog) without feeling cluttered.
4. Convert visitors via a single, low-friction WhatsApp contact channel.
5. Double as a learning project for the user (Year 2 Computer Engineering student) — see Section 7.

## 2. Competitive Research Findings

Reviewed 4 top-ranking reference sites: Rainbow Centre, Special Minds, Bridging the Gap, Starlight. Common gaps identified, each an opportunity for IKC:

- **Credibility gap**: none prominently feature staff credentials, testimonials, or outcomes. IKC's DISE/NIE certification is a genuine, currently-invisible-in-market differentiator — must be a first-class visual element (trust badges), not footer text.
- **No FAQPage structured data**: sites have FAQ content but no schema markup, missing Google rich-snippet opportunities.
- **Emotional flatness**: Rainbow Centre and Special Minds read institutional/cold. Starlight's personal founder-story section is the one example of authentic, resonant narrative — IKC's belief statement is a natural fit for similar treatment.
- **Visual execution issues**: Starlight has broken placeholder images; Special Minds/Rainbow Centre are visually generic.
- **CTA fatigue**: Starlight repeats WhatsApp links 4+ times on one page, reading as repetitive. IKC will use a single, well-placed floating WhatsApp bubble instead.

Patterns worth adopting: benefit-led (not just feature-led) service descriptions, honest/self-aware positioning ("is this the right fit for your child"), comparison-style clarity, long-form SEO blog content for topical authority.

## 3. Sitemap & SEO Strategy

| Page | Primary keyword targets | Purpose |
|---|---|---|
| Home | "special needs enrichment class Singapore", "home-based enrichment centre Singapore" | Warm intro, credential trust signals, programme overview, conversion |
| About | "DISE certified special needs educator Singapore", founder story | Emotional trust — teacher's story, belief, credentials explained |
| Services | "functional skills training Singapore", "holiday programme special needs Singapore", "small group enrichment special needs" | Detailed programme breakdown, benefit-led |
| Service Professionals | "SPED educator NIE Singapore" | Deep credential/bio section (repeatable component, scales as team grows) |
| FAQ | Long-tail question queries parents actually search | FAQPage schema → Google rich snippets |
| Blog | Long-tail informational queries (e.g. "how to choose enrichment programme special needs Singapore", "MOE SG Enable subsidies") | Topical authority, internal linking, fresh content signal |

Technical SEO backbone: Next.js static generation, per-page metadata (title/description/OG tags via `generateMetadata`), JSON-LD structured data (LocalBusiness/EducationalOrganization sitewide, FAQPage on FAQ, Article on blog posts), semantic single-H1-per-page heading hierarchy, generated `sitemap.xml`/`robots.txt`, strong accessibility (serves this audience directly and correlates with SEO quality signals).

## 4. Visual Identity

Derived from the real IKC logo (`Images/IKC_Logo.jpg`): cream background with a bold terracotta wordmark and mustard tagline ("Play and Grow").

- **Palette**:
  - Cream/beige base: `#F7EFE6` (background, matches logo)
  - Terracotta (primary accent): `#D9542E` (from logo wordmark)
  - Mustard/gold (secondary accent): `#E3A344` (from logo tagline)
  - Sage green (tertiary/cool accent, added for balance so the palette isn't monochromatically warm): ~`#93A98C`
  - Deep warm charcoal-brown for text (not pure black): ~`#3A2E27`
  - White/off-white for section contrast and breathing room
- **Typography**: rounded-but-adult geometric sans for headings (friendly, not childish — Quicksand/Baloo 2 class), highly legible accessible sans for body (Inter/Work Sans class).
- **Illustration style**: custom warm-palette SVG illustrations of inclusive activities (baking, playing, small-group learning), not stock photography or AI-generated people — avoids "AI slop," sidesteps generic stock awkwardness, remains valuable as permanent decoration even after real photos/videos are added later.
- **UI feel**: rounded corners, soft shadows, generous whitespace, card-based layouts, credential "badges" (DISE-Certified, NIE, Registered Business) as first-class visual trust elements.

## 5. Page-by-Page Content & Layout

**Home**: hero (illustration + H1 targeting core keyword + belief-statement subhead + WhatsApp/primary CTA) → trust badge bar → "Why IKC" belief section → programme overview cards (Functional Skills, Academics, Hands-on Learning, Holiday Programmes, linking to Services) → "Meet Your Educator" teaser (links to About) → testimonial-placeholder social proof section → "See a Day at IKC" media teaser (illustration now, video slot later) → top-FAQ preview → latest blog posts → closing CTA band.

**About**: founder/teacher narrative (personal story, authentic tone), belief statement in full, "what makes IKC different" (small groups, home-based warmth, individualized attention), DISE/NIE credentials explained in plain language for parents unfamiliar with the acronyms.

**Services**: enrichment philosophy intro, then benefit-led breakdown of Weekly Classes / Workshops / Holiday Programmes, each with age range, group size, format, and a "how to join" step; holiday programme section highlights concrete examples (baking, sensory play).

**Service Professionals**: credential-forward bio/portrait card component for the teacher, built to be repeatable if IKC adds more educators later.

**FAQ**: grouped by theme (Enrolment, Credentials & Safety, Class Format, Costs & Subsidies), targets long-tail parent queries, FAQPage schema for rich snippets.

**Blog**: list + tag filtering, individual post template with SEO metadata/Article schema. Launch topics: "How to Choose an Enrichment Programme for a Child with Special Needs in Singapore," "What Is Functional Skills Training?," "Benefits of Small-Group Learning," "Guide to MOE/SG Enable Subsidies."

**Global**: sticky nav across all pages, single floating WhatsApp bubble (bottom-right, WhatsApp number 8023 1551) — not repeated inline, footer with placeholder NAP (address/email — real details TBD) + Instagram link + sitemap links + opening hours.

## 6. Technical Architecture

**Repository layout** — split into `frontend/` and `backend/` per explicit request:

```
IKC_Project/
├── frontend/          # Next.js app (App Router, TypeScript, Tailwind) — everything for MVP lives here
├── backend/           # Reserved, empty for now. Next.js server actions/route handlers cover
│                      # current needs (e.g. contact form). Only stood up as a separate service
│                      # if a future need exceeds what serverless functions can do
│                      # (e.g. heavy background jobs, a real database, third-party integrations
│                      # beyond simple API calls).
├── Images/            # Existing source brand assets (logo, future photos)
├── docs/              # Specs and plans
└── README.md
```

**Frontend stack**:
- Next.js 14+, App Router, TypeScript, static generation (SSG) for every page — content changes infrequently, ideal for SEO + speed
- Tailwind CSS, with palette/type scale wired in as design tokens
- Content: MDX files in-repo (`frontend/content/blog/*.mdx`, `frontend/content/faq.ts`) — no CMS cost/complexity, version-controlled, editable directly
- Custom SVG illustrations (as React components or static assets); `next/image` ready for real photos once supplied
- Icons: lucide-react
- Subtle motion: Framer Motion, used sparingly (scroll-triggered fade/slide-in)
- Contact form: Next.js Server Action → email, or simple WhatsApp/email links for MVP (no backend needed)
- SEO plumbing: `next-sitemap`, per-page `generateMetadata`, shared JSON-LD schema component
- Deployment: Vercel

**Business details (NAP)**: address/email are placeholders (e.g. `[Unit address, Singapore]`) until IKC supplies real details. WhatsApp number 8023 1551 is real and used as-is.

**Media**: no real class photos/videos yet; illustrations are the placeholder strategy (see Section 4). `next/image` slots are structured so real media drops in later without redesign.

## 7. Learning Goal (process note, not a feature)

The user is a Year 2 Computer Engineering student building this project to learn Next.js/modern web development, not to receive a silently-generated deliverable. During implementation, concepts (App Router, Server vs Client Components, SSG/SSR/ISR, the metadata API, Tailwind's utility model, etc.) should be explained as they're introduced, at a level assuming general programming fluency but no prior modern-web-framework exposure. This does not change any architectural decision above — it changes how implementation is narrated.
