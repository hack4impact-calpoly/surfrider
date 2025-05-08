/** @jest-environment jsdom */
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import MishaBandi from "@/app/mishabandi/page";

describe("Intro Task Button", () => {
  it("should render the button with count 0", () => {
    render(<MishaBandi />);
    const button = screen.getByRole("button");
    expect(button).toBeEnabled();
    expect(button).toHaveTextContent("0");
  });

  it("should increment the count on click", () => {
    render(<MishaBandi />);
    const button = screen.getByRole("button");

    const rand = Math.floor(Math.random() * 10) + 1;
    for (let i = 0; i < rand; i++) {
      fireEvent.click(button);
    }

    expect(button).toHaveTextContent(String(rand));
  });
});
