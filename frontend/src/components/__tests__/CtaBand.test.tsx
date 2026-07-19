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

  it("keeps both CTAs visible on the terracotta band, booking as the filled primary", () => {
    render(
      <CtaBand heading="Ready?" body="Body." ctaLabel="Chat with us" message="Hi" />,
    );
    // WhatsApp is the outline secondary — cream text on the terracotta band, and
    // crucially NOT terracotta-on-terracotta (the invisible-button bug this guards).
    const whatsapp = screen.getByRole("link", { name: /chat with us/i }).className;
    expect(whatsapp).toContain("text-cream");
    expect(whatsapp).not.toContain("text-terracotta");
    // Booking is the filled cream primary: cream background, terracotta text.
    const book = screen.getByRole("button", { name: /book a consultation/i }).className;
    expect(book).toContain("bg-cream");
    expect(book).not.toContain("bg-terracotta");
    expect(book).toContain("text-terracotta");
  });
});
