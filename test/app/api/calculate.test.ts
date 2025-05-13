import { CalculateResult } from "@/schema/api";
import { getAvertRecordByKey } from "@/services/avert-store";
import { getEgridRecordByKey } from "@/services/egrid-store";
import { mocked } from "jest-mock";
import { NextRequest } from "next/server";
import { POST } from "../../../src/app/api/calculate/route";
import { MOCK_CALCULATE_INPUT } from "../../mocks/api-mocks";
import { MOCK_AVERT_RECORD } from "../../mocks/avert-mocks";
import { MOCK_EGRID_RECORD } from "../../mocks/egrid-mocks";

jest.mock("@/services/egrid-store");
mocked(getEgridRecordByKey).mockResolvedValue(MOCK_EGRID_RECORD);

jest.mock("@/services/avert-store");
mocked(getAvertRecordByKey).mockResolvedValue(MOCK_AVERT_RECORD);

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
  });

  it("should throw error for invalid input", async () => {
    const invalidInput = { ...MOCK_CALCULATE_INPUT, installedCapacity: -1 };

    const req = new FakeNextRequest(invalidInput);
    const res = await POST(req as unknown as NextRequest);

    expect(res.status).toEqual(500);
  });
});
