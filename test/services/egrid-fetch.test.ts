import axios from "axios";
import * as XLSX from "xlsx";
import { mocked } from "jest-mock";
import {
  MOCK_EGRID_COUNTRY_SHEET,
  MOCK_EGRID_RECORD,
  MOCK_EGRID_STATE_SHEET,
  MOCK_EGRID_SUBREGION_SHEET,
} from "../mocks/egrid-mocks";
import { fetchAndTransformEgridData } from "@/services/egrid-fetch";

jest.mock("axios");
const mockedAxios = mocked(axios);
mockedAxios.get.mockResolvedValue({
  data: Buffer.from("test-response-data"),
});

jest.mock("xlsx");
const mockedXlsx = mocked(XLSX);
mockedXlsx.read.mockReturnValue({
  Sheets: {
    US22: "test-country-sheet",
    SRL22: "test-subregion-sheet",
    ST22: "test-state-sheet",
  },
} as unknown as XLSX.WorkBook);
mockedXlsx.utils.sheet_to_json.mockImplementation(((sheet: string) => {
  switch (sheet) {
    case "test-country-sheet":
      return MOCK_EGRID_COUNTRY_SHEET;
    case "test-subregion-sheet":
      return MOCK_EGRID_SUBREGION_SHEET;
    case "test-state-sheet":
      return MOCK_EGRID_STATE_SHEET;
  }
}) as unknown as typeof XLSX.utils.sheet_to_json);

describe("eGRID data fetcher", () => {
  it("should fetch and parse eGRID data", async () => {
    const result = await fetchAndTransformEgridData();

    expect(result.length).toEqual(4);
    expect(result[0]).toEqual(MOCK_EGRID_RECORD);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedXlsx.read).toHaveBeenCalledTimes(1);
    expect(mockedXlsx.read).toHaveBeenCalledWith(Buffer.from("test-response-data"), {
      type: "buffer",
      sheets: ["US22", "SRL22", "ST22"],
    });
    expect(mockedXlsx.utils.sheet_to_json).toHaveBeenCalledTimes(3);
    expect(mockedXlsx.utils.sheet_to_json).toHaveBeenCalledWith("test-country-sheet");
    expect(mockedXlsx.utils.sheet_to_json).toHaveBeenCalledWith("test-subregion-sheet");
    expect(mockedXlsx.utils.sheet_to_json).toHaveBeenCalledWith("test-state-sheet");
  });

  it("should throw an error if data transformation fails", async () => {
    mockedXlsx.utils.sheet_to_json.mockImplementationOnce((() => [
      { invalid: "data", test: "data" },
      { invalid: "data", test: "data" },
    ]) as unknown as typeof XLSX.utils.sheet_to_json);

    await expect(fetchAndTransformEgridData()).rejects.toThrow("Validation failed");
  });

  it("should throw an error if the eGRID file is missing country data", async () => {
    mockedXlsx.utils.sheet_to_json.mockImplementationOnce(() => []);
    await expect(fetchAndTransformEgridData()).rejects.toThrow("Unable to find country data in eGRID file");
  });

  it("should throw an error if the eGRID file is missing subregion data", async () => {
    const originalSheetToJson = mockedXlsx.utils.sheet_to_json;
    mockedXlsx.utils.sheet_to_json.mockImplementation(((sheet: string) => {
      if (sheet === "test-country-sheet") return MOCK_EGRID_COUNTRY_SHEET;
      return [];
    }) as unknown as typeof XLSX.utils.sheet_to_json);

    await expect(fetchAndTransformEgridData()).rejects.toThrow("Unable to find subregion data in eGRID file");
    mockedXlsx.utils.sheet_to_json = originalSheetToJson; // Restore original implementation
  });

  it("should throw an error if the eGRID file is missing state data", async () => {
    const originalSheetToJson = mockedXlsx.utils.sheet_to_json;
    mockedXlsx.utils.sheet_to_json.mockImplementation(((sheet: string) => {
      if (sheet === "test-country-sheet") return MOCK_EGRID_COUNTRY_SHEET;
      if (sheet === "test-subregion-sheet") return MOCK_EGRID_SUBREGION_SHEET;
      return [];
    }) as unknown as typeof XLSX.utils.sheet_to_json);

    await expect(fetchAndTransformEgridData()).rejects.toThrow("Unable to find state data in eGRID file");
    mockedXlsx.utils.sheet_to_json = originalSheetToJson; // Restore original implementation
  });

  it("should handle network errors gracefully", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));
    await expect(fetchAndTransformEgridData()).rejects.toThrow("Network error");
  });

  it("should handle parsing errors gracefully", async () => {
    mockedXlsx.read.mockImplementationOnce(() => {
      throw new Error("Parsing error");
    });
    await expect(fetchAndTransformEgridData()).rejects.toThrow("Parsing error");
  });

  it("should handle invalid data format errors gracefully", async () => {
    mockedXlsx.utils.sheet_to_json.mockImplementationOnce(() => {
      throw new Error("Invalid data format");
    });
    await expect(fetchAndTransformEgridData()).rejects.toThrow("Invalid data format");
  });
});
