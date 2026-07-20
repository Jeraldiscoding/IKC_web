import { describe, it, expect } from "vitest";
import { siteConfig, waLink } from "@/lib/site-config";

describe("siteConfig", () => {
  it("uses the real WhatsApp number in international form", () => {
    expect(siteConfig.whatsapp.intl).toBe("6580231551");
    expect(siteConfig.whatsapp.display).toBe("8023 1551");
  });

  it("exposes all six primary nav pages in order", () => {
    expect(siteConfig.nav.map((n) => n.href)).toEqual([
      "/",
      "/about",
      "/services",
      "/our-educators",
      "/faq",
      "/resources",
    ]);
  });
});

describe("waLink", () => {
  it("builds a wa.me link with url-encoded message", () => {
    expect(waLink("Hi IKC")).toBe("https://wa.me/6580231551?text=Hi%20IKC");
  });

  it("omits the query when no message is given", () => {
    expect(waLink()).toBe("https://wa.me/6580231551");
  });
});
