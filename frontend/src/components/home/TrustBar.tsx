import { Award, ShieldCheck, Users, Home } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const items = [
  { icon: Award, label: "DISE-Certified (NIE)" },
  { icon: ShieldCheck, label: "Registered Singapore Business" },
  { icon: Users, label: "Small Group Classes" },
  { icon: Home, label: "Warm Home-Based Setting" },
];

export function TrustBar() {
  return (
    <section className="border-y border-cream-dark bg-cream-dark/30 px-5 py-8">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-3">
        {items.map((it) => (
          <Badge key={it.label} icon={it.icon}>
            {it.label}
          </Badge>
        ))}
      </div>
    </section>
  );
}
