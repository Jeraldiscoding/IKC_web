import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ScrollRail } from "@/components/ui/ScrollRail";

describe("ScrollRail", () => {
  it("exposes a labelled, keyboard-reachable scroll region", () => {
    render(
      <ScrollRail label="Photo gallery">
        <div>item one</div>
      </ScrollRail>,
    );
    const region = screen.getByRole("region", { name: "Photo gallery" });
    expect(region).toBeInTheDocument();
    expect(region).toHaveAttribute("tabindex", "0");
    expect(screen.getByText("item one")).toBeInTheDocument();
  });

  it("renders labelled scroll arrows that are safe to click", async () => {
    const user = userEvent.setup();
    render(
      <ScrollRail label="Photo gallery">
        <div>item</div>
      </ScrollRail>,
    );
    const next = screen.getByRole("button", { name: /scroll .* right/i });
    expect(screen.getByRole("button", { name: /scroll .* left/i })).toBeInTheDocument();
    // jsdom does not implement Element.scrollBy; the component must optional-call it.
    await user.click(next);
  });
});
