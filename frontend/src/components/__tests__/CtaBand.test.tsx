import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaBand } from "@/components/CtaBand";

describe("CtaBand", () => {
  it("renders heading, body and a WhatsApp CTA with the encoded message", () => {
    render(
      <CtaBand
        heading="Ready?"
        body="Body text."
        ctaLabel="Chat with us"
        message="Hi IKC"
      />,
    );
    expect(screen.getByRole("heading", { name: "Ready?" })).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /chat with us/i });
    expect(link).toHaveAttribute("href", "https://wa.me/6580231551?text=Hi%20IKC");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("gives the CTA a cream-on-terracotta button with no competing colour utilities", () => {
    render(
      <CtaBand heading="Ready?" body="Body." ctaLabel="Chat with us" message="Hi" />,
    );
    const cls = screen.getByRole("link", { name: /chat with us/i }).className;
    // The band is terracotta, so the button must be cream. Carrying BOTH bg-cream
    // and bg-terracotta is the bug this guards: Tailwind resolves the conflict by
    // CSS source order, and terracotta won — rendering terracotta text on a
    // terracotta background, i.e. an invisible button on every CTA on the site.
    expect(cls).toContain("bg-cream");
    expect(cls).not.toContain("bg-terracotta");
    expect(cls).toContain("text-terracotta");
    expect(cls).not.toContain("text-cream");
  });

  it("offers a Calendly booking button alongside WhatsApp", () => {
    render(
      <CtaBand heading="Ready?" body="Body." ctaLabel="Chat with us" message="Hi" />,
    );
    expect(
      screen.getByRole("button", { name: /book a consultation/i }),
    ).toBeInTheDocument();
  });
});
