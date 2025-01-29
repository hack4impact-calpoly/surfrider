import { z } from "zod";

export const FormulaSchema = z.object({
  id: z.string(),
  name: z.string(),
  explanation: z.string(),
  assumptions: z.array(z.string()),
  sources: z.array(z.string()),
  expression: z.string(),
  unit: z.string(),
  setupScope: z.function().returns(z.void()),
  dependencies: z.array(z.string()),
});

export type Formula = z.infer<typeof FormulaSchema>;
