import { z } from "zod";
import { PowerPlantClass, Location } from "./egrid";

const CalculateInput = z.object({
  installedCapacity: z.number(),
  powerPlantClass: PowerPlantClass,
  location: Location,
  capacityFactor: z.number(),
  population2070: z.number(),
  startYear: z.number(),
  lifeTimeYears: z.number(),
  yearOfStudy: z.number(),
});

export type CalculateInput = z.infer<typeof CalculateInput>;
