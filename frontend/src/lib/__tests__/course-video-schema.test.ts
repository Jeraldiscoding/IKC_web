import { describe, it, expect } from "vitest";
import { courseSchema } from "@/lib/course-schema";
import { videoSchemas } from "@/lib/video-schema";
import { programmes } from "@/content/programmes";
import { siteConfig } from "@/lib/site-config";

describe("courseSchema", () => {
  it("emits an ItemList with one Course per programme", () => {
    const schema = courseSchema() as Record<string, unknown>;
    expect(schema["@type"]).toBe("ItemList");
    const items = schema.itemListElement as Array<Record<string, unknown>>;
    expect(items).toHaveLength(programmes.length);
    expect(items[0].name).toBe(programmes[0].title);
  });

  it("names the provider without inventing dates or prices", () => {
    const items = (courseSchema() as Record<string, unknown>)
      .itemListElement as Array<Record<string, Record<string, unknown>>>;
    expect(items[0].provider.name).toBe(siteConfig.name);
    expect(items[0].startDate).toBeUndefined();
    expect(items[0].offers).toBeUndefined();
  });
});

describe("videoSchemas", () => {
  it("emits a VideoObject per real video with an absolute contentUrl", () => {
    const videos = videoSchemas();
    expect(videos).toHaveLength(2);
    for (const v of videos) {
      const obj = v as Record<string, unknown>;
      expect(obj["@type"]).toBe("VideoObject");
      expect(obj.name).toBeTruthy();
      expect(obj.contentUrl as string).toContain(siteConfig.url);
      expect(obj.thumbnailUrl).toBeTruthy();
    }
  });
});
