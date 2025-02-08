import mongoose, { Schema } from "mongoose";
import { PowerPlantClass } from "../schema/egrid";

export const AvertSchema = new Schema(
  {
    year: { type: Number, required: true },
    location: { type: String, required: true }, //US, subregion, or state
    powerPlantClass: { type: String, enum: PowerPlantClass.options, required: true },
    avoidedCo2EmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    avoidedNoxEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    avoidedSo2EmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    avoidedPm2_5EmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    avoidedVocEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    avoidedNh3EmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    capacityFactorPercent: { type: Number }, //percent
  },
  { collection: "surfrider-avert" },
);

export const AvertModel = mongoose.model("Avert", AvertSchema);
