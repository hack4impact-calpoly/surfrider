import mongoose, { Schema } from "mongoose";

const EgridSchema = new Schema({
  year: { type: Number, required: true },
  location: { type: String, required: true, unique: true },
});

export default mongoose.models.Egrid || mongoose.model("Egrid", EgridSchema);
