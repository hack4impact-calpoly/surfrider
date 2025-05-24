/** @jest-environment jsdom */
import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import CalculatorForm, {
  DEFAULT_CAPACITY_FACTOR,
  DEFAULT_LIFETIME_YEARS,
  DEFAULT_LOCATION,
  DEFAULT_POPULATION_2070,
  DEFAULT_POWER_PLANT_CLASS,
  DEFAULT_START_YEAR,
  DEFAULT_YEAR_OF_STUDY,
} from "../../src/components/calculator-form";

jest.mock("../../src/components/ui/select", () => ({
  Select: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
  SelectTrigger: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
  SelectValue: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
  SelectContent: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
  SelectItem: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
}));

describe("CalculatorForm", () => {
  it("renders default values", () => {
    render(<CalculatorForm onSubmit={jest.fn()} />);
    expect(screen.getByLabelText(/Installed Capacity/i)).toHaveValue(0);
    expect(screen.getByText(DEFAULT_POWER_PLANT_CLASS)).toBeInTheDocument();
    expect(screen.getByText(DEFAULT_LOCATION)).toBeInTheDocument();
    expect(screen.getByLabelText(/Capacity Factor/i)).toHaveValue(DEFAULT_CAPACITY_FACTOR);
    expect(screen.getByLabelText(/Population in 2070/i)).toHaveValue(DEFAULT_POPULATION_2070);
    expect(screen.getByLabelText(/Start Year/i)).toHaveValue(DEFAULT_START_YEAR);
    expect(screen.getByLabelText(/Lifetime \(years\)/i)).toHaveValue(DEFAULT_LIFETIME_YEARS);
    expect(screen.getByLabelText(/Year of Study/i)).toHaveValue(DEFAULT_YEAR_OF_STUDY);
  });

  it("submits form correctly", async () => {
    const handleSubmit = jest.fn();
    render(<CalculatorForm onSubmit={handleSubmit} />);

    await act(() => {
      fireEvent.change(screen.getByLabelText(/Installed Capacity/i), { target: { value: "100" } });
      fireEvent.change(screen.getByLabelText(/Capacity Factor/i), { target: { value: "0.75" } });
      fireEvent.click(screen.getByText(/Calculate/i));
    });

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    const submittedValues = handleSubmit.mock.calls[0][0];
    expect(submittedValues.installedCapacity).toBe(100);
    expect(submittedValues.capacityFactor).toBe(0.75);
  });
});
