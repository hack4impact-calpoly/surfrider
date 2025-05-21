/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SspFields from "@/components/ssp-fields";

const DEFAULT_PROPS = {
  endOfLifeYear: "2058",
  endOfLifeMortality: "4661",
  endOfLifeTemperature: "1.77 °C ↑",
  yearOfStudy: "2100",
  yearOfStudyMortality: "18116",
  yearOfStudyTemperature: "1.72 °C ↑",
};

jest.mock("react-chartjs-2");

describe("SspFields", () => {
  it("renders both BlueCard and RedCard with correct values", () => {
    render(<SspFields {...DEFAULT_PROPS} />);

    expect(screen.getByText("4661")).toBeInTheDocument();
    expect(screen.getByText("Mortalities by 2058")).toBeInTheDocument();
    expect(screen.getByText("18116")).toBeInTheDocument();
    expect(screen.getByText("Mortalities by 2100")).toBeInTheDocument();

    expect(screen.getByText("1.77 °C ↑")).toBeInTheDocument();
    expect(screen.getByText("Increase by 2058")).toBeInTheDocument();
    expect(screen.getByText("1.72 °C ↑")).toBeInTheDocument();
    expect(screen.getByText("Increase by 2100")).toBeInTheDocument();

    expect(screen.getAllByText("(End of Life) SSP1-2.6")).toHaveLength(2);
    expect(screen.getAllByText("(Year of Study) SSP1-2.6")).toHaveLength(2);
  });

  it("renders both chart titles", () => {
    render(<SspFields {...DEFAULT_PROPS} />);

    expect(screen.getByRole("heading", { name: "Additional Human Mortalities: SSP1-2.6" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Baseline °C Warming SSP1-2.6" })).toBeInTheDocument();
  });
});
