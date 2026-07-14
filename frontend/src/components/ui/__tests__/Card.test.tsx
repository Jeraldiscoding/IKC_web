import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "@/components/ui/Card";

describe("Card", () => {
  it("defaults to the elevated variant (white, bordered, shadowed)", () => {
    render(<Card>content</Card>);
    const el = screen.getByText("content");
    expect(el.className).toContain("bg-white");
    expect(el.className).toContain("shadow-soft");
  });

  it("renders a tinted variant without the white background", () => {
    render(<Card variant="tinted">tinted</Card>);
    const el = screen.getByText("tinted");
    expect(el.className).toContain("bg-mustard-tint");
    expect(el.className).not.toContain("bg-white");
  });

  it("renders an outlined variant", () => {
    render(<Card variant="outlined">outlined</Card>);
    expect(screen.getByText("outlined").className).toContain("border-cream-dark");
  });

  it("still appends a caller className", () => {
    render(<Card className="custom-x">c</Card>);
    expect(screen.getByText("c").className).toContain("custom-x");
  });
});
