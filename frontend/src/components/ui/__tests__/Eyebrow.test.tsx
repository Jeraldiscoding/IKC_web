import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Eyebrow } from "@/components/ui/Eyebrow";

describe("Eyebrow", () => {
  it("renders its label", () => {
    render(<Eyebrow>Our programmes</Eyebrow>);
    expect(screen.getByText("Our programmes")).toBeInTheDocument();
  });
});
