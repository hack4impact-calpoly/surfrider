import { z } from "zod";
import { PowerPlantClass, Location } from "@/schema/egrid";

const currentYear = new Date().getFullYear();

export const CalculateInput = z.object({
  installedCapacity: z.number().min(0, { message: "Installed capacity must be at least 0" }).default(0),
  powerPlantClass: PowerPlantClass.default(PowerPlantClass.options[0]),
  location: Location.default(Location.options[0]),
  capacityFactor: z
    .number()
    .min(0, { message: "Capacity factor must be at least 0" })
    .max(1, { message: "Capacity factor cannot exceed 1" })
    .default(0),
  population2070: z.number().min(0, { message: "Population must be at least 0" }).default(0),
  startYear: z
    .number()
    .min(currentYear, { message: `Start year must be at least ${currentYear}` })
    .default(currentYear),
  lifeTimeYears: z.number().min(1, { message: "Lifetime must be at least 1 year" }).default(30),
  yearOfStudy: z
    .number()
    .min(currentYear, { message: `Year of study must be at least ${currentYear}` })
    .default(currentYear),
});

export type CalculateInput = z.infer<typeof CalculateInput>;
