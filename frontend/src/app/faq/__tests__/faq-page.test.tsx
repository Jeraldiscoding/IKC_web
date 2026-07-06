import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FaqPage from "@/app/faq/page";
import { faqs } from "@/content/faqs";

describe("FaqPage", () => {
  it("renders exactly one h1", () => {
    render(<FaqPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("renders every FAQ question and answer", () => {
    render(<FaqPage />);
    for (const f of faqs) {
      expect(screen.getByText(f.question)).toBeInTheDocument();
      expect(screen.getByText(f.answer)).toBeInTheDocument();
    }
  });
});
