import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { GlassContainer } from "./GlassContainer";

describe("GlassContainer", () => {
  it("should render children correctly", () => {
    render(
      <GlassContainer>
        <div data-testid="child">Test Child</div>
      </GlassContainer>,
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    const { container } = render(
      <GlassContainer className="custom-class">
        <div>Content</div>
      </GlassContainer>,
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });
});
