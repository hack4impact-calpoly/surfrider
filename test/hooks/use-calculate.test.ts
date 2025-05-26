/** @jest-environment jsdom */
import { useCalculate } from "@/hooks/use-calculate";
import { CalculateInput } from "@/schema/api";
import "@testing-library/jest-dom";
import { act, renderHook, waitFor } from "@testing-library/react";

// Mock fetch API
global.fetch = jest.fn();

describe("useCalculate", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useCalculate());

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
    expect(result.current.loading).toBe(false);
  });

  it("should handle successful API call", async () => {
    const mockInput = { param1: "test" } as unknown as CalculateInput;
    const mockResult = { annualPowerGeneration: 1000 };

    // Mock implementations
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResult),
    });

    const { result } = renderHook(() => useCalculate());

    act(() => {
      result.current.getCalculateResult(mockInput);
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/calculate", {
        method: "POST",
        body: JSON.stringify(mockInput),
      });
      expect(result.current.data).toEqual(mockResult);
      expect(result.current.error).toBe(false);
      expect(result.current.loading).toBe(false);
    });
  });

  it("should handle API error", async () => {
    const mockError = new Error("API error");
    const mockInput = { param1: "test" } as unknown as CalculateInput;

    (fetch as jest.Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useCalculate());

    act(() => {
      result.current.getCalculateResult(mockInput);
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.data).toBe(null);
      expect(result.current.error).toBe(mockError);
      expect(result.current.loading).toBe(false);
    });
  });
});
