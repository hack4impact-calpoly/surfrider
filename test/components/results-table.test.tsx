/** @jest-environment jsdom */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ResultsTable from "../../src/components/results-table";

describe("ResultsTable", () => {
  it("renders the Table component", () => {
    render(<ResultsTable />);
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  it("contains cells with the 'green-cell' class", () => {
    render(<ResultsTable />);
    const greenCells = document.querySelectorAll(".green-cell");
    expect(greenCells.length).toBeGreaterThan(0);
  });

  it("renders the correct energy source names in section1", () => {
    render(<ResultsTable />);
    const energySources = [
      "Average coal plants in California",
      "Average oil plants in California",
      "Average natural gas plants in California",
      "Average fossil fuel plants in California",
      "Average nuclear plants in California",
      "Average acres of solar in California (*ESTIMATED*)",
      "Average onshore wind turbines in California (*ESTIMATED*)",
      "Average offshore wind turbines in California (*ESTIMATED*)",
    ];

    for (const source of energySources) {
      expect(screen.getByText(source)).toBeInTheDocument();
    }
  });
});
