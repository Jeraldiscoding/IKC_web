import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ResourcesPage from "@/app/resources/page";
import { getAllPosts } from "@/lib/blog";

describe("ResourcesPage (listing)", () => {
  it("renders exactly one h1", () => {
    render(<ResourcesPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("links to every post", () => {
    render(<ResourcesPage />);
    for (const post of getAllPosts()) {
      const link = screen.getByRole("link", { name: new RegExp(post.title.slice(0, 20), "i") });
      expect(link).toHaveAttribute("href", `/resources/${post.slug}`);
    }
  });
});
