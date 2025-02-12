import mongoose, { Schema } from "mongoose";
import { EgridRecord, Location } from "@/schema/egrid";

const EgridSchema = new Schema<EgridRecord>(
  {
    year: { type: Number, required: true },
    location: { type: String, enum: Location.options, required: true }, //US, subregion, or state
    nameplateCapacityMw: { type: Number }, //megawatts
    annualHeatInputMmbtu: { type: Number }, //metric million British thermal units
    ozoneSeasonHeatInputMmbtu: { type: Number }, //metric million British thermal units
    totalAnnualHeatInputMmbtu: { type: Number }, //metric million British thermal units
    totalOzoneSeasonHeatInputMmbtu: { type: Number }, //metric million British thermal units
    annualNetGenerationMwh: { type: Number }, //megawatt hours
    ozoneSeasonNetGenerationMwh: { type: Number }, //megawatt hours
    annualNoxEmissionsTons: { type: Number }, //tons
    ozoneSeasonNoxEmissionsTons: { type: Number }, //tons
    annualSo2EmissionsTons: { type: Number }, //tons
    annualCo2EmissionsTons: { type: Number }, //tons
    annualCh4EmissionsLbs: { type: Number }, //pounds
    annualN2oEmissionsLbs: { type: Number }, //pounds
    annualCo2EquivalentEmissionsTons: { type: Number }, //tons
    annualHgEmissionsLbs: { type: Number }, //pounds
    annualNoxTotalOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    ozoneSeasonNoxTotalOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualSo2TotalOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualCo2TotalOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualCh4TotalOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualN2oTotalOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualCo2EquivalentTotalOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualHgTotalOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualNoxInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    ozoneSeasonNoxInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualSo2InputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualCo2InputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualCh4InputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualN2oInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualCo2EquivalentInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualHgInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualNoxCombustionOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    ozoneSeasonNoxCombustionOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualSo2CombustionOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualCo2CombustionOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualCh4CombustionOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualN2oCombustionOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualCo2EquivalentCombustionOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualHgCombustionOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualNoxCoalOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualNoxOilOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualNoxGasOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualNoxFossilFuelOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    ozoneSeasonNoxCoalOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    ozoneSeasonNoxOilOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    ozoneSeasonNoxGasOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    ozoneSeasonNoxFossilFuelOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualSo2CoalOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualSo2OilOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualSo2GasOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualSo2FossilFuelOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualCo2CoalOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualCo2OilOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualCo2GasOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualCo2FossilFuelOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualCh4CoalOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualCh4OilOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualCh4GasOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualCh4FossilFuelOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualN2oCoalOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualN2oOilOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualN2oGasOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualN2oFossilFuelOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualCo2EquivalentCoalOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualCo2EquivalentOilOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualCo2EquivalentGasOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualCo2EquivalentFossilFuelOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualHgCoalOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualHgFossilFuelOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualNoxCoalInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualNoxOilInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualNoxGasInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualNoxFossilFuelInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    ozoneSeasonNoxCoalInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    ozoneSeasonNoxOilInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    ozoneSeasonNoxGasInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    ozoneSeasonNoxFossilFuelInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualSo2CoalInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualSo2OilInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualSo2GasInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualSo2FossilFuelInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualCo2CoalInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualCo2OilInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualCo2GasInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualCo2FossilFuelInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualCh4CoalInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualCh4OilInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualCh4GasInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualCh4FossilFuelInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualN2oCoalInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualN2oOilInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualN2oGasInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualN2oFossilFuelInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualCo2EquivalentCoalInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualCo2EquivalentOilInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualCo2EquivalentGasInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualCo2EquivalentFossilFuelInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualHgCoalInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualHgFossilFuelInputEmissionRateLbMmbtu: { type: Number }, //pound per metric million British thermal units
    annualNoxNonbaseloadOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    ozoneSeasonNoxNonbaseloadOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualSo2NonbaseloadOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualCo2NonbaseloadOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualCh4NonbaseloadOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualN2oNonbaseloadOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualCo2EquivalentNonbaseloadOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualHgNonbaseloadOutputEmissionRateLbMwh: { type: Number }, //pound per megawatt hour
    annualCoalNetGenerationMwh: { type: Number }, //megawatt hours
    annualOilNetGenerationMwh: { type: Number }, //megawatt hours
    annualGasNetGenerationMwh: { type: Number }, //megawatt hours
    annualNuclearNetGenerationMwh: { type: Number }, //megawatt hours
    annualHydroNetGenerationMwh: { type: Number }, //megawatt hours
    annualBiomassNetGenerationMwh: { type: Number }, //megawatt hours
    annualWindNetGenerationMwh: { type: Number }, //megawatt hours
    annualSolarNetGenerationMwh: { type: Number }, //megawatt hours
    annualGeothermalNetGenerationMwh: { type: Number }, //megawatt hours
    annualOtherFossilNetGenerationMwh: { type: Number }, //megawatt hours
    annualOtherUnknownPurchasedFuelNetGenerationMwh: { type: Number }, //megawatt hours
    annualTotalNonrenewablesNetGenerationMwh: { type: Number }, //megawatt hours
    annualTotalRenewablesNetGenerationMwh: { type: Number }, //megawatt hours
    annualTotalNonhydroRenewablesNetGenerationMwh: { type: Number }, //megawatt hours
    annualTotalCombustionNetGenerationMwh: { type: Number }, //megawatt hours
    annualTotalNoncombustionNetGenerationMwh: { type: Number }, //megawatt hours
    coalGenerationPercentResourceMix: { type: Number }, //percent
    oilGenerationPercentResourceMix: { type: Number }, //percent
    gasGenerationPercentResourceMix: { type: Number }, //percent
    nuclearGenerationPercentResourceMix: { type: Number }, //percent
    hydroGenerationPercentResourceMix: { type: Number }, //percent
    biomassGenerationPercentResourceMix: { type: Number }, //percent
    windGenerationPercentResourceMix: { type: Number }, //percent
    solarGenerationPercentResourceMix: { type: Number }, //percent
    geothermalGenerationPercentResourceMix: { type: Number }, //percent
    otherFossilGenerationPercentResourceMix: { type: Number }, //percent
    otherUnknownPurchasedFuelGenerationPercentResourceMix: { type: Number }, //percent
    totalNonrenewablesGenerationPercentResourceMix: { type: Number }, //percent
    totalRenewablesGenerationPercentResourceMix: { type: Number }, //percent
    totalNonhydroRenewablesGenerationPercentResourceMix: { type: Number }, //percent
    totalCombustionGenerationPercentResourceMix: { type: Number }, //percent
    totalNoncombustionGenerationPercentResourceMix: { type: Number }, //percent
    annualNonbaseloadCoalNetGenerationMwh: { type: Number }, //megawatt hours
    annualNonbaseloadOilNetGenerationMwh: { type: Number }, //megawatt hours
    annualNonbaseloadGasNetGenerationMwh: { type: Number }, //megawatt hours
    annualNonbaseloadNuclearNetGenerationMwh: { type: Number }, //megawatt hours
    annualNonbaseloadHydroNetGenerationMwh: { type: Number }, //megawatt hours
    annualNonbaseloadBiomassNetGenerationMwh: { type: Number }, //megawatt hours
    annualNonbaseloadWindNetGenerationMwh: { type: Number }, //megawatt hours
    annualNonbaseloadSolarNetGenerationMwh: { type: Number }, //megawatt hours
    annualNonbaseloadGeothermalNetGenerationMwh: { type: Number }, //megawatt hours
    annualNonbaseloadOtherFossilNetGenerationMwh: { type: Number }, //megawatt hours
    annualNonbaseloadOtherUnknownPurchasedFuelNetGenerationMwh: { type: Number }, //megawatt hours
    nonbaseloadCoalGenerationPercentResourceMix: { type: Number }, //percent
    nonbaseloadOilGenerationPercentResourceMix: { type: Number }, //percent
    nonbaseloadGasGenerationPercentResourceMix: { type: Number }, //percent
    nonbaseloadNuclearGenerationPercentResourceMix: { type: Number }, //percent
    nonbaseloadHydroGenerationPercentResourceMix: { type: Number }, //percent
    nonbaseloadBiomassGenerationPercentResourceMix: { type: Number }, //percent
    nonbaseloadWindGenerationPercentResourceMix: { type: Number }, //percent
    nonbaseloadSolarGenerationPercentResourceMix: { type: Number }, //percent
    nonbaseloadGeothermalGenerationPercentResourceMix: { type: Number }, //percent
    nonbaseloadOtherFossilGenerationPercentResourceMix: { type: Number }, //percent
    nonbaseloadOtherUnknownPurcasedFuelGenerationPercentResourceMix: { type: Number }, //percent
  },
  { collection: "surfrider-egrid" },
);

EgridSchema.index({ year: 1, location: 1 }, { unique: true });

export const EgridModel = mongoose.model("Egrid", EgridSchema);
