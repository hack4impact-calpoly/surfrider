import { z } from "zod";
import { PowerPlantClass, EgridLocation } from "@/schema/egrid";
import { FormulaId } from "./formula-id";

export const CalculateInput = z.object({
  installedCapacity: z.coerce.number().gt(0, { message: "Installed capacity must be greater than 0" }),
  powerPlantClass: PowerPlantClass,
  location: EgridLocation,
  capacityFactor: z.coerce
    .number()
    .min(0, { message: "Capacity factor must be at least 0" })
    .max(1, { message: "Capacity factor cannot exceed 1" }),
  population2070: z.coerce.number().min(0, { message: "Population must be at least 0" }),
  startYear: z.coerce
    .number()
    .min(2015, { message: "Start year must be at least 2015" })
    .max(2099, { message: "Start year cannot exceed 2099" }),
  lifeTimeYears: z.coerce.number().min(1, { message: "Lifetime must be at least 1 year" }),
  yearOfStudy: z.coerce
    .number()
    .min(2015, { message: "Year of study must be at least 2015" })
    .max(2099, { message: "Year of study cannot exceed 2099" }),
});

export type CalculateInput = z.infer<typeof CalculateInput>;

export const CalculateResult = z.record(FormulaId, z.number());

export type CalculateResult = z.infer<typeof CalculateResult>;
