import { ArrowRight, FileText } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { homeCopy } from "@/content/home";

export function GuidesTeaser() {
  const { guides } = homeCopy;
  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        <h2>{guides.heading}</h2>
        <p className="mt-4">{guides.intro}</p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {guides.topics.map((topic) => (
          <div key={topic} className="rounded-2xl border border-cream-dark bg-white p-6">
            <FileText className="h-6 w-6 text-mustard-dark" aria-hidden />
            <p className="mt-3 font-heading font-semibold text-ink">{topic}</p>
            <p className="mt-2 text-xs uppercase tracking-wide text-ink-muted">Coming soon</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button href="/blog" variant="ghost">
          Visit our blog <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
    </Section>
  );
}
