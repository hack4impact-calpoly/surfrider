import { AvertRecord, AvertRecordData, AvertRecordKey } from "@/schema/avert";
import { MOCK_AVERT_RECORD, MOCK_AVERT_RECORD_DATA, MOCK_AVERT_RECORD_KEY } from "../mocks/avert-mocks";

describe("AvertRecordKey schema", () => {
  it("should validate correct avert record keys", () => {
    expect(MOCK_AVERT_RECORD_KEY).toEqual(MOCK_AVERT_RECORD_KEY);
  });

  it("should invalidate incorrect avert record keys", () => {
    const invalidKeys = [
      { year: 1999, location: "US", powerPlantClass: "OnshoreWind" }, // year out of range
      { year: 2022, location: "EU", powerPlantClass: "OnshoreWind" }, // invalid location
      { year: 2022, location: "US", powerPlantClass: "InvalidClass" }, // invalid power plant class
    ];

    invalidKeys.forEach((invalidKey) => {
      expect(() => AvertRecordKey.parse(invalidKey)).toThrow();
    });
  });
});

describe("AvertRecordData schema", () => {
  it("should validate correct avert record data", () => {
    expect(MOCK_AVERT_RECORD_DATA).toEqual(MOCK_AVERT_RECORD_DATA);
  });

  it("should invalidate incorrect avert record data", () => {
    const invalidData = [
      {
        // missing required fields
        avoidedCo2EmissionRateLbMwh: 100,
      },
      {
        // invalid types
        avoidedCo2EmissionRateLbMwh: "100",
        capacityFactorPercent: "eighty",
      },
    ];

    invalidData.forEach((invalidData) => {
      expect(() => AvertRecordData.parse(invalidData)).toThrow();
    });
  });
});

describe("AvertRecord schema", () => {
  it("should validate correct avert records", () => {
    expect(MOCK_AVERT_RECORD).toEqual(MOCK_AVERT_RECORD);
  });

  it("should invalidate incorrect avert records", () => {
    const invalidRecords = [
      {
        year: 1999,
        location: "US",
        powerPlantClass: "OnshoreWind",
        avoidedCo2EmissionRateLbMwh: 100,
        capacityFactorPercent: 80,
      }, // year out of range
      {
        year: 2022,
        location: "EU",
        powerPlantClass: "OnshoreWind",
        avoidedCo2EmissionRateLbMwh: 100,
        capacityFactorPercent: 80,
      }, // invalid location
      {
        year: 2022,
        location: "US",
        powerPlantClass: "InvalidClass",
        avoidedCo2EmissionRateLbMwh: 100,
        capacityFactorPercent: 80,
      }, // invalid power plant class
      {
        year: 2022,
        location: "US",
        powerPlantClass: "OnshoreWind",
        avoidedCo2EmissionRateLbMwh: "100",
        capacityFactorPercent: 80,
      }, // avoidedCo2EmissionRateLbMwh is not a number
      {
        year: 2022,
        location: "US",
        powerPlantClass: "OnshoreWind",
        avoidedCo2EmissionRateLbMwh: 100,
        capacityFactorPercent: "eighty",
      }, // capacityFactorPercent is not a number
    ];

    invalidRecords.forEach((invalidRecord) => {
      expect(() => AvertRecord.parse(invalidRecord)).toThrow();
    });
  });

  it("should be exact match", () => {
    const invalidRecord = {
      //mid-atlantic should fail
      year: 2022,
      location: "mid-atlantic",
      powerPlantClass: "OnshoreWind",
      avoidedCo2EmissionRateLbMwh: 100,
      avoidedNoxEmissionRateLbMwh: 50,
      avoidedSo2EmissionRateLbMwh: 20,
      avoidedPm2_5EmissionRateLbMwh: 10,
      avoidedVocEmissionRateLbMwh: 5,
      avoidedNh3EmissionRateLbMwh: 3,
      capacityFactorPercent: 80,
    };

    expect(() => AvertRecord.parse(invalidRecord)).toThrow();
  });
});
