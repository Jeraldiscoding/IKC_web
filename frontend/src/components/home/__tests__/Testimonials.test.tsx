import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import HomePage from "@/app/page";
import { homeCopy } from "@/content/home";

describe("TestimonialsSection", () => {
  it("renders a quote per testimonial", () => {
    const { container } = render(<TestimonialsSection />);
    expect(container.querySelectorAll("blockquote")).toHaveLength(
      homeCopy.testimonials.items.length,
    );
  });

  it("only ever contains obvious placeholder text, never a realistic fake quote", () => {
    for (const t of homeCopy.testimonials.items) {
      expect(t.quote).toContain("[PLACEHOLDER]");
    }
  });

  it("is NOT rendered on the home page until real quotes exist", () => {
    render(<HomePage />);
    expect(screen.queryByText(/\[PLACEHOLDER\]/)).not.toBeInTheDocument();
  });
});
