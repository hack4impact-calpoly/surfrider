import { z } from "zod";
import { PowerPlantClass, Location } from "@/schema/egrid";

export const AvertRecord = z.object({
  year: z.number(),
  location: z.enum(Location.options), //US, subregion, or state
  powerPlantClass: z.enum(PowerPlantClass.options),
  avoidedCo2EmissionRateLbMwh: z.number(), //pound per megawatt hour
  avoidedNoxEmissionRateLbMwh: z.number(), //pound per megawatt hour
  avoidedSo2EmissionRateLbMwh: z.number(), //pound per megawatt hour
  avoidedPm2_5EmissionRateLbMwh: z.number(), //pound per megawatt hour
  avoidedVocEmissionRateLbMwh: z.number(), //pound per megawatt hour
  avoidedNh3EmissionRateLbMwh: z.number(), //pound per megawatt hour
  capacityFactorPercent: z.number(), //percent
});

export type AvertRecord = z.infer<typeof AvertRecord>;
