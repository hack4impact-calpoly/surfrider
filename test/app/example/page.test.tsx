/** @jest-environment jsdom */
import Page from "@/app/example/page";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

describe("Example page", () => {
  it("should render div", () => {
    const { getByText } = render(<Page />);

    getByText("This is an example page using App Router!");
  });

  // don't actually need this test, but here for demonstration
  it("should not render any buttons", () => {
    const { queryByRole } = render(<Page />);

    const button = queryByRole("button");
    expect(button).toBeNull();
  });
});
