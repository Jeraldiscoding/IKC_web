import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders exactly one h1", () => {
    render(<HomePage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("includes the programmes and closing CTA", () => {
    render(<HomePage />);
    expect(screen.getByText("Functional Skills")).toBeInTheDocument();
    expect(screen.getByText(/ready to find the right class/i)).toBeInTheDocument();
  });
});
