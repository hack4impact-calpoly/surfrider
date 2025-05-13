import { fetchAndTransformAvertData } from "@/services/avert-fetch";
import axios from "axios";
import { mocked } from "jest-mock";
import * as XLSX from "xlsx";
import {
  MOCK_AVERT_CAPACITY_FACTORS_SHEET,
  MOCK_AVERT_EMISSION_RATES_SHEET,
  MOCK_AVERT_RECORD_MATCHER,
} from "../mocks/avert-mocks";

jest.mock("axios");
const mockedAxios = mocked(axios);
mockedAxios.get.mockResolvedValue({
  data: Buffer.from("test-response-data"),
});

jest.mock("xlsx");
const mockedXlsx = mocked(XLSX);
mockedXlsx.read.mockReturnValue({
  Sheets: {
    "Capacity factors": "test-capacity-factors-sheet",
    "2023": "test-emission-rates-sheet",
  },
} as unknown as XLSX.WorkBook);
mockedXlsx.utils.sheet_to_json.mockImplementation(((sheet: string) => {
  switch (sheet) {
    case "test-capacity-factors-sheet":
      return MOCK_AVERT_CAPACITY_FACTORS_SHEET;
    case "test-emission-rates-sheet":
      return MOCK_AVERT_EMISSION_RATES_SHEET;
  }
}) as unknown as typeof XLSX.utils.sheet_to_json);

describe("AVERT data fetcher", () => {
  it("should fetch and parse AVERT data", async () => {
    const result = await fetchAndTransformAvertData();

    expect(result.length).toEqual(90);
    expect(
      result.find(
        (record) =>
          record.year === 2023 && record.location === "California" && record.powerPlantClass === "OffshoreWind",
      ),
    ).toMatchObject(MOCK_AVERT_RECORD_MATCHER);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedXlsx.read).toHaveBeenCalledTimes(1);
    expect(mockedXlsx.read).toHaveBeenCalledWith(Buffer.from("test-response-data"), {
      type: "buffer",
      sheets: ["Capacity factors", "2023"],
    });
    expect(mockedXlsx.utils.sheet_to_json).toHaveBeenCalledTimes(2);
    expect(mockedXlsx.utils.sheet_to_json).toHaveBeenCalledWith("test-capacity-factors-sheet", { header: 1 });
    expect(mockedXlsx.utils.sheet_to_json).toHaveBeenCalledWith("test-emission-rates-sheet", { header: 1 });
  });

  it("should throw an error if the AVERT file is missing capacity factors data", async () => {
    mockedXlsx.utils.sheet_to_json.mockImplementationOnce(
      (() => undefined) as unknown as typeof XLSX.utils.sheet_to_json,
    );
    await expect(fetchAndTransformAvertData()).rejects.toThrow("Failed to parse AVERT capacity factors data");
  });

  it("should throw an error if the AVERT file is missing emission rates data", async () => {
    const originalSheetToJson = mockedXlsx.utils.sheet_to_json;
    mockedXlsx.utils.sheet_to_json.mockImplementation(((sheet: string) => {
      if (sheet === "test-capacity-factors-sheet") return MOCK_AVERT_CAPACITY_FACTORS_SHEET;
      if (sheet === "test-emission-rates-sheet") return undefined;
    }) as unknown as typeof XLSX.utils.sheet_to_json);

    await expect(fetchAndTransformAvertData()).rejects.toThrow("Failed to parse AVERT emission rates data");
    mockedXlsx.utils.sheet_to_json = originalSheetToJson; // Restore original implementation
  });

  it("should handle network errors gracefully", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));
    await expect(fetchAndTransformAvertData()).rejects.toThrow("Network error");
  });

  it("should handle parsing errors gracefully", async () => {
    mockedXlsx.read.mockImplementationOnce(() => {
      throw new Error("Parsing error");
    });
    await expect(fetchAndTransformAvertData()).rejects.toThrow("Parsing error");
  });
});
