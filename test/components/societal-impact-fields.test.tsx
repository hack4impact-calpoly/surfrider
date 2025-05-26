/** @jest-environment jsdom */
import SocietalImpactFields from "@/components/results/societal-impact/societal-impact-fields";
import { CalculateResult } from "@/schema/api";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ClassAttributes } from "react";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: ClassAttributes<HTMLImageElement>) => <img {...props} />,
}));

describe("SocietalImpactFields", () => {
  const mockResults: CalculateResult = {
    mcfOfNaturalGasEquivalentCO2Emissions: 100,
    naturalGasFiredPowerPlantEmissionsForOneYear: 0.01,
    acresOfUSForestsEquivalentCO2SequesteringForOneYear: 50,
  };

  it("renders all metric cards with correct values", () => {
    render(<SocietalImpactFields results={mockResults} />);

    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("Mcf")).toBeInTheDocument();
    expect(screen.getByText("of Natural Gas Burned")).toBeInTheDocument();

    expect(screen.getByText("0.01")).toBeInTheDocument();
    expect(screen.getByText("Natural Gas-Fired Power Plant Emissions")).toBeInTheDocument();
    expect(screen.getByText("Per Year")).toBeInTheDocument();

    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("Average Forestry Acres")).toBeInTheDocument();
    expect(screen.getByText("Per Year to Sequester")).toBeInTheDocument();
  });

  it("renders all icons", () => {
    render(<SocietalImpactFields results={mockResults} />);

    const icons = screen.getAllByRole("img");
    expect(icons).toHaveLength(3);

    expect(icons[0]).toHaveAttribute("alt", "Natural gas icon");
    expect(icons[1]).toHaveAttribute("alt", "Power plant icon");
    expect(icons[2]).toHaveAttribute("alt", "Forest icon");
  });

  it("handles null values in results", () => {
    const nullResults: CalculateResult = {};

    render(<SocietalImpactFields results={nullResults} />);

    // All metrics should show 0 when null is provided
    const zeroValues = screen.getAllByText("0");
    expect(zeroValues).toHaveLength(3);
  });
});
