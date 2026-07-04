# IKC Website — Plan 3: About + Service Professionals Pages

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `/about` and `/service-professionals` stub pages with full, SEO-optimized pages — an authentic founding-purpose story plus a plain-language explanation of the DISE/NIE credentials (About), and a scalable, credential-forward educator profile (Service Professionals).

**Architecture:** Both pages follow Plan 2's pattern: a thin Server Component page composes focused section components, with copy in typed `src/content/` modules. A reusable `EducatorCard` (fed by an `educators` data module) makes the professionals page scale as staff grow. A shared `CtaBand` component is extracted so every page's closing call-to-action is DRY (Home's `ClosingCta` is refactored to use it).

**Tech Stack:** Next.js 16 App Router (Server Components, SSG), Tailwind v4 tokens, lucide-react, Plan 1 primitives (`Section`, `Card`, `Button`, `Badge`, `pageMetadata`, `JsonLd`, `waLink`, `siteConfig`). Tests: Vitest + React Testing Library.

## Global Constraints

- All app code under `frontend/`; work on branch `plan-3-about-professionals`.
- Reuse existing primitives and content modules — do NOT recreate them. Import from `@/components/ui/*`, `@/lib/*`, `@/content/*`.
- Business data (WhatsApp `8023 1551` → `wa.me/6580231551`, address/email placeholders) comes ONLY from `@/lib/site-config`.
- Every page: exactly one `<h1>`; semantic `<h2>`/`<h3>`; keyword-rich but natural headings.
- Palette tokens only (cream/terracotta/mustard/sage/ink families); fonts `font-heading` / `font-body`.
- **No fabricated facts.** No invented educator name, personal history, dates, or anecdotes. The educator name is a role-based placeholder ("Our Lead Educator") with a `// TODO` for the real name. The founding narrative is purpose-driven and generic, marked for the client to personalise. DISE/NIE explanations must be factually accurate (DISE = Diploma in Special Education; NIE = National Institute of Education, Singapore's teacher-training institute).
- No `Person` JSON-LD until a real educator name exists (avoid low-quality structured data) — leave a plan note instead.
- Server Components only (no interactivity needed this plan).
- Keywords to weave naturally: "DISE-certified special needs educator Singapore", "SPED educator NIE", "special needs education professional", "home-based enrichment centre", "small-group special needs classes".
- TDD adapted: real tests for content shape, component content contracts, and one-h1-per-page; `next build` as the layout smoke-gate.

---

## File Structure

```
frontend/src/
├── app/
│   ├── about/page.tsx                   # full About (REPLACE stub)
│   └── service-professionals/page.tsx   # full Service Professionals (REPLACE stub)
├── content/
│   ├── about.ts                         # About page copy (CREATE)
│   └── educators.ts                     # educator profiles (CREATE, reused if team grows)
├── components/
│   ├── CtaBand.tsx                      # shared closing CTA band (CREATE)
│   ├── EducatorCard.tsx                 # reusable educator profile card (CREATE)
│   ├── home/
│   │   └── ClosingCta.tsx               # REFACTOR to delegate to CtaBand
│   └── about/
│       ├── FounderStory.tsx             # (CREATE)
│       ├── WhatMakesDifferent.tsx       # (CREATE)
│       └── CredentialsExplained.tsx     # (CREATE)
```

---

## Task 1: Content modules (about copy, educators)

**Files:**
- Create: `frontend/src/content/about.ts`, `frontend/src/content/educators.ts`
- Test: `frontend/src/content/__tests__/about-educators.test.ts`

**Interfaces:**
- Produces:
  - `aboutCopy` — typed object with `intro`, `story`, `different`, `credentials`, `cta` sections (see code).
  - `educators: Educator[]` where `type Educator = { slug: string; name: string; title: string; initials: string; bio: string[]; specialties: string[] }`. At least 1 item.

- [ ] **Step 1: Write the failing test**

Create `frontend/src/content/__tests__/about-educators.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { aboutCopy } from "@/content/about";
import { educators } from "@/content/educators";

describe("aboutCopy", () => {
  it("provides the founding story and credential explanations", () => {
    expect(aboutCopy.story.paragraphs.length).toBeGreaterThanOrEqual(2);
    expect(aboutCopy.credentials.items.length).toBeGreaterThanOrEqual(3);
    expect(aboutCopy.cta.ctaLabel).toBeTruthy();
  });
});

describe("educators", () => {
  it("has at least one educator with required fields", () => {
    expect(educators.length).toBeGreaterThanOrEqual(1);
    for (const e of educators) {
      expect(e.slug).toBeTruthy();
      expect(e.name).toBeTruthy();
      expect(e.title).toMatch(/DISE/i);
      expect(e.bio.length).toBeGreaterThan(0);
      expect(e.specialties.length).toBeGreaterThan(0);
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- about-educators`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement `about.ts`**

Create `frontend/src/content/about.ts`:

```ts
export const aboutCopy = {
  intro: {
    heading: "About Inclusive Kids Club",
    lede: "Inclusive Kids Club is a home-based enrichment centre in Singapore for children with special needs — built on a simple belief: every child deserves a space where they feel safe, capable and included.",
  },
  story: {
    heading: "Why Inclusive Kids Club exists",
    // TODO: personalise — replace with the educator's own story and voice.
    paragraphs: [
      "Many families searching for special needs enrichment in Singapore are met with long waiting lists, large classes, or clinical, institutional settings that can feel overwhelming for a child who learns differently.",
      "Inclusive Kids Club was founded to offer something warmer: small-group enrichment in a calm, home-based space, led by a qualified special needs educator who sees each child's potential — not just their diagnosis.",
      "Classes are kept small on purpose, so no child is left on the sidelines, and every session is shaped around how that child learns best — at their own pace, with plenty of patience and encouragement.",
    ],
  },
  different: {
    heading: "What makes Inclusive Kids Club different",
    points: [
      {
        title: "A qualified SPED educator",
        body: "Your child learns with a DISE-certified special needs educator, not a general tutor — someone trained specifically in how children with special needs learn.",
      },
      {
        title: "Genuinely small groups",
        body: "We cap class sizes deliberately so every child gets individualised attention in a calm, unhurried environment.",
      },
      {
        title: "A warm, home-based setting",
        body: "Learning happens in a welcoming home-based space — less clinical and less overwhelming than a large institutional centre.",
      },
      {
        title: "Shaped around your child",
        body: "Functional skills, academics and hands-on learning are pitched to each child's pace — never one-size-fits-all.",
      },
    ],
  },
  credentials: {
    heading: "What “DISE-certified (NIE)” actually means",
    intro:
      "The acronyms in special needs education can be confusing. Here is what they mean for your child, in plain language.",
    items: [
      {
        term: "DISE — Diploma in Special Education",
        body: "A professional qualification for educators who teach children with special educational needs. It covers how to plan, adapt and deliver learning for a range of needs — so lessons are built for how your child actually learns.",
      },
      {
        term: "NIE — National Institute of Education",
        body: "Singapore's national institute for teacher training. A qualification earned through NIE meets a recognised national standard, so you know the training is rigorous and reputable.",
      },
      {
        term: "SPED educator",
        body: "A special education (SPED) educator is trained specifically to teach children with special needs — a specialist in how these children learn, rather than a general tutor.",
      },
    ],
  },
  cta: {
    heading: "Come see if we’re the right fit for your child",
    body: "The best way to know is a quick, no-pressure chat. Tell us a little about your child and we’ll be honest about whether we can help.",
    ctaLabel: "Chat with us on WhatsApp",
    message: "Hi IKC, I read your About page and I'd like to find out more.",
  },
} as const;
```

- [ ] **Step 4: Implement `educators.ts`**

Create `frontend/src/content/educators.ts`:

```ts
export type Educator = {
  slug: string;
  name: string;
  title: string;
  initials: string;
  bio: string[];
  specialties: string[];
};

export const educators: Educator[] = [
  {
    slug: "lead-educator",
    // TODO: replace with the educator's real name once confirmed.
    name: "Our Lead Educator",
    title: "DISE-Certified Special Needs Educator (NIE)",
    initials: "IKC",
    bio: [
      "Inclusive Kids Club is led by a DISE-certified special needs educator, trained through Singapore's National Institute of Education (NIE).",
      "With a calm, structured and patient approach, our educator plans every small-group session around how each child learns best — across functional skills, academics and hands-on activities.",
    ],
    specialties: [
      "Functional skills",
      "Academic support",
      "Hands-on & sensory learning",
      "Small-group facilitation",
    ],
  },
];
```

*Note:* the `educators` array is a list so the Service Professionals page scales to a real team without code changes — add a profile object per educator.

- [ ] **Step 5: Run test + commit**

Run: `npm test -- about-educators`
Expected: PASS (2 tests).

```bash
git add src/content/about.ts src/content/educators.ts src/content/__tests__/about-educators.test.ts
git commit -m "feat: add about + educators content modules"
```

---

## Task 2: Shared CtaBand component (+ refactor Home ClosingCta)

**Files:**
- Create: `frontend/src/components/CtaBand.tsx`
- Modify: `frontend/src/components/home/ClosingCta.tsx`
- Test: `frontend/src/components/__tests__/CtaBand.test.tsx`

**Interfaces:**
- Produces: `CtaBand({ heading, body, ctaLabel, message }: { heading: string; body: string; ctaLabel: string; message: string })` — the terracotta closing band with a WhatsApp CTA. `ClosingCta` becomes a thin wrapper that passes Home copy into `CtaBand`.

- [ ] **Step 1: Write the failing test**

Create `frontend/src/components/__tests__/CtaBand.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaBand } from "@/components/CtaBand";

describe("CtaBand", () => {
  it("renders heading, body and a WhatsApp CTA with the encoded message", () => {
    render(
      <CtaBand
        heading="Ready?"
        body="Body text."
        ctaLabel="Chat with us"
        message="Hi IKC"
      />,
    );
    expect(screen.getByRole("heading", { name: "Ready?" })).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /chat with us/i });
    expect(link).toHaveAttribute("href", "https://wa.me/6580231551?text=Hi%20IKC");
    expect(link).toHaveAttribute("target", "_blank");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- CtaBand`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `CtaBand.tsx`**

Create `frontend/src/components/CtaBand.tsx`:

```tsx
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { waLink } from "@/lib/site-config";

export function CtaBand({
  heading,
  body,
  ctaLabel,
  message,
}: {
  heading: string;
  body: string;
  ctaLabel: string;
  message: string;
}) {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-4xl rounded-3xl bg-terracotta px-8 py-14 text-center text-cream shadow-soft-lg">
        <h2 className="text-cream">{heading}</h2>
        <p className="mx-auto mt-4 max-w-xl text-cream/90">{body}</p>
        <div className="mt-8 flex justify-center">
          <Button
            href={waLink(message)}
            className="bg-cream text-terracotta hover:bg-cream-dark"
          >
            <MessageCircle className="h-4 w-4" aria-hidden /> {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Refactor `ClosingCta.tsx` to use `CtaBand`**

Replace `frontend/src/components/home/ClosingCta.tsx` with:

```tsx
import { CtaBand } from "@/components/CtaBand";
import { homeCopy } from "@/content/home";

export function ClosingCta() {
  const { closing } = homeCopy;
  return (
    <CtaBand
      heading={closing.heading}
      body={closing.body}
      ctaLabel={closing.ctaLabel}
      message="Hi IKC, I'd like to find the right class for my child."
    />
  );
}
```

*Why refactor now:* About and Service Professionals both need the same closing band. Extracting `CtaBand` keeps one implementation; `ClosingCta` stays as the Home-specific wrapper so its existing test (WhatsApp link) still passes.

- [ ] **Step 5: Run CtaBand + existing ClosingCta tests + commit**

Run: `npm test -- CtaBand TrustFaqGuidesCta`
Expected: PASS — `CtaBand` (1) and the existing `ClosingCta` test still green.

```bash
git add src/components/CtaBand.tsx src/components/home/ClosingCta.tsx src/components/__tests__/CtaBand.test.tsx
git commit -m "feat: extract shared CtaBand; refactor Home ClosingCta to use it"
```

---

## Task 3: EducatorCard component

**Files:**
- Create: `frontend/src/components/EducatorCard.tsx`
- Test: `frontend/src/components/__tests__/EducatorCard.test.tsx`

**Interfaces:**
- Consumes: `Educator` type from `@/content/educators`.
- Produces: `EducatorCard({ educator }: { educator: Educator })` — a profile card with an initials avatar (portrait placeholder), name, title, bio paragraphs, and specialty pills.

- [ ] **Step 1: Write the failing test**

Create `frontend/src/components/__tests__/EducatorCard.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { EducatorCard } from "@/components/EducatorCard";
import type { Educator } from "@/content/educators";

const sample: Educator = {
  slug: "x",
  name: "Test Educator",
  title: "DISE-Certified Special Needs Educator (NIE)",
  initials: "TE",
  bio: ["A short bio."],
  specialties: ["Functional skills", "Academics"],
};

describe("EducatorCard", () => {
  it("renders name, title and specialties", () => {
    render(<EducatorCard educator={sample} />);
    expect(screen.getByText("Test Educator")).toBeInTheDocument();
    expect(screen.getByText(/DISE-Certified/i)).toBeInTheDocument();
    expect(screen.getByText("Functional skills")).toBeInTheDocument();
    expect(screen.getByText("Academics")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- EducatorCard`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `EducatorCard.tsx`**

Create `frontend/src/components/EducatorCard.tsx`:

```tsx
import type { Educator } from "@/content/educators";

export function EducatorCard({ educator }: { educator: Educator }) {
  return (
    <article className="grid gap-6 rounded-3xl border border-cream-dark bg-white p-8 shadow-soft sm:grid-cols-[auto_1fr] sm:gap-8">
      <div className="flex justify-center">
        {/* Portrait placeholder — swap for a next/image photo when available. */}
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-terracotta/10">
          <span className="font-heading text-2xl font-bold text-terracotta">
            {educator.initials}
          </span>
        </div>
      </div>
      <div>
        <h3 className="text-2xl">{educator.name}</h3>
        <p className="mt-1 font-semibold text-terracotta">{educator.title}</p>
        {educator.bio.map((para, i) => (
          <p key={i} className="mt-3 text-sm">
            {para}
          </p>
        ))}
        <ul className="mt-5 flex flex-wrap gap-2">
          {educator.specialties.map((s) => (
            <li
              key={s}
              className="rounded-full bg-cream-dark px-3 py-1 text-xs font-semibold text-ink"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
```

- [ ] **Step 4: Run test + commit**

Run: `npm test -- EducatorCard`
Expected: PASS (1 test).

```bash
git add src/components/EducatorCard.tsx src/components/__tests__/EducatorCard.test.tsx
git commit -m "feat: add reusable EducatorCard component"
```

---

## Task 4: About section components (FounderStory, WhatMakesDifferent, CredentialsExplained)

**Files:**
- Create: `frontend/src/components/about/FounderStory.tsx`, `WhatMakesDifferent.tsx`, `CredentialsExplained.tsx`
- Test: `frontend/src/components/about/__tests__/about-sections.test.tsx`

**Interfaces:**
- Consumes: `aboutCopy` (Task 1), `Section`, `Card`, `Blob` (Plan 2).
- Produces: `FounderStory()`, `WhatMakesDifferent()`, `CredentialsExplained()` — all Server Components rendering `<h2>` section headings and their content from `aboutCopy`.

- [ ] **Step 1: Write the failing test**

Create `frontend/src/components/about/__tests__/about-sections.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FounderStory } from "@/components/about/FounderStory";
import { WhatMakesDifferent } from "@/components/about/WhatMakesDifferent";
import { CredentialsExplained } from "@/components/about/CredentialsExplained";
import { aboutCopy } from "@/content/about";

describe("About sections", () => {
  it("FounderStory renders its heading and first paragraph", () => {
    render(<FounderStory />);
    expect(screen.getByRole("heading", { name: aboutCopy.story.heading })).toBeInTheDocument();
    expect(screen.getByText(aboutCopy.story.paragraphs[0])).toBeInTheDocument();
  });

  it("WhatMakesDifferent renders all difference points", () => {
    render(<WhatMakesDifferent />);
    for (const p of aboutCopy.different.points) {
      expect(screen.getByText(p.title)).toBeInTheDocument();
    }
  });

  it("CredentialsExplained renders each credential term", () => {
    render(<CredentialsExplained />);
    for (const item of aboutCopy.credentials.items) {
      expect(screen.getByText(item.term)).toBeInTheDocument();
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- about-sections`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement `FounderStory.tsx`**

Create `frontend/src/components/about/FounderStory.tsx`:

```tsx
import { Section } from "@/components/ui/Section";
import { Blob } from "@/components/illustrations/Blob";
import { aboutCopy } from "@/content/about";

export function FounderStory() {
  const { story } = aboutCopy;
  return (
    <Section>
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="relative flex justify-center">
          <Blob className="h-64 w-64 text-mustard/25" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-heading text-5xl font-bold text-mustard-dark/70">
              Play &amp; Grow
            </span>
          </div>
        </div>
        <div>
          <h2>{story.heading}</h2>
          {story.paragraphs.map((para, i) => (
            <p key={i} className="mt-4">
              {para}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 4: Implement `WhatMakesDifferent.tsx`**

Create `frontend/src/components/about/WhatMakesDifferent.tsx`:

```tsx
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { aboutCopy } from "@/content/about";

export function WhatMakesDifferent() {
  const { different } = aboutCopy;
  return (
    <Section className="bg-cream-dark/20">
      <div className="mx-auto max-w-3xl text-center">
        <h2>{different.heading}</h2>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {different.points.map((p) => (
          <Card key={p.title}>
            <h3 className="text-xl text-terracotta">{p.title}</h3>
            <p className="mt-2 text-sm">{p.body}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 5: Implement `CredentialsExplained.tsx`**

Create `frontend/src/components/about/CredentialsExplained.tsx`:

```tsx
import { GraduationCap } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { aboutCopy } from "@/content/about";

export function CredentialsExplained() {
  const { credentials } = aboutCopy;
  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        <GraduationCap className="mx-auto h-12 w-12 text-sage-dark" aria-hidden />
        <h2 className="mt-4">{credentials.heading}</h2>
        <p className="mt-4">{credentials.intro}</p>
      </div>
      <dl className="mx-auto mt-10 max-w-3xl space-y-4">
        {credentials.items.map((item) => (
          <div key={item.term} className="rounded-2xl border border-cream-dark bg-white p-6">
            <dt className="font-heading text-lg font-semibold text-ink">{item.term}</dt>
            <dd className="mt-2 text-sm text-ink-muted">{item.body}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
```

- [ ] **Step 6: Run test + commit**

Run: `npm test -- about-sections`
Expected: PASS (3 tests).

```bash
git add src/components/about
git commit -m "feat: add About section components (story, differences, credentials)"
```

---

## Task 5: Assemble the About page

**Files:**
- Modify: `frontend/src/app/about/page.tsx` (replace the stub)
- Test: `frontend/src/app/about/__tests__/about-page.test.tsx`

**Interfaces:**
- Consumes: `aboutCopy`, `Section`, `FounderStory`, `WhatMakesDifferent`, `CredentialsExplained`, `CtaBand`, `pageMetadata`.
- Produces: the composed About page with one `<h1>` (the intro heading) and page metadata (keeps the stub's SEO title/description).

- [ ] **Step 1: Write the failing test**

Create `frontend/src/app/about/__tests__/about-page.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutPage from "@/app/about/page";
import { aboutCopy } from "@/content/about";

describe("AboutPage", () => {
  it("renders exactly one h1 (the intro heading)", () => {
    render(<AboutPage />);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(aboutCopy.intro.heading);
  });

  it("includes the credentials section and closing CTA", () => {
    render(<AboutPage />);
    expect(screen.getByText(aboutCopy.credentials.items[0].term)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: aboutCopy.cta.heading })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- about-page`
Expected: FAIL — the current `/about` is the stub (no credentials section / CTA heading).

- [ ] **Step 3: Replace `about/page.tsx`**

Replace `frontend/src/app/about/page.tsx` with:

```tsx
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/CtaBand";
import { FounderStory } from "@/components/about/FounderStory";
import { WhatMakesDifferent } from "@/components/about/WhatMakesDifferent";
import { CredentialsExplained } from "@/components/about/CredentialsExplained";
import { aboutCopy } from "@/content/about";

export const metadata: Metadata = pageMetadata({
  title: "About — Our DISE-Certified Special Needs Educator",
  description:
    "Meet the DISE-certified (NIE) special needs educator behind Inclusive Kids Club, a home-based enrichment centre in Singapore built on keeping every child safe, capable and included.",
  path: "/about",
});

export default function AboutPage() {
  const { intro, cta } = aboutCopy;
  return (
    <>
      <Section className="text-center">
        <h1 className="mx-auto max-w-3xl">{intro.heading}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg">{intro.lede}</p>
      </Section>
      <FounderStory />
      <WhatMakesDifferent />
      <CredentialsExplained />
      <CtaBand
        heading={cta.heading}
        body={cta.body}
        ctaLabel={cta.ctaLabel}
        message={cta.message}
      />
    </>
  );
}
```

- [ ] **Step 4: Run test + build + commit**

Run: `npm test -- about-page`
Expected: PASS (2 tests).

Run: `npm run build`
Expected: build succeeds; `/about` is static.

```bash
git add src/app/about/page.tsx src/app/about/__tests__/about-page.test.tsx
git commit -m "feat: build full About page (story, differences, credentials, CTA)"
```

---

## Task 6: Assemble the Service Professionals page

**Files:**
- Modify: `frontend/src/app/service-professionals/page.tsx` (replace the stub)
- Test: `frontend/src/app/service-professionals/__tests__/professionals-page.test.tsx`

**Interfaces:**
- Consumes: `educators`, `EducatorCard`, `Section`, `Card`, `CtaBand`, `pageMetadata`.
- Produces: the composed Service Professionals page — intro (one `<h1>`), a mapped list of `EducatorCard`s, a short "how our educators work" trio, and a closing CTA. Page copy for intro/approach is defined inline (page-specific, static).

- [ ] **Step 1: Write the failing test**

Create `frontend/src/app/service-professionals/__tests__/professionals-page.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ServiceProfessionalsPage from "@/app/service-professionals/page";
import { educators } from "@/content/educators";

describe("ServiceProfessionalsPage", () => {
  it("renders exactly one h1", () => {
    render(<ServiceProfessionalsPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("renders an EducatorCard for each educator", () => {
    render(<ServiceProfessionalsPage />);
    for (const e of educators) {
      expect(screen.getByText(e.name)).toBeInTheDocument();
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- professionals-page`
Expected: FAIL — the current page is the stub (no educator name rendered).

- [ ] **Step 3: Replace `service-professionals/page.tsx`**

Replace `frontend/src/app/service-professionals/page.tsx` with:

```tsx
import type { Metadata } from "next";
import { HeartHandshake, Users, Sparkles } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { CtaBand } from "@/components/CtaBand";
import { EducatorCard } from "@/components/EducatorCard";
import { educators } from "@/content/educators";

export const metadata: Metadata = pageMetadata({
  title: "Our Educators — SPED Professionals in Singapore",
  description:
    "The special needs education professionals at Inclusive Kids Club, including a DISE-certified (NIE) SPED educator, supporting children in small-group settings across Singapore.",
  path: "/service-professionals",
});

const approach = [
  {
    icon: HeartHandshake,
    title: "Patient and individualised",
    body: "Every child is met where they are, with lessons paced and adapted to how they learn best.",
  },
  {
    icon: Users,
    title: "Small groups, close attention",
    body: "Deliberately small classes mean our educators can truly focus on each child.",
  },
  {
    icon: Sparkles,
    title: "Qualified and specialised",
    body: "Led by a DISE-certified (NIE) special needs educator — trained specifically for these needs.",
  },
];

export default function ServiceProfessionalsPage() {
  return (
    <>
      <Section className="text-center">
        <h1 className="mx-auto max-w-3xl">The people behind Inclusive Kids Club</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg">
          Your child is supported by qualified special needs education professionals who
          teach in calm, small groups — and get to know each child as an individual.
        </p>
      </Section>

      <Section className="pt-0">
        <div className="space-y-8">
          {educators.map((e) => (
            <EducatorCard key={e.slug} educator={e} />
          ))}
        </div>
      </Section>

      <Section className="bg-cream-dark/20">
        <div className="mx-auto max-w-3xl text-center">
          <h2>How our educators work</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {approach.map((a) => {
            const Icon = a.icon;
            return (
              <Card key={a.title} className="text-center">
                <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-sage/20">
                  <Icon className="h-6 w-6 text-sage-dark" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg">{a.title}</h3>
                <p className="mt-2 text-sm">{a.body}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      <CtaBand
        heading="Have a question for our team?"
        body="We're happy to tell you more about our educator, our approach, and how we can support your child."
        ctaLabel="Message us on WhatsApp"
        message="Hi IKC, I'd like to ask about your educators."
      />
    </>
  );
}
```

*Plan note (structured data):* once the educator's real name is confirmed, add `Person` + `EducationalOccupationalCredential` JSON-LD here via a new `@/lib/professionals-schema.ts` and a `<JsonLd>` block. Deferred deliberately to avoid shipping a placeholder name in structured data.

- [ ] **Step 4: Run test + full suite + build**

Run: `npm test -- professionals-page`
Expected: PASS (2 tests).

Run: `npm test`
Expected: full suite passes.

Run: `npm run build`
Expected: build succeeds; `/service-professionals` static.

- [ ] **Step 5: Manual smoke check**

Run: `rm -rf .next && npm run dev`, open `http://localhost:3000/about` and `/service-professionals`. Verify both pages scroll with real content, the educator card shows the initials avatar + credentials, and the closing CTA bands work. Stop the server.

- [ ] **Step 6: Commit**

```bash
git add src/app/service-professionals/page.tsx src/app/service-professionals/__tests__/professionals-page.test.tsx
git commit -m "feat: build full Service Professionals page with EducatorCard"
```

---

## Self-Review

**Spec coverage (spec §5 About + Service Professionals):**
- Founder/teacher narrative (authentic, non-fabricated) → Task 1 (`aboutCopy.story`) + Task 4 (`FounderStory`) ✓
- Belief statement in full → About intro + carried through story/differences ✓
- "What makes IKC different" (small groups, home-based, individualised) → Task 1 + Task 4 (`WhatMakesDifferent`) ✓
- DISE/NIE credentials explained in plain language → Task 1 + Task 4 (`CredentialsExplained`) ✓
- Credential-forward educator profile, repeatable for a growing team → Task 1 (`educators` list) + Task 3 (`EducatorCard`) + Task 6 ✓
- Both pages replace stubs, keep SEO metadata → Tasks 5, 6 ✓
- DRY closing CTA across pages → Task 2 (`CtaBand`) ✓
- Person JSON-LD deliberately deferred (no real name) → noted in Task 6 ✓

**Placeholder scan:** `Our Lead Educator` name, `IKC` initials, and the `// TODO` markers are intentional, clearly-flagged content placeholders for the client, not unfinished plan steps. No TBD work items.

**Type consistency:** `Educator` type defined in Task 1, consumed with matching fields in Tasks 3 and 6. `aboutCopy` shape defined in Task 1, consumed with matching keys in Tasks 4 and 5. `CtaBand` prop names (`heading`/`body`/`ctaLabel`/`message`) consistent across Tasks 2, 5, 6. All imported Plan 1/2 primitives exist on `main`.
