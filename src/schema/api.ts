import { z } from "zod";
import { PowerPlantClass, EgridLocation } from "@/schema/egrid";

export const CalculateInput = z.object({
  installedCapacity: z.number(),
  powerPlantClass: PowerPlantClass,
  location: EgridLocation,
  capacityFactor: z.number(),
  population2070: z.number(),
  startYear: z.number(),
  lifeTimeYears: z.number(),
  yearOfStudy: z.number(),
});

export type CalculateInput = z.infer<typeof CalculateInput>;
