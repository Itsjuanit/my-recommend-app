import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import ProtectedRoute from "./ProtectedRoute";

const { onAuthStateChangedMock } = vi.hoisted(() => ({
  onAuthStateChangedMock: vi.fn(),
}));

vi.mock("firebase/auth", () => ({
  onAuthStateChanged: onAuthStateChangedMock,
}));

vi.mock("../../firebaseConfig", () => ({ auth: {} }));

function renderProtectedRoute() {
  render(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <Routes>
        <Route path="/login" element={<div>Login page</div>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<div>Dashboard content</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe("ProtectedRoute", () => {
  it("redirects to /login when there is no session", () => {
    onAuthStateChangedMock.mockImplementation((_auth, callback) => {
      callback(null);
      return () => {};
    });

    renderProtectedRoute();

    expect(screen.getByText("Login page")).toBeInTheDocument();
    expect(screen.queryByText("Dashboard content")).not.toBeInTheDocument();
  });

  it("renders the protected content when a session exists", () => {
    onAuthStateChangedMock.mockImplementation((_auth, callback) => {
      callback({ uid: "abc123" });
      return () => {};
    });

    renderProtectedRoute();

    expect(screen.getByText("Dashboard content")).toBeInTheDocument();
  });
});
