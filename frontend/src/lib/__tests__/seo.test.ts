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

describe("localBusinessSchema — placeholder safety", () => {
  it("never emits a streetAddress while the address is a placeholder", () => {
    const schema = localBusinessSchema();
    const address = schema.address as Record<string, unknown>;
    // siteConfig.address is still "[Unit address, Singapore]". A fabricated street
    // address in LocalBusiness JSON-LD is exactly what Google penalises as local-SEO
    // spam, so it must stay out of the schema until a real one exists.
    expect(address.streetAddress).toBeUndefined();
    expect(JSON.stringify(schema)).not.toContain("[Unit address");
  });

  it("carries the organisation logo and the area served", () => {
    const schema = localBusinessSchema() as Record<string, unknown>;
    expect(schema.logo).toContain("/media/IKC_Logo.jpeg");
    expect(schema.areaServed).toBeDefined();
  });
});
