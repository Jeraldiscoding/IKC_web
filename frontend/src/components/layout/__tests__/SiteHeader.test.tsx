import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteConfig } from "@/lib/site-config";

describe("SiteHeader", () => {
  it("renders a link for every primary nav page", () => {
    render(<SiteHeader />);
    for (const item of siteConfig.nav) {
      // getAllByRole: link appears in both desktop and mobile menus
      const links = screen.getAllByRole("link", { name: item.label });
      expect(links.length).toBeGreaterThan(0);
    }
  });

  it("shows the IKC logo in the home link", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("img", { name: /inclusive kids club logo/i })).toBeInTheDocument();
  });
});
