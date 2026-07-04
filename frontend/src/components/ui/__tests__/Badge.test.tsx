import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/Badge";

describe("Badge", () => {
  it("renders its label text", () => {
    render(<Badge>DISE-Certified</Badge>);
    expect(screen.getByText("DISE-Certified")).toBeInTheDocument();
  });
});
