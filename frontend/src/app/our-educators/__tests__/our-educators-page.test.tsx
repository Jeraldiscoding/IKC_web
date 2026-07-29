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

  it("shows the experience timeline, naming the school and the dates", () => {
    render(<OurEducatorsPage />);
    expect(screen.getByText("Metta School, Singapore")).toBeInTheDocument();
    expect(
      screen.getByText("Special Education Teacher (SPED Level 3, MOE framework)"),
    ).toBeInTheDocument();
    expect(screen.getByText("Jul 2019 – Mar 2026")).toBeInTheDocument();
  });

  it("shows the formal qualifications", () => {
    render(<OurEducatorsPage />);
    expect(
      screen.getByText("Diploma in Special Education (DISE, SST)"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("National Institute of Education, Singapore (NIE)"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Nanyang Technological University (NTU)"),
    ).toBeInTheDocument();
  });
});
