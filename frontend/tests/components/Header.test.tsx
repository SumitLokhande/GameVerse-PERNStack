import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Header from "../../src/components/Header";

const { mockAuth } = vi.hoisted(() => ({
  mockAuth: vi.fn(),
}));

vi.mock("../../src/hooks/customHooks", () => ({
  useAuth: mockAuth,
}));

vi.mock("../../src/redux/hooks", () => ({
  useAppSelector: () => 3,
}));

describe("Header", () => {
  beforeEach(() => {
    mockAuth.mockReturnValue({
      isAuthenticated: false,
      logout: vi.fn(),
      user: null,
    });
  });

  const renderHeader = () =>
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

  it("renders the brand, public navigation, and cart count", () => {
    renderHeader();

    expect(screen.getByText("GamerVerse")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Games" })).toHaveAttribute(
      "href",
      "/games",
    );
    expect(screen.getByRole("link", { name: "Sign In" })).toHaveAttribute(
      "href",
      "/login",
    );
    expect(screen.getByRole("link", { name: "Sign Up" })).toHaveAttribute(
      "href",
      "/register",
    );
    expect(screen.getByRole("button", { name: "Cart" })).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Reviews" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Recommendations" }),
    ).not.toBeInTheDocument();
  });

  it("renders authenticated navigation and the user menu", async () => {
    const logout = vi.fn();
    mockAuth.mockReturnValue({
      isAuthenticated: true,
      logout,
      user: { name: "Alex" },
    });

    const user = userEvent.setup();
    renderHeader();

    expect(screen.getByRole("link", { name: "Reviews" })).toHaveAttribute(
      "href",
      "/reviews",
    );
    expect(
      screen.getByRole("link", { name: "Recommendations" }),
    ).toHaveAttribute("href", "/recommendations");
    expect(
      screen.getByRole("button", { name: /Open user menu/ }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Open user menu/ }));

    expect(screen.getByRole("link", { name: "Your profile" })).toHaveAttribute(
      "href",
      "/profile",
    );
    expect(screen.getByRole("link", { name: "Settings" })).toHaveAttribute(
      "href",
      "/settings",
    );
    await user.click(screen.getByRole("link", { name: "Sign out" }));
    expect(logout).toHaveBeenCalledOnce();
  });
});
