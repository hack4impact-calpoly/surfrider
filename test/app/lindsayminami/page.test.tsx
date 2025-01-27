/** @jest-environment jsdom */
import LindsayMinami from "@/app/lindsayminami/page";

import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Intro Task Button", () => {
  it("should render the button and text on the screen", () => {
    render(<LindsayMinami />);

    const button = screen.getByRole("button");
    expect(button).toBeEnabled();
    expect(button).toHaveTextContent("Button");

    expect(screen.getByText("Total Clicks: 0")).toBeInTheDocument();
    expect(screen.getByText("Click the Button!")).toBeInTheDocument();
  });

  it("should increment the button and change the value on the screen", () => {
    render(<LindsayMinami />);

    const button = screen.getByRole("button");

    const rand = Math.floor(Math.random() * 10) + 1;
    for (let i = 0; i < rand; i++) {
      fireEvent.click(button);
    }

    expect(screen.getByText("Total Clicks: " + rand)).toBeInTheDocument();
  });
});
