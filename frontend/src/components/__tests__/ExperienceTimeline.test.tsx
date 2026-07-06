import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import type { ExperienceEntry } from "@/content/educators";

const items: ExperienceEntry[] = [
  { role: "Founder & Lead Educator", org: "Inclusive Kids Club", period: "Now" },
  { role: "Special Needs Educator", org: "METTA School", period: "3 years", description: "SPED school." },
];

describe("ExperienceTimeline", () => {
  it("renders every entry's role, org and period", () => {
    render(<ExperienceTimeline items={items} />);
    for (const it of items) {
      expect(screen.getByText(it.role)).toBeInTheDocument();
      expect(screen.getByText(it.org)).toBeInTheDocument();
      expect(screen.getByText(it.period)).toBeInTheDocument();
    }
  });
});
