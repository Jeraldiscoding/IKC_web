"use client";

import { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";
import { PopupButton } from "react-calendly";
import { siteConfig } from "@/lib/site-config";

/**
 * Calendly's own embed snippet is a raw <script>/<div> pair meant for plain
 * HTML sites. In Next.js that becomes a hydration hazard — the widget touches
 * `document` directly, which doesn't exist during server rendering. This wraps
 * react-calendly's PopupButton (a proper client component) instead, and defers
 * rendering until `document.body` exists, so there is nothing to hydrate.
 */
export function CalendlyPopupButton({
  text = "Book a consultation",
  className = "",
}: {
  text?: string;
  className?: string;
}) {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Intentional setState-in-effect: this is the standard SSR mount guard.
    // `document` doesn't exist during server rendering, so the first client
    // render must also return null to match the server HTML — only the
    // *effect* (which only runs in the browser, after mount) may reveal the
    // button. Reading `document` during render instead would make the first
    // client render diverge from the server's, causing a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRootElement(document.body);
  }, []);

  if (!rootElement) return null;

  return (
    <PopupButton
      url={siteConfig.calendlyUrl}
      rootElement={rootElement}
      text={text}
      pageSettings={{ hideEventTypeDetails: true, hideGdprBanner: true }}
      className={`inline-flex items-center justify-center gap-2 rounded-full border-2 font-heading font-semibold px-6 py-3 text-base transition-transform active:scale-[0.98] ${className}`}
      LoadingSpinner={() => (
        <span className="inline-flex items-center gap-2">
          <CalendarClock className="h-4 w-4 animate-pulse" aria-hidden /> Loading…
        </span>
      )}
    />
  );
}
