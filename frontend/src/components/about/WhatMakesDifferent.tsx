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
