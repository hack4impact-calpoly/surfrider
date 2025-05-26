/** @jest-environment jsdom */
import { Results } from "@/components/results/results";
import { CalculateResult } from "@/schema/api";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MOCK_CALCULATE_INPUT } from "../mocks/api-mocks";

// Mock dependencies
jest.mock("@/components/results/consumer-impact/consumer-impact-fields", () => ({
  __esModule: true,
  default: () => <div data-testid="consumer-impact-fields">Consumer Impact Fields</div>,
}));

jest.mock("@/components/results/societal-impact/societal-impact-fields", () => ({
  __esModule: true,
  default: () => <div data-testid="societal-impact-fields">Societal Impact Fields</div>,
}));

jest.mock("@/components/results/ssp/ssp-fields", () => ({
  __esModule: true,
  default: () => <div data-testid="ssp-fields">SSP Fields</div>,
}));

jest.mock("@/components/results/secondary/results-table", () => ({
  __esModule: true,
  default: () => <div data-testid="results-table">Results Table</div>,
}));

jest.mock("lucide-react", () => ({
  X: () => <svg data-testid="x-icon" />,
  ChevronDown: () => <svg data-testid="chevron-down-icon" />,
  ChevronUp: () => <svg data-testid="chevron-up-icon" />,
}));

const MOCK_RESULTS: CalculateResult = {
  annualPowerGeneration: 5000,
};

describe("Results", () => {
  test("renders the Results component correctly", () => {
    render(<Results inputs={MOCK_CALCULATE_INPUT} results={MOCK_RESULTS} />);

    expect(screen.getByText("Your Impact")).toBeInTheDocument();
    expect(screen.getByText("Societal Impact")).toBeInTheDocument();
    expect(screen.getByText("Consumer Impact")).toBeInTheDocument();
    expect(screen.getByText(/Shared Socioeconomic Pathways/)).toBeInTheDocument();
  });

  test("renders all child components correctly when accordions are expanded", async () => {
    render(<Results inputs={MOCK_CALCULATE_INPUT} results={MOCK_RESULTS} />);

    const expandButtons = screen.getAllByTestId("chevron-down-icon");
    expect(expandButtons.length).toBe(3); // One for each impact section

    await Promise.all(expandButtons.map(fireEvent.click));

    expect(screen.getByTestId("societal-impact-fields")).toBeInTheDocument();
    expect(screen.getByTestId("consumer-impact-fields")).toBeInTheDocument();
    expect(screen.getByTestId("ssp-fields")).toBeInTheDocument();
  });

  test("opens dialog when 'View Detailed Impact' button is clicked", async () => {
    render(<Results inputs={MOCK_CALCULATE_INPUT} results={MOCK_RESULTS} />);

    expect(screen.queryByText("Detailed Impact")).not.toBeInTheDocument();

    const viewButton = screen.getByText("View Detailed Impact");
    await fireEvent.click(viewButton);

    expect(screen.getByText("Detailed Impact")).toBeInTheDocument();
    expect(screen.getByTestId("results-table")).toBeInTheDocument();
  });
});
