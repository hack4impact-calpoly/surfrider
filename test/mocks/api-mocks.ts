import { CalculateInput } from "@/schema/api";
import { EgridLocation, PowerPlantClass } from "@/schema/egrid";

export const MOCK_CALCULATE_INPUT: CalculateInput = {
  installedCapacity: 5882000,
  powerPlantClass: PowerPlantClass.enum.OnshoreWind,
  location: EgridLocation.enum.CA,
  capacityFactor: 0.51,
  population2070: 8325000000,
  startYear: 2028,
  lifeTimeYears: 30,
  yearOfStudy: 2100,
};
