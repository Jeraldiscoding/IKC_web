import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { HeartHandshake, Users, Sparkles } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { personSchema } from "@/lib/person-schema";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/CtaBand";
import { EducatorCard } from "@/components/EducatorCard";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { educators } from "@/content/educators";

export const metadata: Metadata = pageMetadata({
  title: "Our Educators — SPED Professionals in Singapore",
  description:
    "Meet Venetia Lim, the DISE-certified (NIE) special needs educator at Inclusive Kids Club, with experience teaching at METTA School — supporting children in small-group settings across Singapore.",
  path: "/service-professionals",
});

type ApproachAccent = "terracotta" | "mustard" | "sage";

// Full class strings, never interpolated.
const approachAccents: Record<
  ApproachAccent,
  { card: string; iconWrap: string; icon: string; rule: string }
> = {
  terracotta: {
    card: "bg-terracotta-light/10",
    iconWrap: "bg-terracotta/15",
    icon: "text-terracotta",
    rule: "bg-terracotta",
  },
  mustard: {
    card: "bg-mustard-tint",
    iconWrap: "bg-mustard/25",
    icon: "text-mustard-dark",
    rule: "bg-mustard-dark",
  },
  sage: {
    card: "bg-sage-tint",
    iconWrap: "bg-sage/25",
    icon: "text-sage-dark",
    rule: "bg-sage-dark",
  },
};

const approach: { icon: LucideIcon; title: string; body: string; accent: ApproachAccent }[] = [
  {
    icon: HeartHandshake,
    title: "Patient and individualised",
    body: "Every child is met where they are, with lessons paced and adapted to how they learn best.",
    accent: "terracotta",
  },
  {
    icon: Users,
    title: "Small groups, close attention",
    body: "Deliberately small classes mean our educators can truly focus on each child.",
    accent: "mustard",
  },
  {
    icon: Sparkles,
    title: "Qualified and specialised",
    body: "Led by a DISE-certified (NIE) special needs educator — trained specifically for these needs.",
    accent: "sage",
  },
];

export default function ServiceProfessionalsPage() {
  // Structured data for each named educator (helps search engines understand who teaches here).
  const namedEducators = educators.filter((e) => e.name && e.photo);

  return (
    <>
      {namedEducators.map((e) => (
        <JsonLd key={e.slug} data={personSchema(e)} />
      ))}

      <Section glow="center" className="text-center">
        <h1 className="mx-auto max-w-3xl">The people behind Inclusive Kids Club</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg">
          Your child is supported by qualified special needs education professionals who
          teach in calm, small groups — and get to know each child as an individual.
        </p>
      </Section>

      <Section glow="warm" className="pt-0">
        <div className="space-y-8">
          {educators.map((e) => (
            <EducatorCard key={e.slug} educator={e} />
          ))}
        </div>
      </Section>

      {/* Career timeline for educators who have experience listed */}
      {educators
        .filter((e) => e.experience && e.experience.length > 0)
        .map((e) => (
          <Section key={`exp-${e.slug}`} glow="cool" className="bg-cream-dark/20">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-center">{e.name}&rsquo;s experience</h2>
              <p className="mx-auto mt-4 max-w-xl text-center text-ink-muted">
                Years of hands-on experience supporting children with special needs.
              </p>
              <div className="mt-12">
                <ExperienceTimeline items={e.experience!} />
              </div>
            </div>
          </Section>
        ))}

      <Section glow="left">
        <div className="mx-auto max-w-3xl text-center">
          <h2>How our educators work</h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {approach.map((a) => {
            const Icon = a.icon;
            const c = approachAccents[a.accent];
            return (
              <div
                key={a.title}
                className={`group flex h-full flex-col rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-1 motion-reduce:transform-none ${c.card}`}
              >
                <span
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 motion-reduce:transform-none ${c.iconWrap}`}
                >
                  <Icon className={`h-7 w-7 ${c.icon}`} aria-hidden />
                </span>
                <h3 className="mt-6 text-xl">{a.title}</h3>
                <span className={`mt-3 block h-1 w-10 rounded-full ${c.rule}`} aria-hidden />
                <p className="mt-4 text-sm">{a.body}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <CtaBand
        heading="Have a question for our team?"
        body="We're happy to tell you more about our educator, our approach, and how we can support your child."
        ctaLabel="Message us on WhatsApp"
        message="Hi IKC, I'd like to ask about your educators."
      />
    </>
  );
}
