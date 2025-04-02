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

  // Subregions mapped to AVERT regions
  AKGD: "Northwest",
  AKMS: "Northwest",
  AZNM: "Southwest",
  CAMX: "California",
  ERCT: "Texas",
  FRCC: "Florida",
  HIMS: "Northwest",
  HIOA: "Northwest",
  MROE: "Midwest",
  MROW: "Midwest",
  NEWE: "New England",
  NWPP: "Northwest",
  NYCW: "New York",
  NYLI: "New York",
  NYUP: "New York",
  PRMS: "Southeast",
  RFCE: "Mid-Atlantic",
  RFCM: "Midwest",
  RFCW: "Midwest",
  RMPA: "Rocky Mountains",
  SPNO: "Central",
  SPSO: "Central",
  SRMV: "Southeast",
  SRMW: "Midwest",
  SRSO: "Southeast",
  SRTV: "Tennessee",
  SRVC: "Southeast",

  // States mapped to AVERT regions
  AK: "Northwest",
  AL: "Southeast",
  AR: "Central",
  AZ: "Southwest",
  CA: "California",
  CO: "Rocky Mountains",
  CT: "New England",
  DC: "Mid-Atlantic",
  DE: "Mid-Atlantic",
  FL: "Florida",
  GA: "Southeast",
  HI: "Northwest",
  IA: "Midwest",
  ID: "Northwest",
  IL: "Midwest",
  IN: "Midwest",
  KS: "Central",
  KY: "Tennessee",
  LA: "Central",
  MA: "New England",
  MD: "Mid-Atlantic",
  ME: "New England",
  MI: "Midwest",
  MN: "Midwest",
  MO: "Central",
  MS: "Southeast",
  MT: "Rocky Mountains",
  NC: "Carolinas",
  ND: "Midwest",
  NE: "Central",
  NH: "New England",
  NJ: "Mid-Atlantic",
  NM: "Southwest",
  NV: "Southwest",
  NY: "New York",
  OH: "Midwest",
  OK: "Central",
  OR: "Northwest",
  PA: "Mid-Atlantic",
  PR: "Southeast",
  RI: "New England",
  SC: "Carolinas",
  SD: "Midwest",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Rocky Mountains",
  VA: "Mid-Atlantic",
  VT: "New England",
  WA: "Northwest",
  WI: "Midwest",
  WV: "Mid-Atlantic",
  WY: "Rocky Mountains",
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
