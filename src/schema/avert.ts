import { z } from "zod";
import { PowerPlantClass, Location } from "@/schema/egrid";

export const AvertRecordKey = z.object({
  year: z.number(),
  location: Location,
  powerPlantClass: PowerPlantClass,
});

export const AvertRecordData = z.object({
  avoidedCo2EmissionRateLbMwh: z.number().optional(),
  avoidedNoxEmissionRateLbMwh: z.number().optional(),
  avoidedSo2EmissionRateLbMwh: z.number().optional(),
  avoidedPm2_5EmissionRateLbMwh: z.number().optional(),
  avoidedNh3EmissionRateLbMwh: z.number().optional(),
  avoidedVocEmissionRateLbMwh: z.number().optional(),
  capacityFactorPercent: z.number().optional(),
});

// modeling egrid.ts
export const AvertRecord = AvertRecordKey.merge(AvertRecordData);

export type AvertRecord = z.infer<typeof AvertRecord>;
