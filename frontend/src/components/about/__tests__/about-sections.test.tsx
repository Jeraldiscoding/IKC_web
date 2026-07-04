import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FounderStory } from "@/components/about/FounderStory";
import { WhatMakesDifferent } from "@/components/about/WhatMakesDifferent";
import { CredentialsExplained } from "@/components/about/CredentialsExplained";
import { aboutCopy } from "@/content/about";

describe("About sections", () => {
  it("FounderStory renders its heading and first paragraph", () => {
    render(<FounderStory />);
    expect(screen.getByRole("heading", { name: aboutCopy.story.heading })).toBeInTheDocument();
    expect(screen.getByText(aboutCopy.story.paragraphs[0])).toBeInTheDocument();
  });

  it("WhatMakesDifferent renders all difference points", () => {
    render(<WhatMakesDifferent />);
    for (const p of aboutCopy.different.points) {
      expect(screen.getByText(p.title)).toBeInTheDocument();
    }
  });

  it("CredentialsExplained renders each credential term", () => {
    render(<CredentialsExplained />);
    for (const item of aboutCopy.credentials.items) {
      expect(screen.getByText(item.term)).toBeInTheDocument();
    }
  });
});
