import mongoose, { Schema } from "mongoose";
import { PowerPlantClass, EgridLocation } from "@/schema/egrid";

export const AvertSchema = new Schema(
  {
    year: { type: Number, required: true },
    location: { type: String, enum: EgridLocation.options, required: true }, //US, subregion, or state
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

AvertSchema.index({ year: 1, location: 1, powerPlantClass: 1 }, { unique: true });

export const AvertModel = mongoose.model("Avert", AvertSchema);
