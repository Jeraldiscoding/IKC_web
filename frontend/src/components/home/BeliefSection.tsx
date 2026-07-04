import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { homeCopy } from "@/content/home";

export function BeliefSection() {
  const { belief } = homeCopy;
  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        <h2>{belief.heading}</h2>
        <p className="mt-4">{belief.intro}</p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {belief.values.map((v) => (
          <Card key={v.title} className="text-center">
            <h3 className="text-terracotta">{v.title}</h3>
            <p className="mt-3">{v.body}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
