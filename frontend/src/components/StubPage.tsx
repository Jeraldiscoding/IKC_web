import { MessageCircle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { waLink } from "@/lib/site-config";

export function StubPage({ title, intro }: { title: string; intro: string }) {
  return (
    <Section className="text-center">
      <h1 className="mx-auto max-w-3xl">{title}</h1>
      <p className="mx-auto mt-5 max-w-2xl text-lg">{intro}</p>
      <p className="mt-4 text-sm text-ink-muted">
        This page is being written — the full details are coming soon. In the
        meantime, we&apos;re happy to answer any questions directly.
      </p>
      <div className="mt-8">
        <Button href={waLink("Hi IKC, I'd like to find out more.")} aria-label="Enquire on WhatsApp">
          <MessageCircle className="h-4 w-4" aria-hidden /> Ask us on WhatsApp
        </Button>
      </div>
    </Section>
  );
}
