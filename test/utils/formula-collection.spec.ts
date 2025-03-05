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
  CO2PerkWhElectricityConsumed,
  CO2PerkWhElectricityReduced,
  gallonsOfGasolineBurnedEquivalentCO2Emissions,
  gallonsOfDieselConsumedEquivalentCO2Emissions,
  gasolinePoweredPassengerVehiclesPerYearEquivalentCO2Emissions,
  milesDrivenByTheAverageGasolinePoweredPassengerVehicleEquivalentCO2Emissions,
  thermsOfNaturalGasEquivalentCO2Emissions,
  mcfOfNaturalGasEquivalentCO2Emissions,
  barrelsOfOilConsumedEquivalentCO2Emissions,
  tankerTrucksFilledWithGasolineEquivalentEmissions,
  numberOfIncandescentBulbsSwitchedToLightEmittingDiodeBulbsInOperationForAYearEmissionsSavedEquivalentEmissions,
  homeYearlyElectricityUseEquivalentEmissions,
  homeYearlyTotalEnergyUseEquivalentEmissions,
  numberOfUrbanTreeSeedlingsGrownFor10YearsEquivalentCarbonFixation,
  acresOfUSForestsEquivalentCO2SequesteringForOneYear,
  acresOfUSForestPreservedFromConversionToCroplandEquivalentEmissions,
  propaneCylindersUsedForHomeBarbecues,
  railcarsOfCoalBurned,
  poundsOfCoalBurned,
  tonsOfWasteRecycledInsteadOfLandfilled,
  numberOfGarbageTrucksOfWasteRecycledInsteadOfLandfilled,
} from "@/utils/formula-collection";

const expectPercentError = (result: number, expected: number, percentError: number) => {
  expect(result).toBeGreaterThanOrEqual(expected * (1 - percentError));
  expect(result).toBeLessThanOrEqual(expected * (1 + percentError));
};

/*
  My assumption for most of these tests is that energyType is 2 and regional is 1. This will need to be reworked once AVERT_AND_EGRID is no longer fixed.
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
    expectPercentError(result, 26278423200.0, 0.001);
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
    expectPercentError(result, 30267994303.08, 0.001);
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
    parser.addFormula(CO2PerkWhElectricityReduced);
    parser.addFormula(electricityReductionsCO2Emissions);

    const result = parser.evaluate();

    expectPercentError(result, 11301401.27, 0.001);
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
    parser.addFormula(CO2PerkWhElectricityConsumed);
    parser.addFormula(electricityConsumedCO2Emissions);

    const result = parser.evaluate();
    
    expectPercentError(result, 6259815.53, 0.001);
  });
});

/*
    Impact Calculator Equation 4: Gallons of gasoline Burned Equivalent CO₂ Emissions
 */
describe("formula 4 evaluation", () => {
  it("should evaluate formula 4", () => {
    const parser = new FormulaParser(AVERT_AND_EGRID);
    parser.addFormula(annualPowerGeneration);
    parser.addFormula(CO2PerkWhConsumed);
    parser.addFormula(CO2PerkWhReduced);
    parser.addFormula(poundsOfCO2PerMWh);
    parser.addFormula(effectivekWhConsumed);
    parser.addFormula(effectivekWhReduced);
    parser.addFormula(CO2PerkWhElectricityConsumed);
    parser.addFormula(CO2PerkWhElectricityReduced);
    parser.addFormula(gallonsOfGasolineBurnedEquivalentCO2Emissions);

    const result = parser.evaluate();

    expectPercentError(result, 1271677874.56, 0.001);
  });
});
/*
    Impact Calculator Equation 5: Gallons of diesel consumed Equivalent CO₂ Emissions
 */
describe("formula 5 evaluation", () => {
  it("should evaluate formula 5", () => {
    parser.addFormula(annualPowerGeneration);
    parser.addFormula(CO2PerkWhConsumed);
    parser.addFormula(CO2PerkWhReduced);
    parser.addFormula(poundsOfCO2PerMWh);
    parser.addFormula(effectivekWhConsumed);
    parser.addFormula(effectivekWhReduced);
    parser.addFormula(CO2PerkWhElectricityConsumed);
    parser.addFormula(CO2PerkWhElectricityReduced);
    parser.addFormula(gallonsOfDieselConsumedEquivalentCO2Emissions);

    const result = parser.evaluate();

    expectPercentError(result, 1110157295.8, 0.001);
  });
});
/*
    Impact Calculator Equation 6: Gasoline-powered passenger vehicles per year Equivalent CO₂ Emissions
 */
describe("formula 6 evaluation", () => {
  it("should evaluate formula 6", () => {
    parser.addFormula(annualPowerGeneration);
    parser.addFormula(CO2PerkWhConsumed);
    parser.addFormula(CO2PerkWhReduced);
    parser.addFormula(poundsOfCO2PerMWh);
    parser.addFormula(effectivekWhConsumed);
    parser.addFormula(effectivekWhReduced);
    parser.addFormula(CO2PerkWhElectricityConsumed);
    parser.addFormula(CO2PerkWhElectricityReduced);
    parser.addFormula(gasolinePoweredPassengerVehiclesPerYearEquivalentCO2Emissions);

    const result = parser.evaluate();

    // They rounded in the "equation" section of the spreadsheet, so percent error is a little higher
    expectPercentError(result, 2517015.87, 0.005);
  });
});
/*
    Impact Calculator Equation 7: Miles driven by the average gasoline-powered passenger vehicle Equivalent CO₂ Emissions
 */
describe("formula 7 evaluation", () => {
  it("should evaluate formula 7", () => {
    const parser = new FormulaParser(AVERT_AND_EGRID);
    parser.addFormula(annualPowerGeneration);
    parser.addFormula(CO2PerkWhConsumed);
    parser.addFormula(CO2PerkWhReduced);
    parser.addFormula(poundsOfCO2PerMWh);
    parser.addFormula(effectivekWhConsumed);
    parser.addFormula(effectivekWhReduced);
    parser.addFormula(CO2PerkWhElectricityConsumed);
    parser.addFormula(CO2PerkWhElectricityReduced);
    parser.addFormula(milesDrivenByTheAverageGasolinePoweredPassengerVehicleEquivalentCO2Emissions);

    const result = parser.evaluate();

    // They rounded in the "equation" section of the spreadsheet, so percent error is a little higher
    expectPercentError(result, 28977951977.55, 0.005);
  });
});
/*
    Impact Calculator Equation 8: Therms and Mcf of natural gas Equivalent CO₂ Emissions
 */
describe("thermsOfNaturalGasEquivalentCO2Emissions evaluation", () => {
  it("should evaluate thermsOfNaturalGasEquivalentCO2Emissions", () => {
    const parser = new FormulaParser(AVERT_AND_EGRID);
    parser.addFormula(annualPowerGeneration);
    parser.addFormula(CO2PerkWhConsumed);
    parser.addFormula(CO2PerkWhReduced);
    parser.addFormula(poundsOfCO2PerMWh);
    parser.addFormula(effectivekWhConsumed);
    parser.addFormula(effectivekWhReduced);
    parser.addFormula(CO2PerkWhElectricityConsumed);
    parser.addFormula(CO2PerkWhElectricityReduced);
    parser.addFormula(thermsOfNaturalGasEquivalentCO2Emissions);

    const result = parser.evaluate();

    // They rounded in the "equation" section of the spreadsheet, so percent error is a little higher
    expectPercentError(result, 2132339862.5, 0.005);
  });
});

describe("mcfOfNaturalGasEquivalentCO2Emissions evaluation", () => {
  it("should evaluate mcfOfNaturalGasEquivalentCO2Emissions", () => {
    const parser = new FormulaParser(AVERT_AND_EGRID);
    parser.addFormula(annualPowerGeneration);
    parser.addFormula(CO2PerkWhConsumed);
    parser.addFormula(CO2PerkWhReduced);
    parser.addFormula(poundsOfCO2PerMWh);
    parser.addFormula(effectivekWhConsumed);
    parser.addFormula(effectivekWhReduced);
    parser.addFormula(CO2PerkWhElectricityConsumed);
    parser.addFormula(CO2PerkWhElectricityReduced);
    parser.addFormula(mcfOfNaturalGasEquivalentCO2Emissions);

    const result = parser.evaluate();

    // They rounded in the "equation" section of the spreadsheet, so percent error is a little higher
    expectPercentError(result, 205107101.11, 0.005);
  });
});
/*
    Impact Calculator Equation 9: Barrels of oil consumed Equivalent CO₂ Emissions
 */
describe("formula 9 evaluation", () => {
  it("should evaluate formula 9", () => {
    const parser = new FormulaParser(AVERT_AND_EGRID);
    parser.addFormula(annualPowerGeneration);
    parser.addFormula(CO2PerkWhConsumed);
    parser.addFormula(CO2PerkWhReduced);
    parser.addFormula(poundsOfCO2PerMWh);
    parser.addFormula(effectivekWhConsumed);
    parser.addFormula(effectivekWhReduced);
    parser.addFormula(CO2PerkWhElectricityConsumed);
    parser.addFormula(CO2PerkWhElectricityReduced);
    parser.addFormula(barrelsOfOilConsumedEquivalentCO2Emissions);

    const result = parser.evaluate();

    // They rounded in the "equation" section of the spreadsheet, so percent error is a little higher
    expectPercentError(result, 26282328.54, 0.006);
  });
});
/*
    Impact Calculator Equation 10: Tanker trucks filled with gasoline Equivalent Emissions
 */
describe("formula 10 evaluation", () => {
  it("should evaluate formula 10", () => {
    const parser = new FormulaParser(AVERT_AND_EGRID);
    parser.addFormula(annualPowerGeneration);
    parser.addFormula(CO2PerkWhConsumed);
    parser.addFormula(CO2PerkWhReduced);
    parser.addFormula(poundsOfCO2PerMWh);
    parser.addFormula(effectivekWhConsumed);
    parser.addFormula(effectivekWhReduced);
    parser.addFormula(CO2PerkWhElectricityConsumed);
    parser.addFormula(CO2PerkWhElectricityReduced);
    parser.addFormula(tankerTrucksFilledWithGasolineEquivalentEmissions);

    const result = parser.evaluate();

    // They rounded in the "equation" section of the spreadsheet, so percent error is a little higher
    expectPercentError(result, 149608.17, 0.005);
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

/*
    Impact Calculator Equation 19: Pounds of coal burned
 */
describe("formula 19 evaluation", () => {
  it("should evaluate formula 19", () => {
    const parser = new FormulaParser(AVERT_AND_EGRID);
    parser.addFormula(annualPowerGeneration);
    parser.addFormula(CO2PerkWhConsumed);
    parser.addFormula(CO2PerkWhReduced);
    parser.addFormula(poundsOfCO2PerMWh);
    parser.addFormula(effectivekWhReduced);
    parser.addFormula(effectivekWhConsumed);
    parser.addFormula(electricityReductionsCO2Emissions);
    parser.addFormula(electricityConsumedCO2Emissions);
    parser.addFormula(poundsOfCoalBurned);

    const result = parser.evaluate();

    const expected = 12655544536.67;
    const percentError = 0.001;
    expect(result).toBeGreaterThanOrEqual(expected * (1 - percentError));
    expect(result).toBeLessThanOrEqual(expected * (1 + percentError));
  });
});

/*
    Impact Calculator Equation 20: Tons of waste recycled instead of landfilled
 */
describe("formula 20 evaluation", () => {
  it("should evaluate formula 20", () => {
    const parser = new FormulaParser(AVERT_AND_EGRID);
    parser.addFormula(annualPowerGeneration);
    parser.addFormula(CO2PerkWhConsumed);
    parser.addFormula(CO2PerkWhReduced);
    parser.addFormula(poundsOfCO2PerMWh);
    parser.addFormula(effectivekWhReduced);
    parser.addFormula(effectivekWhConsumed);
    parser.addFormula(electricityReductionsCO2Emissions);
    parser.addFormula(electricityConsumedCO2Emissions);
    parser.addFormula(tonsOfWasteRecycledInsteadOfLandfilled);

    const result = parser.evaluate();

    const expected = 3910519.47;
    const percentError = 0.001;
    expect(result).toBeGreaterThanOrEqual(expected * (1 - percentError));
    expect(result).toBeLessThanOrEqual(expected * (1 + percentError));
  });
});

/*
    Impact Calculator Equation 21: Number of garbage trucks of waste recycled instead of landfilled
 */
describe("formula 21 evaluation", () => {
  it("should evaluate formula 21", () => {
    const parser = new FormulaParser(AVERT_AND_EGRID);
    parser.addFormula(annualPowerGeneration);
    parser.addFormula(CO2PerkWhConsumed);
    parser.addFormula(CO2PerkWhReduced);
    parser.addFormula(poundsOfCO2PerMWh);
    parser.addFormula(effectivekWhReduced);
    parser.addFormula(effectivekWhConsumed);
    parser.addFormula(electricityReductionsCO2Emissions);
    parser.addFormula(electricityConsumedCO2Emissions);
    parser.addFormula(numberOfGarbageTrucksOfWasteRecycledInsteadOfLandfilled);

    const result = parser.evaluate();

    const expected = 558645.64;
    const percentError = 0.001;
    expect(result).toBeGreaterThanOrEqual(expected * (1 - percentError));
    expect(result).toBeLessThanOrEqual(expected * (1 + percentError));
  });
});