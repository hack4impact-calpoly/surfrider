/** @jest-environment jsdom */
import Page from "@/app/example/page";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Counter Button", () => {
  it("should render the button with initial count of 0", () => {
    render(<Page />); //render page

    //check that button initially displays "0"
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("0");
  });

  it("should increment count on button click", async () => {
    render(<Page />); //render page

    const button = screen.getByRole("button");

    //simulate user clicking the button twice
    await fireEvent.click(button);
    await fireEvent.click(button);

    //expect the button text to update to "2"
    expect(button).toHaveTextContent("2");
  });
});
