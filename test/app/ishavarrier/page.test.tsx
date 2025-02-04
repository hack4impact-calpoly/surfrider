/** @jest-environment jsdom */
import IshaVarrier from "@/app/ishavarrier/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";

describe("Button Component", () => {
  it("should render the button component", () => {
    render(<IshaVarrier />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Click to Increment Count");
  });

  it("should render the heading component to display count", () => {
    render(<IshaVarrier />);

    expect(screen.getByText("Count Value: 0")).toBeInTheDocument();
  });

  it("should increment the count when button is clicked", () => {
    render(<IshaVarrier />);

    const button = screen.getByRole("button");
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(screen.getByText("Count Value: 3")).toBeInTheDocument();
  });
});
