import { z } from "zod";
import { PowerPlantClass, Location } from "@/schema/egrid";

export const AvertRecordKey = z.object({
  year: z.number().optional(),
  location: Location.optional(),
  powerPlantClass: PowerPlantClass.optional(),
});

export const AvertRecordData = z.object({
  avoidedCo2EmissionRateLbMwh: z.number().optional(),
  avoidedNoxEmissionRateLbMwh: z.number(),
  avoidedSo2EmissionRateLbMwh: z.number(),
  avoidedPm2_5EmissionRateLbMwh: z.number(),
  avoidedNh3EmissionRateLbMwh: z.number(),
  avoidedVocEmissionRateLbMwh: z.number(),
  capacityFactorPercent: z.number(),
});

// modeling egrid.ts
export const AvertRecord = AvertRecordKey.merge(AvertRecordData);

export type AvertRecord = z.infer<typeof AvertRecord>;
