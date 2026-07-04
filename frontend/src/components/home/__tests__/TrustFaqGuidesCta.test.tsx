import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TrustReasonsSection } from "@/components/home/TrustReasonsSection";
import { FaqPreview } from "@/components/home/FaqPreview";
import { GuidesTeaser } from "@/components/home/GuidesTeaser";
import { ClosingCta } from "@/components/home/ClosingCta";
import { faqs } from "@/content/faqs";

describe("TrustReasonsSection", () => {
  it("renders the section heading", () => {
    render(<TrustReasonsSection />);
    expect(screen.getByText(/why families choose/i)).toBeInTheDocument();
  });
});

describe("FaqPreview", () => {
  it("shows the first FAQ question and links to the full FAQ page", () => {
    render(<FaqPreview />);
    expect(screen.getByText(faqs[0].question)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /all faqs|see all|full faq/i })).toHaveAttribute(
      "href",
      "/faq",
    );
  });
});

describe("GuidesTeaser", () => {
  it("links to the blog", () => {
    render(<GuidesTeaser />);
    expect(screen.getByRole("link", { name: /blog|guides/i })).toHaveAttribute("href", "/blog");
  });
});

describe("ClosingCta", () => {
  it("has a WhatsApp CTA", () => {
    render(<ClosingCta />);
    expect(screen.getByRole("link", { name: /whatsapp/i })).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me/6580231551"),
    );
  });
});
