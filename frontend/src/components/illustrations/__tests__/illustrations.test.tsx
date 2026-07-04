import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Blob } from "@/components/illustrations/Blob";
import { ActivityGlyph } from "@/components/illustrations/ActivityGlyph";

describe("illustrations", () => {
  it("Blob renders a decorative, aria-hidden svg", () => {
    const { container } = render(<Blob className="text-mustard" />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("aria-hidden");
  });

  it("ActivityGlyph renders an aria-hidden svg", () => {
    const { container } = render(<ActivityGlyph />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("aria-hidden");
  });
});
