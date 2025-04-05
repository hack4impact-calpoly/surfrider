import { EgridRecord, EgridRecordData, EgridRecordKey, EgridLocation, PowerPlantClass } from "@/schema/egrid";
import { MOCK_EGRID_RECORD, MOCK_EGRID_RECORD_DATA, MOCK_EGRID_RECORD_KEY } from "../mocks/egrid-mocks";

describe("PowerPlantClass schema", () => {
  it("should validate correct power plant classes", () => {
    const validClasses = ["OnshoreWind", "OffshoreWind", "UtilityPV", "DistributedPV", "PortfolioEE", "UniformEE"];

    validClasses.forEach((validClass) => {
      expect(PowerPlantClass.parse(validClass)).toBe(validClass);
    });
  });

  it("should invalidate incorrect power plant classes", () => {
    const invalidClass = "InvalidClass";

    expect(() => PowerPlantClass.parse(invalidClass)).toThrow();
  });
});

describe("Location schema", () => {
  it("should validate correct locations", () => {
    const validLocations = ["US", "AKGD", "PRMS", "SRVC", "AK", "CA", "CO", "CT", "MA", "OH", "WY"];

    validLocations.forEach((validLocation) => {
      expect(EgridLocation.parse(validLocation)).toBe(validLocation);
    });
  });

  it("should invalidate incorrect locations", () => {
    const invalidLocations = ["EU", "Asia", "Africa"];

    invalidLocations.forEach((invalidLocation) => {
      expect(() => EgridLocation.parse(invalidLocation)).toThrow();
    });
  });
});

describe("EgridRecordKey schema", () => {
  it("should validate correct eGRID record keys", () => {
    expect(EgridRecordKey.parse(MOCK_EGRID_RECORD_KEY)).toEqual(MOCK_EGRID_RECORD_KEY);
  });

  it("should invalidate incorrect eGRID record keys", () => {
    const invalidRecordKeys = [
      { year: 1999, location: "US" }, // year out of range
      { year: 2022, location: "EU" }, // invalid location
      { year: "2022", location: "US" }, // year is not a number
    ];

    invalidRecordKeys.forEach((invalidRecordKey) => {
      expect(() => EgridRecordKey.parse(invalidRecordKey)).toThrow();
    });
  });
});

describe("EgridRecordData schema", () => {
  it("should validate correct eGRID record data", () => {
    expect(EgridRecordData.parse(MOCK_EGRID_RECORD_DATA)).toEqual(MOCK_EGRID_RECORD_DATA);
  });

  it("should invalidate incorrect eGRID record data", () => {
    const invalidRecordData = [{ ...MOCK_EGRID_RECORD_DATA, nameplateCapacityMw: "invalid" }];

    invalidRecordData.forEach((invalidData) => {
      expect(() => EgridRecordData.parse(invalidData)).toThrow();
    });
  });
});

describe("EgridRecord", () => {
  it("should validate correct eGRID records", () => {
    expect(EgridRecord.parse(MOCK_EGRID_RECORD)).toEqual(MOCK_EGRID_RECORD);
  });

  it("should invalidate incorrect eGRID records", () => {
    const invalidRecords = [
      { ...MOCK_EGRID_RECORD, year: 1999 }, // year out of range
      { ...MOCK_EGRID_RECORD, location: "EU" }, // invalid location
      { ...MOCK_EGRID_RECORD, nameplateCapacityMw: "invalid" }, // invalid capacity
    ];

    invalidRecords.forEach((invalidRecord) => {
      expect(() => EgridRecord.parse(invalidRecord)).toThrow();
    });
  });
});
