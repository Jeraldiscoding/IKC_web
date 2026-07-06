import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GallerySection } from "@/components/home/GallerySection";

describe("GallerySection", () => {
  it("renders its heading and the two class photos", () => {
    render(<GallerySection />);
    expect(screen.getByRole("heading", { name: /a peek inside/i })).toBeInTheDocument();
    // next/image renders an <img> queryable by its alt text
    expect(screen.getByRole("img", { name: /floor mat/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /interactive touchscreen/i })).toBeInTheDocument();
  });
});
