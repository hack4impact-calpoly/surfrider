import { CalculateInput } from "@/schema/api";

describe("CalculateInput schema", () => {
  it("should validate a correct input", () => {
    const validInput = {
      installedCapacity: 100,
      powerPlantClass: "OnshoreWind",
      location: "US",
      capacityFactor: 0.25,
      population2070: 1000000,
      startYear: 2020,
      lifeTimeYears: 30,
      yearOfStudy: 2025,
    };

    expect(() => CalculateInput.parse(validInput)).not.toThrow();
  });

  it("should attempt to convert strings into numbers", () => {
    const validInput = {
      installedCapacity: "100", // should be a number
      powerPlantClass: "OnshoreWind",
      location: "US",
      capacityFactor: 0.25,
      population2070: 1000000,
      startYear: "2020",
      lifeTimeYears: 30,
      yearOfStudy: 2025,
    };

    expect(() => CalculateInput.parse(validInput)).not.toThrow();
  });

  it("should invalidate missing required fields", () => {
    const invalidInput = {
      installedCapacity: 100,
      powerPlantClass: "OnshoreWind",
      location: "US",
      capacityFactor: 0.25,
      population2070: 1000000,
      startYear: 2020,
      lifeTimeYears: 30,
      // yearOfStudy is missing
    };

    expect(() => CalculateInput.parse(invalidInput)).toThrow();
  });

  it("should invalidate an incorrect input", () => {
    const invalidInput = {
      installedCapacity: "e", // should be a number
      powerPlantClass: "OnshoreWind",
      location: "US",
      capacityFactor: 0.25,
      population2070: 1000000,
      startYear: 2020,
      lifeTimeYears: 30,
      yearOfStudy: 2025,
    };

    expect(() => CalculateInput.parse(invalidInput)).toThrow();
  });
});
