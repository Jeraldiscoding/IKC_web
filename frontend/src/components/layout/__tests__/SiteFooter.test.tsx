import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { siteConfig } from "@/lib/site-config";

describe("SiteFooter", () => {
  it("shows the business email and address from config", () => {
    render(<SiteFooter />);
    expect(screen.getByText(siteConfig.email)).toBeInTheDocument();
    expect(screen.getByText(siteConfig.address)).toBeInTheDocument();
  });

  it("links to the Instagram profile", () => {
    render(<SiteFooter />);
    const ig = screen.getByRole("link", { name: /instagram/i });
    expect(ig).toHaveAttribute("href", siteConfig.instagram);
  });
});
