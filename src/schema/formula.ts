import { z } from "zod";
import { CalculateInput } from "./api";
import { EgridRecordData } from "./egrid";
import { AvertRecordData } from "./avert";

export const FormulaId = z.enum([
  "annualPowerGeneration",
  "CO2PerkWhConsumed",
  "poundsOfCO2PerMWh",
  "CO2PerkWhReduced",
  "effectivekWhReduced",
  "effectivekWhConsumed",
  "CO2PerkWhElectricityReduced",
  "electricityReductionsCO2Emissions",
  "CO2PerkWhElectricityConsumed",
  "electricityConsumedCO2Emissions",
  "gallonsOfGasolineBurnedEquivalentCO2Emissions",
  "gallonsOfDieselConsumedEquivalentCO2Emission",
  "gasolinePoweredPassengerVehiclesPerYearEquivalentCO2Emissions",
  "milesDrivenByTheAverageGasolinePoweredPassengerVehicleEquivalentCO2Emissions",
  "thermsOfNaturalGasEquivalentCO2Emissions",
  "mcfOfNaturalGasEquivalentCO2Emissions",
  "barrelsOfOilConsumedEquivalentCO2Emissions",
  "tankerTrucksFilledWithGasolineEquivalentEmissions",
  "numberOfIncandescentBulbsSwitchedToLightEmittingDiodeBulbsInOperationForAYearEmissionsSavedEquivalentEmissions",
  "metricTonsOfCO2PerHomePerYear",
  "homeYearlyElectricityUseEquivalentEmissions",
  "homeYearlyTotalEnergyUseEquivalentEmissions",
  "numberOfUrbanTreeSeedlingsGrownFor10YearsEquivalentCarbonFixation",
  "acresOfUSForestsEquivalentCO2SequesteringForOneYear",
  "acresOfUSForestPreservedFromConversionToCroplandEquivalentEmissions",
  "propaneCylindersUsedForHomeBarbecues",
  "railcarsOfCoalBurned",
  "poundsOfCoalBurned",
  "tonsOfWasteRecycledInsteadOfLandfilled",
  "numberOfGarbageTrucksOfWasteRecycledInsteadOfLandfilled",
]);

export type FormulaId = z.infer<typeof FormulaId>;

export const FormulaDependency = z.union([
  FormulaId,
  z.enum(Object.keys(CalculateInput.shape) as [keyof typeof CalculateInput.shape]),
  z.enum(Object.keys(EgridRecordData.shape) as [keyof typeof EgridRecordData.shape]),
  z.enum(Object.keys(AvertRecordData.shape) as [keyof typeof AvertRecordData.shape]),
]);

export type FormulaDependency = z.infer<typeof FormulaDependency>;

export const Formula = z.object({
  id: FormulaId,
  name: z.string(),
  explanation: z.string(),
  assumptions: z.array(z.string()),
  sources: z.array(z.string()),
  expression: z.string(),
  unit: z.string(),
  setupScope: z.function().returns(z.void()),
  dependencies: z.array(FormulaDependency),
});

export type Formula = z.infer<typeof Formula>;
