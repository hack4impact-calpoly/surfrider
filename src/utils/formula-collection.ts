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
  explanation:
    "Given an energy source, calculates the number of pounds of CO2 emitted by each kWh consumed by the energy source (based on EGRID data)",
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
  explanation: "Calculates the number of pounds of CO2 emissions per MWh of a given energy source",
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
  explanation: "Calculates the number of pounds of CO2 emissions that are reduced by the given energy source",
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

export const CO2PerkWhElectricityReduced: Formula = {
  id: "CO2PerkWhElectricityReduced",
  name: "CO2 per kWh of electricity reduced",
  explanation: "Calculates the metric tons of CO2 emissions displaced per kWh of reduced energy",
  assumptions: ["Same as electricityReductionsCO2Emissions"],
  sources: ["Same as electricityReductionsCO2Emissions"],
  expression:
    "(energyType == 0 and regional ? regionalPortfolioEEAvoidedCO2" +
    " : energyType == 0 ? nationalPortfolioEEAvoidedCO2 " +
    " : poundsOfCO2PerMWh) * 1 / 2204.60 * 0.001",
  unit: "metric tons CO2/kWh",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: [
    "energyType",
    "regional",
    "regionalPortfolioEEAvoidedCO2",
    "nationalPortfolioEEAvoidedCO2",
    "poundsOfCO2PerMWh",
  ],
};

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
  expression: "CO2PerkWhElectricityReduced * effectivekWhReduced",
  unit: "Metric tons Carbon Dioxide",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: ["CO2PerkWhElectricityReduced", "effectivekWhReduced"],
};

/*
    Impact Calculator Equation 3: Electricity consumed (kilowatt-hours) CO₂ Emissions
 */

export const CO2PerkWhElectricityConsumed: Formula = {
  id: "CO2PerkWhElectricityConsumed",
  name: "CO2 per kWh of electricity consumed",
  explanation: "Calculates the metric tons of CO2 produced per kWh",
  assumptions: ["Same as electricityConsumedCO2Emissions"],
  sources: ["Same as electricityConsumedCO2Emissions"],
  expression:
    "(regional ? regionalCaliforniaEmissionRateFromElectricityConsumed : nationalEmissionRateFromElectricityConsumed) * 1 / 2204.60 * 0.001",
  unit: "metric tons CO2/kWh",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: [
    "regional",
    "regionalCaliforniaEmissionRateFromElectricityConsumed",
    "nationalEmissionRateFromElectricityConsumed",
  ],
};

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
  expression: "CO2PerkWhElectricityConsumed * effectivekWhConsumed",
  unit: "Metric tons Carbon Dioxide",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: ["CO2PerkWhElectricityConsumed", "effectivekWhConsumed"],
};

/*
    Impact Calculator Equation 4: Gallons of gasoline Burned Equivalent CO₂ Emissions
 */
export const gallonsOfGasolineBurnedEquivalentCO2Emissions: Formula = {
  id: "gallonsOfGasolineBurnedEquivalentCO2Emissions",
  name: "Gallons of Gasoline Burned Equivalent CO2 Emissions",
  explanation:
    "to obtain the number of grams of CO₂ emitted per gallon of gasoline combusted, the heat content of the fuel per gallon can be multiplied by the kg CO₂ per heat content of the fuel.",
  assumptions: [
    "conversion factor of 8,887 grams of CO₂ emissions per gallon of gasoline consumed (Federal Register 2010).",
    "all the carbon in the gasoline is converted to CO₂ (IPCC 2006)",
    "Inherritted assumptions from CO₂ Emissions from Electricity Consumption and Reduction",
  ],
  sources: [
    "https://www.govinfo.gov/content/pkg/FR-2010-05-07/pdf/2010-8159.pdf",
    "https://www.ipcc-nggip.iges.or.jp/public/2006gl/vol2.html",
  ],
  expression:
    "(energyType == 0 ? effectivekWhConsumed : effectivekWhReduced) * (energyType == 0 ? CO2PerkWhElectricityConsumed : CO2PerkWhElectricityReduced) / 0.008887",
  unit: "Gallons of Gasoline Equivalent CO2 Emissions",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: [
    "energyType",
    "effectivekWhConsumed",
    "effectivekWhReduced",
    "CO2PerkWhElectricityConsumed",
    "CO2PerkWhElectricityReduced",
  ],
};

/*
    Impact Calculator Equation 5: Gallons of diesel consumed Equivalent CO₂ Emissions
 */
export const gallonsOfDieselConsumedEquivalentCO2Emissions: Formula = {
  id: "gallonsOfDieselConsumedEquivalentCO2Emission",
  name: "Gallons of Diesel Consumed Equivalent CO2 Emissions",
  explanation:
    "To obtain the number of grams of CO₂ emitted per gallon of diesel combusted, the heat content of the fuel per gallon can be multiplied by the kg CO₂ per heat content of the fuel.",
  assumptions: [
    "10,180 grams of CO₂ emissions per gallon of diesel consumed (Federal Register 2010)",
    "all the carbon in the diesel is converted to CO₂ (IPCC 2006).",
    "Inherritted assumptions from CO₂ Emissions from Electricity Consumption and Reduction",
  ],
  sources: [
    "https://www.govinfo.gov/content/pkg/FR-2010-05-07/pdf/2010-8159.pdf",
    "https://www.ipcc-nggip.iges.or.jp/public/2006gl/vol2.html",
  ],
  expression:
    "(energyType == 0 ? effectivekWhConsumed : effectivekWhReduced) * (energyType == 0 ? CO2PerkWhElectricityConsumed : CO2PerkWhElectricityReduced) / 0.01018",
  unit: "Gallons of Diesel Equivalent CO2 Emissions",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: [
    "energyType",
    "effectivekWhConsumed",
    "effectivekWhReduced",
    "CO2PerkWhElectricityConsumed",
    "CO2PerkWhElectricityReduced",
  ],
};
/*
    Impact Calculator Equation 6: Gasoline-powered passenger vehicles per year Equivalent CO₂ Emissions
 */
export const gasolinePoweredPassengerVehiclesPerYearEquivalentCO2Emissions: Formula = {
  id: "gasolinePoweredPassengerVehiclesPerYearEquivalentCO2Emissions",
  name: "Gasoline-powered passenger vehicles per year Equivalent CO2 Emissions",
  explanation:
    "To determine annual greenhouse gas emissions per passenger vehicle, the following methodology was used: VMT was divided by average gas mileage to determine gallons of gasoline consumed per vehicle per year." +
    "Gallons of gasoline consumed was multiplied by carbon dioxide per gallon of gasoline to determine carbon dioxide emitted per vehicle per year." +
    "Carbon dioxide emissions were then divided by the ratio of carbon dioxide emissions to total vehicle greenhouse gas emissions to account for vehicle methane and nitrous oxide emissions.",
  assumptions: [
    "Passenger vehicles are defined as 2-axle 4-tire vehicles, including passenger cars, vans, pickup trucks, and sport/utility vehicles",
    "In 2020, the weighted average combined fuel economy of cars and light trucks was 22.9 miles per gallon (FHWA 2021). ",
    "The average vehicle miles traveled (VMT) in 2019 was 11,520 miles per year (FHWA 2021)",
    "In 2019, the ratio of carbon dioxide emissions to total greenhouse gas emissions (including carbon dioxide, methane, and nitrous oxide, all expressed as carbon dioxide equivalents) for passenger vehicles was 0.993 (EPA 2022).",
    "Inherritted assumptions from CO₂ Emissions from Electricity Consumption and Reduction",
  ],
  sources: [
    "https://www.epa.gov/system/files/documents/2022-04/us-ghg-inventory-2022-chapter-3-energy.pdf",
    "https://www.fhwa.dot.gov/policyinformation/statistics/2020/vm1.cfm",
  ],
  expression:
    "(energyType == 0 ? effectivekWhConsumed : effectivekWhReduced) * (energyType == 0 ? CO2PerkWhElectricityConsumed : CO2PerkWhElectricityReduced) / (0.00889 * 11520 * 1 / 22.9 * 1 / 0.993)",
  unit: "Gasoline-powered passenger vehicles per year Equivalent CO₂ Emissions",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: [
    "energyType",
    "effectivekWhConsumed",
    "effectivekWhReduced",
    "CO2PerkWhElectricityConsumed",
    "CO2PerkWhElectricityReduced",
  ],
};
/*
    Impact Calculator Equation 7: Miles driven by the average gasoline-powered passenger vehicle Equivalent CO₂ Emissions
 */
export const milesDrivenByTheAverageGasolinePoweredPassengerVehicleEquivalentCO2Emissions: Formula = {
  id: "milesDrivenByTheAverageGasolinePoweredPassengerVehicleEquivalentCO2Emissions",
  name: "Miles driven by the average gasoline-powered passenger vehicle Equivalent CO2 Emissions",
  explanation:
    "To determine annual greenhouse gas emissions per mile: carbon dioxide emissions per gallon of gasoline were divided by the average fuel economy of vehicles to determine carbon dioxide emitted per mile traveled by a typical passenger vehicle." +
    "Carbon dioxide emissions were then divided by the ratio of carbon dioxide emissions to total vehicle greenhouse gas emissions to account for vehicle methane and nitrous oxide emissions.",
  assumptions: [
    "Passenger vehicles are defined as 2-axle 4-tire vehicles, including passenger cars, vans, pickup trucks, and sport/utility vehicles.",
    "In 2020, the weighted average combined fuel economy of cars and light trucks was 22.9 miles per gallon (FHWA 2021).",
    "In 2020, the ratio of carbon dioxide emissions to total greenhouse gas emissions (including carbon dioxide, methane, and nitrous oxide, all expressed as carbon dioxide equivalents) for passenger vehicles was 0.993 (EPA 2022).",
    "Inherritted assumptions from CO₂ Emissions from Electricity Consumption and Reduction",
  ],
  sources: [
    "https://www.epa.gov/system/files/documents/2022-04/us-ghg-inventory-2022-chapter-3-energy.pdf",
    "https://www.fhwa.dot.gov/policyinformation/statistics/2020/vm1.cfm",
  ],
  expression:
    "(energyType == 0 ? effectivekWhConsumed : effectivekWhReduced) * (energyType == 0 ? CO2PerkWhElectricityConsumed : CO2PerkWhElectricityReduced) / (0.00889 * 1 / 22.9 * 1 / 0.993)",
  unit: "Miles driven by the average gasoline-powered passenger vehicle Equivalent CO₂ Emissions",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: [
    "energyType",
    "effectivekWhConsumed",
    "effectivekWhReduced",
    "CO2PerkWhElectricityConsumed",
    "CO2PerkWhElectricityReduced",
  ],
};
/*
    Impact Calculator Equation 8: Therms and Mcf of natural gas Equivalent CO₂ Emissions
 */
export const thermsOfNaturalGasEquivalentCO2Emissions: Formula = {
  id: "thermsOfNaturalGasEquivalentCO2Emissions",
  name: "Therms of natural gas Equivalent CO2 Emissions",
  explanation:
    "Carbon dioxide emissions per therm are determined by converting million British thermal units (mmbtu) to therms, then multiplying the carbon coefficient times the fraction oxidized times the ratio of the molecular weight of carbon dioxide to carbon (44/12)." +
    "it represents the CO₂ equivalency of CO₂ released for natural gas burned as a fuel, not natural gas released to the atmosphere. Direct methane emissions released to the atmosphere (without burning) are about 25 times more powerful than CO₂ in terms of their warming effect on the atmosphere.",
  assumptions: [
    "0.1 mmbtu equals one therm (EIA 2021). The average carbon coefficient of pipeline natural gas burned in 2020 is 14.43 kg carbon per mmbtu (EPA 2022). The fraction oxidized to CO₂ is assumed to be 100 percent (IPCC 2006).",
    "Carbon dioxide emissions per therm can be converted to carbon dioxide emissions per thousand cubic feet (Mcf) using the average heat content of natural gas in 2020, 10.38 therms/Mcf (EIA 2021).",
    "Inherritted assumptions from CO₂ Emissions from Electricity Consumption and Reduction",
  ],
  sources: [
    "https://www.eia.gov/totalenergy/data/monthly/archive/00352011.pdf",
    "https://www.eia.gov/tools/faqs/faq.php?id=45&t=8",
    "https://www.epa.gov/system/files/documents/2022-04/us-ghg-inventory-2022-annexes.pdf",
    "https://www.ipcc-nggip.iges.or.jp/public/2006gl/vol2.html",
  ],
  expression:
    "(energyType == 0 ? effectivekWhConsumed : effectivekWhReduced) * (energyType == 0 ? CO2PerkWhElectricityConsumed : CO2PerkWhElectricityReduced) / (0.1 * 14.43 * (44 / 12) * 1 / 1000)",
  unit: "therm of natural gas burned as fuel Equivalent emissions ",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: [
    "energyType",
    "effectivekWhConsumed",
    "effectivekWhReduced",
    "CO2PerkWhElectricityConsumed",
    "CO2PerkWhElectricityReduced",
  ],
};

export const mcfOfNaturalGasEquivalentCO2Emissions: Formula = {
  id: "mcfOfNaturalGasEquivalentCO2Emissions",
  name: "Mcf of natural gas Equivalent CO2 Emissions",
  explanation:
    "Carbon dioxide emissions per therm are determined by converting million British thermal units (mmbtu) to therms, then multiplying the carbon coefficient times the fraction oxidized times the ratio of the molecular weight of carbon dioxide to carbon (44/12)." +
    "it represents the CO₂ equivalency of CO₂ released for natural gas burned as a fuel, not natural gas released to the atmosphere. Direct methane emissions released to the atmosphere (without burning) are about 25 times more powerful than CO₂ in terms of their warming effect on the atmosphere.",
  assumptions: [
    "0.1 mmbtu equals one therm (EIA 2021). The average carbon coefficient of pipeline natural gas burned in 2020 is 14.43 kg carbon per mmbtu (EPA 2022). The fraction oxidized to CO₂ is assumed to be 100 percent (IPCC 2006).",
    "Carbon dioxide emissions per therm can be converted to carbon dioxide emissions per thousand cubic feet (Mcf) using the average heat content of natural gas in 2020, 10.38 therms/Mcf (EIA 2021).",
    "Inherritted assumptions from CO₂ Emissions from Electricity Consumption and Reduction",
  ],
  sources: [
    "https://www.eia.gov/totalenergy/data/monthly/archive/00352011.pdf",
    "https://www.eia.gov/tools/faqs/faq.php?id=45&t=8",
    "https://www.epa.gov/system/files/documents/2022-04/us-ghg-inventory-2022-annexes.pdf",
    "https://www.ipcc-nggip.iges.or.jp/public/2006gl/vol2.html",
  ],
  expression:
    "(energyType == 0 ? effectivekWhConsumed : effectivekWhReduced) * (energyType == 0 ? CO2PerkWhElectricityConsumed : CO2PerkWhElectricityReduced) / ((0.1 * 14.43 * (44 / 12) * 1 / 1000) * 10.38)",
  unit: "Mcf of natural gas burned as fuel Equivalent emissions",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: [
    "energyType",
    "effectivekWhConsumed",
    "effectivekWhReduced",
    "CO2PerkWhElectricityConsumed",
    "CO2PerkWhElectricityReduced",
  ],
};
/*
    Impact Calculator Equation 9: Barrels of oil consumed Equivalent CO₂ Emissions
 */
export const barrelsOfOilConsumedEquivalentCO2Emissions: Formula = {
  id: "barrelsOfOilConsumedEquivalentCO2Emissions",
  name: "Barrels of oil consumed Equivalent CO2 Emissions",
  explanation:
    "Carbon dioxide emissions per barrel of crude oil are determined by multiplying heat content times the carbon coefficient times the fraction oxidized times the ratio of the molecular weight of carbon dioxide to that of carbon (44/12).",
  assumptions: [
    "The average heat content of crude oil is 5.80 mmbtu per barrel (EPA 2022).",
    "The average carbon coefficient of crude oil is 20.33 kg carbon per mmbtu (EPA 2022).",
    "The fraction oxidized is assumed to be 100 percent (IPCC 2006).",
    "Inherritted assumptions from CO₂ Emissions from Electricity Consumption and Reduction",
  ],
  sources: [
    "https://www.epa.gov/system/files/documents/2022-04/us-ghg-inventory-2022-annexes.pdf",
    "https://www.ipcc-nggip.iges.or.jp/public/2006gl/vol2.html",
  ],
  expression:
    "(energyType == 0 ? effectivekWhConsumed : effectivekWhReduced) * (energyType == 0 ? CO2PerkWhElectricityConsumed : CO2PerkWhElectricityReduced) / (5.8 * 20.33 * (44 / 12) * 1 / 1000)",
  unit: "Barrels of oil burned equivalent emissions",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: [
    "energyType",
    "effectivekWhConsumed",
    "effectivekWhReduced",
    "CO2PerkWhElectricityConsumed",
    "CO2PerkWhElectricityReduced",
  ],
};

/*
    Impact Calculator Equation 10: Tanker trucks filled with gasoline Equivalent Emissions
 */
export const tankerTrucksFilledWithGasolineEquivalentEmissions: Formula = {
  id: "tankerTrucksFilledWithGasolineEquivalentEmissions",
  name: "Tanker trucks filled with gasoline Equivalent Emissions",
  explanation: "Calculates how many tanker trucks worth of gasoline burned would produce equivalent emissions",
  assumptions: [
    "A barrel equals 42 gallons",
    "A typical gasoline tanker truck contains 8,500 gallons.",
    "Inherritted assumptions from CO₂ Emissions from Electricity Consumption and Reduction.",
  ],
  sources: [
    "https://www.epa.gov/system/files/documents/2022-04/us-ghg-inventory-2022-annexes.pdf",
    "https://www.govinfo.gov/content/pkg/FR-2010-05-07/pdf/2010-8159.pdf",
    "https://www.ipcc-nggip.iges.or.jp/public/2006gl/vol2.html",
  ],
  expression:
    "(energyType == 0 ? effectivekWhConsumed : effectivekWhReduced) * (energyType == 0 ? CO2PerkWhElectricityConsumed : CO2PerkWhElectricityReduced) / (8.89 * 0.001 * 8500)",
  unit: "Tanker Trucks of gas burned equivalent emissions",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: [
    "energyType",
    "effectivekWhConsumed",
    "effectivekWhReduced",
    "CO2PerkWhElectricityConsumed",
    "CO2PerkWhElectricityReduced",
  ],
};
