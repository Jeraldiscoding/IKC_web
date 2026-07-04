import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { homeCopy } from "@/content/home";

export function TrustReasonsSection() {
  const { trustReasons } = homeCopy;
  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        <h2>{trustReasons.heading}</h2>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {trustReasons.reasons.map((r) => (
          <div key={r.title} className="flex gap-4 rounded-2xl border border-cream-dark bg-white p-6">
            <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage/20">
              <Check className="h-5 w-5 text-sage-dark" aria-hidden />
            </span>
            <div>
              <h3 className="text-lg">{r.title}</h3>
              <p className="mt-1 text-sm">{r.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
