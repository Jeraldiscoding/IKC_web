import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WhyIkcSection } from "@/components/home/WhyIkcSection";
import { homeCopy } from "@/content/home";

describe("WhyIkcSection", () => {
  it("renders the three promise blocks", () => {
    render(<WhyIkcSection />);
    expect(screen.getByText("Safe")).toBeInTheDocument();
    expect(screen.getByText("Capable")).toBeInTheDocument();
    expect(screen.getByText("Included")).toBeInTheDocument();
  });

  it("renders every supporting reason", () => {
    render(<WhyIkcSection />);
    for (const r of homeCopy.why.reasons) {
      expect(screen.getByText(r.title)).toBeInTheDocument();
    }
  });
});
