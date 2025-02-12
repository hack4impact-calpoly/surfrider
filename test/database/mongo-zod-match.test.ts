import { EgridModel } from "@/database/egrid-model";
import { EgridRecord } from "@/schema/egrid";

describe("Mongoose and Zod schema matching", () => {
  it.each`
    name       | mongoSchema          | zodSchema
    ${"Egrid"} | ${EgridModel.schema} | ${EgridRecord}
  `("$name schema", ({ mongoSchema, zodSchema }) => {
    Object.keys(zodSchema.shape).forEach((key) => {
      expect(mongoSchema.obj).toHaveProperty(key);
    });
    Object.keys(mongoSchema.obj).forEach((key) => {
      expect(zodSchema.shape).toHaveProperty(key);
    });
  });
});
