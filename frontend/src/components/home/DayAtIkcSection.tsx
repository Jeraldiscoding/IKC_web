import { Section } from "@/components/ui/Section";
import { homeCopy } from "@/content/home";
import { ActivityGlyph } from "@/components/illustrations/ActivityGlyph";

export function DayAtIkcSection() {
  const { day } = homeCopy;
  return (
    <Section className="bg-sage/10">
      <div className="mx-auto max-w-3xl text-center">
        <ActivityGlyph className="mx-auto h-16 w-16 text-sage-dark" />
        <h2 className="mt-4">{day.heading}</h2>
        <p className="mt-4">{day.intro}</p>
      </div>
      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {day.steps.map((step, i) => (
          <li key={step.title} className="rounded-2xl bg-white p-6 shadow-soft">
            <span className="font-heading text-2xl font-bold text-mustard-dark">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-lg">{step.title}</h3>
            <p className="mt-1 text-sm">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
