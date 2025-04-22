import { Formula } from "@/schema/formula";

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
  expression: "installedCapacity * capacityFactor * 8760",
  unit: "",
  setupScope: () => {},
  dependencies: ["installedCapacity", "capacityFactor"],
};

export const CO2PerkWhConsumed: Formula = {
  id: "CO2PerkWhConsumed",
  name: "CO2 per kilowatt-hour consumed",
  explanation:
    "Given an energy source, calculates the number of pounds of CO2 emitted by each kWh consumed by the energy source (based on EGRID data)",
  assumptions: [""],
  sources: [""],
  // TODO: Double check if regional vs. national depends on power plant class being consumed?
  expression: "annualCo2TotalOutputEmissionRateLbMwh",
  unit: "CO2/kWh-Consumed",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  // In case you want to add powerPlantClass and location using setupScope, do this
  // I don't recommend this because it breaks all the tests
  // Also much harder to maintain, they should be in inputVariables in my opinion
  // setupScope: ((addVariable: (name: string, value: number | (() => number)) => void) => {
  //   addVariable("powerPlantClass", 2);
  //   addVariable("location", 1); // 1 for location, 0 for national
  // }) as (...args: unknown[]) => void,
  dependencies: ["annualCo2TotalOutputEmissionRateLbMwh"],
};

export const poundsOfCO2PerMWh: Formula = {
  id: "poundsOfCO2PerMWh",
  name: "Pounds of CO2/MWh Emission Rate",
  explanation: "Calculates the number of pounds of CO2 emissions per MWh of a given energy source",
  assumptions: [""],
  sources: [""],
  expression: "powerPlantClass == 0 ? annualCo2TotalOutputEmissionRateLbMwh : avoidedCo2EmissionRateLbMwh",
  unit: "",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: ["annualCo2TotalOutputEmissionRateLbMwh", "avoidedCo2EmissionRateLbMwh"],
};

export const CO2PerkWhReduced: Formula = {
  id: "CO2PerkWhReduced",
  name: "CO2 per kilowatt-hour reduced",
  explanation: "Calculates the number of pounds of CO2 emissions that are reduced by the given energy source",
  assumptions: [""],
  sources: [""],
  // expression:
  //   "powerPlantClass == 0 and location ? regionalPortfolioEEAvoidedCO2" +
  //   " : powerPlantClass == 0 ? nationalPortfolioEEAvoidedCO2" +
  //   " : poundsOfCO2PerMWh",
  // TODO: Not sure if this makes sense because the original formula above pulls
  // the portfolio EE emissions rate if the power plant class is consumed
  expression: "powerPlantClass == 0 ? avoidedCo2EmissionRateLbMwh : poundsOfCO2PerMWh",
  unit: "",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: ["powerPlantClass", "avoidedCo2EmissionRateLbMwh", "poundsOfCO2PerMWh"],
};

export const effectivekWhReduced: Formula = {
  id: "effectivekWhReduced",
  name: "Conversion between Electricity Consumed and Reduced",
  explanation: "Calculates the relationship between consumed and reduced emissions from RE sources",
  assumptions: ["Inherited assumptions from CO₂ Emissions from Electricity Consumption and Reduction"],
  sources: ["Inherited sources from the below two equations"],
  expression:
    "powerPlantClass == 0 ? annualPowerGeneration * (CO2PerkWhConsumed / CO2PerkWhReduced) : annualPowerGeneration",
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
    "powerPlantClass == 0 ? annualPowerGeneration : annualPowerGeneration / (CO2PerkWhConsumed / CO2PerkWhReduced)",
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
  expression: "CO2PerkWhReduced * 1 / 2204.60 * 0.001",
  unit: "metric tons CO2/kWh",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: ["CO2PerkWhReduced"],
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
  expression: "annualCo2TotalOutputEmissionRateLbMwh * 1 / 2204.60 * 0.001",
  unit: "metric tons CO2/kWh",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: ["annualCo2TotalOutputEmissionRateLbMwh"],
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
    "(powerPlantClass == 0 ? effectivekWhConsumed : effectivekWhReduced) * (powerPlantClass == 0 ? CO2PerkWhElectricityConsumed : CO2PerkWhElectricityReduced) / 0.008887",
  unit: "Gallons of Gasoline Equivalent CO2 Emissions",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: [
    "powerPlantClass",
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
    "(powerPlantClass == 0 ? effectivekWhConsumed : effectivekWhReduced) * (powerPlantClass == 0 ? CO2PerkWhElectricityConsumed : CO2PerkWhElectricityReduced) / 0.01018",
  unit: "Gallons of Diesel Equivalent CO2 Emissions",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: [
    "powerPlantClass",
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
    "(powerPlantClass == 0 ? effectivekWhConsumed : effectivekWhReduced) * (powerPlantClass == 0 ? CO2PerkWhElectricityConsumed : CO2PerkWhElectricityReduced) / (0.00889 * 11520 * 1 / 22.9 * 1 / 0.993)",
  unit: "Gasoline-powered passenger vehicles per year Equivalent CO₂ Emissions",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: [
    "powerPlantClass",
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
    "(powerPlantClass == 0 ? effectivekWhConsumed : effectivekWhReduced) * (powerPlantClass == 0 ? CO2PerkWhElectricityConsumed : CO2PerkWhElectricityReduced) / (0.00889 * 1 / 22.9 * 1 / 0.993)",
  unit: "Miles driven by the average gasoline-powered passenger vehicle Equivalent CO₂ Emissions",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: [
    "powerPlantClass",
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
    "(powerPlantClass == 0 ? effectivekWhConsumed : effectivekWhReduced) * (powerPlantClass == 0 ? CO2PerkWhElectricityConsumed : CO2PerkWhElectricityReduced) / (0.1 * 14.43 * (44 / 12) * 1 / 1000)",
  unit: "therm of natural gas burned as fuel Equivalent emissions ",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: [
    "powerPlantClass",
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
    "(powerPlantClass == 0 ? effectivekWhConsumed : effectivekWhReduced) * (powerPlantClass == 0 ? CO2PerkWhElectricityConsumed : CO2PerkWhElectricityReduced) / ((0.1 * 14.43 * (44 / 12) * 1 / 1000) * 10.38)",
  unit: "Mcf of natural gas burned as fuel Equivalent emissions",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: [
    "powerPlantClass",
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
    "(powerPlantClass == 0 ? effectivekWhConsumed : effectivekWhReduced) * (powerPlantClass == 0 ? CO2PerkWhElectricityConsumed : CO2PerkWhElectricityReduced) / (5.8 * 20.33 * (44 / 12) * 1 / 1000)",
  unit: "Barrels of oil burned equivalent emissions",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: [
    "powerPlantClass",
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
    "(powerPlantClass == 0 ? effectivekWhConsumed : effectivekWhReduced) * (powerPlantClass == 0 ? CO2PerkWhElectricityConsumed : CO2PerkWhElectricityReduced) / (8.89 * 0.001 * 8500)",
  unit: "Tanker Trucks of gas burned equivalent emissions",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: [
    "powerPlantClass",
    "effectivekWhConsumed",
    "effectivekWhReduced",
    "CO2PerkWhElectricityConsumed",
    "CO2PerkWhElectricityReduced",
  ],
};

/*
    Impact Calculator Equation 11: Number of incandescent bulbs switched to light-emitting diode bulbs in operation for a year emissions saved Equivalent Emissions
 */
export const numberOfIncandescentBulbsSwitchedToLightEmittingDiodeBulbsInOperationForAYearEmissionsSavedEquivalentEmissions: Formula =
  {
    id: "numberOfIncandescentBulbsSwitchedToLightEmittingDiodeBulbsInOperationForAYearEmissionsSavedEquivalentEmissions",
    name: "Number of incandescent bulbs switched to light-emitting diode bulbs in operation for a year emissions saved Equivalent Emissions",
    explanation:
      "Annual energy consumed by a light bulb is calculated by multiplying the power (43 watts) by the average daily use (3 hours/day) by the number of days per year (365)." +
      "Carbon dioxide emissions reduced per light bulb switched from an incandescent bulb to a light-emitting diode bulb are calculated by multiplying annual energy savings by the national weighted average carbon dioxide marginal emission rate for delivered electricity.",
    assumptions: [
      "A 9 watt light-emitting diode (LED) bulb produces the same light output as a 43 watt incandescent light bulb (EPA 2019)",
      "average daily use of 3 hours per day",
      "The national weighted average carbon dioxide marginal emission rate for delivered electricity in 2019 was 1,562.4 lbs CO₂ per megawatt-hour, which accounts for losses during transmission and distribution (EPA 2020)",
      "Does not account for emissions of bulb production or waste",
      "Inherritted assumptions from CO₂ Emissions from Electricity Consumption and Reduction",
    ],
    sources: [
      "https://www.epa.gov/avert/download-avert",
      "EPA (2019). Savings Calculator for ENERGY STAR Qualified Light Bulbs. U.S. Environmental Protection Agency, Washington, DC.",
    ],
    expression:
      "(powerPlantClass == 0 ? electricityConsumedCO2Emissions" +
      " : electricityReductionsCO2Emissions) / (((43 - 9) * 3 * 365 / 1000) * 1562.4 / 1000 / 2204.6)",
    unit: "Bulbs replaced operating for a year saved equivalent emissions",
    setupScope: (() => {}) as (...args: unknown[]) => void,
    dependencies: ["electricityConsumedCO2Emissions", "electricityReductionsCO2Emissions"],
  };

/*
    Impact Calculator Equation 12: Home yearly electricity use Equivalent Emissions
 */

// intermediate formula for yearly home emissions
export const metricTonsOfCO2PerHomePerYear: Formula = {
  id: "metricTonsOfCO2PerHomePerYear",
  name: "Metric tons of CO2 per home per year",
  explanation: "Calculates the yearly home metric tons of CO2 emissions",
  assumptions: [""],
  sources: [""],
  expression: "11880 * 884.2 / (1 - 0.073) / 1000 / 2204.6",
  unit: "metric tons CO2/home/year",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: [],
};

export const homeYearlyElectricityUseEquivalentEmissions: Formula = {
  id: "homeYearlyElectricityUseEquivalentEmissions",
  name: "Home yearly electricity use Equivalent Emissions",
  explanation:
    "Annual home electricity consumption was multiplied by the carbon dioxide emission rate (per unit of electricity delivered) to determine annual carbon dioxide emissions per home.",
  assumptions: [
    "In 2019, 120.9 million homes in the United States consumed 1,437 billion kilowatt-hours (kWh) of electricity (EIA 2020a).",
    "On average, each home consumed 11,880 kWh of delivered electricity (EIA 2020a).",
    "The national average carbon dioxide output rate for electricity generated in 2019 was 884.2 lbs CO₂ per megawatt-hour (EPA 2021), ",
    "assuming transmission and distribution losses of 7.3% (EIA 2020b; EPA 2021).1, above translates to about 953.7 lbs CO₂ per megawatt-hour for delivered electricity, ",
    "Inherritted assumptions from CO₂ Emissions from Electricity Consumption and Reduction",
  ],
  sources: [
    "https://www.eia.gov/outlooks/aeo/data/browser/#/?id=4-AEO2020&sourcekey=0",
    "https://www.eia.gov/outlooks/aeo/data/browser/#/?id=8-AEO2020&cases=ref2020&sourcekey=0",
    "https://www.epa.gov/energy/emissions-generation-resource-integrated-database-egrid",
    "https://www.epa.gov/system/files/documents/2022-04/us-ghg-inventory-2022-annexes.pdf",
  ],
  expression:
    "(powerPlantClass == 0 ? electricityConsumedCO2Emissions" +
    " : electricityReductionsCO2Emissions) / metricTonsOfCO2PerHomePerYear",
  unit: "Homes of yearly equivalent emissions",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: [
    "electricityConsumedCO2Emissions",
    "electricityReductionsCO2Emissions",
    "metricTonsOfCO2PerHomePerYear",
  ],
};

/*
    Impact Calculator Equation 13: Home yearly total energy use Equivalent Emissions
 */
export const homeYearlyTotalEnergyUseEquivalentEmissions: Formula = {
  id: "homeYearlyTotalEnergyUseEquivalentEmissions",
  name: "Home yearly total energy use Equivalent Emissions",
  explanation:
    "Total home electricity, natural gas, distillate fuel oil, and propane consumption figures were converted from their various units to metric tons of CO₂ and added together to obtain total CO₂ emissions per home.",
  assumptions: [
    "In 2019, there were 120.9 million homes in the United States (EIA 2020a).",
    "On average, each home consumed 11,880 kWh of delivered electricity (EIA 2020a).",
    "Nationwide household consumption of natural gas, propane, and fuel oil totaled 5.23, 0.46, and 0.45 quadrillion Btu, respectively, in 2019 (EIA 2020a).",
    "Averaged across households in the United States, this amounts to 41,590 cubic feet of natural gas, 42 gallons of propane, and 25.6 gallons of fuel oil per home.",
    "The national average carbon dioxide output rate for electricity generated in 2019 was 884.2 lbs CO₂ per megawatt-hour (EPA 2021), ",
    "assuming transmission and distribution losses of 7.3% (EIA 2020b; EPA 2021).1, above translates to about 953.7 lbs CO₂ per megawatt-hour for delivered electricity, ",
    "The average carbon dioxide coefficient of natural gas is 0.0550 kg CO₂ per cubic foot (EIA 2022). The fraction oxidized to CO₂ is 100 percent (IPCC 2006).",
    "The average carbon dioxide coefficient of distillate fuel oil is 426.10 kg CO₂ per 42-gallon barrel (EPA 2022). The fraction oxidized to CO₂ is 100 percent (IPCC 2006).",
    "The average carbon dioxide coefficient of propane is 235.0 kg CO₂ per 42-gallon barrel (EPA 2022). The fraction oxidized is 100 percent (IPCC 2006).",
    "Inherritted assumptions from CO₂ Emissions from Electricity Consumption and Reduction",
  ],
  sources: [
    "https://www.eia.gov/outlooks/aeo/excel/aeotab_4.xlsx",
    "https://www.eia.gov/outlooks/aeo/excel/aeotab_8.xlsx",
    "https://www.eia.gov/totalenergy/data/monthly/pdf/sec12_5.pdf",
    "https://www.epa.gov/energy/emissions-generation-resource-integrated-database-egrid",
    "https://www.epa.gov/system/files/documents/2022-04/us-ghg-inventory-2022-annexes.pdf",
    "https://www.ipcc-nggip.iges.or.jp/public/2006gl/vol2.html",
  ],
  expression:
    "(powerPlantClass == 0 ? electricityConsumedCO2Emissions" +
    " : electricityReductionsCO2Emissions) / (metricTonsOfCO2PerHomePerYear" +
    " + (41590 * .0550 / 1000) + (235 / 1000) + (27 / 42 * 426.1 / 1000))",
  unit: "Homes total energy use per year equivalent emissions",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: [
    "electricityConsumedCO2Emissions",
    "electricityReductionsCO2Emissions",
    "metricTonsOfCO2PerHomePerYear",
  ],
};

/*
    Impact Calculator Equation 14: Number of urban tree seedlings grown for 10 years equivalent Carbon fixation
 */
export const numberOfUrbanTreeSeedlingsGrownFor10YearsEquivalentCarbonFixation: Formula = {
  id: "numberOfUrbanTreeSeedlingsGrownFor10YearsEquivalentCarbonFixation",
  name: "Number of urban tree seedlings grown for 10 years equivalent Carbon fixation",
  explanation:
    "To convert to units of metric tons CO₂ per tree, multiply by the ratio of the molecular weight of carbon dioxide to that of carbon (44/12) and the ratio of metric tons per pound (1/2,204.6)",
  assumptions: [
    "The medium growth coniferous and deciduous trees are raised in a nursery for one year until they become 1 inch in diameter at 4.5 feet above the ground (the size of tree purchased in a 15-gallon container).",
    "The nursery-grown trees are then planted in a suburban/urban setting; the trees are not densely planted.",
    "“survival factors” developed by U.S. DOE (1998). For example, after 5 years (one year in the nursery and 4 in the urban setting), the probability of survival is 68 percent; after 10 years, the probability declines to 59 percent.",
    "The estimates of carbon sequestered by coniferous and deciduous trees were then weighted by the percent share of coniferous versus deciduous trees in cities across the United States.",
    "Inherritted assumptions from CO₂ Emissions from Electricity Consumption and Reduction",
  ],
  sources: [
    "https://www.fs.usda.gov/treesearch/pubs/52933",
    "https://www3.epa.gov/climatechange/Downloads/method-calculating-carbon-sequestration-trees-urban-and-suburban-settings.pdf",
  ],
  expression:
    "(powerPlantClass == 0 ? electricityConsumedCO2Emissions" +
    " : electricityReductionsCO2Emissions) / (((.11 * 23.2) + (.89 * 38)) * (44 / 12) / 2204.6)",
  unit: "Urban Tree Seedlings Grown for Ten Years worth of Emission Fixation",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: ["electricityConsumedCO2Emissions", "electricityReductionsCO2Emissions"],
};

/*
    Impact Calculator Equation 15: Acres of U.S. forests Equivalent CO₂ sequestering for one year
 */
export const acresOfUSForestsEquivalentCO2SequesteringForOneYear: Formula = {
  id: "acresOfUSForestsEquivalentCO2SequesteringForOneYear",
  name: "Acres of U.S. forests Equivalent CO₂ sequestering for one year",
  explanation:
    "Growing forests accumulate and store carbon. Through the process of photosynthesis, trees remove CO₂ from the atmosphere and store it as cellulose, lignin, and other compounds. The rate of accumulation of carbon in a forested landscape is equal to overall tree growth minus removals (i.e., harvest for the production of paper and wood and tree loss from natural disturbances) minus decomposition. In most U.S. forests, growth exceeds removals and decomposition, so the amount of carbon stored nationally in forested lands is increasing overall, though at a decreasing rate." +
    "To estimate carbon sequestered (in metric tons of CO₂) by additional 'average' forestry acres in one year, multiply the number of additional acres by -0.84 metric ton CO₂ acre/year.",
  assumptions: [
    "Forests are defined herein as managed forests that have been classified as forests for over 20 years (i.e., excluding forests converted to/from other land-use types).",
    "The Inventory of U.S. Greenhouse Gas Emissions and Sinks: 1990-2020 (EPA 2022) provides data on the net change in forest carbon stocks and forest area.",
    "USDA Forest Service estimates of carbon stocks in 2020 minus carbon stocks in 2019. This calculation includes carbon stocks in the aboveground biomass, belowground biomass, dead wood, litter, and soil organic and mineral carbon pools. C gains attributed to harvested wood products are not included in this calculation.",
    "Applying data developed by the USDA Forest Service for the Inventory of U.S. Greenhouse Gas Emissions and Sinks: 1990-2020 yields a result of 206 metric tons of carbon per hectare (or 83 metric tons of carbon per acre) for the carbon stock density of U.S. forests in 2020, with an annual net change in carbon stock per area in 2020 of 0.57 metric tons of carbon sequestered per hectare per year (or 0.23 metric tons of carbon sequestered per acre per year).",
    "From 2010 to 2020, the average annual sequestration of carbon per area was 0.57 metric tons C/hectare/year (or 0.21 metric tons C/acre/year) in the United States, with a minimum value of 0.52 metric tons C/hectare/year (or 0.21 metric tons C/acre/year) in 2015, and a maximum value of 0.61 metric tons C/hectare/year (or 0.25 metric tons C/acre/year) in 2016. These values include carbon in the five forest pools: aboveground biomass, belowground biomass, dead wood, litter, and soil organic and mineral carbon, and are based on state-level Forest Inventory and Analysis (FIA) data. Forest carbon stocks and carbon stock change are based on the stock difference methodology and algorithms described by Smith, Heath, and Nichols (2010).",
    "Inherritted assumptions from CO₂ Emissions from Electricity Consumption and Reduction",
    "this is an estimate for “average” U.S. forests from 2019 to 2020; i.e., the annual net change in carbon stock for U.S. forests as a whole between 2019 and 2020. Significant geographical variations underlie the national estimates, and the values calculated here might not be representative of individual regions, states, or changes in the species composition of additional acres of forest.",
  ],
  sources: [
    "https://www.epa.gov/ghgemissions/inventory-us-greenhouse-gas-emissions-and-sinks-1990-2020",
    "https://www.ipcc-nggip.iges.or.jp/public/2006gl/vol4.html",
    "Smith, J., Heath, L., & Nichols, M. (2010). U.S. Forest Carbon Calculation Tool User's Guide: Forestland Carbon Stocks and Net Annual Stock Change. General Technical Report NRS-13 revised, U.S. Department of Agriculture Forest Service, Northern Research Station.",
  ],
  expression:
    "(powerPlantClass == 0 ? electricityConsumedCO2Emissions" +
    " : electricityReductionsCO2Emissions) / (((((58156 - 58007) * 106) / (282.061 * 103)) / 2.471) * (44 / 12))",
  unit: "Average Forestry Acres per year to sequester",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: ["electricityConsumedCO2Emissions", "electricityReductionsCO2Emissions"],
};

/*
    Impact Calculator Equation 16: Acres of U.S. forest preserved from conversion to cropland Equivalent Emissions
 */
export const acresOfUSForestPreservedFromConversionToCroplandEquivalentEmissions: Formula = {
  id: "acresOfUSForestPreservedFromConversionToCroplandEquivalentEmissions",
  name: "Acres of U.S. forest preserved from conversion to cropland Equivalent Emissions",
  explanation:
    "This many acres of US forest would have to be prevented from being converted to cropland to combat those emissions. To estimate CO₂ not emitted when an acre of forest is preserved from conversion to cropland, simply multiply the number of acres of forest not converted by -150.79 mt CO₂/acre/year. Note that this represents CO₂ avoided in the year of conversion. ",
  assumptions: [
    "Forests are defined herein as managed forests that have been classified as forests for over 20 years",
    "Based on data developed by the USDA Forest Service for the Inventory of U.S. Greenhouse Gas Emissions and Sinks: 1990-2020, the carbon stock density of U.S. forests in 2020 was 206 metric tons of carbon per hectare (or 83 metric tons of carbon per acre) (EPA 2022). This estimate is composed of the five carbon pools: aboveground biomass (55 metric tons C/hectare), belowground biomass (11 metric tons C/hectare), dead wood (10 metric tons C/hectare), litter (14 metric tons C/hectare), and soil carbon, which includes mineral soils (90 metric tons C/hectare) and organic soils (26 metric tons C/hectare).",
    "The Inventory of U.S. Greenhouse Gas Emissions and Sinks: 1990-2020 estimates soil carbon stock changes using U.S.-specific equations, IPCC guidelines, and data from the USDA Natural Resource Inventory and the DayCent biogeochemical model (EPA 2022). When calculating carbon stock changes in biomass due to conversion from forestland to cropland, the IPCC guidelines indicate that the average carbon stock change is equal to the carbon stock change due to removal of biomass from the outgoing land use (i.e., forestland) plus the carbon stocks from one year of growth in the incoming land use (i.e., cropland), or the carbon in biomass immediately after the conversion minus the carbon in biomass prior to the conversion plus the carbon stocks from one year of growth in the incoming land use (i.e., cropland) (IPCC 2006). The carbon stock in annual cropland biomass after one year is 5 metric tons C per hectare, and the carbon content of dry aboveground biomass is 45 percent (IPCC 2006). Therefore, the carbon stock in cropland after one year of growth is estimated to be 2.25 metric tons C per hectare (or 0.91 metric tons C per acre).",
    "The averaged reference soil carbon stock (for high-activity clay, low-activity clay, sandy soils, and histosols for all climate regions in the United States) is 40.83 metric tons C/hectare (EPA 2022). Carbon stock change in soils is time-dependent, with a default time period for transition between equilibrium soil carbon values of 20 years for soils in cropland systems (IPCC 2006). Consequently, it is assumed that the change in equilibrium soil carbon will be annualized over 20 years to represent the annual flux in mineral and organic soils.",
    "Organic soils also emit CO₂ when drained. Emissions from drained organic soils in forestland and drained organic soils in cropland vary based on the drainage depth and climate (IPCC 2006). The Inventory of U.S. Greenhouse Gas Emissions and Sinks: 1990-2020 estimates emissions from drained organic soils using U.S.-specific emission factors for cropland and IPCC (2014) default emission factors for forestland (EPA 2022).",
    "The annual change in emissions from one hectare of drained organic soils can be calculated as the difference between the emission factors for forest soils and cropland soils. The emission factors for drained organic soil on temperate forestland are 2.60 metric tons C/hectare/year and 0.31 metric tons C/hectare/year (EPA 2022, IPCC 2014), and the average emission factor for drained organic soil on cropland for all climate regions is 13.17 metric tons C/hectare/year (EPA 2022).",
    "The IPCC (2006) guidelines indicate that there are insufficient data to provide a default approach or parameters to estimate carbon stock change from dead organic matter pools or belowground carbon stocks in perennial cropland (IPCC 2006).",
    "Immediately after conversion from forestland to cropland, the carbon stock of aboveground biomass is assumed to be zero, as the land is cleared of all vegetation before planting crops",
    "Annual Change in Biomass Carbon Stocks on Land Converted to Other Land-Use Category: ∆CB = ∆CG + CConversion - ∆CL = -87.59 metric tons C/hectare/year of biomass carbon stocks are lost when forestland is converted to cropland in the year of conversion.",
    "Annual Change in Organic Carbon Stocks in Mineral  and Organic Soils: ∆CSoil = (SOC0 - SOC(0-T))/D = (41.13 - 116)/20 = -3.78 metric tons C/hectare/year of soil C lost.",
    "The change in emissions from drained organic soils per hectare is estimated as the difference between emission factors for drained organic forest soils and drained organic cropland soils. Annual Change in Emissions from Drained Organic Soils:",
    "Consequently, the change in carbon density from converting forestland to cropland would be -87.59 metric tons of C/hectare/year of biomass plus -3.78 metric tons C/hectare/year of soil C, minus 10.26 metric tons C/hectare/year from drained organic soils, equaling a total loss of 101.62 metric tons C/hectare/year (or -41.13 metric tons C/acre/year) in the year of conversion. To convert to carbon dioxide, multiply by the ratio of the molecular weight of carbon dioxide to that of carbon (44/12), to yield a value of -372.62 metric tons CO₂/hectare/year (or -150.79 metric tons CO₂/acre/year) in the year of conversion.",
    "Inherritted assumptions from CO₂ Emissions from Electricity Consumption and Reduction",
  ],
  sources: [
    "https://www.epa.gov/ghgemissions/inventory-us-greenhouse-gas-emissions-and-sinks-1990-2020",
    "https://www.ipcc-nggip.iges.or.jp/public/wetlands/index.html",
    "https://www.ipcc-nggip.iges.or.jp/public/2006gl/vol4.html",
  ],
  expression: "(powerPlantClass == 0 ? electricityConsumedCO2Emissions : electricityReductionsCO2Emissions) / 5.139", //might be the wrong value
  unit: "Acres prevented from conversion to cropland in the year of conversion Equivalent",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: ["electricityConsumedCO2Emissions", "electricityReductionsCO2Emissions"],
};

/*
    Impact Calculator Equation 17: Propane cylinders used for home barbecues
 */
export const propaneCylindersUsedForHomeBarbecues: Formula = {
  id: "propaneCylindersUsedForHomeBarbecues",
  name: "Propane cylinders used for home barbecues",
  explanation:
    "Carbon dioxide emissions per pound of propane were determined by multiplying the weight of propane in a cylinder times the carbon content percentage times the fraction oxidized times the ratio of the molecular weight of carbon dioxide to that of carbon (44/12).",
  assumptions: [
    "Propane is 81.8 percent carbon (EPA 2022). The fraction oxidized is assumed to be 100 percent (IPCC 2006).",
    "Propane cylinders vary with respect to size; for the purpose of this equivalency calculation, a typical cylinder for home use was assumed to contain 16 pounds of propane.",
    "Inherritted assumptions from CO₂ Emissions from Electricity Consumption and Reduction",
  ],
  sources: [
    "https://www.epa.gov/ghgemissions/inventory-us-greenhouse-gas-emissions-and-sinks-1990-2020",
    "https://www.ipcc-nggip.iges.or.jp/public/2006gl/vol2.html",
  ],
  expression:
    "(powerPlantClass == 0 ? electricityConsumedCO2Emissions" +
    " : electricityReductionsCO2Emissions) / (16 * .818 * .4536 * 44 / 12 / 1000)",
  unit: "Homes of yearly equivalent emissions",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: ["electricityConsumedCO2Emissions", "electricityReductionsCO2Emissions"],
};

/*
    Impact Calculator Equation 18: Railcars of coal burned
 */
export const railcarsOfCoalBurned: Formula = {
  id: "railcarsOfCoalBurned",
  name: "Railcars of coal burned",
  explanation:
    "Carbon dioxide emissions per ton of coal were determined by multiplying heat content times the carbon coefficient times the fraction oxidized times the ratio of the molecular weight of carbon dioxide to that of carbon (44/12).",
  assumptions: [
    "The average heat content of coal consumed by the electric power sector in the U.S. in 2020 was 20.84 mmbtu per metric ton (EIA 2020).",
    "The average carbon coefficient of coal combusted for electricity generation in 2020 was 26.12 kilograms carbon per mmbtu (EPA 2022). The fraction oxidized is assumed to be 100 percent (IPCC 2006).",
    "The amount of coal in an average railcar was assumed to be 100.19 short tons, or 90.89 metric tons (Hancock 2001).",
    "Inherritted assumptions from CO₂ Emissions from Electricity Consumption and Reduction",
  ],
  sources: [
    "https://www.eia.gov/totalenergy/data/monthly/pdf/sec12_6.pdf",
    "https://www.epa.gov/ghgemissions/inventory-us-greenhouse-gas-emissions-and-sinks-1990-2020",
    "Hancock (2001). Hancock, Kathleen and Sreekanth, Ande. Conversion of Weight of Freight to Number of Railcars. Transportation Research Board, Paper 01-2056, 2001.",
    "https://www.ipcc-nggip.iges.or.jp/public/2006gl/vol2.html",
  ],
  expression:
    "(powerPlantClass == 0 ? electricityConsumedCO2Emissions" +
    " : electricityReductionsCO2Emissions) / (20.84 * 26.12 * 44 / 12 * 90.89 / 1000)",
  unit: "Railcars",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: ["electricityConsumedCO2Emissions", "electricityReductionsCO2Emissions"],
};

/*
    Impact Calculator Equation 19: Pounds of coal burned
 */
export const poundsOfCoalBurned: Formula = {
  id: "poundsOfCoalBurned",
  name: "Pounds of coal burned",
  explanation:
    "Carbon dioxide emissions per ton of coal were determined by multiplying heat content times the carbon coefficient times the fraction oxidized times the ratio of the molecular weight of carbon dioxide to that of carbon (44/12).",
  assumptions: [
    "The average heat content of coal consumed by the electric power sector in the U.S. in 2020 was 20.84 mmbtu per metric ton (EIA 2021).",
    "The average carbon coefficient of coal combusted for electricity generation in 2020 was 25.76 kilograms carbon per mmbtu (EPA 2022). The fraction oxidized is assumed to be 100 percent (IPCC 2006).",
    "Inherritted assumptions from CO₂ Emissions from Electricity Consumption and Reduction",
  ],
  sources: [
    "EIA (2021). Monthly Energy Review December 2020, Table A5: Approximate Heat Content of Coal and Coal Coke. (PDF) (272 pp, 3.04 MB, About PDF)",
    "EPA (2022). Inventory of U.S. Greenhouse Gas Emissions and Sinks: 1990-2020. Annex 2 (Methodology for estimating CO₂ emissions from fossil fuel combustion), Table A-28 'Carbon Content Coefficients for Coal' Pg. A-93, U.S. Environmental Protection Agency, Washington, DC. U.S. EPA #430-R-22-003 (PDF) (790 pp, 14 MB, About PDF).",
    "IPCC (2006). 2006 IPCC Guidelines for National Greenhouse Gas Inventories. Volume 2 (Energy). Intergovernmental Panel on Climate Change, Geneva, Switzerland.",
  ],
  expression:
    "(powerPlantClass == 0 ? electricityConsumedCO2Emissions" +
    " : electricityReductionsCO2Emissions) / (20.84 * 25.76 * 44 / 12 / 2204.6 / 1000)",
  unit: "lb Coal",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: ["electricityConsumedCO2Emissions", "electricityReductionsCO2Emissions"],
};

/*
    Impact Calculator Equation 20: Tons of waste recycled instead of landfilled
 */
export const tonsOfWasteRecycledInsteadOfLandfilled: Formula = {
  id: "tonsOfWasteRecycledInsteadOfLandfilled",
  name: "Tons of waste recycled instead of landfilled",
  explanation: "",
  assumptions: [
    "emission factors from EPA’s Waste Reduction Model (WARM) were used (EPA 2020).",
    "According to WARM, the net emission reduction from recycling mixed recyclables (e.g., paper, metals, plastics), compared with a baseline in which the materials are landfilled (i.e., accounting for the avoided emissions from landfilling), is  2.89 metric tons of carbon dioxide equivalent per short ton.",
    "Inherritted assumptions from CO₂ Emissions from Electricity Consumption and Reduction",
  ],
  sources: ["EPA (2020). Waste Reduction Model (WARM), Version 15. U.S. Environmental Protection Agency."],
  expression: "(powerPlantClass == 0 ? electricityConsumedCO2Emissions : electricityReductionsCO2Emissions) / 2.89",
  unit: "Homes of yearly equivalent emissions",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: ["electricityConsumedCO2Emissions", "electricityReductionsCO2Emissions"],
};

/*
    Impact Calculator Equation 21: Number of garbage trucks of waste recycled instead of landfilled
 */
export const numberOfGarbageTrucksOfWasteRecycledInsteadOfLandfilled: Formula = {
  id: "numberOfGarbageTrucksOfWasteRecycledInsteadOfLandfilled",
  name: "Number of garbage trucks of waste recycled instead of landfilled",
  explanation:
    "Carbon dioxide emissions reduced per garbage truck full of waste were determined by multiplying emissions avoided from recycling instead of landfilling 1 ton of waste by the amount of waste in an average garbage truck. ",
  assumptions: [
    "The carbon dioxide equivalent emissions avoided from recycling instead of landfilling 1 ton of waste are 2.89 metric tons CO₂ equivalent per ton, as calculated in the “Tons of waste recycled instead of landfilled” section above",
    "The amount of waste in an average garbage truck was assumed to be 7 tons (EPA 2002).",
    "Inherritted assumptions from CO₂ Emissions from Electricity Consumption and Reduction",
  ],
  sources: [
    "https://www.epa.gov/warm/versions-waste-reduction-model-warm#15",
    "https://www.epa.gov/sites/production/files/2016-03/documents/r02002.pdf",
  ],
  expression:
    "(powerPlantClass == 0 ? electricityConsumedCO2Emissions : electricityReductionsCO2Emissions) / (2.89 * 7)",
  unit: "Garbage truck recycled",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: ["electricityConsumedCO2Emissions", "electricityReductionsCO2Emissions"],
};

/* 
  Impact Calculator Equation 28: Resultant Temperature Rise
*/
export const resultantTemperatureRise: Formula = {
  id: "resultantTemperatureRise",
  name: "Resultant Temperature Rise",
  explanation:
    "CO₂ emissions leads to increased atmospheric concetration of CO₂ which leads to a global temerature rise",
  assumptions: [
    "10ppm CO₂ in the atmosphere leads to .1C temperature rise",
    "Temperature rise and CO₂ concentration are linearly correllated in the temperature range of focus",
    "Inherritted assumptions from Concentration Increase CO₂ in Atmosphere",
    "Inherritted assumptions from CO₂ Emissions from Electricity Consumption and Reduction",
  ],
  sources: ["https://factsonclimate.org/infographics/concentration-warming-relationship"],
  expression:
    "(powerPlantClass == 0 ? electricityConsumedCO2Emissions : electricityReductionsCO2Emissions) / 7820000000 * 0.01",
  unit: "°C increase",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: ["electricityConsumedCO2Emissions", "electricityReductionsCO2Emissions"],
};

/* 
  Impact Calculator Equation 29: Additional People Exposed to Unprecedented & Exposed to Unprecedented Heat in 2070 from User Input Baseline Temperature and Population
*/
export const populationIncreaseExposedToUnprecedentedHeatPerDegreesCelsius: Formula = {
  id: "populationIncreaseExposedToUnprecedentedHeatPerDegreesCelsius",
  name: "Population Increase Exposed to Unprecedented Heat Per Degrees Celsius",
  explanation:
    "Calculates the number of additional people exposed to unprecedented heat in 2070 based on the user input baseline population.",
  assumptions: [""],
  sources: [""],
  // use the following expression for mathjs: (Population) x (0.285 + -4.4E-11*(Population) + 2.61E-21*(Population)^2 + 4.21E-32*(Population)^3)
  expression:
    "population2070 * (0.285 + -4.4 * 10^-11 * population2070 + 2.61 * 10^-21 * population2070^2 + 4.21E-32 * population2070^3)",
  unit: "People/°C",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: ["population2070"],
};

export const populationIncreaseOutsideNichePerDegreesCelsius: Formula = {
  id: "populationIncreaseOutsideNichePerDegreesCelsius",
  name: "Population Increase Outside the Human Niche Per Degrees Celsius",
  explanation:
    "Calculates the number of additional people outside the human niche in 2070 based on the user input baseline population.",
  assumptions: [""],
  sources: [""],
  // use the following expression for mathjs: (Population) x (0.179 + -1.11E-11*(Population) + -5.07E-23*(Population)^2 + 3.01E-32*(Population)^3)
  expression:
    "population2070 * (0.179 + -1.11 * 10^-11 * population2070 + -5.07 * 10^-23 * population2070^2 + 3.01E-32 * population2070^3)",
  unit: "People/°C",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: ["population2070"],
};

export const additionalPeopleExposedToUnprecedentedHeatIn2070: Formula = {
  id: "additionalPeopleExposedToUnprecedentedHeatIn2070",
  name: "Additional People Exposed to Unprecedented & Exposed to Unprecedented Heat in 2070 from User Input Baseline Temperature and Population",
  explanation:
    "CO₂ emissions leads to increased atmospheric concetration of CO₂ which leads to a global temerature rise which leads to increased human exposure to unprecedented heat",
  assumptions: [
    "Assumed best fit on supplemental sheet",
    "Inherritted assumptions from CO₂ Emissions from Electricity Consumption and Reduction, Concentration Increase CO₂ in Atmosphere, & Resultant Temperature Rise",
  ],
  sources: [""],
  expression:
    "((powerPlantClass == 0 ? electricityConsumedCO2Emissions : electricityReductionsCO2Emissions) / 7820000000) * 0.01 * populationIncreaseExposedToUnprecedentedHeatPerDegreesCelsius",
  unit: "Additional People Exposed to Unprecedented Heat in 2070",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: [
    "electricityConsumedCO2Emissions",
    "electricityReductionsCO2Emissions",
    "populationIncreaseExposedToUnprecedentedHeatPerDegreesCelsius",
  ],
};

export const additionalPeopleOutsideTheHumanNicheIn2070: Formula = {
  id: "additionalPeopleOutsideTheHumanNicheIn2070",
  name: "Additional People Outside the Human Niche in 2070",
  explanation:
    "CO₂ emissions leads to increased atmospheric concetration of CO₂ which leads to a global temerature rise which leads to increased human exposure to unprecedented heat",
  assumptions: [
    "Assumed best fit on supplemental sheet",
    "Inherritted assumptions from CO₂ Emissions from Electricity Consumption and Reduction, Concentration Increase CO₂ in Atmosphere, & Resultant Temperature Rise",
  ],
  sources: [""],
  expression:
    "((powerPlantClass == 0 ? electricityConsumedCO2Emissions : electricityReductionsCO2Emissions) / 7820000000) * 0.01 * populationIncreaseOutsideNichePerDegreesCelsius",
  unit: "Additional People Outside the Human Niche in 2070",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: ["population2070", "electricityConsumedCO2Emissions", "electricityReductionsCO2Emissions"],
};

// group and export all formulas
export const formulas: Formula[] = [
  annualPowerGeneration,
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
  metricTonsOfCO2PerHomePerYear,
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
  resultantTemperatureRise,
  additionalPeopleExposedToUnprecedentedHeatIn2070,
];
