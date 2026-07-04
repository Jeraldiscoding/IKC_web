import { describe, it, expect } from "vitest";
import { pageMetadata, localBusinessSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

describe("pageMetadata", () => {
  it("sets title, description and canonical path", () => {
    const meta = pageMetadata({
      title: "Services",
      description: "Our programmes.",
      path: "/services",
    });
    expect(meta.title).toBe("Services");
    expect(meta.description).toBe("Our programmes.");
    expect(meta.alternates?.canonical).toBe("/services");
    expect(meta.openGraph?.title).toBe("Services");
  });

  it("sets alternates.canonical to '/' for the home path", () => {
    const meta = pageMetadata({
      title: "Home",
      description: "Home page.",
      path: "/",
    });
    expect(meta.alternates?.canonical).toBe("/");
  });
});

describe("localBusinessSchema", () => {
  it("emits a schema.org object with the business name and telephone", () => {
    const schema = localBusinessSchema() as Record<string, unknown>;
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema.name).toBe(siteConfig.name);
    expect(schema.telephone).toContain(siteConfig.whatsapp.intl);
  });
});
