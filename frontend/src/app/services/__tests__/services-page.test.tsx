import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ServicesPage from "@/app/services/page";
import { programmes } from "@/content/programmes";
import { pricedProgrammes } from "@/content/pricing";

describe("ServicesPage", () => {
  it("renders exactly one h1", () => {
    render(<ServicesPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("shows every teaching focus area", () => {
    render(<ServicesPage />);
    for (const p of programmes) {
      expect(screen.getByText(p.title)).toBeInTheDocument();
    }
  });

  it("shows every priced programme with its 'from' price", () => {
    render(<ServicesPage />);
    for (const p of pricedProgrammes) {
      expect(screen.getByRole("heading", { name: p.title })).toBeInTheDocument();
      expect(screen.getAllByText(new RegExp(`From\\s*\\${p.fromPrice}`)).length).toBeGreaterThan(0);
    }
    expect(screen.getByText(/4 sessions for \$450/)).toBeInTheDocument();
  });

  it("no longer shows the old Formats copy", () => {
    render(<ServicesPage />);
    expect(screen.queryByText("Weekly Enrichment Classes")).not.toBeInTheDocument();
  });

  it("has a closing CTA to WhatsApp", () => {
    render(<ServicesPage />);
    expect(screen.getByRole("link", { name: /whatsapp/i })).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me/6580231551"),
    );
  });
});
