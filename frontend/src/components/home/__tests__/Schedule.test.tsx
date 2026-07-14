import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScheduleSection } from "@/components/home/ScheduleSection";

describe("ScheduleSection", () => {
  it("renders the ages and the class times", () => {
    render(<ScheduleSection />);
    expect(screen.getByRole("heading", { name: /classes|schedule|when/i })).toBeInTheDocument();
    expect(screen.getAllByText(/ages/i).length).toBeGreaterThan(0);
  });

  it("has a WhatsApp CTA to ask about a slot", () => {
    render(<ScheduleSection />);
    expect(screen.getByRole("link", { name: /whatsapp|ask|enquire/i })).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me/6580231551"),
    );
  });
});
