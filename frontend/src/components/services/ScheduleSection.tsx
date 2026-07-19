import { NotebookPen } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DoodleScatter } from "@/components/decor/DoodleScatter";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import {
  weeklySchedule,
  pricedProgrammes,
  scheduleTimeSlots,
  type PricedProgrammeAccent,
} from "@/content/pricing";

// Full class strings, never interpolated. A coloured left bar per class family
// gives each chip a clear identity — reads as a designed schedule, not a table.
const chipClass: Record<PricedProgrammeAccent | "neutral", string> = {
  terracotta: "border-l-4 border-terracotta bg-terracotta/12 text-terracotta-dark",
  mustard: "border-l-4 border-mustard-dark bg-mustard/25 text-mustard-dark",
  sage: "border-l-4 border-sage-dark bg-sage/25 text-sage-dark",
  cream: "border-l-4 border-terracotta-light bg-terracotta-light/20 text-terracotta-dark",
  neutral: "border-l-4 border-cream-dark bg-cream text-ink-muted",
};

// A legend so the colour coding reads as intentional, not decorative. Each
// swatch matches the left bar of its class family's chips.
const legend: { swatch: string; label: string }[] = [
  { swatch: "bg-mustard-dark", label: "Early Learners Club" },
  { swatch: "bg-sage-dark", label: "SPED — Literacy & Numeracy" },
  { swatch: "bg-terracotta-light", label: "Mainstream — Math" },
  { swatch: "bg-terracotta", label: "1-1 sessions" },
];

/**
 * Laptop: a weekly board aligned by time — a time axis plus Mon→Sun columns,
 * each class placed in the row matching its time so everything lines up and
 * empty slots leave gaps. Phone: the board is hidden and the same data is
 * regrouped per programme, so a parent sees when *their* class runs without a
 * horizontal grid.
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

      {/* Laptop board: a single grid aligned by time. Column 1 is the time
          axis; columns 2–8 are Mon→Sun. Each class is placed into the row that
          matches its time (grid-row) and its day (grid-column), so everything
          lines up horizontally and empty slots leave gaps. */}
      <Reveal className="mt-12 hidden md:block">
        {/* Legend: makes the colour coding legible at a glance. */}
        <ul className="mb-5 flex flex-wrap gap-x-6 gap-y-2">
          {legend.map((l) => (
            <li key={l.label} className="inline-flex items-center gap-2 text-sm text-ink-muted">
              <span className={`h-3.5 w-3.5 rounded-[4px] ${l.swatch}`} aria-hidden />
              {l.label}
            </li>
          ))}
        </ul>

        <div className="overflow-x-auto">
          <div className="grid min-w-[820px] grid-cols-[5.5rem_repeat(7,minmax(0,1fr))] grid-rows-[auto_repeat(10,minmax(3.5rem,auto))] overflow-hidden rounded-2xl border border-ink/15 bg-cream/40">
            {/* Zebra tints on alternating rows so the eye can track a time row
                across the wide, mostly-empty weekday columns. Rendered first so
                they sit behind every cell. */}
            {scheduleTimeSlots.map((t, s) =>
              s % 2 === 1 ? (
                <div
                  key={`zebra-${t}`}
                  className="bg-cream-dark/[0.07]"
                  style={{ gridColumn: "2 / -1", gridRow: s + 2 }}
                  aria-hidden
                />
              ) : null,
            )}
            {/* Top-left corner */}
            <div
              className="border-b border-r border-ink/12 bg-cream-dark/20"
              style={{ gridColumn: 1, gridRow: 1 }}
            />
            {/* Day headers */}
            {weeklySchedule.map((d, i) => (
              <div
                key={`head-${d.day}`}
                className="border-b border-ink/12 bg-cream-dark/20 px-2 py-2.5 text-center text-sm font-semibold tracking-wide text-ink"
                style={{ gridColumn: i + 2, gridRow: 1 }}
              >
                {d.day}
              </div>
            ))}
            {/* Time axis */}
            {scheduleTimeSlots.map((t, s) => (
              <div
                key={`time-${t}`}
                className="flex items-center justify-end border-b border-r border-ink/12 pr-2.5 text-right text-[0.7rem] leading-tight text-ink-muted"
                style={{ gridColumn: 1, gridRow: s + 2 }}
              >
                {t}
              </div>
            ))}
            {/* Prep days: one tall cell spanning every time row */}
            {weeklySchedule.map((d, i) =>
              d.note ? (
                <div
                  key={`prep-${d.day}`}
                  className="flex flex-col items-center justify-center gap-2.5 border-b border-ink/12 p-3 text-center"
                  style={{
                    gridColumn: i + 2,
                    gridRow: "2 / span 10",
                    // Soft diagonal hatch reads as a blocked "no classes" day —
                    // intentional, not an empty grey cell.
                    backgroundImage:
                      "repeating-linear-gradient(45deg, rgba(58,46,39,0.045) 0, rgba(58,46,39,0.045) 5px, rgba(239,227,211,0.28) 5px, rgba(239,227,211,0.28) 13px)",
                  }}
                >
                  <NotebookPen className="h-5 w-5 text-ink-muted/50" aria-hidden />
                  <span className="text-xs font-medium leading-tight text-ink-muted">
                    {d.note}
                  </span>
                </div>
              ) : null,
            )}
            {/* Class cells: every (day, time) cell for non-prep days, so the
                ruled rows stay uniform and empty slots show as blanks */}
            {weeklySchedule.map((d, i) =>
              d.note
                ? null
                : scheduleTimeSlots.map((t, s) => {
                    const entry = d.entries.find((e) => e.time === t);
                    return (
                      <div
                        key={`${d.day}-${t}`}
                        className="border-b border-ink/12 p-1.5"
                        style={{ gridColumn: i + 2, gridRow: s + 2 }}
                      >
                        {entry ? (
                          <div
                            className={`flex h-full flex-col justify-center rounded-md px-2.5 py-1.5 text-[0.72rem] font-semibold leading-tight shadow-sm ${chipClass[entry.accent]}`}
                          >
                            {entry.label}
                          </div>
                        ) : null}
                      </div>
                    );
                  }),
            )}
          </div>
        </div>
      </Reveal>

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
        <p className="text-sm text-ink-muted md:hidden">
          Mondays &amp; Fridays are Planning &amp; Preparation days — no classes.
        </p>
      ) : null}
    </Section>
  );
}
