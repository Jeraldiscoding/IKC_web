import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BeliefSection } from "@/components/home/BeliefSection";
import { ProgrammesSection } from "@/components/home/ProgrammesSection";
import { programmes } from "@/content/programmes";

describe("BeliefSection", () => {
  it("renders three value titles", () => {
    render(<BeliefSection />);
    expect(screen.getByText("Safe")).toBeInTheDocument();
    expect(screen.getByText("Capable")).toBeInTheDocument();
    expect(screen.getByText("Included")).toBeInTheDocument();
  });
});

describe("ProgrammesSection", () => {
  it("renders a card for every programme", () => {
    render(<ProgrammesSection />);
    for (const p of programmes) {
      expect(screen.getByText(p.title)).toBeInTheDocument();
    }
  });
});
