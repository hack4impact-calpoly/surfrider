import { AvertRecord } from "@/schema/avert";

describe("AvertRecord schema", () => {
  it("should validate correct avert records across multiple locations", () => {
    const validRecords = [
      {
        year: 2022,
        location: "US",
        powerPlantClass: "OnshoreWind",
        avoidedCo2EmissionRateLbMwh: 100,
        avoidedNoxEmissionRateLbMwh: 50,
        avoidedSo2EmissionRateLbMwh: 20,
        avoidedPm2_5EmissionRateLbMwh: 10,
        avoidedVocEmissionRateLbMwh: 5,
        avoidedNh3EmissionRateLbMwh: 3,
        capacityFactorPercent: 80,
      },
      {
        year: 2022,
        location: "California",
        powerPlantClass: "OnshoreWind",
        avoidedCo2EmissionRateLbMwh: 100,
        avoidedNoxEmissionRateLbMwh: 50,
        avoidedSo2EmissionRateLbMwh: 20,
        avoidedPm2_5EmissionRateLbMwh: 10,
        avoidedVocEmissionRateLbMwh: 5,
        avoidedNh3EmissionRateLbMwh: 3,
        capacityFactorPercent: 80,
      },
      {
        year: 2022,
        location: "Mid-Atlantic",
        powerPlantClass: "OnshoreWind",
        avoidedCo2EmissionRateLbMwh: 100,
        avoidedNoxEmissionRateLbMwh: 50,
        avoidedSo2EmissionRateLbMwh: 20,
        avoidedPm2_5EmissionRateLbMwh: 10,
        avoidedVocEmissionRateLbMwh: 5,
        avoidedNh3EmissionRateLbMwh: 3,
        capacityFactorPercent: 80,
      },
    ];

    validRecords.forEach((validRecord) => {
      expect(AvertRecord.parse(validRecord)).toEqual(validRecord);
    });
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
