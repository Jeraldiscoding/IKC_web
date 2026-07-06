import type { ExperienceEntry } from "@/content/educators";

export function ExperienceTimeline({ items }: { items: ExperienceEntry[] }) {
  return (
    <ol className="relative mx-auto max-w-2xl border-l-2 border-cream-dark pl-8">
      {items.map((item, i) => (
        <li key={`${item.org}-${i}`} className="relative pb-10 last:pb-0">
          {/* Node on the line */}
          <span
            className="absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full border-2 border-terracotta bg-cream"
            aria-hidden
          >
            <span className="h-2 w-2 rounded-full bg-terracotta" />
          </span>

          <span className="inline-block rounded-full bg-mustard/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-mustard-dark">
            {item.period}
          </span>
          <h3 className="mt-3 text-lg">{item.role}</h3>
          <p className="font-semibold text-terracotta">{item.org}</p>
          {item.description ? (
            <p className="mt-2 text-sm text-ink-muted">{item.description}</p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
