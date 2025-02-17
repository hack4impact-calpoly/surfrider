import { AvertRecord } from "@/schema/avert";
import { PowerPlantClass, Location } from "@/schema/egrid";

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

describe("AvertRecord schema", () => {
  it("should validate correct avert records", () => {
    const validRecord = {
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
    };

    expect(AvertRecord.parse(validRecord)).toEqual(validRecord);
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
});
