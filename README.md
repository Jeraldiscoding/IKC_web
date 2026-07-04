# Inclusive Kids Club (IKC) — Website Project

## Project Brief (original notes)

1. This project is to help the brand inclusive kids club, a home based enrichment centre for children with special needs. Teacher is DISE-Certified SPED educator (NIE). As a registered bsuiness in Singapore, they offer weekly enrichment classes, workshops and holidays.
2. IKC has functional skills, academics, hands on learning, they have videos showing what they do for example they offered June Holiday programme, where the children are able to bake stuff, play with tys etc..
3. Belief is that every children deserves a space where they feel safe, capable and included, offers small group classes each time so as to ensure a calm supportive environment
4. Project is to build a react website that look professional and clean and trustworthy. No AI slop, and to optimise web searches
5. To be planned, but pages. includes Home, about, services, service professionals, FAQ, and Blogs, all having keyword that helps in searches of enrichment programe for special eneds in singapore
6. Add in a need help? Chat with us icon at the bottom right (Whatsapp -> 80231551)
7. Add adress,email as well.
8. UI should be professional, yet look fun. Take reference from top google search places like: https://rainbowcentre.org.sg/care-enrichment/ , https://specialminds.com.sg/enrichment/ , https://bridgingthegap.com.sg/after-school-care-programme/ , https://starlight.edu.sg/special-needs-after-school-care-in-singapore-options-subsidies-and-how-to-choose/
9. I will add in picutres/videos of the classes later

---

## Decisions Made (brainstorming, 2026-07-04)

- **Framework**: Next.js (App Router, static generation) — chosen specifically for SEO, since a plain client-rendered React SPA serves search engines an empty HTML shell.
- **Brand assets**: Existing beige logo (Instagram-only presence so far, no formal brand colors). New palette/typography to be designed around it — warm, fun, and professional at once.
- **Content**: No final copy yet — professional SEO-aware placeholder copy will be drafted for every page, grounded in the facts in this README, structured so real details can be swapped in later.
- **Media**: Real class photos/videos are not available yet (see point 9 above). In the meantime the site uses custom warm illustrations/icons rather than generic stock photography or gray placeholder boxes, so it never looks unfinished or "AI slop." Illustrations double as permanent decorative elements even after real photos arrive.
- **Business details (NAP)**: Address, email, and other contact particulars are not finalized — the site will use clearly-marked placeholders (e.g. `[Unit address, Singapore]`) until real details are supplied. WhatsApp number (8023 1551) from the brief is real and used as-is.

## Competitive Research Findings

Researched the 4 reference sites named above. Common weaknesses observed across all of them — each is a specific opportunity for IKC:

- **Credibility gap**: none of the 4 sites prominently feature staff credentials, testimonials, or outcomes data. IKC's DISE-certification (NIE) is a genuine differentiator that is currently invisible in this market segment — it should be front-and-center on the site, not buried in a footer line.
- **No structured FAQ data**: sites have FAQ content but no FAQPage schema markup, missing an easy Google rich-snippet win.
- **Emotional flatness**: Rainbow Centre and Special Minds read institutional/cold, with no narrative or founder story. Starlight is the one exception — its personal "About me" founder-story section reads as authentic and resonant. IKC's belief statement ("every child deserves to feel safe, capable and included") is a natural fit for a similar narrative treatment.
- **Visual execution issues**: Starlight has broken/unloaded placeholder images undermining its professionalism; Special Minds and Rainbow Centre are visually flat and generic.
- **CTA fatigue**: Starlight repeats WhatsApp contact links 4+ times on one page, which reads as repetitive rather than persuasive — IKC should use a single, well-placed floating WhatsApp bubble instead.

What's working well elsewhere, adopted into this design: benefit-led (not just feature-led) service descriptions, honest/self-aware positioning ("is this the right fit for your child"), comparison-style clarity, and long-form SEO blog content for topical authority.

## Sitemap & SEO Keyword Strategy

| Page | Primary keyword targets | Purpose |
|---|---|---|
| Home | "special needs enrichment class Singapore", "home-based enrichment centre Singapore" | Warm intro, credential trust signals, programme overview, conversion |
| About | "DISE certified special needs educator Singapore", founder story | Emotional trust — teacher's story, belief, credentials explained |
| Services | "functional skills training Singapore", "holiday programme special needs Singapore", "small group enrichment special needs" | Detailed programme breakdown, benefit-led |
| Service Professionals | "SPED educator NIE Singapore" | Deep credential/bio section (built to expand as team grows) |
| FAQ | Long-tail question queries parents actually search | FAQPage schema → Google rich snippets |
| Blog | Long-tail informational queries (e.g. "how to choose enrichment programme special needs Singapore", "MOE SG Enable subsidies") | Topical authority, internal linking, fresh content signal |

**Technical SEO backbone**: Next.js static generation with per-page metadata (title/description/OG tags), JSON-LD structured data (LocalBusiness/EducationalOrganization sitewide, FAQPage on the FAQ page, Article on blog posts), semantic single-H1-per-page heading hierarchy, generated sitemap.xml/robots.txt, and strong accessibility (serves this audience directly and correlates with SEO quality signals).

*(This document will continue to be filled in as the visual identity, page-by-page layout, and tech stack sections of the design are finalized.)*

## Getting Started (development)

The site lives in `frontend/` (Next.js App Router). The `backend/` folder is
reserved and intentionally empty — Next.js Server Actions cover current needs.

```bash
cd frontend
npm install
npm run dev      # http://localhost:3000
npm test         # unit tests (Vitest)
npm run build    # production build
```

Business details (address, email) are placeholders in
`frontend/src/lib/site-config.ts` — update that one file when the real
details are available.