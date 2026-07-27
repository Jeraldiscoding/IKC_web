import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { WorkshopSection } from "@/components/WorkshopSection";
import { workshops } from "@/content/workshops";
import { siteConfig } from "@/lib/site-config";

const workshop = workshops[0];

// The component reads the clock itself, so the only way to exercise both the
// "showing" and "expired" branches is to move the clock. `shouldAdvanceTime`
// keeps real timers ticking underneath so Motion still settles.
function atTime(iso: string) {
  vi.useFakeTimers({ shouldAdvanceTime: true });
  vi.setSystemTime(new Date(iso));
}

afterEach(() => {
  vi.useRealTimers();
});

describe("WorkshopSection", () => {
  it("shows the workshop's date, time, fee and venue while it is upcoming", () => {
    atTime("2026-07-01T09:00:00+08:00");
    render(<WorkshopSection />);

    expect(screen.getByRole("heading", { name: workshop.title })).toBeInTheDocument();
    expect(screen.getByText(/23 August 2026, Sunday/)).toBeInTheDocument();
    expect(screen.getByText(workshop.timeLabel)).toBeInTheDocument();
    expect(screen.getByText(/\$85 per child/)).toBeInTheDocument();
    expect(screen.getByText(/Blue Herring Academy \(Near Kovan MRT\)/)).toBeInTheDocument();
    expect(screen.getByText(/independently\s+organised by IKC/i)).toBeInTheDocument();
  });

  it("renders the poster with alt text that carries the details", () => {
    atTime("2026-07-01T09:00:00+08:00");
    render(<WorkshopSection />);

    const poster = screen.getByRole("img", { name: /Ready for Oral Success/i });
    expect(poster).toBeInTheDocument();
    expect(poster.getAttribute("alt")).toMatch(/23 August 2026/);
  });

  it("sends the primary CTA to the sign-up form rather than to WhatsApp", () => {
    atTime("2026-07-01T09:00:00+08:00");
    render(<WorkshopSection />);

    const cta = screen.getByRole("link", { name: /sign up for the workshop/i });
    expect(cta).toHaveAttribute("href", workshop.signUpUrl as string);
    expect(cta.getAttribute("href")).not.toContain("wa.me");
    // Off-site, so it must open in a new tab without handing the form a
    // `window.opener` reference back to the site.
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta.getAttribute("rel")).toContain("noopener");
  });

  it("keeps WhatsApp as a separate 'ask a question' route beside the form", () => {
    atTime("2026-07-01T09:00:00+08:00");
    render(<WorkshopSection />);

    const ask = screen.getByRole("link", { name: /ask us a question/i });
    expect(ask.getAttribute("href")).toContain(`wa.me/${siteConfig.whatsapp.intl}`);
  });

  it("renders nothing once the workshop has finished", () => {
    atTime("2026-08-24T09:00:00+08:00");
    const { container } = render(<WorkshopSection />);
    expect(container).toBeEmptyDOMElement();
  });
});
