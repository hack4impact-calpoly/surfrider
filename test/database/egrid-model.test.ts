import { EgridModel } from "@/database/egrid-model";
import { EgridLocation } from "@/schema/egrid";

describe("EgridModel schema validation", () => {
  it("should validate a correct egrid document", async () => {
    const egrid = new EgridModel({
      year: 2024,
      location: EgridLocation.options[2], // Using a valid location
      nameplateCapacityMw: 100.5,
      annualHeatInputMmbtu: 10.2,
      ozoneSeasonHeatInputMmbtu: 5.1,
      totalAnnualHeatInputMmbtu: 2.3,
    });

    await expect(egrid.validate()).resolves.toBeUndefined();
  });

  it("should fail validation when required fields are missing", async () => {
    const egrid = new EgridModel({}); // Missing all required fields

    await expect(egrid.validate()).rejects.toThrow();
  });

  it("should fail validation for an invalid location", async () => {
    const egrid = new EgridModel({
      year: 2024,
      location: "InvalidLocation", // Not in enum
    });

    await expect(egrid.validate()).rejects.toThrow();
  });
});
