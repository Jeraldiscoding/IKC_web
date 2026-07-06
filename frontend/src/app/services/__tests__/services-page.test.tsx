import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ServicesPage from "@/app/services/page";
import { programmes } from "@/content/programmes";
import { servicesCopy } from "@/content/services";

describe("ServicesPage", () => {
  it("renders exactly one h1", () => {
    render(<ServicesPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("shows every programme area and format", () => {
    render(<ServicesPage />);
    for (const p of programmes) {
      expect(screen.getByText(p.title)).toBeInTheDocument();
    }
    for (const f of servicesCopy.formats.items) {
      expect(screen.getByText(f.title)).toBeInTheDocument();
    }
  });

  it("has a closing CTA to WhatsApp", () => {
    render(<ServicesPage />);
    expect(screen.getByRole("link", { name: /whatsapp/i })).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me/6580231551"),
    );
  });
});
