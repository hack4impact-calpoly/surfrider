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
      "(energyType == 0 ? electricityConsumedCO2Emissions" +
      " : electricityReductionsCO2Emissions) / (((43 - 9) * 3 * 365 / 1000) * 1562.4 / 1000 / 2204.6)",
    unit: "Bulbs replaced operating for a year saved equivalent emissions",
    setupScope: (() => {}) as (...args: unknown[]) => void,
    dependencies: ["electricityConsumedCO2Emissions", "electricityReductionsCO2Emissions"],
  };

/*
    Impact Calculator Equation 12: Home yearly electricity use Equivalent Emissions
 */
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
    "(energyType == 0 ? electricityConsumedCO2Emissions" +
    " : electricityReductionsCO2Emissions) / (11880 * 884.2 / (1 - 0.073) / 1000 / 2204.6)",
  unit: "Homes of yearly equivalent emissions",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: ["electricityConsumedCO2Emissions", "electricityReductionsCO2Emissions"],
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
    "(energyType == 0 ? electricityConsumedCO2Emissions" +
    " : electricityReductionsCO2Emissions) / ((11880 * 884.2 / (1 - 0.073) / 1000 / 2204.6)" +
    " + (41590 * .0550 / 1000) + (235 / 1000) + (27 / 42 * 426.1 / 1000))",
  unit: "Homes total energy use per year equivalent emissions",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: ["electricityConsumedCO2Emissions", "electricityReductionsCO2Emissions"],
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
    "(energyType == 0 ? electricityConsumedCO2Emissions" +
    " : electricityReductionsCO2Emissions) / (((.11 * 23.2) + (.89 * 36)) * (44 / 12) / 2204.6)",
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
    "(energyType == 0 ? electricityConsumedCO2Emissions" +
    " : electricityReductionsCO2Emissions) / (((((58156 - 58007) * 106) / (282.061 * 103)) / 2.471) * (44 / 12))",
  unit: "Average Forestry Acres per year to sequester",
  setupScope: (() => {}) as (...args: unknown[]) => void,
  dependencies: ["electricityConsumedCO2Emissions", "electricityReductionsCO2Emissions"],
};

/*
    Impact Calculator Equation 16: Acres of U.S. forests Equivalent CO₂ sequestering for one year
 */
/*
    Impact Calculator Equation 17: Propane cylinders used for home barbecues
 */
/*
    Impact Calculator Equation 18: Railcars of coal burned
 */
/*
    Impact Calculator Equation 19: Pounds of coal burned
 */
/*
    Impact Calculator Equation 20: Tons of waste recycled instead of landfilled
 */
/*
    Impact Calculator Equation 21: Number of garbage trucks of waste recycled instead of landfilled
 */
