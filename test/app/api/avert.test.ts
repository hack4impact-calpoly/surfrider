import { GET } from "@/app/api/avert/route";
import { fetchAndTransformAvertData } from "@/services/avert-fetch";
import { addAvertRecord } from "@/services/avert-store";

jest.mock("@/services/avert-fetch", () => ({
  fetchAndTransformAvertData: jest.fn(),
}));

jest.mock("@/services/avert-store", () => ({
  addAvertRecord: jest.fn(),
}));

describe("/api/avert route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns correct count when fetching and storing records succeed", async () => {
    const mockRecords = [{ id: 1 }, { id: 2 }];
    (fetchAndTransformAvertData as jest.Mock).mockResolvedValue(mockRecords);
    (addAvertRecord as jest.Mock).mockResolvedValue(undefined);

    const response = await GET();

    expect(fetchAndTransformAvertData).toHaveBeenCalled();
    expect(addAvertRecord).toHaveBeenCalledTimes(mockRecords.length);

    // NextResponse.json wraps the count in a response; simulate extracting the JSON
    const json = await response.json();
    expect(json).toEqual(mockRecords.length);
  });

  test("returns error response when fetch fails", async () => {
    const testError = new Error("fetch error");
    (fetchAndTransformAvertData as jest.Mock).mockRejectedValue(testError);

    const response = await GET();

    expect(response.status).toEqual(500);
  });

  test("returns error response when adding a record fails", async () => {
    const mockRecords = [{ id: 1 }, { id: 2 }];
    (fetchAndTransformAvertData as jest.Mock).mockResolvedValue(mockRecords);
    const testError = new Error("store error");
    (addAvertRecord as jest.Mock).mockRejectedValue(testError);

    const response = await GET();

    expect(addAvertRecord).toHaveBeenCalled();
    expect(response.status).toEqual(500);
  });
});
