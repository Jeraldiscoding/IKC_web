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
  terracotta: "border-l-[3px] border-terracotta bg-terracotta/10 text-terracotta-dark",
  mustard: "border-l-[3px] border-mustard-dark bg-mustard/20 text-mustard-dark",
  sage: "border-l-[3px] border-sage-dark bg-sage/20 text-sage-dark",
  cream: "border-l-[3px] border-terracotta-light bg-terracotta-light/15 text-terracotta-dark",
  neutral: "border-l-[3px] border-cream-dark bg-cream text-ink-muted",
};

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
        <div className="overflow-x-auto">
          <div className="grid min-w-[820px] grid-cols-[5.5rem_repeat(7,minmax(0,1fr))] grid-rows-[auto_repeat(10,minmax(3.5rem,auto))] overflow-hidden rounded-2xl border border-cream-dark bg-cream/40">
            {/* Top-left corner */}
            <div
              className="border-b border-r border-cream-dark/70 bg-cream-dark/20"
              style={{ gridColumn: 1, gridRow: 1 }}
            />
            {/* Day headers */}
            {weeklySchedule.map((d, i) => (
              <div
                key={`head-${d.day}`}
                className="border-b border-cream-dark/70 bg-cream-dark/20 px-2 py-2.5 text-center text-sm font-semibold tracking-wide text-ink"
                style={{ gridColumn: i + 2, gridRow: 1 }}
              >
                {d.day}
              </div>
            ))}
            {/* Time axis */}
            {scheduleTimeSlots.map((t, s) => (
              <div
                key={`time-${t}`}
                className="flex items-center justify-end border-b border-r border-cream-dark/50 pr-2.5 text-right text-[0.7rem] leading-tight text-ink-muted"
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
                  className="flex items-center justify-center border-b border-cream-dark/50 bg-cream-dark/10 p-3 text-center text-xs font-medium text-ink-muted"
                  style={{ gridColumn: i + 2, gridRow: "2 / span 10" }}
                >
                  {d.note}
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
                        className="border-b border-cream-dark/40 p-1.5"
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
