import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders a link when href is provided", () => {
    render(<Button href="/services">See services</Button>);
    const el = screen.getByRole("link", { name: "See services" });
    expect(el).toHaveAttribute("href", "/services");
  });

  it("renders a button element when no href is provided", () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("opens external links in a new tab safely", () => {
    render(<Button href="https://wa.me/6580231551">Chat with us</Button>);
    const el = screen.getByRole("link", { name: "Chat with us" });
    expect(el).toHaveAttribute("target", "_blank");
    expect(el.getAttribute("rel")).toContain("noopener");
  });
});
