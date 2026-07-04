import { Award, Users, ShieldCheck } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { waLink } from "@/lib/site-config";

export default function HomePage() {
  return (
    <Section className="text-center">
      <h1 className="mx-auto max-w-3xl">
        A warm, home-based enrichment club where every child feels{" "}
        <span className="text-terracotta">safe, capable, and included.</span>
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-lg">
        Small-group enrichment classes, workshops and holiday programmes for
        children with special needs in Singapore — led by a DISE-certified
        (NIE) SPED educator.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Badge icon={Award}>DISE-Certified (NIE)</Badge>
        <Badge icon={ShieldCheck}>Registered Singapore Business</Badge>
        <Badge icon={Users}>Small Group Classes</Badge>
      </div>
      <div className="mt-8">
        <Button href={waLink("Hi IKC, I'd like to find out more about your classes.")}>
          Enquire on WhatsApp
        </Button>
      </div>
    </Section>
  );
}
