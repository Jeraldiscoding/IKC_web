import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { DoodleScatter } from "@/components/decor/DoodleScatter";
import { programmes } from "@/content/programmes";
import { Reveal } from "@/components/motion/Reveal";

/**
 * A gateway, not a catalogue. The home page names what we teach and routes to
 * /services for the full breakdown, prices and schedule — it deliberately does
 * not reproduce the programme cards that live on the Services page.
 */
export function ProgrammesSection() {
  return (
    <Section glow="cool" decor={<DoodleScatter preset="programmes" />}>
      <Reveal className="max-w-3xl">
        <Eyebrow>Our programmes</Eyebrow>
        <h2 className="mt-4">Small-group enrichment, built around your child</h2>
        <p className="mt-4 text-lg">
          Four areas of learning, each taught in calm, small groups, alongside flexible classes ranging from one-to-one support to weekend programmes.
        </p>

        <ul className="mt-7 flex flex-wrap gap-2.5">
          {programmes.map((p) => (
            <li
              key={p.slug}
              className="rounded-full bg-cream-dark/40 px-4 py-2 text-sm font-medium text-ink"
            >
              {p.title}
            </li>
          ))}
        </ul>

        <div className="mt-9">
          <Button href="/services">
            Explore programmes &amp; pricing <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
