import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ServiceProfessionalsPage from "@/app/service-professionals/page";
import { educators } from "@/content/educators";

describe("ServiceProfessionalsPage", () => {
  it("renders exactly one h1", () => {
    render(<ServiceProfessionalsPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("renders an EducatorCard for each educator", () => {
    render(<ServiceProfessionalsPage />);
    for (const e of educators) {
      expect(screen.getByText(e.name)).toBeInTheDocument();
    }
  });

  it("shows the experience timeline with METTA School", () => {
    render(<ServiceProfessionalsPage />);
    expect(screen.getByText("METTA School")).toBeInTheDocument();
    expect(screen.getByText("Special Needs Educator")).toBeInTheDocument();
  });
});
