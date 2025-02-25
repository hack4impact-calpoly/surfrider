import { Formula } from "@/schema/formula";

// This should all be gotten from the EGRID and AVERT databases
export const AVERT_AND_EGRID = {
  // energyType value map is as follows:
  // Consumed is 0, Onshore Wind is 1, Offshore Wind is 2, Utility PV is 3, Distributed PV is 4, Portfolio EE is 5, Uniform EE is 6
  // This is E2 on the spreadsheet
  energyType: 2,
  regional: 1, // 1 for regional, 0 for national

  kWInstalledCapacity: 5882000,
  capacityFactor: 0.51,

  nationalEmissionRateFromElectricityConsumed: 823.15,
  regionalCaliforniaEmissionRateFromElectricityConsumed: 455.94,

  regionalOnshoreWindAvoidedCO2: 946.5,
  nationalOnshoreWindAvoidedCO2: 1308,

  regionalOffshoreWindAvoidedCO2: 948.1,
  nationalOffshoreWindAvoidedCO2: 1228,

  regionalUtilityPVAvoidedCO2: 949.4,
  nationalUtilityPVAvoidedCO2: 1347,

  regionalDistributedPVAvoidedCO2: 1039.6,
  nationalDistributedPVAvoidedCO2: 1449,

  regionalPortfolioEEAvoidedCO2: 1058,
  nationalPortfolioEEAvoidedCO2: 1455,

  regionalUniformEEAvoidedCO2: 1037,
  nationalUniformEEAvoidedCO2: 1429,
};

/*
    Impact Calculator Equation 1: Conversion between Electricity Consumed and Reduced
 */

// This is representative of the user input calculation, which is required for conversionBetweenElectricityConsumedAndReduced
// Figured it would be useful to have in formula form for evaluation of user inputs
export const annualPowerGeneration: Formula = {
  id: "annualPowerGeneration",
  name: "Annual Power Generation",
  explanation: "Takes user input of kW installed capacity and capacity factor, and calculates annual power generation",
  assumptions: [""],
  sources: ["User input"],
  expression: "kWInstalledCapacity * capacityFactor * 8760",
  unit: "",
  setupScope: () => {},
  dependencies: ["kWInstalledCapacity", "capacityFactor"],
};

export const CO2PerkWhConsumed: Formula = {
  id: "CO2PerkWhConsumed",
  name: "CO2 per kilowatt-hour consumed",
  explanation: "",
  assumptions: [""],
  sources: [""],
  expression:
    "energyType == 0 and regional ? regionalCaliforniaEmissionRateFromElectricityConsumed : nationalEmissionRateFromElectricityConsumed",
  unit: "CO2/kWh-Consumed",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  // In case you want to add energyType and regional using setupScope, do this
  // I don't recommend this because it breaks all the tests
  // Also much harder to maintain, they should be in inputVariables in my opinion
  // setupScope: ((addVariable: (name: string, value: number | (() => number)) => void) => {
  //   addVariable("energyType", 2);
  //   addVariable("regional", 1); // 1 for regional, 0 for national
  // }) as (...args: unknown[]) => void,
  dependencies: [
    "regionalCaliforniaEmissionRateFromElectricityConsumed",
    "nationalEmissionRateFromElectricityConsumed",
  ],
};

export const poundsOfCO2PerMWh: Formula = {
  id: "poundsOfCO2PerMWh",
  name: "Pounds of CO2/MWh Emission Rate",
  explanation: "",
  assumptions: [""],
  sources: [""],
  expression:
    "energyType == 1 and regional ? regionalOnshoreWindAvoidedCO2" +
    " : energyType == 1 ? nationalOnshoreWindAvoidedCO2" +
    " : energyType == 2 and regional ? regionalOffshoreWindAvoidedCO2" +
    " : energyType == 2 ? nationalOffshoreWindAvoidedCO2" +
    " : energyType == 3 and regional ? regionalUtilityPVAvoidedCO2" +
    " : energyType == 3 ? nationalUtilityPVAvoidedCO2" +
    " : energyType == 4 and regional ? regionalDistributedPVAvoidedCO2" +
    " : energyType == 4 ? nationalDistributedPVAvoidedCO2" +
    " : energyType == 5 and regional ? regionalPortfolioEEAvoidedCO2" +
    " : energyType == 5 ? nationalPortfolioEEAvoidedCO2" +
    " : energyType == 6 and regional ? regionalUniformEEAvoidedCO2" +
    " : energyType == 6 ? nationalUniformEEAvoidedCO2" +
    " : energyType == 0 and regional ? regionalCaliforniaEmissionRateFromElectricityConsumed" +
    " : energyType == 0 ? nationalEmissionRateFromElectricityConsumed : 0",
  unit: "",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: [
    "regionalOnshoreWindAvoidedCO2",
    "nationalOnshoreWindAvoidedCO2",
    "regionalOffshoreWindAvoidedCO2",
    "nationalOffshoreWindAvoidedCO2",
    "regionalUtilityPVAvoidedCO2",
    "nationalUtilityPVAvoidedCO2",
    "regionalDistributedPVAvoidedCO2",
    "nationalDistributedPVAvoidedCO2",
    "regionalPortfolioEEAvoidedCO2",
    "nationalPortfolioEEAvoidedCO2",
    "regionalUniformEEAvoidedCO2",
    "nationalUniformEEAvoidedCO2",
    "regionalCaliforniaEmissionRateFromElectricityConsumed",
    "nationalEmissionRateFromElectricityConsumed",
  ],
};

export const CO2PerkWhReduced: Formula = {
  id: "CO2PerkWhReduced",
  name: "CO2 per kilowatt-hour reduced",
  explanation: "",
  assumptions: [""],
  sources: [""],
  expression:
    "energyType == 0 and regional ? regionalPortfolioEEAvoidedCO2" +
    " : energyType == 0 ? nationalPortfolioEEAvoidedCO2" +
    " : poundsOfCO2PerMWh",
  unit: "",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: ["regionalPortfolioEEAvoidedCO2", "nationalPortfolioEEAvoidedCO2", "poundsOfCO2PerMWh"],
};

export const effectivekWhReduced: Formula = {
  id: "effectivekWhReduced",
  name: "Conversion between Electricity Consumed and Reduced",
  explanation: "Calculates the relationship between consumed and reduced emissions from RE sources",
  assumptions: ["Inherited assumptions from CO₂ Emissions from Electricity Consumption and Reduction"],
  sources: ["Inherited sources from the below two equations"],
  expression:
    "energyType == 0 ? annualPowerGeneration * (CO2PerkWhConsumed / CO2PerkWhReduced) : annualPowerGeneration",
  unit: "",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: ["annualPowerGeneration", "CO2PerkWhConsumed", "CO2PerkWhReduced"],
};

export const effectivekWhConsumed: Formula = {
  id: "effectivekWhConsumed",
  name: "Conversion between Electricity Consumed and Reduced",
  explanation: "Calculates the relationship between consumed and reduced emissions from RE sources",
  assumptions: ["Inherited assumptions from CO₂ Emissions from Electricity Consumption and Reduction"],
  sources: ["Inherited sources from the below two equations"],
  expression:
    "energyType == 0 ? annualPowerGeneration : annualPowerGeneration / (CO2PerkWhConsumed / CO2PerkWhReduced)",
  unit: "",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: ["annualPowerGeneration", "CO2PerkWhConsumed", "CO2PerkWhReduced"],
};

/*
    Impact Calculator Equation 2: Electricity Reductions (kilowatt-hours) CO2 Emissions
 */
export const electricityReductionsCO2Emissions: Formula = {
  id: "electricityReductionsCO2Emissions",
  name: "Electricity reductions (kilowatt-hours) CO2 Emissions",
  explanation:
    "Uses the Avoided Emissions and geneRation Tool (AVERT) U.S. national weighted average CO₂ marginal emission rate to convert reductions of kilowatt-hours into avoided units of CO₂ emissions",
  assumptions: [
    "Calculating the emission impacts of EE and RE on the electricity grid requires estimating the amount of fossil-fired generation and emissions being displaced by EE and RE.",
    "EE and RE programs are not generally assumed to affect baseload power plants that run all the time, but rather marginal power plants that are brought online as necessary to meet demand.",
    "This calculation does not include any greenhouse gases other than CO₂.",
    "This calculation includes line losses.",
    "AVERT, U.S. national weighted average CO₂ marginal emission rate, year 2019 data",
  ],
  sources: ["https://www.epa.gov/avert"],
  expression:
    "(energyType == 0 and regional ? regionalPortfolioEEAvoidedCO2" +
    " : energyType == 0 ? nationalPortfolioEEAvoidedCO2 " +
    " : poundsOfCO2PerMWh) * 1 / 2204.60 * 0.001 * effectivekWhReduced",
  unit: "Metric tons Carbon Dioxide",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: [
    "regionalPortfolioEEAvoidedCO2",
    "nationalPortfolioEEAvoidedCO2",
    "poundsOfCO2PerMWh",
    "effectivekWhReduced",
  ],
};

/*
    Impact Calculator Equation 3: Electricity consumed (kilowatt-hours) CO₂ Emissions
 */
export const electricityConsumedCO2Emissions: Formula = {
  id: "electricityConsumedCO2Emissions",
  name: "Electricity consumed (kilowatt-hours) CO₂ Emissions",
  explanation:
    "Uses the eGRID U.S. national annual average CO₂ output rate to convert kilowatt-hours of energy use into units of carbon dioxide emissions. Produces the equivalencies associated with greenhouse gas emissions associated with electricity consumed, not reduced.",
  assumptions: [
    "a national average emissions factor",
    "This calculation does not include any greenhouse gases other than CO₂.",
    "This calculation includes line losses.",
    "eGRID, U.S. annual CO₂ total output emission rate [lb/MWh], year 2019 data",
  ],
  sources: [
    "https://www.eia.gov/outlooks/aeo/data/browser/#/?id=4-AEO2020&sourcekey=0",
    "https://www.eia.gov/outlooks/aeo/data/browser/#/?id=8-AEO2020&cases=ref2020&sourcekey=0",
    "https://www.epa.gov/egrid",
  ],
  expression:
    "(regional ? regionalCaliforniaEmissionRateFromElectricityConsumed : nationalEmissionRateFromElectricityConsumed) * 1 / 2204.60 * 0.001 * effectivekWhConsumed",
  unit: "Metric tons Carbon Dioxide",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: [
    "regionalPortfolioEEAvoidedCO2",
    "nationalPortfolioEEAvoidedCO2",
    "poundsOfCO2PerMWh",
    "effectivekWhConsumed",
  ],
};

/*
    Impact Calculator Equation 4: Gallons of gasoline Burned Equivalent CO₂ Emissions
 */

/*
    Impact Calculator Equation 5: Gallons of diesel consumed Equivalent CO₂ Emissions
 */
/*
    Impact Calculator Equation 6: Gasoline-powered passenger vehicles per year Equivalent CO₂ Emissions
 */
/*
    Impact Calculator Equation 7: Miles driven by the average gasoline-powered passenger vehicle Equivalent CO₂ Emissions
 */
/*
    Impact Calculator Equation 8: Therms and Mcf of natural gas Equivalent CO₂ Emissions
 */
/*
    Impact Calculator Equation 9: Barrels of oil consumed Equivalent CO₂ Emissions
 */
/*
    Impact Calculator Equation 10: Tanker trucks filled with gasoline Equivalent Emissions
 */
