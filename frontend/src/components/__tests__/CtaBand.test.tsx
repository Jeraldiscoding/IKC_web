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
});
