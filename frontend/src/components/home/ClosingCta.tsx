import { CtaBand } from "@/components/CtaBand";
import { homeCopy } from "@/content/home";

export function ClosingCta() {
  const { closing } = homeCopy;
  return (
    <CtaBand
      heading={closing.heading}
      body={closing.body}
      ctaLabel={closing.ctaLabel}
      message="Hi IKC, I'd like to find the right class for my child."
    />
  );
}
