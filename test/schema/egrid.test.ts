import { EgridRecord, EgridRecordData, EgridRecordKey, Location, PowerPlantClass } from "@/schema/egrid";

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
      expect(Location.parse(validLocation)).toBe(validLocation);
    });
  });

  it("should invalidate incorrect locations", () => {
    const invalidLocations = ["EU", "Asia", "Africa"];

    invalidLocations.forEach((invalidLocation) => {
      expect(() => Location.parse(invalidLocation)).toThrow();
    });
  });
});

describe("EgridRecordKey schema", () => {
  it("should validate correct eGRID record keys", () => {
    const validRecordKey = { year: 2022, location: "US" };

    expect(EgridRecordKey.parse(validRecordKey)).toEqual(validRecordKey);
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
    const validRecordData = {
      nameplateCapacityMw: 100,
      annualHeatInputMmbtu: 5000,
      annualNetGenerationMwh: 2000,
      annualNoxEmissionsTons: 50,
    };

    expect(EgridRecordData.parse(validRecordData)).toEqual(validRecordData);
  });

  it("should invalidate incorrect eGRID record data", () => {
    const invalidRecordData = [
      { nameplateCapacityMw: "invalid" }, // nameplateCapacityMw is not a number
    ];

    invalidRecordData.forEach((invalidData) => {
      expect(() => EgridRecordData.parse(invalidData)).toThrow();
    });
  });
});

describe("EgridRecord", () => {
  it("should validate correct eGRID records", () => {
    const validRecord = {
      year: 2022,
      location: "US",
      nameplateCapacityMw: 100,
      annualHeatInputMmbtu: 5000,
      annualNetGenerationMwh: 2000,
      annualNoxEmissionsTons: 50,
    };

    expect(EgridRecord.parse(validRecord)).toEqual(validRecord);
  });

  it("should invalidate incorrect eGRID records", () => {
    const invalidRecords = [
      { year: 1999, location: "US", nameplateCapacityMw: 100 }, // year out of range
      { year: 2022, location: "EU", annualHeatInputMmbtu: 5000 }, // invalid location
      { year: 2022, location: "US", annualNetGenerationMwh: "2000" }, // annualNetGenerationMwh is not a number
    ];

    invalidRecords.forEach((invalidRecord) => {
      expect(() => EgridRecord.parse(invalidRecord)).toThrow();
    });
  });
});
