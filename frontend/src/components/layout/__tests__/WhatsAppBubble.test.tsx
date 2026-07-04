import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WhatsAppBubble } from "@/components/layout/WhatsAppBubble";

describe("WhatsAppBubble", () => {
  it("links to the real WhatsApp number via wa.me", () => {
    render(<WhatsAppBubble />);
    const link = screen.getByRole("link", { name: /chat with us/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("wa.me/6580231551"));
    expect(link).toHaveAttribute("target", "_blank");
  });
});
