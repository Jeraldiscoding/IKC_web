import { Award, ShieldCheck, Users, Home } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";

const items = [
  { icon: Award, label: "DISE-Certified (NIE)" },
  { icon: ShieldCheck, label: "Registered Singapore Business" },
  { icon: Users, label: "Small Group Classes" },
  { icon: Home, label: "Warm Home-Based Setting" },
];

export function TrustBar() {
  return (
    <section className="border-y border-cream-dark bg-cream-dark/40 px-5 py-5">
      <StaggerGroup className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-3">
        {items.map((it) => (
          <StaggerItem key={it.label}>
            <HoverCard>
              <Badge icon={it.icon}>{it.label}</Badge>
            </HoverCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
