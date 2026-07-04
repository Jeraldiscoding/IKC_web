# IKC Website — Plan 1: Foundation & Global Chrome

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up a running, deployable Next.js site shell in `frontend/` with the IKC design system, global navigation/footer, a floating WhatsApp bubble, reusable UI primitives, and SEO/structured-data plumbing — the foundation every content page (Plans 2–6) builds on.

**Architecture:** Next.js App Router with static generation. A single `site-config.ts` module is the one source of truth for business details (name, nav links, NAP placeholders, WhatsApp number, socials) so nothing is hardcoded twice. Global chrome (header/footer/WhatsApp bubble) lives in the root `layout.tsx` so it wraps every future page automatically. Styling is Tailwind with the logo-derived palette and fonts wired in as design tokens. SEO defaults and a reusable JSON-LD component are defined once at the root.

**Tech Stack:** Next.js 14+ (App Router, TypeScript), Tailwind CSS, next/font, lucide-react, Vitest + React Testing Library, next-sitemap. Deployment target: Vercel.

## Global Constraints

- Node.js 18.17+ required (Next.js 14 floor).
- All app source lives under `frontend/` (repo is split `frontend/` + reserved-empty `backend/`).
- WhatsApp number is **8023 1551** (international form `6580231551` for `wa.me` links). Real, use as-is.
- Address and email are **placeholders** until supplied — use `[Unit address, Singapore]` and `hello@inclusivekidsclub.sg`, sourced only from `site-config.ts` so they can be changed in one place.
- Palette (design tokens): cream `#F7EFE6`, terracotta `#D9542E`, mustard `#E3A344`, sage `#93A98C`, text charcoal-brown `#3A2E27`, plus white/off-white.
- Heading font: rounded geometric sans (Baloo 2). Body font: Inter. Both via `next/font/google`.
- Single floating WhatsApp bubble sitewide — never repeat WhatsApp CTAs inline (competitive-research decision).
- Every page: exactly one `<h1>`; semantic heading hierarchy.
- TDD is adapted: write real tests for behavior/content contracts; use `next build` as the smoke-gate for pure layout.

---

## File Structure

```
frontend/
├── package.json
├── next.config.mjs
├── tsconfig.json
├── postcss.config.mjs          # (scaffold) uses @tailwindcss/postcss — leave as-is
├── vitest.config.ts
├── vitest.setup.ts
├── next-sitemap.config.js
├── public/
│   └── (illustrations added in later plans)
└── src/
    ├── app/
    │   ├── layout.tsx          # root layout: fonts, metadata defaults, header/footer/bubble, org JSON-LD
    │   ├── page.tsx            # temporary home placeholder (real Home = Plan 2)
    │   └── globals.css         # Tailwind directives + base element styles
    ├── components/
    │   ├── ui/
    │   │   ├── Button.tsx      # variant-based button/link
    │   │   ├── Card.tsx        # rounded, soft-shadow container
    │   │   ├── Badge.tsx       # credential trust badge
    │   │   └── Section.tsx     # max-width padded section wrapper
    │   ├── layout/
    │   │   ├── SiteHeader.tsx  # "use client" — sticky nav + mobile toggle
    │   │   ├── SiteFooter.tsx  # NAP placeholders, Instagram, hours, nav
    │   │   └── WhatsAppBubble.tsx  # "use client" — floating bottom-right
    │   └── seo/
    │       └── JsonLd.tsx      # renders a JSON-LD <script>
    └── lib/
        ├── site-config.ts      # single source of truth for business/site data
        └── seo.ts              # metadata defaults + LocalBusiness schema builder
```

Backend folder: create `backend/.gitkeep` with a one-line comment so the reserved folder exists in git without implying a service yet.

---

## Task 1: Scaffold Next.js app in `frontend/`

**Files:**
- Create: `frontend/` (via scaffolder), `backend/.gitkeep`, root `.gitignore`

**Interfaces:**
- Produces: a running Next.js dev server; `frontend/src/app/` App Router tree; `npm run dev`, `npm run build`, `npm run lint` scripts.

- [ ] **Step 1: Scaffold the app**

Run from repo root (`/Users/jeraldlim/Desktop/IKC_Project`):

```bash
npx create-next-app@latest frontend \
  --typescript --tailwind --eslint --app \
  --src-dir --import-alias "@/*" --no-turbopack
```

When prompted for anything not covered by flags, accept defaults.

*Why these flags:* `--app` selects the App Router (Server Components by default — the modern model). `--src-dir` keeps source under `src/` for a cleaner root. `--import-alias "@/*"` lets us write `@/components/...` instead of long relative paths. Tailwind + ESLint + TypeScript are wired in by the scaffolder.

- [ ] **Step 2: Create the reserved backend folder**

```bash
printf '# Reserved for a future standalone backend service.\n# Currently unused: Next.js Server Actions / Route Handlers cover all server-side needs.\n' > backend/.gitkeep
```

- [ ] **Step 3: Verify the dev server runs**

Run: `cd frontend && npm run dev`
Expected: server starts, `http://localhost:3000` serves the default Next.js welcome page. Stop it with Ctrl-C.

- [ ] **Step 4: Verify a production build succeeds**

Run: `cd frontend && npm run build`
Expected: build completes with no errors; output lists `/` as a static route.

- [ ] **Step 5: Commit**

```bash
git add frontend backend .gitignore
git commit -m "chore: scaffold Next.js app in frontend/, reserve backend/"
```

---

## Task 2: Install dependencies and set up the test runner

**Files:**
- Modify: `frontend/package.json`
- Create: `frontend/vitest.config.ts`, `frontend/vitest.setup.ts`

**Interfaces:**
- Consumes: scaffolded app from Task 1.
- Produces: `npm test` script running Vitest with React Testing Library and `jsdom`; `@testing-library/jest-dom` matchers available globally in tests.

- [ ] **Step 1: Install runtime + dev dependencies**

Run from `frontend/`:

```bash
npm install lucide-react
npm install -D vitest @vitejs/plugin-react jsdom \
  @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

*Why:* `lucide-react` = icon set. Vitest = fast test runner (Jest-compatible API). `jsdom` = simulated browser DOM so components can render in tests. Testing Library = renders components and queries them the way a user would.

- [ ] **Step 2: Create `frontend/vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
```

*Why the alias block:* Vitest doesn't read `tsconfig.json` paths automatically, so we re-declare `@/*` → `src/` here to match the app's import alias.

- [ ] **Step 3: Create `frontend/vitest.setup.ts`**

```ts
import "@testing-library/jest-dom";
```

- [ ] **Step 4: Add the test script to `package.json`**

In `frontend/package.json`, add to `"scripts"`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5: Write a smoke test to prove the runner works**

Create `frontend/src/lib/__tests__/smoke.test.ts`:

```ts
import { describe, it, expect } from "vitest";

describe("test runner", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 6: Run tests**

Run: `npm test`
Expected: 1 passing test.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.ts vitest.setup.ts src/lib/__tests__/smoke.test.ts
git commit -m "chore: add Vitest + Testing Library setup"
```

---

## Task 3: Site config — single source of truth

**Files:**
- Create: `frontend/src/lib/site-config.ts`
- Test: `frontend/src/lib/__tests__/site-config.test.ts`

**Interfaces:**
- Produces:
  - `siteConfig` object with exact shape:
    ```ts
    {
      name: string;              // "Inclusive Kids Club"
      shortName: string;         // "IKC"
      tagline: string;           // "Play and Grow"
      description: string;       // default meta description
      url: string;               // "https://www.inclusivekidsclub.sg"
      email: string;             // placeholder
      address: string;           // placeholder
      whatsapp: { display: string; intl: string; };  // "8023 1551" / "6580231551"
      instagram: string;         // Instagram URL
      hours: string;             // "By appointment · Weekdays & weekends"
      nav: { label: string; href: string; }[];  // Home, About, Services, Service Professionals, FAQ, Blog
    }
    ```
  - `waLink(message?: string): string` — builds a `https://wa.me/<intl>?text=...` URL.

- [ ] **Step 1: Write the failing test**

Create `frontend/src/lib/__tests__/site-config.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { siteConfig, waLink } from "@/lib/site-config";

describe("siteConfig", () => {
  it("uses the real WhatsApp number in international form", () => {
    expect(siteConfig.whatsapp.intl).toBe("6580231551");
    expect(siteConfig.whatsapp.display).toBe("8023 1551");
  });

  it("exposes all six primary nav pages in order", () => {
    expect(siteConfig.nav.map((n) => n.href)).toEqual([
      "/",
      "/about",
      "/services",
      "/service-professionals",
      "/faq",
      "/blog",
    ]);
  });
});

describe("waLink", () => {
  it("builds a wa.me link with url-encoded message", () => {
    expect(waLink("Hi IKC")).toBe("https://wa.me/6580231551?text=Hi%20IKC");
  });

  it("omits the query when no message is given", () => {
    expect(waLink()).toBe("https://wa.me/6580231551");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- site-config`
Expected: FAIL — cannot find module `@/lib/site-config`.

- [ ] **Step 3: Implement `site-config.ts`**

Create `frontend/src/lib/site-config.ts`:

```ts
export const siteConfig = {
  name: "Inclusive Kids Club",
  shortName: "IKC",
  tagline: "Play and Grow",
  description:
    "Inclusive Kids Club is a home-based enrichment centre in Singapore offering small-group classes, workshops and holiday programmes for children with special needs. Led by a DISE-certified (NIE) SPED educator.",
  url: "https://www.inclusivekidsclub.sg",
  // Placeholders — replace when real details are provided (see spec §6).
  email: "hello@inclusivekidsclub.sg",
  address: "[Unit address, Singapore]",
  whatsapp: {
    display: "8023 1551",
    intl: "6580231551",
  },
  instagram: "https://www.instagram.com/inclusivekidsclub",
  hours: "By appointment · Weekdays & weekends",
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Service Professionals", href: "/service-professionals" },
    { label: "FAQ", href: "/faq" },
    { label: "Blog", href: "/blog" },
  ],
} as const;

export function waLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsapp.intl}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- site-config`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/site-config.ts src/lib/__tests__/site-config.test.ts
git commit -m "feat: add site-config single source of truth + waLink helper"
```

---

## Task 4: Design tokens — Tailwind v4 `@theme` + fonts + globals

> **TAILWIND v4 NOTICE (read first):** Task 1 scaffolded **Tailwind v4** (not v3). v4 has **no `tailwind.config.ts`** — design tokens are declared in CSS inside a `@theme` block, and the stylesheet begins with `@import "tailwindcss";` (not the old `@tailwind base/components/utilities` directives). This task is written for v4. Do **not** create a `tailwind.config.ts`. PostCSS is already configured (`postcss.config.mjs` uses `@tailwindcss/postcss`) — leave it alone.
>
> How v4 tokens map to utilities: an entry `--color-cream: #F7EFE6;` in `@theme` auto-generates `bg-cream`, `text-cream`, `border-cream`, `ring-cream`, etc. `--color-cream-dark` generates the `*-cream-dark` variants. `--shadow-soft` generates `shadow-soft`. `--font-heading` generates `font-heading`. Opacity modifiers (`bg-cream/90`) work on these automatically.

**Files:**
- Modify: `frontend/src/app/globals.css`, `frontend/src/app/layout.tsx`
- Delete (if present): `frontend/tailwind.config.ts` — should not exist under v4; do not create one.

**Interfaces:**
- Produces: Tailwind color utilities `cream`/`cream-dark`, `terracotta`/`terracotta-dark`/`terracotta-light`, `mustard`/`mustard-dark`, `sage`/`sage-dark`, `ink`/`ink-muted`; font utilities `font-heading` / `font-body`; shadow utilities `shadow-soft` / `shadow-soft-lg`. The `<html>` element carries the `--font-baloo` / `--font-inter` CSS variables (set by `next/font`), which `@theme inline` maps to `font-heading` / `font-body`.

- [ ] **Step 1: Configure fonts in the root layout**

Replace `frontend/src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Baloo_2, Inter } from "next/font/google";
import "./globals.css";

const heading = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
  weight: ["500", "600", "700"],
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Inclusive Kids Club",
  description:
    "Home-based enrichment centre in Singapore for children with special needs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="bg-cream text-ink font-body antialiased">
        {children}
      </body>
    </html>
  );
}
```

*Why `next/font`:* it self-hosts Google Fonts at build time (no external request at runtime → faster, privacy-friendly, no layout shift) and exposes each font as a CSS variable. We name them `--font-baloo` / `--font-inter` (not `--font-heading`) so the `@theme` mapping below isn't self-referential.

- [ ] **Step 2: Replace `globals.css` with v4 tokens + base styles**

Replace the **entire** contents of `frontend/src/app/globals.css` with:

```css
@import "tailwindcss";

@theme {
  /* Palette (derived from the IKC logo) */
  --color-cream: #f7efe6;
  --color-cream-dark: #efe3d3;
  --color-terracotta: #d9542e;
  --color-terracotta-dark: #b8421f;
  --color-terracotta-light: #e88a6c;
  --color-mustard: #e3a344;
  --color-mustard-dark: #c7871f;
  --color-sage: #93a98c;
  --color-sage-dark: #6f866a;
  --color-ink: #3a2e27;
  --color-ink-muted: #6b5d53;

  /* Soft shadows */
  --shadow-soft: 0 4px 20px -4px rgba(58, 46, 39, 0.12);
  --shadow-soft-lg: 0 12px 40px -8px rgba(58, 46, 39, 0.16);
}

/* Fonts reference runtime CSS vars set by next/font, so they must be `inline`
   so the utility resolves to the referenced variable rather than being frozen
   at build time. */
@theme inline {
  --font-heading: var(--font-baloo);
  --font-body: var(--font-inter);
}

@layer base {
  h1, h2, h3, h4 {
    @apply font-heading text-ink;
    text-wrap: balance;
  }
  h1 { @apply text-4xl leading-tight sm:text-5xl; }
  h2 { @apply text-3xl leading-tight sm:text-4xl; }
  h3 { @apply text-2xl; }
  p  { @apply leading-relaxed text-ink-muted; }
  a  { @apply transition-colors; }
  :focus-visible { @apply outline-none ring-2 ring-terracotta ring-offset-2 ring-offset-cream; }
}
```

*Why the `:focus-visible` rule:* keyboard focus must be clearly visible — an accessibility requirement that also matters for this audience specifically (spec §3). *Note:* the scaffold's default `globals.css` had `--background`/`--foreground` vars, a `prefers-color-scheme: dark` block, and an Arial `body` font — all intentionally removed; the site is a single warm light theme driven by the `bg-cream text-ink` classes on `<body>`.

- [ ] **Step 3: Verify the build compiles with tokens**

Run: `npm run build`
Expected: build succeeds. (The default scaffold home page still renders; it is replaced in Task 11. No token usage to visually verify yet — that comes in Task 5+.)

If the build errors with an unknown-utility error (e.g. `text-ink-muted` not found), it means a `--color-*` entry is missing or misspelled in `@theme` — fix the token name, don't add a config file.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: add IKC design tokens via Tailwind v4 @theme (palette, fonts, shadow)"
```

---

## Task 5: UI primitives — Button, Card, Badge, Section

**Files:**
- Create: `frontend/src/components/ui/Button.tsx`, `Card.tsx`, `Badge.tsx`, `Section.tsx`
- Test: `frontend/src/components/ui/__tests__/Button.test.tsx`, `Badge.test.tsx`

**Interfaces:**
- Produces:
  - `Button` — props `{ href?: string; variant?: "primary" | "secondary" | "ghost"; children; className?; } & (anchor/button attrs)`. Renders `<a>` when `href` is set (Next `Link` for internal), else `<button>`.
  - `Card` — props `{ children; className?; }`. Rounded-2xl, soft shadow, cream-dark border.
  - `Badge` — props `{ children; icon?: LucideIcon; className?; }`. Pill with icon slot, used for credential trust signals.
  - `Section` — props `{ children; className?; id?; }`. Centered max-width container with vertical padding.

- [ ] **Step 1: Write failing tests**

Create `frontend/src/components/ui/__tests__/Button.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders a link when href is provided", () => {
    render(<Button href="/services">See services</Button>);
    const el = screen.getByRole("link", { name: "See services" });
    expect(el).toHaveAttribute("href", "/services");
  });

  it("renders a button element when no href is provided", () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });
});
```

Create `frontend/src/components/ui/__tests__/Badge.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/Badge";

describe("Badge", () => {
  it("renders its label text", () => {
    render(<Badge>DISE-Certified</Badge>);
    expect(screen.getByText("DISE-Certified")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- ui`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement the primitives**

Create `frontend/src/components/ui/Button.tsx`:

```tsx
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-heading font-semibold px-6 py-3 text-base transition-transform active:scale-[0.98]";
const variants: Record<Variant, string> = {
  primary: "bg-terracotta text-cream hover:bg-terracotta-dark shadow-soft",
  secondary: "bg-sage text-cream hover:bg-sage-dark",
  ghost: "bg-transparent text-terracotta hover:bg-cream-dark",
};

type Props = {
  href?: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"a"> & ComponentProps<"button">, "ref">;

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  ...rest
}: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (href) {
    const internal = href.startsWith("/");
    if (internal) {
      return (
        <Link href={href} className={cls} {...(rest as ComponentProps<"a">)}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={cls} {...(rest as ComponentProps<"a">)}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...(rest as ComponentProps<"button">)}>
      {children}
    </button>
  );
}
```

Create `frontend/src/components/ui/Card.tsx`:

```tsx
import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-cream-dark bg-white p-6 shadow-soft ${className}`}
    >
      {children}
    </div>
  );
}
```

Create `frontend/src/components/ui/Badge.tsx`:

```tsx
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function Badge({
  children,
  icon: Icon,
  className = "",
}: {
  children: ReactNode;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-cream-dark px-4 py-2 text-sm font-semibold text-ink ${className}`}
    >
      {Icon ? <Icon className="h-4 w-4 text-terracotta" aria-hidden /> : null}
      {children}
    </span>
  );
}
```

Create `frontend/src/components/ui/Section.tsx`:

```tsx
import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-5 py-16 sm:py-20 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- ui`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/ui
git commit -m "feat: add UI primitives (Button, Card, Badge, Section)"
```

---

## Task 6: SEO helpers + JSON-LD component

**Files:**
- Create: `frontend/src/lib/seo.ts`, `frontend/src/components/seo/JsonLd.tsx`
- Test: `frontend/src/lib/__tests__/seo.test.ts`

**Interfaces:**
- Consumes: `siteConfig` (Task 3).
- Produces:
  - `pageMetadata({ title, description, path }): Metadata` — builds a Next `Metadata` object with title-templated `<title>`, description, canonical URL, and Open Graph tags.
  - `localBusinessSchema(): object` — a JSON-LD `EducationalOrganization`/`LocalBusiness` object using `siteConfig`.
  - `<JsonLd data={...} />` — renders `<script type="application/ld+json">`.

- [ ] **Step 1: Write the failing test**

Create `frontend/src/lib/__tests__/seo.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { pageMetadata, localBusinessSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

describe("pageMetadata", () => {
  it("sets title, description and canonical path", () => {
    const meta = pageMetadata({
      title: "Services",
      description: "Our programmes.",
      path: "/services",
    });
    expect(meta.title).toBe("Services");
    expect(meta.description).toBe("Our programmes.");
    expect(meta.alternates?.canonical).toBe("/services");
    expect(meta.openGraph?.title).toBe("Services");
  });
});

describe("localBusinessSchema", () => {
  it("emits a schema.org object with the business name and telephone", () => {
    const schema = localBusinessSchema() as Record<string, unknown>;
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema.name).toBe(siteConfig.name);
    expect(schema.telephone).toContain(siteConfig.whatsapp.intl);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- seo`
Expected: FAIL — module `@/lib/seo` not found.

- [ ] **Step 3: Implement `seo.ts`**

Create `frontend/src/lib/seo.ts`:

```ts
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_SG",
      type: "website",
    },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: `+${siteConfig.whatsapp.intl}`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "SG",
      addressLocality: "Singapore",
    },
    sameAs: [siteConfig.instagram],
  };
}
```

*Why `alternates.canonical`:* tells Google the authoritative URL for a page, preventing duplicate-content dilution. Next resolves it against `metadataBase` (set in Task 7).

- [ ] **Step 4: Implement `JsonLd.tsx`**

Create `frontend/src/components/seo/JsonLd.tsx`:

```tsx
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is not user input; JSON.stringify output is safe here.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

*Why `dangerouslySetInnerHTML`:* JSON-LD must be raw text inside a `<script>`, not escaped React children. The data is developer-authored, so there's no injection risk.

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- seo`
Expected: PASS (2 tests).

- [ ] **Step 6: Commit**

```bash
git add src/lib/seo.ts src/components/seo/JsonLd.tsx src/lib/__tests__/seo.test.ts
git commit -m "feat: add SEO metadata helper + JSON-LD component"
```

---

## Task 7: Root layout — metadataBase, org schema, global chrome slots

**Files:**
- Modify: `frontend/src/app/layout.tsx`

**Interfaces:**
- Consumes: `localBusinessSchema` (Task 6), `JsonLd` (Task 6), and (added in Tasks 8–10) `SiteHeader`, `SiteFooter`, `WhatsAppBubble`.
- Produces: a root layout that sets `metadataBase`, a title template, injects the org JSON-LD once, and renders header/footer/bubble around every page.

- [ ] **Step 1: Update the root layout**

Replace `frontend/src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Baloo_2, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { localBusinessSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppBubble } from "@/components/layout/WhatsAppBubble";

// NOTE (Tailwind v4): variable names must match Task 4's globals.css mapping
// (`@theme inline { --font-heading: var(--font-baloo); ... }`). Use
// --font-baloo / --font-inter here, NOT --font-heading / --font-body.
const heading = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
  weight: ["500", "600", "700"],
});
const body = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Enrichment for Children with Special Needs in Singapore`,
    template: `%s · ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col bg-cream text-ink font-body antialiased">
        <JsonLd data={localBusinessSchema()} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <WhatsAppBubble />
      </body>
    </html>
  );
}
```

*Why the title `template`:* child pages set just `title: "Services"` and Next expands it to `Services · IKC` automatically — DRY page titles. `metadataBase` makes canonical/OG relative URLs resolve to absolute ones.

Note: this imports three components created in Tasks 8–10. If executing strictly in order, the build will fail until those exist — that's expected; the build-gate for this task is deferred to Task 10, Step X. (Subagent executors: implement Tasks 8–10 before running a full build.)

- [ ] **Step 2: Commit (build verified at end of Task 10)**

```bash
git add src/app/layout.tsx
git commit -m "feat: wire root layout — metadataBase, org JSON-LD, chrome slots"
```

---

## Task 8: SiteHeader — sticky nav with mobile toggle

**Files:**
- Create: `frontend/src/components/layout/SiteHeader.tsx`
- Test: `frontend/src/components/layout/__tests__/SiteHeader.test.tsx`

**Interfaces:**
- Consumes: `siteConfig.nav`, `Button`, `waLink`.
- Produces: `SiteHeader` — a `"use client"` sticky header rendering the wordmark, all six nav links, a desktop WhatsApp CTA, and a mobile hamburger that toggles a nav panel.

- [ ] **Step 1: Write the failing test**

Create `frontend/src/components/layout/__tests__/SiteHeader.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteConfig } from "@/lib/site-config";

describe("SiteHeader", () => {
  it("renders a link for every primary nav page", () => {
    render(<SiteHeader />);
    for (const item of siteConfig.nav) {
      // getAllByRole: link appears in both desktop and mobile menus
      const links = screen.getAllByRole("link", { name: item.label });
      expect(links.length).toBeGreaterThan(0);
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- SiteHeader`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `SiteHeader.tsx`**

Create `frontend/src/components/layout/SiteHeader.tsx`:

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { siteConfig, waLink } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-cream-dark bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
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
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-cream-dark bg-cream px-5 py-4 lg:hidden">
          <ul className="flex flex-col gap-3">
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
        </nav>
      )}
    </header>
  );
}
```

*Why `"use client"`:* the hamburger uses `useState` + `onClick` — interactivity that only exists in the browser. Marking the file `"use client"` opts this component (only) into hydration; the rest of the page stays server-rendered.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- SiteHeader`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/SiteHeader.tsx src/components/layout/__tests__/SiteHeader.test.tsx
git commit -m "feat: add sticky SiteHeader with mobile nav toggle"
```

---

## Task 9: SiteFooter — NAP, hours, socials, nav

**Files:**
- Create: `frontend/src/components/layout/SiteFooter.tsx`
- Test: `frontend/src/components/layout/__tests__/SiteFooter.test.tsx`

**Interfaces:**
- Consumes: `siteConfig` (name, address, email, hours, instagram, nav).
- Produces: `SiteFooter` — a Server Component footer with business NAP (from config placeholders), opening hours, Instagram link, nav links, and copyright.

- [ ] **Step 1: Write the failing test**

Create `frontend/src/components/layout/__tests__/SiteFooter.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { siteConfig } from "@/lib/site-config";

describe("SiteFooter", () => {
  it("shows the business email and address from config", () => {
    render(<SiteFooter />);
    expect(screen.getByText(siteConfig.email)).toBeInTheDocument();
    expect(screen.getByText(siteConfig.address)).toBeInTheDocument();
  });

  it("links to the Instagram profile", () => {
    render(<SiteFooter />);
    const ig = screen.getByRole("link", { name: /instagram/i });
    expect(ig).toHaveAttribute("href", siteConfig.instagram);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- SiteFooter`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `SiteFooter.tsx`**

Create `frontend/src/components/layout/SiteFooter.tsx`:

```tsx
import Link from "next/link";
import { Mail, MapPin, Clock, Instagram } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-cream-dark bg-cream-dark/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-heading text-lg font-bold text-terracotta">
            {siteConfig.name}
          </p>
          <p className="mt-2 text-sm text-ink-muted">{siteConfig.tagline}</p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-ink">Explore</h4>
          <ul className="mt-3 space-y-2">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-ink-muted hover:text-terracotta">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-ink">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-terracotta" aria-hidden />
              <span>{siteConfig.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-terracotta" aria-hidden />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-terracotta">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-terracotta" aria-hidden />
              <span>{siteConfig.hours}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-ink">Follow</h4>
          <a
            href={siteConfig.instagram}
            className="mt-3 inline-flex items-center gap-2 text-sm text-ink-muted hover:text-terracotta"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="h-4 w-4 text-terracotta" aria-hidden />
            Instagram
          </a>
        </div>
      </div>

      <div className="border-t border-cream-dark px-5 py-4">
        <p className="mx-auto max-w-6xl text-xs text-ink-muted">
          © {new Date().getFullYear()} {siteConfig.name}. A registered business in Singapore.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- SiteFooter`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/SiteFooter.tsx src/components/layout/__tests__/SiteFooter.test.tsx
git commit -m "feat: add SiteFooter with NAP, hours, socials, nav"
```

---

## Task 10: WhatsAppBubble — single floating CTA

**Files:**
- Create: `frontend/src/components/layout/WhatsAppBubble.tsx`
- Test: `frontend/src/components/layout/__tests__/WhatsAppBubble.test.tsx`

**Interfaces:**
- Consumes: `waLink`, `siteConfig`.
- Produces: `WhatsAppBubble` — a `"use client"` fixed bottom-right link+label ("Need help? Chat with us") opening WhatsApp to the real number.

- [ ] **Step 1: Write the failing test**

Create `frontend/src/components/layout/__tests__/WhatsAppBubble.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WhatsAppBubble } from "@/components/layout/WhatsAppBubble";

describe("WhatsAppBubble", () => {
  it("links to the real WhatsApp number via wa.me", () => {
    render(<WhatsAppBubble />);
    const link = screen.getByRole("link", { name: /chat with us/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("wa.me/6580231551"));
    expect(link).toHaveAttribute("target", "_blank");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- WhatsAppBubble`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `WhatsAppBubble.tsx`**

Create `frontend/src/components/layout/WhatsAppBubble.tsx`:

```tsx
"use client";

import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site-config";

export function WhatsAppBubble() {
  return (
    <a
      href={waLink("Hi IKC, I need some help — I'd like to ask about your classes.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Need help? Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-heading font-semibold text-white shadow-soft-lg transition-transform hover:scale-105 active:scale-95"
    >
      <MessageCircle className="h-5 w-5" aria-hidden />
      <span className="hidden sm:inline">Need help? Chat with us</span>
    </a>
  );
}
```

*Why one bubble, not inline CTAs:* the competitive research (spec §2) found Starlight's 4+ repeated WhatsApp links read as spammy. One persistent, unmissable bubble is cleaner and higher-converting.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- WhatsAppBubble`
Expected: PASS.

- [ ] **Step 5: Full test suite + production build gate**

Run: `npm test`
Expected: all tests pass.

Run: `npm run build`
Expected: build succeeds. Root layout now resolves all three chrome imports (Tasks 8–10). `/` route builds as static.

- [ ] **Step 6: Manual smoke check**

Run: `npm run dev`, open `http://localhost:3000`. Verify: sticky header with all nav links, mobile hamburger toggles the menu at a narrow width, footer shows placeholder NAP, green WhatsApp bubble sits bottom-right and opens WhatsApp with the number prefilled. Stop the server.

- [ ] **Step 7: Commit**

```bash
git add src/components/layout/WhatsAppBubble.tsx src/components/layout/__tests__/WhatsAppBubble.test.tsx
git commit -m "feat: add floating WhatsApp bubble"
```

---

## Task 11: Temporary Home placeholder page

**Files:**
- Modify: `frontend/src/app/page.tsx`

**Interfaces:**
- Consumes: `Section`, `Button`, `Badge`, `waLink`.
- Produces: a minimal but on-brand Home page (single `<h1>`) proving the design system renders. Replaced by the full Home in Plan 2.

- [ ] **Step 1: Replace `page.tsx`**

Replace `frontend/src/app/page.tsx` with:

```tsx
import { Award, Users, ShieldCheck } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { waLink } from "@/lib/site-config";

export default function HomePage() {
  return (
    <Section className="text-center">
      <h1 className="mx-auto max-w-3xl">
        A warm, home-based enrichment club where every child feels{" "}
        <span className="text-terracotta">safe, capable, and included.</span>
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-lg">
        Small-group enrichment classes, workshops and holiday programmes for
        children with special needs in Singapore — led by a DISE-certified
        (NIE) SPED educator.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Badge icon={Award}>DISE-Certified (NIE)</Badge>
        <Badge icon={ShieldCheck}>Registered Singapore Business</Badge>
        <Badge icon={Users}>Small Group Classes</Badge>
      </div>
      <div className="mt-8">
        <Button href={waLink("Hi IKC, I'd like to find out more about your classes.")}>
          Enquire on WhatsApp
        </Button>
      </div>
    </Section>
  );
}
```

*Note:* this is a Server Component (no `"use client"`) — it ships zero JavaScript, exactly what we want for content. Full Home page with all sections comes in Plan 2.

- [ ] **Step 2: Build + smoke check**

Run: `npm run build && npm run dev`
Expected: build succeeds; home page shows the hero, three credential badges, and the WhatsApp button, all on-brand. Stop the server.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add temporary on-brand Home placeholder"
```

---

## Task 12: Sitemap, robots, and static metadata files

**Files:**
- Create: `frontend/next-sitemap.config.js`, `frontend/src/app/robots.ts`, `frontend/src/app/sitemap.ts`
- Modify: `frontend/package.json` (postbuild script — optional if using code-based sitemap)

**Interfaces:**
- Produces: `/robots.txt` and `/sitemap.xml` at build, listing the six routes (some are placeholders until later plans add the pages, which is fine — they're declared now so search engines discover them as they ship).

*Decision:* use Next's built-in code-based `robots.ts` / `sitemap.ts` (no extra dependency) rather than `next-sitemap`. The file `next-sitemap.config.js` is therefore NOT created; the File Structure entry for it is superseded by this task.

- [ ] **Step 1: Create `frontend/src/app/robots.ts`**

```ts
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
```

- [ ] **Step 2: Create `frontend/src/app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return siteConfig.nav.map((item) => ({
    url: `${siteConfig.url}${item.href === "/" ? "" : item.href}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
```

*Why code-based:* `sitemap.ts` derives directly from `siteConfig.nav`, so adding a nav entry automatically updates the sitemap — no separate list to keep in sync.

- [ ] **Step 3: Build and verify the generated files**

Run: `npm run build`
Expected: build succeeds and the route list includes `/robots.txt` and `/sitemap.xml`.

Run: `npm run dev`, then visit `http://localhost:3000/sitemap.xml` and `http://localhost:3000/robots.txt`.
Expected: sitemap lists all six URLs; robots.txt allows all and points to the sitemap. Stop the server.

- [ ] **Step 4: Commit**

```bash
git add src/app/robots.ts src/app/sitemap.ts
git commit -m "feat: add code-based robots.txt and sitemap.xml"
```

---

## Task 13: Project README pointer + Plan 1 completion note

**Files:**
- Modify: `README.md` (root)

**Interfaces:**
- Produces: a short "Getting Started" section so anyone cloning the repo can run it.

- [ ] **Step 1: Append a Getting Started section to root `README.md`**

Add at the end of `README.md`:

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add Getting Started instructions to README"
```

---

## Self-Review

**Spec coverage (Plan 1 portion):**
- Framework Next.js App Router + SSG → Tasks 1, 4, 7, 11 ✓
- `frontend/`/`backend/` split → Task 1 ✓
- Palette + fonts from logo → Task 4 ✓
- UI primitives + credential badges → Tasks 5, 11 ✓
- Global nav/footer → Tasks 8, 9 ✓
- Single floating WhatsApp bubble (no inline repetition) → Task 10 ✓
- Placeholder NAP sourced from one config → Tasks 3, 9 ✓
- Instagram link + opening hours in footer → Task 9 ✓
- Per-page metadata + LocalBusiness/EducationalOrganization JSON-LD → Tasks 6, 7 ✓
- sitemap.xml / robots.txt → Task 12 ✓
- Accessibility (focus-visible, aria labels, semantic headings) → Tasks 4, 8, 10 ✓
- Learning explanations embedded → "Why" notes throughout ✓
- Deferred to later plans (correctly out of scope here): Home full build (Plan 2), About/Service Professionals (Plan 3), Services (Plan 4), FAQ + FAQPage schema (Plan 5), Blog MDX + Article schema (Plan 6), illustrations, Framer Motion, contact form. ✓

**Placeholder scan:** No TBD/TODO left as work items. The `[Unit address, Singapore]` string is an intentional, spec-mandated content placeholder isolated in `site-config.ts`, not a plan gap.

**Type consistency:** `siteConfig`, `waLink`, `pageMetadata`, `localBusinessSchema`, `JsonLd`, `Button`/`Card`/`Badge`/`Section`, `SiteHeader`/`SiteFooter`/`WhatsAppBubble` names are used consistently across the tasks that consume them. `next-sitemap` mentioned in Tech Stack/File Structure is explicitly superseded by the code-based approach in Task 12 (noted inline to avoid a dangling reference).
```
