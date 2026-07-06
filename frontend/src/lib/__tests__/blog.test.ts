import { describe, it, expect } from "vitest";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/blog";
import { articleSchema } from "@/lib/article-schema";

describe("blog loader", () => {
  it("finds the starter articles", () => {
    const slugs = getPostSlugs();
    expect(slugs).toContain("what-is-functional-skills-training");
    expect(slugs.length).toBeGreaterThanOrEqual(3);
  });

  it("returns posts sorted newest first with required metadata", () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThanOrEqual(3);
    for (const p of posts) {
      expect(p.title).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(p.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
    // sorted descending by date
    const dates = posts.map((p) => p.date);
    expect([...dates].sort((a, b) => (a < b ? 1 : -1))).toEqual(dates);
  });

  it("renders a post body to HTML", () => {
    const post = getPostBySlug("benefits-of-small-group-learning");
    expect(post).not.toBeNull();
    expect(post!.html).toContain("<h2");
    expect(post!.html.length).toBeGreaterThan(200);
  });

  it("returns null for an unknown slug", () => {
    expect(getPostBySlug("does-not-exist")).toBeNull();
  });
});

describe("articleSchema", () => {
  it("builds an Article schema for a post", () => {
    const posts = getAllPosts();
    const s = articleSchema(posts[0]) as Record<string, unknown>;
    expect(s["@type"]).toBe("Article");
    expect(s.headline).toBe(posts[0].title);
  });
});
