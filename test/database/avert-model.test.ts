import { PowerPlantClass } from "@/schema/egrid";
import { AvertModel } from "@/database/avert-model";
import { AvertLocation } from "@/schema/avert";

describe("AvertModel schema validation", () => {
  it("should validate a correct avert document", () => {
    const avert = new AvertModel({
      year: 2024,
      location: AvertLocation.options[0], // Using a valid location
      powerPlantClass: PowerPlantClass.options[0], // Using a valid power plant class
      avoidedCo2EmissionRateLbMwh: 100.5,
      avoidedNoxEmissionRateLbMwh: 10.2,
      avoidedSo2EmissionRateLbMwh: 5.1,
      avoidedPm2_5EmissionRateLbMwh: 2.3,
      avoidedVocEmissionRateLbMwh: 1.1,
      avoidedNh3EmissionRateLbMwh: 0.9,
      capacityFactorPercent: 80,
    });

    expect(avert.validate()).resolves.toBeUndefined();
  });

  it("should fail validation when required fields are missing", () => {
    const avert = new AvertModel({}); // Missing all required fields

    expect(avert.validate()).rejects.toThrow();
  });

  it("should fail validation for an invalid powerPlantClass", () => {
    const avert = new AvertModel({
      year: 2024,
      location: AvertLocation.options[0], // Valid location
      powerPlantClass: "InvalidClass", // Not in enum
    });

    expect(avert.validate()).rejects.toThrow();
  });

  it("should fail validation for an invalid location", () => {
    const avert = new AvertModel({
      year: 2024,
      location: "InvalidLocation", // Not in enum
      powerPlantClass: PowerPlantClass.options[0], // Valid power plant class
    });

    expect(avert.validate()).rejects.toThrow();
  });
});
