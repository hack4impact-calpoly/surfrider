import { EgridLocation, EgridRecord, EgridRecordData, EgridRecordKey } from "@/schema/egrid";
import { AppErrorCode } from "@/schema/error";
import { AppError, transformError } from "@/utils/errors";
import axios from "axios";
import * as XLSX from "xlsx";
import { z } from "zod";

const EGRID_URL = "https://www.epa.gov/system/files/documents/2024-01/egrid2022_data.xlsx";
const YEAR = 2022;
const COUNTRY_SHEET = "US22";
const COUNTRY_PREFIX = "U.S.";
const SUBREGION_SHEET = "SRL22";
const SUBREGION_LOCATION_FIELD = "eGRID subregion acronym";
const SUBREGION_PREFIX = "eGRID subregion";
const STATE_SHEET = "ST22";
const STATE_PREFIX = "State";
const STATE_LOCATION_FIELD = "State abbreviation";

const parseRawNumberValue = (val: unknown): number | null | undefined =>
  val === undefined ? undefined : typeof val === "number" ? val : null;
const parseRawStringValue = (val: unknown): string | null => (typeof val === "string" ? val : null);

const transformRawData = (
  raw: Record<string, unknown>,
  year: number,
  location: EgridLocation,
  prefix: string,
): EgridRecord => {
  try {
    const key: EgridRecordKey = {
      year,
      location,
    };

    const data: Partial<EgridRecordData> = {
      nameplateCapacityMw: parseRawNumberValue(raw[`${prefix} nameplate capacity (MW)`]),
      annualHeatInputMmbtu: parseRawNumberValue(raw[`${prefix} annual heat input from combustion (MMBtu)`]),
      ozoneSeasonHeatInputMmbtu: parseRawNumberValue(raw[`${prefix} ozone season heat input from combustion (MMBtu)`]),
      totalAnnualHeatInputMmbtu: parseRawNumberValue(raw[`${prefix} total annual heat input (MMBtu)`]),
      totalOzoneSeasonHeatInputMmbtu: parseRawNumberValue(raw[`${prefix} total ozone season heat input (MMBtu)`]),
      annualNetGenerationMwh: parseRawNumberValue(raw[`${prefix} annual net generation (MWh)`]),
      ozoneSeasonNetGenerationMwh: parseRawNumberValue(raw[`${prefix} ozone season net generation (MWh)`]),
      annualNoxEmissionsTons: parseRawNumberValue(raw[`${prefix} annual NOx emissions (tons)`]),
      ozoneSeasonNoxEmissionsTons: parseRawNumberValue(raw[`${prefix} ozone season NOx emissions (tons)`]),
      annualSo2EmissionsTons: parseRawNumberValue(raw[`${prefix} annual SO2 emissions (tons)`]),
      annualCo2EmissionsTons: parseRawNumberValue(raw[`${prefix} annual CO2 emissions (tons)`]),
      annualCh4EmissionsLbs: parseRawNumberValue(raw[`${prefix} annual CH4 emissions (lbs)`]),
      annualN2oEmissionsLbs: parseRawNumberValue(raw[`${prefix} annual N2O emissions (lbs)`]),
      annualCo2EquivalentEmissionsTons: parseRawNumberValue(raw[`${prefix} annual CO2 equivalent emissions (tons)`]),
      annualHgEmissionsLbs: parseRawNumberValue(raw[`${prefix} annual Hg emissions (lbs)`]),
      annualNoxTotalOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual NOx total output emission rate (lb/MWh)`],
      ),
      ozoneSeasonNoxTotalOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} ozone season NOx total output emission rate (lb/MWh)`],
      ),
      annualSo2TotalOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual SO2 total output emission rate (lb/MWh)`],
      ),
      annualCo2TotalOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual CO2 total output emission rate (lb/MWh)`],
      ),
      annualCh4TotalOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual CH4 total output emission rate (lb/MWh)`],
      ),
      annualN2oTotalOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual N2O total output emission rate (lb/MWh)`],
      ),
      annualCo2EquivalentTotalOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual CO2 equivalent total output emission rate (lb/MWh)`],
      ),
      annualHgTotalOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual Hg total output emission rate (lb/MWh)`],
      ),
      annualNoxInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual NOx input emission rate (lb/MMBtu)`],
      ),
      ozoneSeasonNoxInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} ozone season NOx input emission rate (lb/MMBtu)`],
      ),
      annualSo2InputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual SO2 input emission rate (lb/MMBtu)`],
      ),
      annualCo2InputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual CO2 input emission rate (lb/MMBtu)`],
      ),
      annualCh4InputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual CH4 input emission rate (lb/MMBtu)`],
      ),
      annualN2oInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual N2O input emission rate (lb/MMBtu)`],
      ),
      annualCo2EquivalentInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual CO2 equivalent input emission rate (lb/MMBtu)`],
      ),
      annualHgInputEmissionRateLbMmbtu: parseRawNumberValue(raw[`${prefix} annual Hg input emission rate (lb/MMBtu)`]),
      annualNoxCombustionOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual NOx combustion output emission rate (lb/MWh)`],
      ),
      ozoneSeasonNoxCombustionOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} ozone season NOx combustion output emission rate (lb/MWh)`],
      ),
      annualSo2CombustionOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual SO2 combustion output emission rate (lb/MWh)`],
      ),
      annualCo2CombustionOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual CO2 combustion output emission rate (lb/MWh)`],
      ),
      annualCh4CombustionOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual CH4 combustion output emission rate (lb/MWh)`],
      ),
      annualN2oCombustionOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual N2O combustion output emission rate (lb/MWh)`],
      ),
      annualCo2EquivalentCombustionOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual CO2 equivalent combustion output emission rate (lb/MWh)`],
      ),
      annualHgCombustionOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual Hg combustion output emission rate (lb/MWh)`],
      ),
      annualNoxCoalOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual NOx coal output emission rate (lb/MWh)`],
      ),
      annualNoxOilOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual NOx oil output emission rate (lb/MWh)`],
      ),
      annualNoxGasOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual NOx gas output emission rate (lb/MWh)`],
      ),
      annualNoxFossilFuelOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual NOx fossil fuel output emission rate (lb/MWh)`],
      ),
      ozoneSeasonNoxCoalOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} ozone season NOx coal output emission rate (lb/MWh)`],
      ),
      ozoneSeasonNoxOilOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} ozone season NOx oil output emission rate (lb/MWh)`],
      ),
      ozoneSeasonNoxGasOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} ozone season NOx gas output emission rate (lb/MWh)`],
      ),
      ozoneSeasonNoxFossilFuelOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} ozone season NOx fossil fuel output emission rate (lb/MWh)`],
      ),
      annualSo2CoalOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual SO2 coal output emission rate (lb/MWh)`],
      ),
      annualSo2OilOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual SO2 oil output emission rate (lb/MWh)`],
      ),
      annualSo2GasOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual SO2 gas output emission rate (lb/MWh)`],
      ),
      annualSo2FossilFuelOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual SO2 fossil fuel output emission rate (lb/MWh)`],
      ),
      annualCo2CoalOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual CO2 coal output emission rate (lb/MWh)`],
      ),
      annualCo2OilOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual CO2 oil output emission rate (lb/MWh)`],
      ),
      annualCo2GasOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual CO2 gas output emission rate (lb/MWh)`],
      ),
      annualCo2FossilFuelOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual CO2 fossil fuel output emission rate (lb/MWh)`],
      ),
      annualCh4CoalOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual CH4 coal output emission rate (lb/MWh)`],
      ),
      annualCh4OilOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual CH4 oil output emission rate (lb/MWh)`],
      ),
      annualCh4GasOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual CH4 gas output emission rate (lb/MWh)`],
      ),
      annualCh4FossilFuelOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual CH4 fossil fuel output emission rate (lb/MWh)`],
      ),
      annualN2oCoalOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual N2O coal output emission rate (lb/MWh)`],
      ),
      annualN2oOilOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual N2O oil output emission rate (lb/MWh)`],
      ),
      annualN2oGasOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual N2O gas output emission rate (lb/MWh)`],
      ),
      annualN2oFossilFuelOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual N2O fossil fuel output emission rate (lb/MWh)`],
      ),
      annualCo2EquivalentCoalOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual CO2 equivalent coal output emission rate (lb/MWh)`],
      ),
      annualCo2EquivalentOilOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual CO2 equivalent oil output emission rate (lb/MWh)`],
      ),
      annualCo2EquivalentGasOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual CO2 equivalent gas output emission rate (lb/MWh)`],
      ),
      annualCo2EquivalentFossilFuelOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual CO2 equivalent fossil fuel output emission rate (lb/MWh)`],
      ),
      annualHgCoalOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual Hg coal output emission rate (lb/MWh)`],
      ),
      annualHgFossilFuelOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual Hg fossil fuel output emission rate (lb/MWh)`],
      ),
      annualNoxCoalInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual NOx coal input emission rate (lb/MMBtu)`],
      ),
      annualNoxOilInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual NOx oil input emission rate (lb/MMBtu)`],
      ),
      annualNoxGasInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual NOx gas input emission rate (lb/MMBtu)`],
      ),
      annualNoxFossilFuelInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual NOx fossil fuel input emission rate (lb/MMBtu)`],
      ),
      ozoneSeasonNoxCoalInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} ozone season NOx coal input emission rate (lb/MMBtu)`],
      ),
      ozoneSeasonNoxOilInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} ozone season NOx oil input emission rate (lb/MMBtu)`],
      ),
      ozoneSeasonNoxGasInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} ozone season NOx gas input emission rate (lb/MMBtu)`],
      ),
      ozoneSeasonNoxFossilFuelInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} ozone season NOx fossil fuel input emission rate (lb/MMBtu)`],
      ),
      annualSo2CoalInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual SO2 coal input emission rate (lb/MMBtu)`],
      ),
      annualSo2OilInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual SO2 oil input emission rate (lb/MMBtu)`],
      ),
      annualSo2GasInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual SO2 gas input emission rate (lb/MMBtu)`],
      ),
      annualSo2FossilFuelInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual SO2 fossil fuel input emission rate (lb/MMBtu)`],
      ),
      annualCo2CoalInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual CO2 coal input emission rate (lb/MMBtu)`],
      ),
      annualCo2OilInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual CO2 oil input emission rate (lb/MMBtu)`],
      ),
      annualCo2GasInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual CO2 gas input emission rate (lb/MMBtu)`],
      ),
      annualCo2FossilFuelInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual CO2 fossil fuel input emission rate (lb/MMBtu)`],
      ),
      annualCh4CoalInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual CH4 coal input emission rate (lb/MMBtu)`],
      ),
      annualCh4OilInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual CH4 oil input emission rate (lb/MMBtu)`],
      ),
      annualCh4GasInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual CH4 gas input emission rate (lb/MMBtu)`],
      ),
      annualCh4FossilFuelInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual CH4 fossil fuel input emission rate (lb/MMBtu)`],
      ),
      annualN2oCoalInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual N2O coal input emission rate (lb/MMBtu)`],
      ),
      annualN2oOilInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual N2O oil input emission rate (lb/MMBtu)`],
      ),
      annualN2oGasInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual N2O gas input emission rate (lb/MMBtu)`],
      ),
      annualN2oFossilFuelInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual N2O fossil fuel input emission rate (lb/MMBtu)`],
      ),
      annualCo2EquivalentCoalInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual CO2 equivalent coal input emission rate (lb/MMBtu)`],
      ),
      annualCo2EquivalentOilInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual CO2 equivalent oil input emission rate (lb/MMBtu)`],
      ),
      annualCo2EquivalentGasInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual CO2 equivalent gas input emission rate (lb/MMBtu)`],
      ),
      annualCo2EquivalentFossilFuelInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual CO2 equivalent fossil fuel input emission rate (lb/MMBtu)`],
      ),
      annualHgCoalInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual Hg coal input emission rate (lb/MMBtu)`],
      ),
      annualHgFossilFuelInputEmissionRateLbMmbtu: parseRawNumberValue(
        raw[`${prefix} annual Hg fossil fuel input emission rate (lb/MMBtu)`],
      ),
      annualNoxNonbaseloadOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual NOx non-baseload output emission rate (lb/MWh)`],
      ),
      ozoneSeasonNoxNonbaseloadOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} ozone season NOx non-baseload output emission rate (lb/MWh)`],
      ),
      annualSo2NonbaseloadOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual SO2 non-baseload output emission rate (lb/MWh)`],
      ),
      annualCo2NonbaseloadOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual CO2 non-baseload output emission rate (lb/MWh)`],
      ),
      annualCh4NonbaseloadOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual CH4 non-baseload output emission rate (lb/MWh)`],
      ),
      annualN2oNonbaseloadOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual N2O non-baseload output emission rate (lb/MWh)`],
      ),
      annualCo2EquivalentNonbaseloadOutputEmissionRateLbMwh: raw[
        `${prefix} annual CO2e non-baseload output emission rate (lb/MWh)`
      ]
        ? parseRawNumberValue(raw[`${prefix} annual CO2e non-baseload output emission rate (lb/MWh)`])
        : parseRawNumberValue(raw[`${prefix} annual CO2 equivalent non-baseload output emission rate (lb/MWh)`]),
      annualHgNonbaseloadOutputEmissionRateLbMwh: parseRawNumberValue(
        raw[`${prefix} annual Hg non-baseload output emission rate (lb/MWh)`],
      ),
      annualCoalNetGenerationMwh: parseRawNumberValue(raw[`${prefix} annual coal net generation (MWh)`]),
      annualOilNetGenerationMwh: parseRawNumberValue(raw[`${prefix} annual oil net generation (MWh)`]),
      annualGasNetGenerationMwh: parseRawNumberValue(raw[`${prefix} annual gas net generation (MWh)`]),
      annualNuclearNetGenerationMwh: parseRawNumberValue(raw[`${prefix} annual nuclear net generation (MWh)`]),
      annualHydroNetGenerationMwh: parseRawNumberValue(raw[`${prefix} annual hydro net generation (MWh)`]),
      annualBiomassNetGenerationMwh: parseRawNumberValue(raw[`${prefix} annual biomass net generation (MWh)`]),
      annualWindNetGenerationMwh: parseRawNumberValue(raw[`${prefix} annual wind net generation (MWh)`]),
      annualSolarNetGenerationMwh: parseRawNumberValue(raw[`${prefix} annual solar net generation (MWh)`]),
      annualGeothermalNetGenerationMwh: parseRawNumberValue(raw[`${prefix} annual geothermal net generation (MWh)`]),
      annualOtherFossilNetGenerationMwh: parseRawNumberValue(raw[`${prefix} annual other fossil net generation (MWh)`]),
      annualOtherUnknownPurchasedFuelNetGenerationMwh: parseRawNumberValue(
        raw[`${prefix} annual other unknown/ purchased fuel net generation (MWh)`],
      ),
      annualTotalNonrenewablesNetGenerationMwh: parseRawNumberValue(
        raw[`${prefix} annual total nonrenewables net generation (MWh)`],
      ),
      annualTotalRenewablesNetGenerationMwh: parseRawNumberValue(
        raw[`${prefix} annual total renewables net generation (MWh)`],
      ),
      annualTotalNonhydroRenewablesNetGenerationMwh: parseRawNumberValue(
        raw[`${prefix} annual total nonhydro renewables net generation (MWh)`],
      ),
      annualTotalCombustionNetGenerationMwh: parseRawNumberValue(
        raw[`${prefix} annual total combustion net generation (MWh)`],
      ),
      annualTotalNoncombustionNetGenerationMwh: parseRawNumberValue(
        raw[`${prefix} annual total noncombustion net generation (MWh)`],
      ),
      coalGenerationPercentResourceMix: parseRawNumberValue(raw[`${prefix} coal generation percent (resource mix)`]),
      oilGenerationPercentResourceMix: parseRawNumberValue(raw[`${prefix} oil generation percent (resource mix)`]),
      gasGenerationPercentResourceMix: parseRawNumberValue(raw[`${prefix} gas generation percent (resource mix)`]),
      nuclearGenerationPercentResourceMix: parseRawNumberValue(
        raw[`${prefix} nuclear generation percent (resource mix)`],
      ),
      hydroGenerationPercentResourceMix: parseRawNumberValue(raw[`${prefix} hydro generation percent (resource mix)`]),
      biomassGenerationPercentResourceMix: parseRawNumberValue(
        raw[`${prefix} biomass generation percent (resource mix)`],
      ),
      windGenerationPercentResourceMix: parseRawNumberValue(raw[`${prefix} wind generation percent (resource mix)`]),
      solarGenerationPercentResourceMix: parseRawNumberValue(raw[`${prefix} solar generation percent (resource mix)`]),
      geothermalGenerationPercentResourceMix: parseRawNumberValue(
        raw[`${prefix} geothermal generation percent (resource mix)`],
      ),
      otherFossilGenerationPercentResourceMix: parseRawNumberValue(
        raw[`${prefix} other fossil generation percent (resource mix)`],
      ),
      otherUnknownPurchasedFuelGenerationPercentResourceMix: parseRawNumberValue(
        raw[`${prefix} other unknown/ purchased fuel generation percent (resource mix)`],
      ),
      totalNonrenewablesGenerationPercentResourceMix: parseRawNumberValue(
        raw[`${prefix} total nonrenewables generation percent (resource mix)`],
      ),
      totalRenewablesGenerationPercentResourceMix: parseRawNumberValue(
        raw[`${prefix} total renewables generation percent (resource mix)`],
      ),
      totalNonhydroRenewablesGenerationPercentResourceMix: parseRawNumberValue(
        raw[`${prefix} total nonhydro renewables generation percent (resource mix)`],
      ),
      totalCombustionGenerationPercentResourceMix: parseRawNumberValue(
        raw[`${prefix} total combustion generation percent (resource mix)`],
      ),
      totalNoncombustionGenerationPercentResourceMix: parseRawNumberValue(
        raw[`${prefix} total noncombustion generation percent (resource mix)`],
      ),
      annualNonbaseloadCoalNetGenerationMwh: parseRawNumberValue(
        raw[`${prefix} annual nonbaseload coal net generation (MWh)`],
      ),
      annualNonbaseloadOilNetGenerationMwh: parseRawNumberValue(
        raw[`${prefix} annual nonbaseload oil net generation (MWh)`],
      ),
      annualNonbaseloadGasNetGenerationMwh: parseRawNumberValue(
        raw[`${prefix} annual nonbaseload gas net generation (MWh)`],
      ),
      annualNonbaseloadNuclearNetGenerationMwh: parseRawNumberValue(
        raw[`${prefix} annual nonbaseload nuclear net generation (MWh)`],
      ),
      annualNonbaseloadHydroNetGenerationMwh: parseRawNumberValue(
        raw[`${prefix} annual nonbaseload hydro net generation (MWh)`],
      ),
      annualNonbaseloadBiomassNetGenerationMwh: parseRawNumberValue(
        raw[`${prefix} annual nonbaseload biomass net generation (MWh)`],
      ),
      annualNonbaseloadWindNetGenerationMwh: parseRawNumberValue(
        raw[`${prefix} annual nonbaseload wind net generation (MWh)`],
      ),
      annualNonbaseloadSolarNetGenerationMwh: parseRawNumberValue(
        raw[`${prefix} annual nonbaseload solar net generation (MWh)`],
      ),
      annualNonbaseloadGeothermalNetGenerationMwh: parseRawNumberValue(
        raw[`${prefix} annual nonbaseload geothermal net generation (MWh)`],
      ),
      annualNonbaseloadOtherFossilNetGenerationMwh: parseRawNumberValue(
        raw[`${prefix} annual nonbaseload other fossil net generation (MWh)`],
      ),
      annualNonbaseloadOtherUnknownPurchasedFuelNetGenerationMwh: parseRawNumberValue(
        raw[`${prefix} annual nonbaseload other unknown/ purchased fuel net generation (MWh)`],
      ),
      nonbaseloadCoalGenerationPercentResourceMix: parseRawNumberValue(
        raw[`${prefix} nonbaseload coal generation percent (resource mix)`],
      ),
      nonbaseloadOilGenerationPercentResourceMix: parseRawNumberValue(
        raw[`${prefix} nonbaseload oil generation percent (resource mix)`],
      ),
      nonbaseloadGasGenerationPercentResourceMix: parseRawNumberValue(
        raw[`${prefix} nonbaseload gas generation percent (resource mix)`],
      ),
      nonbaseloadNuclearGenerationPercentResourceMix: parseRawNumberValue(
        raw[`${prefix} nonbaseload nuclear generation percent (resource mix)`],
      ),
      nonbaseloadHydroGenerationPercentResourceMix: parseRawNumberValue(
        raw[`${prefix} nonbaseload hydro generation percent (resource mix)`],
      ),
      nonbaseloadBiomassGenerationPercentResourceMix: parseRawNumberValue(
        raw[`${prefix} nonbaseload biomass generation percent (resource mix)`],
      ),
      nonbaseloadWindGenerationPercentResourceMix: parseRawNumberValue(
        raw[`${prefix} nonbaseload wind generation percent (resource mix)`],
      ),
      nonbaseloadSolarGenerationPercentResourceMix: parseRawNumberValue(
        raw[`${prefix} nonbaseload solar generation percent (resource mix)`],
      ),
      nonbaseloadGeothermalGenerationPercentResourceMix: parseRawNumberValue(
        raw[`${prefix} nonbaseload geothermal generation percent (resource mix)`],
      ),
      nonbaseloadOtherFossilGenerationPercentResourceMix: parseRawNumberValue(
        raw[`${prefix} nonbaseload other fossil generation percent (resource mix)`],
      ),
      nonbaseloadOtherUnknownPurchasedFuelGenerationPercentResourceMix: parseRawNumberValue(
        raw[`${prefix} nonbaseload other unknown/ purchased fuel generation percent (resource mix)`],
      ),
    };

    return EgridRecord.parse({
      ...key,
      ...data,
    });
  } catch (error) {
    throw transformError(
      error,
      AppErrorCode.enum.SERVICE_ERROR,
      `Failed to transform raw data for ${location} in year ${year} with prefix ${prefix}`,
    );
  }
};

const trimColumnNames = (sheetJson: Record<string, unknown>) => {
  const newSheetJson: Record<string, unknown> = {};

  Object.entries(sheetJson).forEach(([key, value]) => {
    newSheetJson[key.trim()] = value;
  });
  return newSheetJson;
};

const transformCountryData = (countrySheet: XLSX.WorkSheet): EgridRecord => {
  const countryData = XLSX.utils.sheet_to_json(countrySheet);
  if (countryData.length > 1) {
    const decodedRaw = trimColumnNames(z.record(z.unknown()).parse(countryData[1]));
    return transformRawData(decodedRaw, YEAR, EgridLocation.enum.US, COUNTRY_PREFIX);
  }
  throw new AppError(AppErrorCode.enum.SERVICE_ERROR, "Unable to find country data in eGRID file");
};

const transformSubregionData = (subregionSheet: XLSX.WorkSheet): EgridRecord[] => {
  const subregionData = XLSX.utils.sheet_to_json(subregionSheet);
  if (subregionData.length > 1) {
    return subregionData.slice(1).map((raw: unknown) => {
      const decodedRaw = trimColumnNames(z.record(z.unknown()).parse(raw));
      const location = parseRawStringValue(decodedRaw[SUBREGION_LOCATION_FIELD]);
      const decodedLocation = EgridLocation.parse(location);
      return transformRawData(decodedRaw, YEAR, decodedLocation, SUBREGION_PREFIX);
    });
  }
  throw new AppError(AppErrorCode.enum.SERVICE_ERROR, "Unable to find subregion data in eGRID file");
};

const transformStateData = (stateSheet: XLSX.WorkSheet): EgridRecord[] => {
  const stateData = XLSX.utils.sheet_to_json(stateSheet);
  if (stateData.length > 1) {
    return stateData.slice(1).map((raw: unknown) => {
      const decodedRaw = trimColumnNames(z.record(z.unknown()).parse(raw));
      const location = parseRawStringValue(decodedRaw[STATE_LOCATION_FIELD]);
      const decodedLocation = EgridLocation.parse(location);
      return transformRawData(decodedRaw, YEAR, decodedLocation, STATE_PREFIX);
    });
  }
  throw new AppError(AppErrorCode.enum.SERVICE_ERROR, "Unable to find state data in eGRID file");
};

export const fetchAndTransformEgridData = async (): Promise<EgridRecord[]> => {
  try {
    const response = await axios.get(EGRID_URL, { responseType: "arraybuffer" });
    const workbook = XLSX.read(response.data, {
      type: "buffer",
      sheets: [COUNTRY_SHEET, SUBREGION_SHEET, STATE_SHEET],
    });
    const records: EgridRecord[] = [];

    // transform country data
    records.push(transformCountryData(workbook.Sheets[COUNTRY_SHEET]));

    // transform subregion data
    records.push(...transformSubregionData(workbook.Sheets[SUBREGION_SHEET]));

    // transform state data
    records.push(...transformStateData(workbook.Sheets[STATE_SHEET]));

    return records;
  } catch (error) {
    return Promise.reject(transformError(error, AppErrorCode.enum.SERVICE_ERROR, "Failed to fetch eGRID data"));
  }
};
