import { EgridModel } from "@/database/egrid-model";
import { Location } from "@/schema/egrid";

describe("EgridModel schema validation", () => {
  it("should validate a correct egrid document", () => {
    const egrid = new EgridModel({
      year: 2024,
      location: Location.options[0], // Using a valid location
      nameplateCapacityMw: 100.5,
      annualHeatInputMmbtu: 10.2,
      ozoneSeasonHeatInputMmbtu: 5.1,
      totalAnnualHeatInputMmbtu: 2.3,
    });

    expect(egrid.validate()).resolves.toBeUndefined();
  });

  it("should fail validation when required fields are missing", () => {
    const egrid = new EgridModel({}); // Missing all required fields

    expect(egrid.validate()).rejects.toThrow();
  });

  it("should fail validation for an invalid location", () => {
    const egrid = new EgridModel({
      year: 2024,
      location: "InvalidLocation", // Not in enum
    });

    expect(egrid.validate()).rejects.toThrow();
  });
});
