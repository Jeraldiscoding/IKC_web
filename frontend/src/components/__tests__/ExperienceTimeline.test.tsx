import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import type { ExperienceEntry } from "@/content/educators";

const items: ExperienceEntry[] = [
  { role: "Founder & Lead Educator", org: "Inclusive Kids Club", period: "Now" },
  {
    role: "Special Education Teacher",
    org: "Metta School, Singapore",
    period: "Jul 2019 – Mar 2026",
    description: "SPED school.",
    highlights: ["Taught students aged 7 to 18.", "Worked with allied health professionals."],
  },
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

  it("renders highlight bullets when an entry has them", () => {
    render(<ExperienceTimeline items={items} />);
    for (const h of items[1].highlights!) {
      expect(screen.getByText(h)).toBeInTheDocument();
    }
  });

  it("renders no bullet list for an entry without highlights", () => {
    render(<ExperienceTimeline items={[items[0]]} />);
    // The outer <ol> is the only list; no nested <ul> of highlights.
    expect(screen.getAllByRole("list")).toHaveLength(1);
  });
});
