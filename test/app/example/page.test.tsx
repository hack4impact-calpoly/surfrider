/** @jest-environment jsdom */
import Page from "@/app/example/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Example page", () => {
  it("should render div", () => {
    render(<Page />);

    screen.getByText("This is an example page using App Router!");
  });

  // don't actually need this test, but here for demonstration
  it("should not render any buttons", () => {
    render(<Page />);

    const button = screen.queryByRole("button");
    expect(button).toBeNull();
  });
});
