import { GET } from "@/app/api/egrid/route";
import { fetchAndTransformEgridData } from "@/services/egrid-fetch";
import { addEgridRecord } from "@/services/egrid-store";

jest.mock("@/services/egrid-fetch", () => ({
  fetchAndTransformEgridData: jest.fn(),
}));

jest.mock("@/services/egrid-store", () => ({
  addEgridRecord: jest.fn(),
}));

describe("/api/egrid route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns correct count when fetching and storing records succeed", async () => {
    const mockRecords = [{ id: 1 }, { id: 2 }];
    (fetchAndTransformEgridData as jest.Mock).mockResolvedValue(mockRecords);
    (addEgridRecord as jest.Mock).mockResolvedValue(undefined);

    const response = await GET();

    expect(fetchAndTransformEgridData).toHaveBeenCalled();
    expect(addEgridRecord).toHaveBeenCalledTimes(mockRecords.length);

    // NextResponse.json wraps the count in a response; simulate extracting the JSON
    const json = await response.json();
    expect(json).toEqual(mockRecords.length);
  });

  test("returns error response when fetch fails", async () => {
    const testError = new Error("fetch error");
    (fetchAndTransformEgridData as jest.Mock).mockRejectedValue(testError);

    const response = await GET();

    expect(response.status).toEqual(500);
  });

  test("returns error response when adding a record fails", async () => {
    const mockRecords = [{ id: 1 }, { id: 2 }];
    (fetchAndTransformEgridData as jest.Mock).mockResolvedValue(mockRecords);
    const testError = new Error("store error");
    (addEgridRecord as jest.Mock).mockRejectedValue(testError);

    const response = await GET();

    expect(addEgridRecord).toHaveBeenCalled();
    expect(response.status).toEqual(500);
  });
});
