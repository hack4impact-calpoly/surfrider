import { z } from "zod";
import { PowerPlantClass } from "@/schema/egrid";

/**
 * eGRID country, subregion, and state codes
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

export const AvertRecordKey = z.object({
  year: z.number().int().min(2000).max(2100),
  location: AvertLocation,
  powerPlantClass: PowerPlantClass,
});

export type AvertRecordKey = z.infer<typeof AvertRecordKey>;

export const AvertRecordData = z.object({
  avoidedCo2EmissionRateLbMwh: z.number().optional(),
  avoidedNoxEmissionRateLbMwh: z.number().optional(),
  avoidedSo2EmissionRateLbMwh: z.number().optional(),
  avoidedPm2_5EmissionRateLbMwh: z.number().optional(),
  avoidedNh3EmissionRateLbMwh: z.number().optional(),
  avoidedVocEmissionRateLbMwh: z.number().optional(),
  capacityFactorPercent: z.number().optional(),
});

export type AvertRecordData = z.infer<typeof AvertRecordData>;

// modeling egrid.ts
export const AvertRecord = AvertRecordKey.merge(AvertRecordData);

export type AvertRecord = z.infer<typeof AvertRecord>;
