import mongoose, { Schema } from "mongoose";

const EgridSchema = new Schema({
  year: { type: Number, required: true },
  location: { type: String, required: true }, //US, subregion, or state
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
  annual_n2o_combustion_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
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
  annual_nox_nonbaseload_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  ozone_season_nox_nonbaseload_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_so2_nonbaseload_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_co2_nonbaseload_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_ch4_nonbaseload_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_n2o_nonbaseload_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_co2_equivalent_nonbaseload_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_hg_nonbaseload_output_emission_rate_lb_mwh: { type: Number }, //pound per megawatt hour
  annual_coal_net_generation_mwh: { type: Number }, //megawatt hours
  annual_oil_net_generation_mwh: { type: Number }, //megawatt hours
  annual_gas_net_generation_mwh: { type: Number }, //megawatt hours
  annual_nuclear_net_generation_mwh: { type: Number }, //megawatt hours
  annual_hydro_net_generation_mwh: { type: Number }, //megawatt hours
  annual_biomass_net_generation_mwh: { type: Number }, //megawatt hours
  annual_wind_net_generation_mwh: { type: Number }, //megawatt hours
  annual_solar_net_generation_mwh: { type: Number }, //megawatt hours
  annual_geothermal_net_generation_mwh: { type: Number }, //megawatt hours
  annual_other_fossil_net_generation_mwh: { type: Number }, //megawatt hours
  annual_other_unknown_purchased_fuel_net_generation_mwh: { type: Number }, //megawatt hours
  annual_total_nonrenewables_net_generation_mwh: { type: Number }, //megawatt hours
  annual_total_renewables_net_generation_mwh: { type: Number }, //megawatt hours
  annual_total_nonhydro_renewables_net_generation_mwh: { type: Number }, //megawatt hours
  annual_total_combustion_net_generation_mwh: { type: Number }, //megawatt hours
  annual_total_noncombustion_net_generation_mwh: { type: Number }, //megawatt hours
  coal_generation_percent_resource_mix: { type: Number }, //percent
  oil_generation_percent_resource_mix: { type: Number }, //percent
  gas_generation_percent_resource_mix: { type: Number }, //percent
  nuclear_generation_percent_resource_mix: { type: Number }, //percent
  hydro_generation_percent_resource_mix: { type: Number }, //percent
  biomass_generation_percent_resource_mix: { type: Number }, //percent
  wind_generation_percent_resource_mix: { type: Number }, //percent
  solar_generation_percent_resource_mix: { type: Number }, //percent
  geothermal_generation_percent_resource_mix: { type: Number }, //percent
  other_fossil_generation_percent_resource_mix: { type: Number }, //percent
  other_unknown_purchased_fuel_generation_percent_resource_mix: { type: Number }, //percent
  total_nonrenewables_generation_percent_resource_mix: { type: Number }, //percent
  total_renewables_generation_percent_resource_mix: { type: Number }, //percent
  total_nonhydro_renewables_generation_percent_resource_mix: { type: Number }, //percent
  total_combustion_generation_percent_resource_mix: { type: Number }, //percent
  total_noncombustion_generation_percent_resource_mix: { type: Number }, //percent
  annual_nonbaseload_coal_net_generation_mwh: { type: Number }, //megawatt hours
  annual_nonbaseload_oil_net_generation_mwh: { type: Number }, //megawatt hours
  annual_nonbaseload_gas_net_generation_mwh: { type: Number }, //megawatt hours
  annual_nonbaseload_nuclear_net_generation_mwh: { type: Number }, //megawatt hours
  annual_nonbaseload_hydro_net_generation_mwh: { type: Number }, //megawatt hours
  annual_nonbaseload_biomass_net_generation_mwh: { type: Number }, //megawatt hours
  annual_nonbaseload_wind_net_generation_mwh: { type: Number }, //megawatt hours
  annual_nonbaseload_solar_net_generation_mwh: { type: Number }, //megawatt hours
  annual_nonbaseload_geothermal_net_generation_mwh: { type: Number }, //megawatt hours
  annual_nonbaseload_other_fossil_net_generation_mwh: { type: Number }, //megawatt hours
  annual_nonbaseload_other_unknown_purchased_fuel_net_generation_mwh: { type: Number }, //megawatt hours
  nonbaseload_coal_generation_percent_resource_mix: { type: Number }, //percent
  nonbaseload_oil_generation_percent_resource_mix: { type: Number }, //percent
  nonbaseload_gas_generation_percent_resource_mix: { type: Number }, //percent
  nonbaseload_nuclear_generation_percent_resource_mix: { type: Number }, //percent
  nonbaseload_hydro_generation_percent_resource_mix: { type: Number }, //percent
  nonbaseload_biomass_generation_percent_resource_mix: { type: Number }, //percent
  nonbaseload_wind_generation_percent_resource_mix: { type: Number }, //percent
  nonbaseload_solar_generation_percent_resource_mix: { type: Number }, //percent
  nonbaseload_geothermal_generation_percent_resource_mix: { type: Number }, //percent
  nonbaseload_other_fossil_generation_percent_resource_mix: { type: Number }, //percent
  nonbaseload_other_unknown_purcased_fuel_generation_percent_resource_mix: { type: Number }, //percent
}, { collection: "surfrider-egrid" });

export default mongoose.models.Egrid || mongoose.model("Egrid", EgridSchema);
