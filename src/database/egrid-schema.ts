import mongoose, { Schema } from "mongoose";

const EgridSchema = new Schema({
  year: { type: Number, required: true },
  location: { type: String, required: true, unique: true }, //US, subregion, or state
  nameplate_capacity_mw: { type: Number }, //megawatts
  annual_heat_input_mmbtu: { type: Number }, //metric million British thermal units
  ozone_season_heat_input_mmbtu: { type: Number }, //metric million British thermal units
  total_annual_heat_input_mmbtu: { type: Number }, //metric million British thermal units
  total_ozone_season_heat_input_mmbtu: { type: Number }, //metric million British thermal units
  annual_net_generation_mwh: { type: Number }, //megawatt hours
  ozone_season_net_generation_mwh: { type: Number }, //megawatt hours
  annual_nox_emissions_tons: { type: Number }, //tons
  ozone_season_nox_emissions_tons: { type: Number }, //tons
  annual_so2_emissions_tons: { type: Number }, //tons
  annual_co2_emissions_tons: { type: Number }, //tons
  annual_ch4_emissions_lbs: { type: Number }, //pounds
  annual_n2o_emissions_lbs: { type: Number }, //pounds
  annual_co2_equivalent_emissions_tons: { type: Number }, //tons
  annual_hg_emissions_lbs: { type: Number }, //pounds
  annual_nox_total_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  ozone_season_nox_total_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_so2_total_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_co2_total_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_ch4_total_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_n2o_total_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_co2_equivalent_total_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_hg_total_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_nox_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  ozone_season_nox_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_so2_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_co2_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_ch4_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_n2o_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_co2_equivalent_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_hg_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_nox_combustion_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  ozone_season_nox_combustion_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_so2_combustion_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_co2_combustion_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_ch4_combustion_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_no2_combustion_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_co2_equivalent_combustion_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_hg_combustion_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_nox_coal_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_nox_oil_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_nox_gas_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_nox_fossil_fuel_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  ozone_season_nox_coal_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  ozone_season_nox_oil_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  ozone_season_nox_gas_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  ozone_season_nox_fossil_fuel_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_so2_coal_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_so2_oil_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_so2_gas_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_so2_fossil_fuel_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_co2_coal_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_co2_oil_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_co2_gas_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_co2_fossil_fuel_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_ch4_coal_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_ch4_oil_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_ch4_gas_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_ch4_fossil_fuel_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_n2o_coal_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_n2o_oil_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_n2o_gas_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_n2o_fossil_fuel_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_co2_equivalent_coal_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_co2_equivalent_oil_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_co2_equivalent_gas_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_co2_equivalent_fossil_fuel_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_hg_coal_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_hg_fossil_fuel_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_nox_coal_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_nox_oil_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_nox_gas_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_nox_fossil_fuel_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  ozone_season_nox_coal_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  ozone_season_nox_oil_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  ozone_season_nox_gas_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  ozone_season_nox_fossil_fuel_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_so2_coal_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_so2_oil_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_so2_gas_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_so2_fossil_fuel_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_co2_coal_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_co2_oil_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_co2_gas_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_co2_fossil_fuel_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_ch4_coal_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_ch4_oil_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_ch4_gas_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_ch4_fossil_fuel_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_n2o_coal_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_n2o_oil_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_n2o_gas_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_n2o_fossil_fuel_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_co2_equivalent_coal_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_co2_equivalent_oil_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_co2_equivalent_gas_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_co2_equivalent_fossil_fuel_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_hg_coal_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
  annual_hg_fossil_fuel_input_emission_rate_lb_mmbtu: { type: Number }, //pound per metric million British thermal units
});

export default mongoose.models.Egrid || mongoose.model("Egrid", EgridSchema);
