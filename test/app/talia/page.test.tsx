/** @jest-environment jsdom */
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "@/app/talia/page";

describe("button component", () => {
  it("render button and increments the counter", () => {
    render(<Page />);

    // Start at 0
    const button = screen.getByRole("button", { name: /0/i });
    expect(button).toBeInTheDocument();

    // Click & verify for counting
    fireEvent.click(button);
    expect(button).toHaveTextContent("1");

    fireEvent.click(button);
    expect(button).toHaveTextContent("2");
  });

  it("renders the heading with the correct text", () => {
    render(<Page />);

    const heading = screen.getByRole("heading", {
      name: /Click/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
