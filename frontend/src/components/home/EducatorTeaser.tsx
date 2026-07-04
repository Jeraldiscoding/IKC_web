import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { homeCopy } from "@/content/home";
import { Blob } from "@/components/illustrations/Blob";

export function EducatorTeaser() {
  const { educator } = homeCopy;
  return (
    <Section>
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="relative flex justify-center">
          <Blob className="h-64 w-64 text-terracotta/15" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-heading text-6xl font-bold text-terracotta/70">IKC</span>
          </div>
        </div>
        <div>
          <h2>{educator.heading}</h2>
          <p className="mt-4">{educator.body}</p>
          <div className="mt-6">
            <Button href="/about" variant="secondary">
              {educator.ctaLabel} <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
