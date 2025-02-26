import { z } from "zod";
import { PowerPlantClass, EgridLocation } from "@/schema/egrid";

export const AvertRecordKey = z.object({
  year: z.number().int().min(2000).max(2100),
  location: EgridLocation,
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
