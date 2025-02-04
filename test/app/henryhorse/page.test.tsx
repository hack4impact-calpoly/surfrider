/** @jest-environment jsdom */
import Page from "@/app/henryhorse/page";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Button", () => {
  it("should increment on click", async () => {
    render(<Page />);

    const button = screen.getByRole("button");

    await fireEvent.click(button);

    expect(button).toHaveTextContent("1");

    await fireEvent.click(button);
    expect(button).toHaveTextContent("2");
  });
});
