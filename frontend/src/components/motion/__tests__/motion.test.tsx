import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";
import { DriftingBlob } from "@/components/motion/DriftingBlob";

describe("motion primitives", () => {
  it("Reveal renders its children", () => {
    render(<Reveal>hello reveal</Reveal>);
    expect(screen.getByText("hello reveal")).toBeInTheDocument();
  });

  it("StaggerGroup renders each StaggerItem child", () => {
    render(
      <StaggerGroup>
        <StaggerItem>one</StaggerItem>
        <StaggerItem>two</StaggerItem>
      </StaggerGroup>,
    );
    expect(screen.getByText("one")).toBeInTheDocument();
    expect(screen.getByText("two")).toBeInTheDocument();
  });

  it("HoverCard renders its children", () => {
    render(<HoverCard>card body</HoverCard>);
    expect(screen.getByText("card body")).toBeInTheDocument();
  });

  it("DriftingBlob renders its children", () => {
    render(<DriftingBlob><span>blobby</span></DriftingBlob>);
    expect(screen.getByText("blobby")).toBeInTheDocument();
  });
});
