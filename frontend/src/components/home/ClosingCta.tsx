import { CtaBand } from "@/components/CtaBand";
import { homeCopy } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";

export function ClosingCta() {
  const { closing } = homeCopy;
  return (
    <Reveal>
      <CtaBand
        heading={closing.heading}
        body={closing.body}
        ctaLabel={closing.ctaLabel}
        message="Hi IKC, I'd like to find the right class for my child."
      />
    </Reveal>
  );
}
