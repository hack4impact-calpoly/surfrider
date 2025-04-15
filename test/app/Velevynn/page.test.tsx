/**
 * @jest-environment jsdom
 */
import VelevynnButton from "@/app/Velevynn/page";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Stateful Counter Button", () => {
  it("should render the button, its counter, and and the display text", () => {
    render(<VelevynnButton />);

    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("0");
    expect(screen.getByText("You must click the button.")).toBeInTheDocument();
  });

  it("should increment the button once on a single click", () => {
    render(<VelevynnButton />);

    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("0");
    expect(screen.getByText("You must click the button.")).toBeInTheDocument();

    for (let i = 0; i < 10; i++) {
      expect(button).toHaveTextContent(String(i));
      fireEvent.click(button);
    }
  });
});
