import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProgrammesSection } from "@/components/home/ProgrammesSection";
import { programmes } from "@/content/programmes";

describe("ProgrammesSection", () => {
  it("renders a card for every programme", () => {
    render(<ProgrammesSection />);
    for (const p of programmes) {
      expect(screen.getByText(p.title)).toBeInTheDocument();
    }
  });
});
