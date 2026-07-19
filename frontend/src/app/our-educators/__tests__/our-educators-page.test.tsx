import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import OurEducatorsPage from "@/app/our-educators/page";
import { educators } from "@/content/educators";

describe("OurEducatorsPage", () => {
  it("renders exactly one h1", () => {
    render(<OurEducatorsPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("renders an EducatorCard for each educator", () => {
    render(<OurEducatorsPage />);
    for (const e of educators) {
      expect(screen.getByText(e.name)).toBeInTheDocument();
    }
  });

  it("shows the experience timeline without naming the school", () => {
    render(<OurEducatorsPage />);
    expect(screen.getByText("SPED School")).toBeInTheDocument();
    expect(screen.getByText("Special Needs Educator")).toBeInTheDocument();
    expect(screen.queryByText("METTA School")).not.toBeInTheDocument();
  });
});
