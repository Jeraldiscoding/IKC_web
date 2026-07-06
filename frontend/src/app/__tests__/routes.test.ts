import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { siteConfig } from "@/lib/site-config";
import { getAllPosts } from "@/lib/blog";

describe("sitemap", () => {
  it("includes the home URL, every nav page, and every blog post", () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);

    // home + all six nav pages
    expect(urls).toContain(siteConfig.url);
    for (const item of siteConfig.nav) {
      const expected = `${siteConfig.url}${item.href === "/" ? "" : item.href}`;
      expect(urls).toContain(expected);
    }

    // every blog post
    for (const post of getAllPosts()) {
      expect(urls).toContain(`${siteConfig.url}/blog/${post.slug}`);
    }

    // total = nav pages + posts
    expect(entries).toHaveLength(siteConfig.nav.length + getAllPosts().length);
  });
});

describe("robots", () => {
  it("allows '/' and points sitemap at the site URL", () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    expect(rules.some((rule) => rule.allow === "/")).toBe(true);
    expect(result.sitemap).toBe(`${siteConfig.url}/sitemap.xml`);
  });
});
