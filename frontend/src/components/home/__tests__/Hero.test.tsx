import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";

describe("Hero", () => {
  it("renders exactly one h1 with the hero headline", () => {
    render(<Hero />);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0].textContent).toMatch(/special needs/i);
  });

  it("has a WhatsApp primary CTA and a link to services", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /whatsapp/i })).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me/6580231551"),
    );
    expect(screen.getByRole("link", { name: /explore our classes/i })).toHaveAttribute(
      "href",
      "/services",
    );
  });

  it("shows the class video above the fold, muted and autoplaying with a poster", () => {
    const { container } = render(<Hero />);
    const video = container.querySelector("video");
    expect(video).not.toBeNull();
    expect(video).toHaveAttribute("poster", "/media/hero-poster.jpg");
    expect(video).toHaveAttribute("playsinline");
    expect(video!.muted).toBe(true);
    expect(video!.autoplay).toBe(true);
    expect(video!.loop).toBe(true);
  });
});

describe("TrustBar", () => {
  it("shows the DISE credential badge", () => {
    render(<TrustBar />);
    expect(screen.getByText(/DISE-Certified/i)).toBeInTheDocument();
  });
});
