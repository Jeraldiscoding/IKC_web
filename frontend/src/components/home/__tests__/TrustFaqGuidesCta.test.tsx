import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FaqPreview } from "@/components/home/FaqPreview";
import { GuidesTeaser } from "@/components/home/GuidesTeaser";
import { ClosingCta } from "@/components/home/ClosingCta";
import { faqs } from "@/content/faqs";

describe("FaqPreview", () => {
  it("shows the first FAQ question and links to the full FAQ page", () => {
    render(<FaqPreview />);
    expect(screen.getByText(faqs[0].question)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /all faqs|see all|full faq/i })).toHaveAttribute(
      "href",
      "/faq",
    );
  });

  it("renders each FAQ as a native disclosure with the first one open", () => {
    const { container } = render(<FaqPreview />);
    const details = container.querySelectorAll("details");
    expect(details.length).toBeGreaterThanOrEqual(4);
    expect(details[0]).toHaveAttribute("open");
    expect(details[1]).not.toHaveAttribute("open");
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
