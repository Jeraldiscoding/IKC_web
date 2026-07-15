import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Doodle } from "@/components/decor/Doodle";
import { servicesCopy } from "@/content/services";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";

// Full class strings, never interpolated — Tailwind must be able to see them.
const panels = [
  { tile: "bg-mustard-tint", iconWrap: "bg-mustard/25", icon: "text-mustard-dark" },
  { tile: "bg-sage-tint", iconWrap: "bg-sage/25", icon: "text-sage-dark" },
  { tile: "bg-terracotta-light/15", iconWrap: "bg-terracotta/15", icon: "text-terracotta" },
];

/**
 * Three tinted panels rather than three identical white centre-aligned cards.
 * Left-aligned text with the icon at the top reads as designed; centred text in a
 * white box is the default every template reaches for.
 */
export function FormatsSection() {
  const { formats } = servicesCopy;
  return (
    <Section
      glow="cool"
      decor={
        <Doodle
          name="rainbow"
          className="absolute -right-2 top-16 hidden h-16 w-24 text-sage/25 sm:block"
        />
      }
    >
      <Reveal className="max-w-3xl">
        <Eyebrow>Formats</Eyebrow>
        <h2 className="mt-4">{formats.heading}</h2>
        <p className="mt-4 text-lg">{formats.intro}</p>
      </Reveal>

      <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-3">
        {formats.items.map((f, i) => {
          const Icon = f.icon;
          const p = panels[i % panels.length];
          return (
            <StaggerItem key={f.title}>
              <HoverCard className="h-full">
                <div className={`flex h-full flex-col rounded-3xl p-8 ${p.tile}`}>
                  <span
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${p.iconWrap}`}
                  >
                    <Icon className={`h-7 w-7 ${p.icon}`} aria-hidden />
                  </span>
                  <h3 className="mt-6 text-xl">{f.title}</h3>
                  <p className="mt-3 text-sm">{f.body}</p>
                </div>
              </HoverCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
