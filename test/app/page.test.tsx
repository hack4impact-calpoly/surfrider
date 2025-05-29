/** @jest-environment jsdom */
import Home from "@/app/page";
import { useCalculate } from "@/hooks/use-calculate";
import { CalculateInput, CalculateResult } from "@/schema/api";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { useRouter, useSearchParams } from "next/navigation";
import { MOCK_CALCULATE_INPUT } from "../mocks/api-mocks";

// Mock dependencies
jest.mock("next/navigation");
const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
};
mocked(useRouter).mockReturnValue(mockRouter as unknown as ReturnType<typeof useRouter>);
const mockSearchParams = {
  size: 0,
  entries: jest.fn().mockReturnValue([]),
};
mocked(useSearchParams).mockReturnValue(mockSearchParams as unknown as ReturnType<typeof useSearchParams>);

jest.mock("@/hooks/use-calculate");
const mockUseCalculate = mocked(useCalculate);
const mockGetCalculateResult = jest.fn().mockResolvedValue(undefined);
mockUseCalculate.mockReturnValue({
  data: null,
  error: null,
  loading: false,
  getCalculateResult: mockGetCalculateResult,
});

jest.mock("@/components/results/results", () => ({
  Results: ({ results, inputs }: { results: CalculateResult; inputs: CalculateInput }) => (
    <div data-testid="results">
      <div>Results: {results.annualPowerGeneration}</div>
      <div>Inputs: {inputs.installedCapacity}</div>
    </div>
  ),
}));

jest.mock("@/components/calculator-form", () => ({
  __esModule: true,
  default: ({ onSubmit }: { onSubmit: (values: CalculateInput) => void }) => (
    <form
      data-testid="calculator-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ installedCapacity: 1000 } as CalculateInput);
      }}
    >
      <button type="submit">Submit</button>
    </form>
  ),
}));

jest.mock("lucide-react", () => ({
  ChevronUp: () => <svg data-testid="chevron-up" />,
}));

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders calculator form initially", () => {
    render(<Home />);
    expect(screen.getByTestId("calculator-form")).toBeInTheDocument();
    expect(screen.getByText("Surfrider Carbon Impact Calculator")).toBeInTheDocument();
  });

  it("submits form and calls getCalculateResult", () => {
    render(<Home />);
    fireEvent.click(screen.getByText("Submit"));
    expect(mockGetCalculateResult).toHaveBeenCalledWith({ installedCapacity: 1000 });
    expect(mockRouter.push).toHaveBeenCalledWith("/?installedCapacity=1000");
  });

  it("displays spinner when loading", () => {
    mockUseCalculate.mockReturnValue({
      data: null,
      error: null,
      loading: true,
      getCalculateResult: mockGetCalculateResult,
    });

    render(<Home />);
    fireEvent.click(screen.getByText("Submit"));
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("displays error card when error occurs", () => {
    mockUseCalculate.mockReturnValue({
      data: null,
      error: new Error(),
      loading: false,
      getCalculateResult: mockGetCalculateResult,
    });

    render(<Home />);
    fireEvent.click(screen.getByText("Submit"));
    expect(screen.getByText(/Error/)).toBeInTheDocument();
  });

  it("displays results when data is available", () => {
    mockUseCalculate.mockReturnValue({
      data: { annualPowerGeneration: 5000 },
      error: null,
      loading: false,
      getCalculateResult: mockGetCalculateResult,
    });

    render(<Home />);
    fireEvent.click(screen.getByText("Submit"));
    expect(screen.getByTestId("results")).toBeInTheDocument();
    expect(screen.getByText("Results: 5000")).toBeInTheDocument();
    expect(screen.getByText("Inputs: 1000")).toBeInTheDocument();
  });

  it("toggles form expansion when toggle button is clicked", () => {
    mockUseCalculate.mockReturnValue({
      data: null,
      error: null,
      loading: false,
      getCalculateResult: mockGetCalculateResult,
    });

    render(<Home />);
    fireEvent.click(screen.getByText("Submit"));

    // Form should be collapsed after submission
    expect(screen.getByTestId("calculator-form").parentElement?.className).toContain("max-h-[0vh]");

    // Toggle form
    fireEvent.click(screen.getByTestId("chevron-up"));

    // Form should be expanded
    expect(screen.getByTestId("calculator-form").parentElement?.className).toContain("max-h-[100vh]");
  });

  it("handles URL parameters on initial load", () => {
    mockSearchParams.size = 1;
    mockSearchParams.entries.mockReturnValueOnce([
      ["installedCapacity", "5882000"],
      ["powerPlantClass", "OnshoreWind"],
      ["location", "CA"],
      ["capacityFactor", "0.51"],
      ["population2070", "8325000000"],
      ["startYear", "2028"],
      ["lifeTimeYears", "30"],
      ["yearOfStudy", "2099"],
    ]);

    render(<Home />);
    expect(mockGetCalculateResult).toHaveBeenCalledWith(MOCK_CALCULATE_INPUT);
    expect(mockRouter.push).toHaveBeenCalledWith(
      "/?installedCapacity=5882000&powerPlantClass=OnshoreWind&location=CA&capacityFactor=0.51&population2070=8325000000&startYear=2028&lifeTimeYears=30&yearOfStudy=2099",
    );
  });

  it("handles invalid URL parameters gracefully", () => {
    mockSearchParams.size = 1;
    mockSearchParams.entries.mockReturnValueOnce([["invalidParam", "invalidValue"]]);

    render(<Home />);
    expect(mockRouter.replace).toHaveBeenCalledWith("/");
    expect(mockGetCalculateResult).not.toHaveBeenCalled();
  });
});
