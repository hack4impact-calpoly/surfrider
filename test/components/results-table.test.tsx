/** @jest-environment jsdom */
import ResultsTable from "@/components/results/secondary/results-table";
import { CalculateResult } from "@/schema/api";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MOCK_CALCULATE_INPUT } from "../mocks/api-mocks";

// Energy source names constants
const ENERGY_SOURCES = [
  "Average coal plants in California",
  "Average oil plants in California",
  "Average natural gas plants in California",
  "Average fossil fuel plants in California",
  "Average nuclear plants in California",
  "Average acres of solar in California (*ESTIMATED*)",
  "Average onshore wind turbines in California (*ESTIMATED*)",
  "Average offshore wind turbines in California (*ESTIMATED*)",
];

const NON_LIFETIME_EMISSION_SOURCES = [
  "Metric tons Carbon Dioxide (CO₂)",
  "lbs CO₂/MWh Emission Rate",
  "Additional People Exposed to Unprecedented Heat in 2070 @ UI",
  "Additional People Outside Niche in 2070 (Temp+Demo) @ UI",
];

const LIFETIME_EMISSION_SOURCE =
  "Total Metric tons Carbon Dioxide (CO₂) by the end of lifetime (assuming constant grid emission rates)";

const EMISSION_EQUIVALENT_SOURCES = [
  "kWh-Reduced",
  "kWh-Consumed",
  "Gallons of Gasoline Burned",
  "Gallons of Diesel Burned",
  "Gas Powered Passenger Vehicles Per Year",
  "Miles Driven by Gas Passenger Vehicles",
  "therms Natural Gas Burned",
  "Mcf Natural Gas Burned",
  "Barrels of Oil Burned",
  "Tanker Trucks of Oil Burned",
  "Household Yearly Electricity Use",
  "Household Yearly Energy Use",
  "Incandescent Bulbs switched to LEDs Reduction",
  "Urban Tree Seedlings Grown for 10yr Equiv Emission Sequestering",
  "Acres prevented from conversion to cropland in year of conversion",
  "Average Forestry Acres Per Year Equiv Emission Sequestering",
  "Propane cylinders used for home barbecues",
  "Railcars of coal burned",
  "Pounds of coal burned",
  "Trash bags of waste recycled instead of landfilled",
  "Tons of waste recycled instead of landfilled",
  "Number of garbage trucks of waste recycled instead of landfilled",
  "Coal-fired power plant emissions for one year",
  "Natural gas-fired power plant emissions for one year",
  "Number of wind turbines running for a year",
  "Number of smart phones charged",
  "ppm Concentration CO₂ Increase in the Atmosphere",
  "°C Additional Temperature Rise",
];

const SSP_SCENARIO_SOURCES = [
  "Baseline °C Warming by End of Life SSP1-1.9",
  "Baseline °C Warming by Year of Study SSP1-1.9",
  "Baseline °C Warming by End of Life SSP1-2.6",
  "Baseline °C Warming by Year of Study SSP1-2.6",
  "Baseline °C Warming by End of Life SSP2-4.5",
  "Baseline °C Warming by Year of Study SSP2-4.5",
  "Baseline °C Warming by End of Life SSP3-7.0",
  "Baseline °C Warming by Year of Study SSP3-7.0",
  "Baseline °C Warming by End of Life SSP5-8.5",
  "Baseline °C Warming by Year of Study SSP5-8.5",
  "Additional Human Mortalities by End of Life SSP1-1.9",
  "Additional Human Mortalities by Year of Study SSP1-1.9",
  "Additional Human Mortalities by End of Life SSP1-2.6",
  "Additional Human Mortalities by Year of Study SSP1-2.6",
  "Additional Human Mortalities by End of Life SSP2-4.5",
  "Additional Human Mortalities by Year of Study SSP2-4.5",
  "Additional Human Mortalities by End of Life SSP3-7.0",
  "Additional Human Mortalities by Year of Study SSP3-7.0",
  "Additional Human Mortalities by End of Life SSP5-8.5",
  "Additional Human Mortalities by Year of Study SSP5-8.5",
];

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

  it("renders the correct energy source names in section 1", () => {
    render(<ResultsTable inputs={MOCK_CALCULATE_INPUT} results={{} as unknown as CalculateResult} />);

    for (const source of ENERGY_SOURCES) {
      expect(screen.getByText(source)).toBeInTheDocument();
    }
  });

  it("renders the correct emission equivalent names in sections 2 and 3", () => {
    render(<ResultsTable inputs={MOCK_CALCULATE_INPUT} results={{} as unknown as CalculateResult} />);

    for (const source of NON_LIFETIME_EMISSION_SOURCES) {
      expect(screen.getByText(source)).toBeInTheDocument();
    }
    expect(screen.getByText(LIFETIME_EMISSION_SOURCE)).toBeInTheDocument();
    for (const source of EMISSION_EQUIVALENT_SOURCES) {
      expect(screen.getAllByText(source)).toHaveLength(2); // Each source appears in both sections 2 and 3
    }
  });

  it("renders the correct SSP scenario names in section 4", () => {
    render(<ResultsTable inputs={MOCK_CALCULATE_INPUT} results={{} as unknown as CalculateResult} />);

    for (const source of SSP_SCENARIO_SOURCES) {
      expect(screen.getByText(source)).toBeInTheDocument();
    }
  });
});
