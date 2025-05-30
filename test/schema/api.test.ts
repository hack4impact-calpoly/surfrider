import { CalculateInput, CalculateResult } from "@/schema/api";
import { FormulaId } from "@/schema/formula-id";

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

  it.each`
    field                  | value
    ${"installedCapacity"} | ${0}
    ${"installedCapacity"} | ${"Invalid"}
    ${"powerPlantClass"}   | ${"InvalidClass"}
    ${"location"}          | ${"InvalidLocation"}
    ${"capacityFactor"}    | ${0}
    ${"capacityFactor"}    | ${1.1}
    ${"capacityFactor"}    | ${"InvalidFactor"}
    ${"population2070"}    | ${0}
    ${"population2070"}    | ${1.5}
    ${"population2070"}    | ${"InvalidPopulation"}
    ${"startYear"}         | ${2014}
    ${"startYear"}         | ${2100}
    ${"startYear"}         | ${2020.5}
    ${"startYear"}         | ${"InvalidYear"}
    ${"lifeTimeYears"}     | ${0}
    ${"lifeTimeYears"}     | ${1.5}
    ${"lifeTimeYears"}     | ${"InvalidLifetime"}
    ${"yearOfStudy"}       | ${2014}
    ${"yearOfStudy"}       | ${2100}
    ${"yearOfStudy"}       | ${2020.5}
    ${"yearOfStudy"}       | ${"InvalidYear"}
  `("should invalidate $field with value $value", ({ field, value }) => {
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

    expect(() => CalculateInput.parse({ ...validInput, [field]: value })).toThrow();
  });
});

describe("CalculateResult schema", () => {
  it("should validate a correct result", () => {
    const validResult = Object.fromEntries(Object.values(FormulaId.Values).map((id) => [id, 1000]));

    expect(() => CalculateResult.parse(validResult)).not.toThrow();
  });

  it("should allow null values", () => {
    const validResult = {
      ...Object.fromEntries(Object.values(FormulaId.Values).map((id) => [id, 1000])),
      annualPowerGeneration: null,
    };

    expect(() => CalculateResult.parse(validResult)).not.toThrow();
  });

  it("should invalidate an incorrect result", () => {
    const invalidResult = {
      ...Object.fromEntries(Object.values(FormulaId.Values).map((id) => [id, 1000])),
      annualPowerGeneration: "invalid",
    };

    expect(() => CalculateResult.parse(invalidResult)).toThrow();
  });
});
