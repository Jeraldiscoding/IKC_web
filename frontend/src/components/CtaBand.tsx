import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { waLink } from "@/lib/site-config";
import { SectionGlow } from "@/components/decor/SectionGlow";

export function CtaBand({
  heading,
  body,
  ctaLabel,
  message,
}: {
  heading: string;
  body: string;
  ctaLabel: string;
  message: string;
}) {
  return (
    <section className="relative overflow-hidden px-5 py-20">
      <SectionGlow variant="duo" />
      <div className="relative mx-auto max-w-4xl rounded-3xl bg-terracotta px-8 py-14 text-center text-cream shadow-soft-lg">
        <h2 className="text-cream">{heading}</h2>
        <p className="mx-auto mt-4 max-w-xl text-cream/90">{body}</p>
        <div className="mt-8 flex justify-center">
          <Button href={waLink(message)} variant="inverse">
            <MessageCircle className="h-4 w-4" aria-hidden /> {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
