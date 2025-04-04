import { z } from "zod";
import { PowerPlantClass, EgridLocation } from "@/schema/egrid";
import { FormulaId } from "./formula-id";

export const CalculateInput = z.object({
  installedCapacity: z.number().min(0, { message: "Installed capacity must be at least 0" }),
  powerPlantClass: PowerPlantClass,
  location: EgridLocation,
  capacityFactor: z
    .number()
    .min(0, { message: "Capacity factor must be at least 0" })
    .max(1, { message: "Capacity factor cannot exceed 1" }),
  population2070: z.number().min(0, { message: "Population must be at least 0" }),
  startYear: z.number(),
  lifeTimeYears: z.number().min(1, { message: "Lifetime must be at least 1 year" }),
  yearOfStudy: z.number(),
});

export type CalculateInput = z.infer<typeof CalculateInput>;

export const CalculateResult = z.object(
  Object.fromEntries(FormulaId.options.map((formulaId) => [formulaId, z.number()])),
);

export type CalculateResult = z.infer<typeof CalculateResult>;
