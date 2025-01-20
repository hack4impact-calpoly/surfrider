/** @jest-environment jsdom */
import Page from "@/app/ivantorriani/page";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";

describe("Button Component", () => {
  it("should go up by one", async () => {
    render(<Page />);

    const counter = screen.getByText(/0/i);
    const button = screen.getByText("+1");

    expect(screen.getByText("0")).toBeInTheDocument();

    fireEvent.click(button);

    await waitFor(() => expect(counter).toHaveTextContent("1"));
  });

  it("should go down by one", () => {
    render(<Page />);
    const counter = screen.getByText(/0/i);
    const button = screen.getByText("-1");

    expect(screen.getByText("0")).toBeInTheDocument();

    fireEvent.click(button);

    expect(counter).toHaveTextContent("-1");
  });
});
