import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GallerySection } from "@/components/home/GallerySection";
import { galleryItems } from "@/content/gallery";

describe("GallerySection", () => {
  it("renders its heading", () => {
    render(<GallerySection />);
    expect(screen.getByRole("heading", { name: /a peek inside/i })).toBeInTheDocument();
  });

  it("puts the items in a labelled, scrollable rail", () => {
    render(<GallerySection />);
    expect(screen.getByRole("region", { name: /gallery/i })).toBeInTheDocument();
  });

  it("renders every photo with its alt text", () => {
    render(<GallerySection />);
    for (const item of galleryItems) {
      if (item.kind === "photo") {
        expect(screen.getByRole("img", { name: item.alt })).toBeInTheDocument();
      }
    }
  });
});
