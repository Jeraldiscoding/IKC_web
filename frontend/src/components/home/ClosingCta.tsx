import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { waLink } from "@/lib/site-config";
import { homeCopy } from "@/content/home";

export function ClosingCta() {
  const { closing } = homeCopy;
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-4xl rounded-3xl bg-terracotta px-8 py-14 text-center text-cream shadow-soft-lg">
        <h2 className="text-cream">{closing.heading}</h2>
        <p className="mx-auto mt-4 max-w-xl text-cream/90">{closing.body}</p>
        <div className="mt-8 flex justify-center">
          <Button
            href={waLink("Hi IKC, I'd like to find the right class for my child.")}
            className="bg-cream text-terracotta hover:bg-cream-dark"
          >
            <MessageCircle className="h-4 w-4" aria-hidden /> {closing.ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
