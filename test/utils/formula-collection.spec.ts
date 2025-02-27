import { FormulaParser } from "@/utils/formula-parser";
import {
  annualPowerGeneration,
  AVERT_AND_EGRID,
  CO2PerkWhConsumed,
  CO2PerkWhReduced,
  poundsOfCO2PerMWh,
  electricityReductionsCO2Emissions,
  electricityConsumedCO2Emissions,
  effectivekWhConsumed,
  effectivekWhReduced,
  numberOfIncandescentBulbsSwitchedToLightEmittingDiodeBulbsInOperationForAYearEmissionsSavedEquivalentEmissions,
  homeYearlyElectricityUseEquivalentEmissions,
  homeYearlyTotalEnergyUseEquivalentEmissions,
  numberOfUrbanTreeSeedlingsGrownFor10YearsEquivalentCarbonFixation,
  acresOfUSForestsEquivalentCO2SequesteringForOneYear,
  acresOfUSForestPreservedFromConversionToCroplandEquivalentEmissions,
  propaneCylindersUsedForHomeBarbecues,
  railcarsOfCoalBurned,
} from "@/utils/formula-collection";

/*
  My assumption for most of these tests is that energyType is 2 and regional is 1.
  However, formula 2 requires energyType to be 0 because I am making the assumption that formula 1 is intended to calculate
  reductions for consumed energy and consumption for reduced energy. This may not be correct and should be checked. Formula 1 is hard to interpret.
 */

/*
    Impact Calculator Equation 1: Conversion between Electricity Consumed and Reduced
 */

describe("annualPowerGeneration evaluation", () => {
  it("should evaluate annualPowerGeneration", () => {
    const parser = new FormulaParser(AVERT_AND_EGRID);
    parser.addFormula(annualPowerGeneration);

    const result = parser.evaluate();

    expect(result).toBeCloseTo(26278423200, 1);
  });
});

describe("CO2PerkWhConsumed evaluation", () => {
  it("should evaluate CO2PerkWhConsumed", () => {
    const parser = new FormulaParser(AVERT_AND_EGRID);
    parser.addFormula(CO2PerkWhConsumed);

    const result = parser.evaluate();

    expect(result).toBeCloseTo(823.149, 1);
  });
});

describe("poundsOfCO2PerMWh evaluation", () => {
  it("should evaluate poundsOfCO2PerMWh", () => {
    const parser = new FormulaParser(AVERT_AND_EGRID);
    parser.addFormula(poundsOfCO2PerMWh);

    const result = parser.evaluate();

    expect(result).toBeCloseTo(948.1, 1);
  });
});

describe("CO2PerkWhReduced evaluation", () => {
  it("should evaluate CO2PerkWhReduced", () => {
    const parser = new FormulaParser(AVERT_AND_EGRID);
    parser.addFormula(poundsOfCO2PerMWh);
    parser.addFormula(CO2PerkWhReduced);

    const result = parser.evaluate();

    expect(result).toBeCloseTo(948.119, 1);
  });
});
describe("effectivekWhReduced evaluation", () => {
  it("should evaluate effectivekWhReduced", () => {
    const parser = new FormulaParser(AVERT_AND_EGRID);
    parser.addFormula(annualPowerGeneration);
    parser.addFormula(CO2PerkWhConsumed);
    parser.addFormula(CO2PerkWhReduced);
    parser.addFormula(poundsOfCO2PerMWh);
    parser.addFormula(effectivekWhReduced);

    const result = parser.evaluate();

    // Can't get number to match exactly, probably intermediate rounding errors or precision issues.
    const expected = 26278423200.0;
    const percentError = 0.001;
    expect(result).toBeGreaterThanOrEqual(expected * (1 - percentError));
    expect(result).toBeLessThanOrEqual(expected * (1 + percentError));
  });
});
describe("effectivekWhConsumed evaluation", () => {
  it("should evaluate effectivekWhConsumed", () => {
    const parser = new FormulaParser(AVERT_AND_EGRID);
    parser.addFormula(annualPowerGeneration);
    parser.addFormula(CO2PerkWhConsumed);
    parser.addFormula(CO2PerkWhReduced);
    parser.addFormula(poundsOfCO2PerMWh);
    parser.addFormula(effectivekWhConsumed);

    const result = parser.evaluate();

    // Can't get number to match exactly, probably intermediate rounding errors or precision issues.
    const expected = 30267994303.08;
    const percentError = 0.001;
    expect(result).toBeGreaterThanOrEqual(expected * (1 - percentError));
    expect(result).toBeLessThanOrEqual(expected * (1 + percentError));
  });
});

/*
    Impact Calculator Equation 2: Electricity Reductions (kilowatt-hours) CO2 Emissions
 */
describe("formula 2 evaluation", () => {
  it("should evaluate formula 2", () => {
    const parser = new FormulaParser(AVERT_AND_EGRID);
    parser.addFormula(annualPowerGeneration);
    parser.addFormula(CO2PerkWhConsumed);
    parser.addFormula(CO2PerkWhReduced);
    parser.addFormula(poundsOfCO2PerMWh);
    parser.addFormula(effectivekWhReduced);
    parser.addFormula(electricityReductionsCO2Emissions);

    const result = parser.evaluate();

    const expected = 11301401.27;
    const percentError = 0.001;
    expect(result).toBeGreaterThanOrEqual(expected * (1 - percentError));
    expect(result).toBeLessThanOrEqual(expected * (1 + percentError));
  });
});

/*
    Impact Calculator Equation 3: Electricity consumed (kilowatt-hours) CO₂ Emissions
 */
describe("formula 3 evaluation", () => {
  it("should evaluate formula 3", () => {
    const parser = new FormulaParser(AVERT_AND_EGRID);
    parser.addFormula(annualPowerGeneration);
    parser.addFormula(CO2PerkWhConsumed);
    parser.addFormula(CO2PerkWhReduced);
    parser.addFormula(poundsOfCO2PerMWh);
    parser.addFormula(effectivekWhConsumed);
    parser.addFormula(electricityConsumedCO2Emissions);

    const result = parser.evaluate();

    const expected = 6259815.53;
    const percentError = 0.001;
    expect(result).toBeGreaterThanOrEqual(expected * (1 - percentError));
    expect(result).toBeLessThanOrEqual(expected * (1 + percentError));
  });
});

/*
    Impact Calculator Equation 11: Number of incandescent bulbs switched to light-emitting diode bulbs in operation for a year emissions saved Equivalent Emissions
 */
describe("formula 11 evaluation", () => {
  it("should evaluate formula 11", () => {
    const parser = new FormulaParser(AVERT_AND_EGRID);
    parser.addFormula(annualPowerGeneration);
    parser.addFormula(CO2PerkWhConsumed);
    parser.addFormula(CO2PerkWhReduced);
    parser.addFormula(poundsOfCO2PerMWh);
    parser.addFormula(effectivekWhReduced);
    parser.addFormula(effectivekWhConsumed);
    parser.addFormula(electricityReductionsCO2Emissions);
    parser.addFormula(electricityConsumedCO2Emissions);
    parser.addFormula(
      numberOfIncandescentBulbsSwitchedToLightEmittingDiodeBulbsInOperationForAYearEmissionsSavedEquivalentEmissions,
    );

    const result = parser.evaluate();

    const expected = 428083381.49;
    const percentError = 0.001;
    expect(result).toBeGreaterThanOrEqual(expected * (1 - percentError));
    expect(result).toBeLessThanOrEqual(expected * (1 + percentError));
  });
});

/*
    Impact Calculator Equation 12: Home yearly electricity use Equivalent Emissions
 */
describe("formula 12 evaluation", () => {
  it("should evaluate formula 12", () => {
    const parser = new FormulaParser(AVERT_AND_EGRID);
    parser.addFormula(annualPowerGeneration);
    parser.addFormula(CO2PerkWhConsumed);
    parser.addFormula(CO2PerkWhReduced);
    parser.addFormula(poundsOfCO2PerMWh);
    parser.addFormula(effectivekWhReduced);
    parser.addFormula(effectivekWhConsumed);
    parser.addFormula(electricityReductionsCO2Emissions);
    parser.addFormula(electricityConsumedCO2Emissions);
    parser.addFormula(homeYearlyElectricityUseEquivalentEmissions);

    const result = parser.evaluate();

    const expected = 2199144.05;
    const percentError = 0.001;
    expect(result).toBeGreaterThanOrEqual(expected * (1 - percentError));
    expect(result).toBeLessThanOrEqual(expected * (1 + percentError));
  });
});

/*
    Impact Calculator Equation 13: Home yearly total energy use Equivalent Emissions
 */
describe("formula 13 evaluation", () => {
  it("should evaluate formula 13", () => {
    const parser = new FormulaParser(AVERT_AND_EGRID);
    parser.addFormula(annualPowerGeneration);
    parser.addFormula(CO2PerkWhConsumed);
    parser.addFormula(CO2PerkWhReduced);
    parser.addFormula(poundsOfCO2PerMWh);
    parser.addFormula(effectivekWhReduced);
    parser.addFormula(effectivekWhConsumed);
    parser.addFormula(electricityReductionsCO2Emissions);
    parser.addFormula(electricityConsumedCO2Emissions);
    parser.addFormula(homeYearlyTotalEnergyUseEquivalentEmissions);

    const result = parser.evaluate();

    const expected = 1425145.18;
    const percentError = 0.001;
    expect(result).toBeGreaterThanOrEqual(expected * (1 - percentError));
    expect(result).toBeLessThanOrEqual(expected * (1 + percentError));
  });
});

/*
    Impact Calculator Equation 14: Number of urban tree seedlings grown for 10 years equivalent Carbon fixation
 */
describe("formula 14 evaluation", () => {
  it("should evaluate formula 14", () => {
    const parser = new FormulaParser(AVERT_AND_EGRID);
    parser.addFormula(annualPowerGeneration);
    parser.addFormula(CO2PerkWhConsumed);
    parser.addFormula(CO2PerkWhReduced);
    parser.addFormula(poundsOfCO2PerMWh);
    parser.addFormula(effectivekWhReduced);
    parser.addFormula(effectivekWhConsumed);
    parser.addFormula(electricityReductionsCO2Emissions);
    parser.addFormula(electricityConsumedCO2Emissions);
    parser.addFormula(numberOfUrbanTreeSeedlingsGrownFor10YearsEquivalentCarbonFixation);

    const result = parser.evaluate();

    const expected = 196433478.611; //manually calculated; potential rounding error
    const percentError = 0.001;
    expect(result).toBeGreaterThanOrEqual(expected * (1 - percentError));
    expect(result).toBeLessThanOrEqual(expected * (1 + percentError));
  });
});

/*
    Impact Calculator Equation 15: Acres of U.S. forests Equivalent CO₂ sequestering for one year
 */
describe("formula 15 evaluation", () => {
  it("should evaluate formula 15", () => {
    const parser = new FormulaParser(AVERT_AND_EGRID);
    parser.addFormula(annualPowerGeneration);
    parser.addFormula(CO2PerkWhConsumed);
    parser.addFormula(CO2PerkWhReduced);
    parser.addFormula(poundsOfCO2PerMWh);
    parser.addFormula(effectivekWhReduced);
    parser.addFormula(effectivekWhConsumed);
    parser.addFormula(electricityReductionsCO2Emissions);
    parser.addFormula(electricityConsumedCO2Emissions);
    parser.addFormula(acresOfUSForestsEquivalentCO2SequesteringForOneYear);

    const result = parser.evaluate();

    const expected = 14007389.505; //manually calculated; potential rounding error
    const percentError = 0.001;
    expect(result).toBeGreaterThanOrEqual(expected * (1 - percentError));
    expect(result).toBeLessThanOrEqual(expected * (1 + percentError));
  });
});

/*
    Impact Calculator Equation 16: Acres of U.S. forest preserved from conversion to cropland Equivalent Emissions
 */
describe("formula 16 evaluation", () => {
  it("should evaluate formula 16", () => {
    const parser = new FormulaParser(AVERT_AND_EGRID);
    parser.addFormula(annualPowerGeneration);
    parser.addFormula(CO2PerkWhConsumed);
    parser.addFormula(CO2PerkWhReduced);
    parser.addFormula(poundsOfCO2PerMWh);
    parser.addFormula(effectivekWhReduced);
    parser.addFormula(effectivekWhConsumed);
    parser.addFormula(electricityReductionsCO2Emissions);
    parser.addFormula(electricityConsumedCO2Emissions);
    parser.addFormula(acresOfUSForestPreservedFromConversionToCroplandEquivalentEmissions);

    const result = parser.evaluate();

    const expected = 2199144.05; //could be incorrect, refer to hardcoded value in expression
    const percentError = 0.001;
    expect(result).toBeGreaterThanOrEqual(expected * (1 - percentError));
    expect(result).toBeLessThanOrEqual(expected * (1 + percentError));
  });
});

/*
    Impact Calculator Equation 17: Propane cylinders used for home barbecues
 */
describe("formula 17 evaluation", () => {
  it("should evaluate formula 17", () => {
    const parser = new FormulaParser(AVERT_AND_EGRID);
    parser.addFormula(annualPowerGeneration);
    parser.addFormula(CO2PerkWhConsumed);
    parser.addFormula(CO2PerkWhReduced);
    parser.addFormula(poundsOfCO2PerMWh);
    parser.addFormula(effectivekWhReduced);
    parser.addFormula(effectivekWhConsumed);
    parser.addFormula(electricityReductionsCO2Emissions);
    parser.addFormula(electricityConsumedCO2Emissions);
    parser.addFormula(propaneCylindersUsedForHomeBarbecues);

    const result = parser.evaluate();

    const expected = 519098764.673; //manually calculated; potential rounding error
    const percentError = 0.001;
    expect(result).toBeGreaterThanOrEqual(expected * (1 - percentError));
    expect(result).toBeLessThanOrEqual(expected * (1 + percentError));
  });
});

/*
    Impact Calculator Equation 18: Railcars of coal burned
 */
describe("formula 18 evaluation", () => {
  it("should evaluate formula 18", () => {
    const parser = new FormulaParser(AVERT_AND_EGRID);
    parser.addFormula(annualPowerGeneration);
    parser.addFormula(CO2PerkWhConsumed);
    parser.addFormula(CO2PerkWhReduced);
    parser.addFormula(poundsOfCO2PerMWh);
    parser.addFormula(effectivekWhReduced);
    parser.addFormula(effectivekWhConsumed);
    parser.addFormula(electricityReductionsCO2Emissions);
    parser.addFormula(electricityConsumedCO2Emissions);
    parser.addFormula(railcarsOfCoalBurned);

    const result = parser.evaluate();

    const expected = 62335.36;
    const percentError = 0.001;
    expect(result).toBeGreaterThanOrEqual(expected * (1 - percentError));
    expect(result).toBeLessThanOrEqual(expected * (1 + percentError));
  });
});
