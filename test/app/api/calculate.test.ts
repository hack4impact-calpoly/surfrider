import { CalculateResult } from "@/schema/api";
import { AvertLocation } from "@/schema/avert";
import { EgridLocation, PowerPlantClass } from "@/schema/egrid";
import { getAvertRecordByKey } from "@/services/avert-store";
import { getEgridRecordByKey } from "@/services/egrid-store";
import { mocked } from "jest-mock";
import { NextRequest } from "next/server";
import { POST } from "../../../src/app/api/calculate/route";
import { MOCK_CALCULATE_INPUT } from "../../mocks/api-mocks";
import { MOCK_AVERT_RECORD } from "../../mocks/avert-mocks";
import { MOCK_EGRID_RECORD } from "../../mocks/egrid-mocks";

jest.mock("@/services/egrid-store");
const mockGetEgridRecordByKey = mocked(getEgridRecordByKey).mockResolvedValue(MOCK_EGRID_RECORD);

jest.mock("@/services/avert-store");
const mockGetAvertRecordByKey = mocked(getAvertRecordByKey).mockResolvedValue(MOCK_AVERT_RECORD);

class FakeNextRequest {
  private body: unknown;
  constructor(body: unknown) {
    this.body = body;
  }
  json() {
    return Promise.resolve(this.body);
  }
}

describe("/api/calculate route", () => {
  it("should return expected calculation results for valid input", async () => {
    const req = new FakeNextRequest(MOCK_CALCULATE_INPUT);
    const res = await POST(req as unknown as NextRequest);

    const jsonResponse = await res.json();
    expect(() => CalculateResult.parse(jsonResponse)).not.toThrow();
    expect(mockGetEgridRecordByKey).toHaveBeenCalledWith(2022, EgridLocation.enum.CA);
    expect(mockGetAvertRecordByKey).toHaveBeenCalledWith(2023, AvertLocation.enum.California, "OnshoreWind");
  });

  it("should fetch OnshoreWind AVERT record for consumed power plant class", async () => {
    const inputWithConsumedClass = { ...MOCK_CALCULATE_INPUT, powerPlantClass: PowerPlantClass.enum.Consumed };
    const req = new FakeNextRequest(inputWithConsumedClass);
    const res = await POST(req as unknown as NextRequest);

    const jsonResponse = await res.json();
    expect(() => CalculateResult.parse(jsonResponse)).not.toThrow();
    expect(mockGetAvertRecordByKey).toHaveBeenCalledWith(2023, AvertLocation.enum.California, "OnshoreWind");
  });

  it("should throw error for invalid input", async () => {
    const invalidInput = { ...MOCK_CALCULATE_INPUT, installedCapacity: -1 };

    const req = new FakeNextRequest(invalidInput);
    const res = await POST(req as unknown as NextRequest);

    expect(res.status).toEqual(500);
  });
});
