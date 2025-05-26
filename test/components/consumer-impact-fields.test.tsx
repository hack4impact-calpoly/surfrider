/** @jest-environment jsdom */
import ConsumerImpactFields from "@/components/results/consumer-impact/consumer-impact-fields";
import { CalculateResult } from "@/schema/api";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ClassAttributes } from "react";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: ClassAttributes<HTMLImageElement>) => <img {...props} />,
}));

describe("ConsumerImpactFields", () => {
  const mockResults: CalculateResult = {
    gallonsOfGasolineBurnedEquivalentCO2Emissions: 100,
    barrelsOfOilConsumedEquivalentCO2Emissions: 50,
    milesDrivenByTheAverageGasolinePoweredPassengerVehicleEquivalentCO2Emissions: 1000,
    homeYearlyElectricityUseEquivalentEmissions: 5,
    gasolinePoweredPassengerVehiclesPerYearEquivalentCO2Emissions: 10,
    additionalPeopleExposedToUnprecedentedHeatIn2070: 200,
  };

  it("renders all metric cards with correct values", () => {
    render(<ConsumerImpactFields results={mockResults} />);

    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("Gallons")).toBeInTheDocument();
    expect(screen.getByText("of Gasoline Burned")).toBeInTheDocument();

    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("Barrels")).toBeInTheDocument();
    expect(screen.getByText("of Oil Burned")).toBeInTheDocument();

    expect(screen.getByText("1,000")).toBeInTheDocument();
    expect(screen.getByText("Miles")).toBeInTheDocument();
    expect(screen.getByText("Driven by gas passenger vehicles")).toBeInTheDocument();

    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Homes")).toBeInTheDocument();
    expect(screen.getByText("of Yearly Electricity Use")).toBeInTheDocument();

    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("Gas Powered Passenger Vehicles")).toBeInTheDocument();
    expect(screen.getByText("Per Year")).toBeInTheDocument();

    expect(screen.getByText("200")).toBeInTheDocument();
    expect(screen.getByText("Additional People")).toBeInTheDocument();
    expect(screen.getByText("Exposed to Unprecedented Heat")).toBeInTheDocument();
  });

  it("renders all icons", () => {
    render(<ConsumerImpactFields results={mockResults} />);

    const icons = screen.getAllByRole("img");
    expect(icons).toHaveLength(6);

    expect(icons[0]).toHaveAttribute("alt", "Gasoline Icon");
    expect(icons[1]).toHaveAttribute("alt", "Oil Rig Icon");
    expect(icons[2]).toHaveAttribute("alt", "Car Icon");
    expect(icons[3]).toHaveAttribute("alt", "Energy Icon");
    expect(icons[4]).toHaveAttribute("alt", "Gas Pump Icon");
    expect(icons[5]).toHaveAttribute("alt", "City Icon");
  });

  it("handles null values in results", () => {
    const nullResults: CalculateResult = {};

    render(<ConsumerImpactFields results={nullResults} />);

    // All metrics should show 0 when null is provided
    const zeroValues = screen.getAllByText("0");
    expect(zeroValues).toHaveLength(6);
  });
});
