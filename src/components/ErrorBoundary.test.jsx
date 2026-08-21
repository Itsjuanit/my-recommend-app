import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ErrorBoundary from "./ErrorBoundary";

const Bomb = () => {
  throw new Error("boom");
};

describe("ErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <div>Todo bien</div>
      </ErrorBoundary>
    );

    expect(screen.getByText("Todo bien")).toBeInTheDocument();
  });

  it("renders a fallback instead of crashing when a child throws", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    expect(screen.getByText("Algo salió mal")).toBeInTheDocument();

    console.error.mockRestore();
  });
});
