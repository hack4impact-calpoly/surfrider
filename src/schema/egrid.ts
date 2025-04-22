import { z } from "zod";

/**
 * Power plant classification
 */
export const PowerPlantClass = z.enum([
  "Consumed",
  "OnshoreWind",
  "OffshoreWind",
  "UtilityPV",
  "DistributedPV",
  "PortfolioEE",
  "UniformEE",
]);
export type PowerPlantClass = z.infer<typeof PowerPlantClass>;

export const powerPlantClassToIndex: Record<PowerPlantClass, number> = {
  Consumed: 0,
  OnshoreWind: 1,
  OffshoreWind: 2,
  UtilityPV: 3,
  DistributedPV: 4,
  PortfolioEE: 5,
  UniformEE: 6,
};

/**
 * eGRID country, subregion, and state codes
 *
 * Note: Commented out subregions and states are valid but do not map to AVERT regions
 */
export const EgridLocation = z.enum([
  // Country
  "US",

  // State
  // "AK"
  "AL",
  "AR",
  "AZ",
  "CA",
  "CO",
  "CT",
  "DC",
  "DE",
  "FL",
  "GA",
  // "HI",
  "IA",
  "ID",
  "IL",
  "IN",
  "KS",
  "KY",
  "LA",
  "MA",
  "MD",
  "ME",
  "MI",
  "MN",
  "MO",
  "MS",
  "MT",
  "NC",
  "ND",
  "NE",
  "NH",
  "NJ",
  "NM",
  "NV",
  "NY",
  "OH",
  "OK",
  "OR",
  "PA",
  // "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VA",
  "VT",
  "WA",
  "WI",
  "WV",
  "WY",

  // Subregion
  // "AKGD",
  // "AKMS",
  "AZNM",
  "CAMX",
  "ERCT",
  "FRCC",
  // "HIMS",
  // "HIOA",
  "MROE",
  // "MROW",
  "NEWE",
  "NWPP",
  "NYCW",
  "NYLI",
  "NYUP",
  // "PRMS",
  "RFCE",
  "RFCM",
  // "RFCW",
  "RMPA",
  "SPNO",
  "SPSO",
  "SRMV",
  "SRMW",
  "SRSO",
  // "SRTV",
  "SRVC",
]);
export type EgridLocation = z.infer<typeof EgridLocation>;

/**
 * Key fields that uniquely identify an eGRID record
 */
export const EgridRecordKey = z.object({
  year: z.number().int().min(2000).max(2100), // years: 2000 - 2100
  location: EgridLocation,
});
export type EgridRecordKey = z.infer<typeof EgridRecordKey>;

/**
 * Data fields for an eGRID record
 */
export const EgridRecordData = z.object({
  // Capacity and Heat Input
  nameplateCapacityMw: z.number().or(z.null()),
  annualHeatInputMmbtu: z.number().or(z.null()),
  ozoneSeasonHeatInputMmbtu: z.number().or(z.null()),
  totalAnnualHeatInputMmbtu: z.number().or(z.null()),
  totalOzoneSeasonHeatInputMmbtu: z.number().or(z.null()),

  // Generation
  annualNetGenerationMwh: z.number().or(z.null()),
  ozoneSeasonNetGenerationMwh: z.number().or(z.null()),

  // Emissions
  annualNoxEmissionsTons: z.number().or(z.null()),
  ozoneSeasonNoxEmissionsTons: z.number().or(z.null()),
  annualSo2EmissionsTons: z.number().or(z.null()),
  annualCo2EmissionsTons: z.number().or(z.null()),
  annualCh4EmissionsLbs: z.number().or(z.null()),
  annualN2oEmissionsLbs: z.number().or(z.null()),
  annualCo2EquivalentEmissionsTons: z.number().or(z.null()),
  annualHgEmissionsLbs: z.number().or(z.null()),

  // Total Output Emission Rates
  annualNoxTotalOutputEmissionRateLbMwh: z.number().or(z.null()),
  ozoneSeasonNoxTotalOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualSo2TotalOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualCo2TotalOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualCh4TotalOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualN2oTotalOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualCo2EquivalentTotalOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualHgTotalOutputEmissionRateLbMwh: z.number().or(z.null()),

  // Input Emission Rates
  annualNoxInputEmissionRateLbMmbtu: z.number().or(z.null()),
  ozoneSeasonNoxInputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualSo2InputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualCo2InputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualCh4InputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualN2oInputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualCo2EquivalentInputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualHgInputEmissionRateLbMmbtu: z.number().or(z.null()),

  // Combustion Output Emission Rates
  annualNoxCombustionOutputEmissionRateLbMwh: z.number().or(z.null()),
  ozoneSeasonNoxCombustionOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualSo2CombustionOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualCo2CombustionOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualCh4CombustionOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualN2oCombustionOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualCo2EquivalentCombustionOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualHgCombustionOutputEmissionRateLbMwh: z.number().or(z.null()),

  // Fuel-specific Output Emission Rates
  annualNoxCoalOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualNoxOilOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualNoxGasOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualNoxFossilFuelOutputEmissionRateLbMwh: z.number().or(z.null()),
  ozoneSeasonNoxCoalOutputEmissionRateLbMwh: z.number().or(z.null()),
  ozoneSeasonNoxOilOutputEmissionRateLbMwh: z.number().or(z.null()),
  ozoneSeasonNoxGasOutputEmissionRateLbMwh: z.number().or(z.null()),
  ozoneSeasonNoxFossilFuelOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualSo2CoalOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualSo2OilOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualSo2GasOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualSo2FossilFuelOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualCo2CoalOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualCo2OilOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualCo2GasOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualCo2FossilFuelOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualCh4CoalOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualCh4OilOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualCh4GasOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualCh4FossilFuelOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualN2oCoalOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualN2oOilOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualN2oGasOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualN2oFossilFuelOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualCo2EquivalentCoalOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualCo2EquivalentOilOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualCo2EquivalentGasOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualCo2EquivalentFossilFuelOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualHgCoalOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualHgFossilFuelOutputEmissionRateLbMwh: z.number().or(z.null()),

  // Fuel-specific Input Emission Rates
  annualNoxCoalInputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualNoxOilInputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualNoxGasInputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualNoxFossilFuelInputEmissionRateLbMmbtu: z.number().or(z.null()),
  ozoneSeasonNoxCoalInputEmissionRateLbMmbtu: z.number().or(z.null()),
  ozoneSeasonNoxOilInputEmissionRateLbMmbtu: z.number().or(z.null()),
  ozoneSeasonNoxGasInputEmissionRateLbMmbtu: z.number().or(z.null()),
  ozoneSeasonNoxFossilFuelInputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualSo2CoalInputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualSo2OilInputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualSo2GasInputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualSo2FossilFuelInputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualCo2CoalInputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualCo2OilInputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualCo2GasInputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualCo2FossilFuelInputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualCh4CoalInputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualCh4OilInputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualCh4GasInputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualCh4FossilFuelInputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualN2oCoalInputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualN2oOilInputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualN2oGasInputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualN2oFossilFuelInputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualCo2EquivalentCoalInputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualCo2EquivalentOilInputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualCo2EquivalentGasInputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualCo2EquivalentFossilFuelInputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualHgCoalInputEmissionRateLbMmbtu: z.number().or(z.null()),
  annualHgFossilFuelInputEmissionRateLbMmbtu: z.number().or(z.null()),

  // Nonbaseload Output Emission Rates
  annualNoxNonbaseloadOutputEmissionRateLbMwh: z.number().or(z.null()),
  ozoneSeasonNoxNonbaseloadOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualSo2NonbaseloadOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualCo2NonbaseloadOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualCh4NonbaseloadOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualN2oNonbaseloadOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualCo2EquivalentNonbaseloadOutputEmissionRateLbMwh: z.number().or(z.null()),
  annualHgNonbaseloadOutputEmissionRateLbMwh: z.number().or(z.null()),

  // Generation by Fuel Type
  annualCoalNetGenerationMwh: z.number().or(z.null()),
  annualOilNetGenerationMwh: z.number().or(z.null()),
  annualGasNetGenerationMwh: z.number().or(z.null()),
  annualNuclearNetGenerationMwh: z.number().or(z.null()),
  annualHydroNetGenerationMwh: z.number().or(z.null()),
  annualBiomassNetGenerationMwh: z.number().or(z.null()),
  annualWindNetGenerationMwh: z.number().or(z.null()),
  annualSolarNetGenerationMwh: z.number().or(z.null()),
  annualGeothermalNetGenerationMwh: z.number().or(z.null()),
  annualOtherFossilNetGenerationMwh: z.number().or(z.null()),
  annualOtherUnknownPurchasedFuelNetGenerationMwh: z.number().or(z.null()),
  annualTotalNonrenewablesNetGenerationMwh: z.number().or(z.null()),
  annualTotalRenewablesNetGenerationMwh: z.number().or(z.null()),
  annualTotalNonhydroRenewablesNetGenerationMwh: z.number().or(z.null()),
  annualTotalCombustionNetGenerationMwh: z.number().or(z.null()),
  annualTotalNoncombustionNetGenerationMwh: z.number().or(z.null()),

  // Resource Mix Percentages
  coalGenerationPercentResourceMix: z.number().or(z.null()),
  oilGenerationPercentResourceMix: z.number().or(z.null()),
  gasGenerationPercentResourceMix: z.number().or(z.null()),
  nuclearGenerationPercentResourceMix: z.number().or(z.null()),
  hydroGenerationPercentResourceMix: z.number().or(z.null()),
  biomassGenerationPercentResourceMix: z.number().or(z.null()),
  windGenerationPercentResourceMix: z.number().or(z.null()),
  solarGenerationPercentResourceMix: z.number().or(z.null()),
  geothermalGenerationPercentResourceMix: z.number().or(z.null()),
  otherFossilGenerationPercentResourceMix: z.number().or(z.null()),
  otherUnknownPurchasedFuelGenerationPercentResourceMix: z.number().or(z.null()),
  totalNonrenewablesGenerationPercentResourceMix: z.number().or(z.null()),
  totalRenewablesGenerationPercentResourceMix: z.number().or(z.null()),
  totalNonhydroRenewablesGenerationPercentResourceMix: z.number().or(z.null()),
  totalCombustionGenerationPercentResourceMix: z.number().or(z.null()),
  totalNoncombustionGenerationPercentResourceMix: z.number().or(z.null()),
  annualNonbaseloadCoalNetGenerationMwh: z.number().or(z.null()),
  annualNonbaseloadOilNetGenerationMwh: z.number().or(z.null()),
  annualNonbaseloadGasNetGenerationMwh: z.number().or(z.null()),
  annualNonbaseloadNuclearNetGenerationMwh: z.number().or(z.null()),
  annualNonbaseloadHydroNetGenerationMwh: z.number().or(z.null()),
  annualNonbaseloadBiomassNetGenerationMwh: z.number().or(z.null()),
  annualNonbaseloadWindNetGenerationMwh: z.number().or(z.null()),
  annualNonbaseloadSolarNetGenerationMwh: z.number().or(z.null()),
  annualNonbaseloadGeothermalNetGenerationMwh: z.number().or(z.null()),
  annualNonbaseloadOtherFossilNetGenerationMwh: z.number().or(z.null()),
  annualNonbaseloadOtherUnknownPurchasedFuelNetGenerationMwh: z.number().or(z.null()),
  nonbaseloadCoalGenerationPercentResourceMix: z.number().or(z.null()),
  nonbaseloadOilGenerationPercentResourceMix: z.number().or(z.null()),
  nonbaseloadGasGenerationPercentResourceMix: z.number().or(z.null()),
  nonbaseloadNuclearGenerationPercentResourceMix: z.number().or(z.null()),
  nonbaseloadHydroGenerationPercentResourceMix: z.number().or(z.null()),
  nonbaseloadBiomassGenerationPercentResourceMix: z.number().or(z.null()),
  nonbaseloadWindGenerationPercentResourceMix: z.number().or(z.null()),
  nonbaseloadSolarGenerationPercentResourceMix: z.number().or(z.null()),
  nonbaseloadGeothermalGenerationPercentResourceMix: z.number().or(z.null()),
  nonbaseloadOtherFossilGenerationPercentResourceMix: z.number().or(z.null()),
  nonbaseloadOtherUnknownPurchasedFuelGenerationPercentResourceMix: z.number().or(z.null()),
});
export type EgridRecordData = z.infer<typeof EgridRecordData>;

export const EgridRecord = EgridRecordKey.merge(EgridRecordData);

export type EgridRecord = z.infer<typeof EgridRecord>;
