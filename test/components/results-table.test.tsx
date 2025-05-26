/** @jest-environment jsdom */
import ResultsTable from "@/components/results/secondary/results-table";
import { CalculateResult } from "@/schema/api";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MOCK_CALCULATE_INPUT } from "../mocks/api-mocks";

describe("ResultsTable", () => {
  it("renders the Table component", () => {
    render(<ResultsTable inputs={MOCK_CALCULATE_INPUT} results={{} as unknown as CalculateResult} />);
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  it("contains cells with the 'green-cell' class", () => {
    render(<ResultsTable inputs={MOCK_CALCULATE_INPUT} results={{} as unknown as CalculateResult} />);
    const greenCells = document.querySelectorAll(".green-cell");
    expect(greenCells.length).toBeGreaterThan(0);
  });

  it("renders the correct energy source names in section1", () => {
    render(<ResultsTable inputs={MOCK_CALCULATE_INPUT} results={{} as unknown as CalculateResult} />);
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
