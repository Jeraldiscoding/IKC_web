import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DoodleScatter } from "@/components/decor/DoodleScatter";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
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
      <StaggerGroup className="mt-12 hidden md:grid md:grid-cols-7 md:gap-3">
        {weeklySchedule.map((d) => (
          <StaggerItem key={d.day}>
            <div className="rounded-2xl border border-cream-dark bg-cream/60 p-3">
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
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* Phone: regrouped per programme */}
      <StaggerGroup className="mt-10 space-y-6 md:hidden">
        {pricedProgrammes.map((p) => {
          const slots = weeklySchedule.flatMap((d) =>
            d.entries
              .filter((e) => e.accent === p.accent)
              .map((e) => ({ day: d.day, ...e })),
          );
          if (slots.length === 0) return null;
          return (
            <StaggerItem key={p.slug}>
              <div className="rounded-2xl border border-cream-dark bg-cream/60 p-5">
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
            </StaggerItem>
          );
        })}
      </StaggerGroup>
      {weeklySchedule.some((d) => d.note) ? (
        <p className="text-sm text-ink-muted">
          Mondays &amp; Fridays are Planning &amp; Preparation days — no classes.
        </p>
      ) : null}
    </Section>
  );
}
