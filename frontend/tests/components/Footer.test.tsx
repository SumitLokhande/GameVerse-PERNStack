import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "../../src/components/Footer";

describe("Footer", () => {
  it("renders the footer sections", () => {
    render(<Footer />);

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Explore" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Community" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Support" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Contact Us" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Follow Us" }),
    ).toBeInTheDocument();
  });

  it("renders navigation and contact details", () => {
    render(<Footer />);

    const navigationLinks = [
      ["Home", "/"],
      ["Store", "/store"],
      ["Reviews", "/reviews"],
      ["News", "/news"],
      ["About", "/about"],
      ["Forums", "/forums"],
      ["Help Center", "/help"],
      ["Contact Us", "/contact"],
      ["FAQ", "/faq"],
    ];

    navigationLinks.forEach(([name, href]) => {
      expect(screen.getByRole("link", { name })).toHaveAttribute("href", href);
    });

    expect(screen.getByText("support@gamerverse.com")).toBeInTheDocument();
    expect(screen.getByText("+1 (555) 123-4567")).toBeInTheDocument();
    expect(
      screen.getByText("123 Gaming Street, Game City, GC 12345"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/2026 GamerVerse\. All rights reserved\./),
    ).toBeInTheDocument();
  });

  it("renders the social links", () => {
    render(<Footer />);

    const socialLinks = screen.getAllByRole("link", { name: "" });

    expect(socialLinks).toHaveLength(3);
    socialLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "#");
    });
  });
});
