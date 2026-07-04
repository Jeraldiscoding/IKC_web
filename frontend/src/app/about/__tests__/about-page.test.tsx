import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutPage from "@/app/about/page";
import { aboutCopy } from "@/content/about";

describe("AboutPage", () => {
  it("renders exactly one h1 (the intro heading)", () => {
    render(<AboutPage />);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(aboutCopy.intro.heading);
  });

  it("includes the credentials section and closing CTA", () => {
    render(<AboutPage />);
    expect(screen.getByText(aboutCopy.credentials.items[0].term)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: aboutCopy.cta.heading })).toBeInTheDocument();
  });
});
