import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { EducatorTeaser } from "@/components/home/EducatorTeaser";
import { DayAtIkcSection } from "@/components/home/DayAtIkcSection";

describe("EducatorTeaser", () => {
  it("mentions the DISE credential and links to About", () => {
    render(<EducatorTeaser />);
    expect(screen.getAllByText(/DISE-certified/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /meet your educator/i })).toHaveAttribute(
      "href",
      "/about",
    );
  });
});

describe("DayAtIkcSection", () => {
  it("renders four numbered steps", () => {
    render(<DayAtIkcSection />);
    expect(screen.getByText("Settle in")).toBeInTheDocument();
    expect(screen.getByText("Wind down")).toBeInTheDocument();
  });
});
