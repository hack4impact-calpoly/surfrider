import { EgridLocation, EgridRecord, EgridRecordData, EgridRecordKey } from "@/schema/egrid";
import { AppErrorCode } from "@/schema/error";
import { AppError, transformError } from "@/utils/errors";
import { sanitizeNumberValue, sanitizeStringValue } from "@/utils/fetch-utils";
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
      nameplateCapacityMw: sanitizeNumberValue(raw[`${prefix} nameplate capacity (MW)`]),
      annualHeatInputMmbtu: sanitizeNumberValue(raw[`${prefix} annual heat input from combustion (MMBtu)`]),
      ozoneSeasonHeatInputMmbtu: sanitizeNumberValue(raw[`${prefix} ozone season heat input from combustion (MMBtu)`]),
      totalAnnualHeatInputMmbtu: sanitizeNumberValue(raw[`${prefix} total annual heat input (MMBtu)`]),
      totalOzoneSeasonHeatInputMmbtu: sanitizeNumberValue(raw[`${prefix} total ozone season heat input (MMBtu)`]),
      annualNetGenerationMwh: sanitizeNumberValue(raw[`${prefix} annual net generation (MWh)`]),
      ozoneSeasonNetGenerationMwh: sanitizeNumberValue(raw[`${prefix} ozone season net generation (MWh)`]),
      annualNoxEmissionsTons: sanitizeNumberValue(raw[`${prefix} annual NOx emissions (tons)`]),
      ozoneSeasonNoxEmissionsTons: sanitizeNumberValue(raw[`${prefix} ozone season NOx emissions (tons)`]),
      annualSo2EmissionsTons: sanitizeNumberValue(raw[`${prefix} annual SO2 emissions (tons)`]),
      annualCo2EmissionsTons: sanitizeNumberValue(raw[`${prefix} annual CO2 emissions (tons)`]),
      annualCh4EmissionsLbs: sanitizeNumberValue(raw[`${prefix} annual CH4 emissions (lbs)`]),
      annualN2oEmissionsLbs: sanitizeNumberValue(raw[`${prefix} annual N2O emissions (lbs)`]),
      annualCo2EquivalentEmissionsTons: sanitizeNumberValue(raw[`${prefix} annual CO2 equivalent emissions (tons)`]),
      annualHgEmissionsLbs: sanitizeNumberValue(raw[`${prefix} annual Hg emissions (lbs)`]),
      annualNoxTotalOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual NOx total output emission rate (lb/MWh)`],
      ),
      ozoneSeasonNoxTotalOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} ozone season NOx total output emission rate (lb/MWh)`],
      ),
      annualSo2TotalOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual SO2 total output emission rate (lb/MWh)`],
      ),
      annualCo2TotalOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual CO2 total output emission rate (lb/MWh)`],
      ),
      annualCh4TotalOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual CH4 total output emission rate (lb/MWh)`],
      ),
      annualN2oTotalOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual N2O total output emission rate (lb/MWh)`],
      ),
      annualCo2EquivalentTotalOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual CO2 equivalent total output emission rate (lb/MWh)`],
      ),
      annualHgTotalOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual Hg total output emission rate (lb/MWh)`],
      ),
      annualNoxInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual NOx input emission rate (lb/MMBtu)`],
      ),
      ozoneSeasonNoxInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} ozone season NOx input emission rate (lb/MMBtu)`],
      ),
      annualSo2InputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual SO2 input emission rate (lb/MMBtu)`],
      ),
      annualCo2InputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual CO2 input emission rate (lb/MMBtu)`],
      ),
      annualCh4InputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual CH4 input emission rate (lb/MMBtu)`],
      ),
      annualN2oInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual N2O input emission rate (lb/MMBtu)`],
      ),
      annualCo2EquivalentInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual CO2 equivalent input emission rate (lb/MMBtu)`],
      ),
      annualHgInputEmissionRateLbMmbtu: sanitizeNumberValue(raw[`${prefix} annual Hg input emission rate (lb/MMBtu)`]),
      annualNoxCombustionOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual NOx combustion output emission rate (lb/MWh)`],
      ),
      ozoneSeasonNoxCombustionOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} ozone season NOx combustion output emission rate (lb/MWh)`],
      ),
      annualSo2CombustionOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual SO2 combustion output emission rate (lb/MWh)`],
      ),
      annualCo2CombustionOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual CO2 combustion output emission rate (lb/MWh)`],
      ),
      annualCh4CombustionOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual CH4 combustion output emission rate (lb/MWh)`],
      ),
      annualN2oCombustionOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual N2O combustion output emission rate (lb/MWh)`],
      ),
      annualCo2EquivalentCombustionOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual CO2 equivalent combustion output emission rate (lb/MWh)`],
      ),
      annualHgCombustionOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual Hg combustion output emission rate (lb/MWh)`],
      ),
      annualNoxCoalOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual NOx coal output emission rate (lb/MWh)`],
      ),
      annualNoxOilOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual NOx oil output emission rate (lb/MWh)`],
      ),
      annualNoxGasOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual NOx gas output emission rate (lb/MWh)`],
      ),
      annualNoxFossilFuelOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual NOx fossil fuel output emission rate (lb/MWh)`],
      ),
      ozoneSeasonNoxCoalOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} ozone season NOx coal output emission rate (lb/MWh)`],
      ),
      ozoneSeasonNoxOilOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} ozone season NOx oil output emission rate (lb/MWh)`],
      ),
      ozoneSeasonNoxGasOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} ozone season NOx gas output emission rate (lb/MWh)`],
      ),
      ozoneSeasonNoxFossilFuelOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} ozone season NOx fossil fuel output emission rate (lb/MWh)`],
      ),
      annualSo2CoalOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual SO2 coal output emission rate (lb/MWh)`],
      ),
      annualSo2OilOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual SO2 oil output emission rate (lb/MWh)`],
      ),
      annualSo2GasOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual SO2 gas output emission rate (lb/MWh)`],
      ),
      annualSo2FossilFuelOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual SO2 fossil fuel output emission rate (lb/MWh)`],
      ),
      annualCo2CoalOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual CO2 coal output emission rate (lb/MWh)`],
      ),
      annualCo2OilOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual CO2 oil output emission rate (lb/MWh)`],
      ),
      annualCo2GasOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual CO2 gas output emission rate (lb/MWh)`],
      ),
      annualCo2FossilFuelOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual CO2 fossil fuel output emission rate (lb/MWh)`],
      ),
      annualCh4CoalOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual CH4 coal output emission rate (lb/MWh)`],
      ),
      annualCh4OilOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual CH4 oil output emission rate (lb/MWh)`],
      ),
      annualCh4GasOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual CH4 gas output emission rate (lb/MWh)`],
      ),
      annualCh4FossilFuelOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual CH4 fossil fuel output emission rate (lb/MWh)`],
      ),
      annualN2oCoalOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual N2O coal output emission rate (lb/MWh)`],
      ),
      annualN2oOilOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual N2O oil output emission rate (lb/MWh)`],
      ),
      annualN2oGasOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual N2O gas output emission rate (lb/MWh)`],
      ),
      annualN2oFossilFuelOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual N2O fossil fuel output emission rate (lb/MWh)`],
      ),
      annualCo2EquivalentCoalOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual CO2 equivalent coal output emission rate (lb/MWh)`],
      ),
      annualCo2EquivalentOilOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual CO2 equivalent oil output emission rate (lb/MWh)`],
      ),
      annualCo2EquivalentGasOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual CO2 equivalent gas output emission rate (lb/MWh)`],
      ),
      annualCo2EquivalentFossilFuelOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual CO2 equivalent fossil fuel output emission rate (lb/MWh)`],
      ),
      annualHgCoalOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual Hg coal output emission rate (lb/MWh)`],
      ),
      annualHgFossilFuelOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual Hg fossil fuel output emission rate (lb/MWh)`],
      ),
      annualNoxCoalInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual NOx coal input emission rate (lb/MMBtu)`],
      ),
      annualNoxOilInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual NOx oil input emission rate (lb/MMBtu)`],
      ),
      annualNoxGasInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual NOx gas input emission rate (lb/MMBtu)`],
      ),
      annualNoxFossilFuelInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual NOx fossil fuel input emission rate (lb/MMBtu)`],
      ),
      ozoneSeasonNoxCoalInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} ozone season NOx coal input emission rate (lb/MMBtu)`],
      ),
      ozoneSeasonNoxOilInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} ozone season NOx oil input emission rate (lb/MMBtu)`],
      ),
      ozoneSeasonNoxGasInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} ozone season NOx gas input emission rate (lb/MMBtu)`],
      ),
      ozoneSeasonNoxFossilFuelInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} ozone season NOx fossil fuel input emission rate (lb/MMBtu)`],
      ),
      annualSo2CoalInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual SO2 coal input emission rate (lb/MMBtu)`],
      ),
      annualSo2OilInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual SO2 oil input emission rate (lb/MMBtu)`],
      ),
      annualSo2GasInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual SO2 gas input emission rate (lb/MMBtu)`],
      ),
      annualSo2FossilFuelInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual SO2 fossil fuel input emission rate (lb/MMBtu)`],
      ),
      annualCo2CoalInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual CO2 coal input emission rate (lb/MMBtu)`],
      ),
      annualCo2OilInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual CO2 oil input emission rate (lb/MMBtu)`],
      ),
      annualCo2GasInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual CO2 gas input emission rate (lb/MMBtu)`],
      ),
      annualCo2FossilFuelInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual CO2 fossil fuel input emission rate (lb/MMBtu)`],
      ),
      annualCh4CoalInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual CH4 coal input emission rate (lb/MMBtu)`],
      ),
      annualCh4OilInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual CH4 oil input emission rate (lb/MMBtu)`],
      ),
      annualCh4GasInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual CH4 gas input emission rate (lb/MMBtu)`],
      ),
      annualCh4FossilFuelInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual CH4 fossil fuel input emission rate (lb/MMBtu)`],
      ),
      annualN2oCoalInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual N2O coal input emission rate (lb/MMBtu)`],
      ),
      annualN2oOilInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual N2O oil input emission rate (lb/MMBtu)`],
      ),
      annualN2oGasInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual N2O gas input emission rate (lb/MMBtu)`],
      ),
      annualN2oFossilFuelInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual N2O fossil fuel input emission rate (lb/MMBtu)`],
      ),
      annualCo2EquivalentCoalInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual CO2 equivalent coal input emission rate (lb/MMBtu)`],
      ),
      annualCo2EquivalentOilInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual CO2 equivalent oil input emission rate (lb/MMBtu)`],
      ),
      annualCo2EquivalentGasInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual CO2 equivalent gas input emission rate (lb/MMBtu)`],
      ),
      annualCo2EquivalentFossilFuelInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual CO2 equivalent fossil fuel input emission rate (lb/MMBtu)`],
      ),
      annualHgCoalInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual Hg coal input emission rate (lb/MMBtu)`],
      ),
      annualHgFossilFuelInputEmissionRateLbMmbtu: sanitizeNumberValue(
        raw[`${prefix} annual Hg fossil fuel input emission rate (lb/MMBtu)`],
      ),
      annualNoxNonbaseloadOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual NOx non-baseload output emission rate (lb/MWh)`],
      ),
      ozoneSeasonNoxNonbaseloadOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} ozone season NOx non-baseload output emission rate (lb/MWh)`],
      ),
      annualSo2NonbaseloadOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual SO2 non-baseload output emission rate (lb/MWh)`],
      ),
      annualCo2NonbaseloadOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual CO2 non-baseload output emission rate (lb/MWh)`],
      ),
      annualCh4NonbaseloadOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual CH4 non-baseload output emission rate (lb/MWh)`],
      ),
      annualN2oNonbaseloadOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual N2O non-baseload output emission rate (lb/MWh)`],
      ),
      annualCo2EquivalentNonbaseloadOutputEmissionRateLbMwh: raw[
        `${prefix} annual CO2e non-baseload output emission rate (lb/MWh)`
      ]
        ? sanitizeNumberValue(raw[`${prefix} annual CO2e non-baseload output emission rate (lb/MWh)`])
        : sanitizeNumberValue(raw[`${prefix} annual CO2 equivalent non-baseload output emission rate (lb/MWh)`]),
      annualHgNonbaseloadOutputEmissionRateLbMwh: sanitizeNumberValue(
        raw[`${prefix} annual Hg non-baseload output emission rate (lb/MWh)`],
      ),
      annualCoalNetGenerationMwh: sanitizeNumberValue(raw[`${prefix} annual coal net generation (MWh)`]),
      annualOilNetGenerationMwh: sanitizeNumberValue(raw[`${prefix} annual oil net generation (MWh)`]),
      annualGasNetGenerationMwh: sanitizeNumberValue(raw[`${prefix} annual gas net generation (MWh)`]),
      annualNuclearNetGenerationMwh: sanitizeNumberValue(raw[`${prefix} annual nuclear net generation (MWh)`]),
      annualHydroNetGenerationMwh: sanitizeNumberValue(raw[`${prefix} annual hydro net generation (MWh)`]),
      annualBiomassNetGenerationMwh: sanitizeNumberValue(raw[`${prefix} annual biomass net generation (MWh)`]),
      annualWindNetGenerationMwh: sanitizeNumberValue(raw[`${prefix} annual wind net generation (MWh)`]),
      annualSolarNetGenerationMwh: sanitizeNumberValue(raw[`${prefix} annual solar net generation (MWh)`]),
      annualGeothermalNetGenerationMwh: sanitizeNumberValue(raw[`${prefix} annual geothermal net generation (MWh)`]),
      annualOtherFossilNetGenerationMwh: sanitizeNumberValue(raw[`${prefix} annual other fossil net generation (MWh)`]),
      annualOtherUnknownPurchasedFuelNetGenerationMwh: sanitizeNumberValue(
        raw[`${prefix} annual other unknown/ purchased fuel net generation (MWh)`],
      ),
      annualTotalNonrenewablesNetGenerationMwh: sanitizeNumberValue(
        raw[`${prefix} annual total nonrenewables net generation (MWh)`],
      ),
      annualTotalRenewablesNetGenerationMwh: sanitizeNumberValue(
        raw[`${prefix} annual total renewables net generation (MWh)`],
      ),
      annualTotalNonhydroRenewablesNetGenerationMwh: sanitizeNumberValue(
        raw[`${prefix} annual total nonhydro renewables net generation (MWh)`],
      ),
      annualTotalCombustionNetGenerationMwh: sanitizeNumberValue(
        raw[`${prefix} annual total combustion net generation (MWh)`],
      ),
      annualTotalNoncombustionNetGenerationMwh: sanitizeNumberValue(
        raw[`${prefix} annual total noncombustion net generation (MWh)`],
      ),
      coalGenerationPercentResourceMix: sanitizeNumberValue(raw[`${prefix} coal generation percent (resource mix)`]),
      oilGenerationPercentResourceMix: sanitizeNumberValue(raw[`${prefix} oil generation percent (resource mix)`]),
      gasGenerationPercentResourceMix: sanitizeNumberValue(raw[`${prefix} gas generation percent (resource mix)`]),
      nuclearGenerationPercentResourceMix: sanitizeNumberValue(
        raw[`${prefix} nuclear generation percent (resource mix)`],
      ),
      hydroGenerationPercentResourceMix: sanitizeNumberValue(raw[`${prefix} hydro generation percent (resource mix)`]),
      biomassGenerationPercentResourceMix: sanitizeNumberValue(
        raw[`${prefix} biomass generation percent (resource mix)`],
      ),
      windGenerationPercentResourceMix: sanitizeNumberValue(raw[`${prefix} wind generation percent (resource mix)`]),
      solarGenerationPercentResourceMix: sanitizeNumberValue(raw[`${prefix} solar generation percent (resource mix)`]),
      geothermalGenerationPercentResourceMix: sanitizeNumberValue(
        raw[`${prefix} geothermal generation percent (resource mix)`],
      ),
      otherFossilGenerationPercentResourceMix: sanitizeNumberValue(
        raw[`${prefix} other fossil generation percent (resource mix)`],
      ),
      otherUnknownPurchasedFuelGenerationPercentResourceMix: sanitizeNumberValue(
        raw[`${prefix} other unknown/ purchased fuel generation percent (resource mix)`],
      ),
      totalNonrenewablesGenerationPercentResourceMix: sanitizeNumberValue(
        raw[`${prefix} total nonrenewables generation percent (resource mix)`],
      ),
      totalRenewablesGenerationPercentResourceMix: sanitizeNumberValue(
        raw[`${prefix} total renewables generation percent (resource mix)`],
      ),
      totalNonhydroRenewablesGenerationPercentResourceMix: sanitizeNumberValue(
        raw[`${prefix} total nonhydro renewables generation percent (resource mix)`],
      ),
      totalCombustionGenerationPercentResourceMix: sanitizeNumberValue(
        raw[`${prefix} total combustion generation percent (resource mix)`],
      ),
      totalNoncombustionGenerationPercentResourceMix: sanitizeNumberValue(
        raw[`${prefix} total noncombustion generation percent (resource mix)`],
      ),
      annualNonbaseloadCoalNetGenerationMwh: sanitizeNumberValue(
        raw[`${prefix} annual nonbaseload coal net generation (MWh)`],
      ),
      annualNonbaseloadOilNetGenerationMwh: sanitizeNumberValue(
        raw[`${prefix} annual nonbaseload oil net generation (MWh)`],
      ),
      annualNonbaseloadGasNetGenerationMwh: sanitizeNumberValue(
        raw[`${prefix} annual nonbaseload gas net generation (MWh)`],
      ),
      annualNonbaseloadNuclearNetGenerationMwh: sanitizeNumberValue(
        raw[`${prefix} annual nonbaseload nuclear net generation (MWh)`],
      ),
      annualNonbaseloadHydroNetGenerationMwh: sanitizeNumberValue(
        raw[`${prefix} annual nonbaseload hydro net generation (MWh)`],
      ),
      annualNonbaseloadBiomassNetGenerationMwh: sanitizeNumberValue(
        raw[`${prefix} annual nonbaseload biomass net generation (MWh)`],
      ),
      annualNonbaseloadWindNetGenerationMwh: sanitizeNumberValue(
        raw[`${prefix} annual nonbaseload wind net generation (MWh)`],
      ),
      annualNonbaseloadSolarNetGenerationMwh: sanitizeNumberValue(
        raw[`${prefix} annual nonbaseload solar net generation (MWh)`],
      ),
      annualNonbaseloadGeothermalNetGenerationMwh: sanitizeNumberValue(
        raw[`${prefix} annual nonbaseload geothermal net generation (MWh)`],
      ),
      annualNonbaseloadOtherFossilNetGenerationMwh: sanitizeNumberValue(
        raw[`${prefix} annual nonbaseload other fossil net generation (MWh)`],
      ),
      annualNonbaseloadOtherUnknownPurchasedFuelNetGenerationMwh: sanitizeNumberValue(
        raw[`${prefix} annual nonbaseload other unknown/ purchased fuel net generation (MWh)`],
      ),
      nonbaseloadCoalGenerationPercentResourceMix: sanitizeNumberValue(
        raw[`${prefix} nonbaseload coal generation percent (resource mix)`],
      ),
      nonbaseloadOilGenerationPercentResourceMix: sanitizeNumberValue(
        raw[`${prefix} nonbaseload oil generation percent (resource mix)`],
      ),
      nonbaseloadGasGenerationPercentResourceMix: sanitizeNumberValue(
        raw[`${prefix} nonbaseload gas generation percent (resource mix)`],
      ),
      nonbaseloadNuclearGenerationPercentResourceMix: sanitizeNumberValue(
        raw[`${prefix} nonbaseload nuclear generation percent (resource mix)`],
      ),
      nonbaseloadHydroGenerationPercentResourceMix: sanitizeNumberValue(
        raw[`${prefix} nonbaseload hydro generation percent (resource mix)`],
      ),
      nonbaseloadBiomassGenerationPercentResourceMix: sanitizeNumberValue(
        raw[`${prefix} nonbaseload biomass generation percent (resource mix)`],
      ),
      nonbaseloadWindGenerationPercentResourceMix: sanitizeNumberValue(
        raw[`${prefix} nonbaseload wind generation percent (resource mix)`],
      ),
      nonbaseloadSolarGenerationPercentResourceMix: sanitizeNumberValue(
        raw[`${prefix} nonbaseload solar generation percent (resource mix)`],
      ),
      nonbaseloadGeothermalGenerationPercentResourceMix: sanitizeNumberValue(
        raw[`${prefix} nonbaseload geothermal generation percent (resource mix)`],
      ),
      nonbaseloadOtherFossilGenerationPercentResourceMix: sanitizeNumberValue(
        raw[`${prefix} nonbaseload other fossil generation percent (resource mix)`],
      ),
      nonbaseloadOtherUnknownPurchasedFuelGenerationPercentResourceMix: sanitizeNumberValue(
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
    return subregionData
      .slice(1)
      .map((raw: unknown) => {
        const decodedRaw = trimColumnNames(z.record(z.unknown()).parse(raw));
        const location = sanitizeStringValue(decodedRaw[SUBREGION_LOCATION_FIELD]);
        const { data: decodedLocation } = EgridLocation.safeParse(location);
        if (!decodedLocation) {
          return null;
        }
        return transformRawData(decodedRaw, YEAR, decodedLocation, SUBREGION_PREFIX);
      })
      .filter((record) => record !== null);
  }
  throw new AppError(AppErrorCode.enum.SERVICE_ERROR, "Unable to find subregion data in eGRID file");
};

const transformStateData = (stateSheet: XLSX.WorkSheet): EgridRecord[] => {
  const stateData = XLSX.utils.sheet_to_json(stateSheet);
  if (stateData.length > 1) {
    return stateData
      .slice(1)
      .map((raw: unknown) => {
        const decodedRaw = trimColumnNames(z.record(z.unknown()).parse(raw));
        const location = sanitizeStringValue(decodedRaw[STATE_LOCATION_FIELD]);
        const { data: decodedLocation } = EgridLocation.safeParse(location);
        if (!decodedLocation) {
          return null;
        }
        return transformRawData(decodedRaw, YEAR, decodedLocation, STATE_PREFIX);
      })
      .filter((record) => record !== null);
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
