import { render, screen, fireEvent } from "@testing-library/react";
import DannyAM127 from "@/app/DannyAM127/page";
import "@testing-library/jest-dom";

describe("DannyAM127", () => {
  it("increments the counter when the button is clicked", () => {
    render(<DannyAM127 />);

    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("0");

    fireEvent.click(button);

    expect(button).toHaveTextContent("1");

    fireEvent.click(button);
    expect(button).toHaveTextContent("2");
  });

  it("renders the button with the initial counter value of 0", () => {
    render(<DannyAM127 />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("0");
  });

  it("increments the counter multiple times correctly", () => {
    render(<DannyAM127 />);

    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(button).toHaveTextContent("1");

    fireEvent.click(button);
    expect(button).toHaveTextContent("2");

    fireEvent.click(button);
    expect(button).toHaveTextContent("3");
  });
});
