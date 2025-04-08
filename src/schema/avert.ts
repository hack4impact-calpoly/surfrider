import { z } from "zod";
import { EgridLocation, PowerPlantClass } from "@/schema/egrid";

/**
 * AVERT country, region
 */
export const AvertLocation = z.enum([
  // Country
  "US",
  // Regions
  "California",
  "Carolinas",
  "Central",
  "Florida",
  "Mid-Atlantic",
  "Midwest",
  "New England",
  "New York",
  "Northwest",
  "Rocky Mountains",
  "Southeast",
  "Southwest",
  "Tennessee",
  "Texas",
]);
export type AvertLocation = z.infer<typeof AvertLocation>;

// TODO: Double check official eGRID to AVERT location mappings
export const egridToAvertLocations: Record<EgridLocation, AvertLocation> = {
  // Country
  US: "US",

  // States mapped to AVERT regions
  AL: "Southeast",
  AR: "Midwest",
  AZ: "Southwest",
  CA: "California",
  CO: "Rocky Mountains",
  CT: "New England",
  DC: "Mid-Atlantic",
  DE: "Mid-Atlantic",
  FL: "Florida",
  GA: "Southeast",
  IA: "Midwest",
  ID: "Northwest",
  IL: "Midwest",
  IN: "Midwest",
  KS: "Central",
  KY: "Midwest",
  LA: "Midwest",
  MA: "New England",
  MD: "Mid-Atlantic",
  ME: "New England",
  MI: "Midwest",
  MN: "Midwest",
  MO: "Midwest",
  MS: "Midwest",
  MT: "Northwest",
  NC: "Carolinas",
  ND: "Midwest",
  NE: "Central",
  NH: "New England",
  NJ: "Mid-Atlantic",
  NM: "Southwest",
  NV: "Northwest",
  NY: "New York",
  OH: "Mid-Atlantic",
  OK: "Central",
  OR: "Northwest",
  PA: "Mid-Atlantic",
  RI: "New England",
  SC: "Carolinas",
  SD: "Rocky Mountains",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Northwest",
  VA: "Mid-Atlantic",
  VT: "New England",
  WA: "Northwest",
  WI: "Midwest",
  WV: "Mid-Atlantic",
  WY: "Northwest",

  // Subregions mapped to AVERT regions
  AZNM: "Southwest",
  CAMX: "California",
  ERCT: "Texas",
  FRCC: "Florida",
  MROE: "Midwest",
  NEWE: "New England",
  NWPP: "Northwest",
  NYCW: "New York",
  NYLI: "New York",
  NYUP: "New York",
  RFCE: "Mid-Atlantic",
  RFCM: "Midwest",
  RMPA: "Rocky Mountains",
  SPNO: "Central",
  SPSO: "Central",
  SRMV: "Midwest",
  SRMW: "Midwest",
  SRSO: "Southeast",
  SRVC: "Carolinas",
};

export const AvertRecordKey = z.object({
  year: z.number().int().min(2000).max(2100),
  location: AvertLocation,
  powerPlantClass: PowerPlantClass,
});

export type AvertRecordKey = z.infer<typeof AvertRecordKey>;

export const AvertRecordData = z.object({
  avoidedCo2EmissionRateLbMwh: z.number().or(z.null()),
  avoidedNoxEmissionRateLbMwh: z.number().or(z.null()),
  avoidedSo2EmissionRateLbMwh: z.number().or(z.null()),
  avoidedPm2_5EmissionRateLbMwh: z.number().or(z.null()),
  avoidedNh3EmissionRateLbMwh: z.number().or(z.null()),
  avoidedVocEmissionRateLbMwh: z.number().or(z.null()),
  capacityFactorPercent: z.number().or(z.null()),
});

export type AvertRecordData = z.infer<typeof AvertRecordData>;

// modeling egrid.ts
export const AvertRecord = AvertRecordKey.merge(AvertRecordData);

export type AvertRecord = z.infer<typeof AvertRecord>;
