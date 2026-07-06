import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { EducatorCard } from "@/components/EducatorCard";
import type { Educator } from "@/content/educators";

const base: Educator = {
  slug: "x",
  name: "Test Educator",
  title: "DISE-Certified Special Needs Educator (NIE)",
  initials: "TE",
  bio: ["A short bio."],
  specialties: ["Functional skills", "Academics"],
};

describe("EducatorCard", () => {
  it("renders name, title and specialties", () => {
    render(<EducatorCard educator={base} />);
    expect(screen.getByText("Test Educator")).toBeInTheDocument();
    expect(screen.getByText(/DISE-Certified/i)).toBeInTheDocument();
    expect(screen.getByText("Functional skills")).toBeInTheDocument();
    expect(screen.getByText("Academics")).toBeInTheDocument();
  });

  it("shows the initials avatar when no photo is provided", () => {
    render(<EducatorCard educator={base} />);
    expect(screen.getByText("TE")).toBeInTheDocument();
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("shows a portrait image when a photo is provided", () => {
    render(<EducatorCard educator={{ ...base, photo: "/media/teacher.png" }} />);
    expect(screen.getByRole("img", { name: /portrait of test educator/i })).toBeInTheDocument();
  });
});
