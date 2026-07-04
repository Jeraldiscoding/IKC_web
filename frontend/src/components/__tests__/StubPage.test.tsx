import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StubPage } from "@/components/StubPage";

describe("StubPage", () => {
  it("renders the title as the single h1", () => {
    render(<StubPage title="About IKC" intro="Some intro." />);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent("About IKC");
  });

  it("shows a WhatsApp enquiry link", () => {
    render(<StubPage title="Services" intro="x" />);
    const link = screen.getByRole("link", { name: /whatsapp/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("wa.me/6580231551"));
  });
});
