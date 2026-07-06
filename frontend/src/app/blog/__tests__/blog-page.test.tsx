import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BlogPage from "@/app/blog/page";
import { getAllPosts } from "@/lib/blog";

describe("BlogPage (listing)", () => {
  it("renders exactly one h1", () => {
    render(<BlogPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("links to every post", () => {
    render(<BlogPage />);
    for (const post of getAllPosts()) {
      const link = screen.getByRole("link", { name: new RegExp(post.title.slice(0, 20), "i") });
      expect(link).toHaveAttribute("href", `/blog/${post.slug}`);
    }
  });
});
