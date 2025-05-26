"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalculateInput, CalculateResult } from "@/schema/api";
import { FormulaResultCell } from "./formula-result-cell";
import { ResultCell } from "./result-cell";
import { getAdditionalHumanMortalityCell, getBaselineCWarmingCell, SSP } from "../../../utils/ssp-data";

const SSP_EXPLANATION =
  "CO₂ emissions leads to increased atmospheric concetration of CO₂ which leads to a global temerature rise which leads to increased human mortalities";

interface ResultsTableProps {
  inputs: CalculateInput;
  results: CalculateResult;
}

const ResultsTable = (props: ResultsTableProps) => {
  const { inputs, results } = props;
  const yearOfStudy = inputs.yearOfStudy;
  const endOfLife = inputs.startYear + inputs.lifeTimeYears;

  return (
    <>
      <style jsx global>{`
        .compact-table tr,
        .compact-table td,
        .compact-table th {
          padding-top: 0.25rem;
          padding-bottom: 0.25rem;
          font-size: 0.875rem;
          line-height: 1.25rem;
          border: 0.5px solid black;
          color: black;
        }

        .green-cell {
          background-color: #99ccc1;
        }
      `}</style>

      <div className="w-full mx-auto">
        <Table className="text-white compact-table">
          <TableHeader>
            <TableRow>
              <TableHead colSpan={4} className="text-center font-bold green-cell">
                Calculated Results
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* First data row */}
            {/* <TableRow>
              <TableCell>This amount of annual electricity generation is</TableCell>
              <TableCell className="text-center font-bold green-cell">10.13%</TableCell>
              <TableCell colSpan={2}>of Californias annual electricity consumption.</TableCell>
            </TableRow> */}

            {/* FIRST SECTION */}
            <TableRow>
              <TableCell colSpan={4}>An equivalent amount of electricity would be produced annually by:</TableCell>
            </TableRow>

            {/* Energy source rows - left and right columns */}
            <TableRow>
              <FormulaResultCell results={results} formulaId="averageCoalPlantsInCalifornia" />
              <TableCell>Average coal plants in California</TableCell>
              <FormulaResultCell results={results} formulaId="averageOilPlantsInCalifornia" />
              <TableCell>Average oil plants in California</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell results={results} formulaId="averageNaturalGasPlantsInCalifornia" />
              <TableCell>Average natural gas plants in California</TableCell>
              <FormulaResultCell results={results} formulaId={null} />
              <TableCell>Average fossil fuel plants in California</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell results={results} formulaId="averageNuclearPlantsInCalifornia" />
              <TableCell>Average nuclear plants in California</TableCell>
              <FormulaResultCell results={results} formulaId="averageAcresOfSolarInCalifornia" />
              <TableCell>Average acres of solar in California (*ESTIMATED*)</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell results={results} formulaId="averageOnshoreWindTurbinesInCalifornia" />
              <TableCell>Average onshore wind turbines in California (*ESTIMATED*)</TableCell>
              <FormulaResultCell results={results} formulaId="averageOffshoreWindTurbinesInCalifornia" />
              <TableCell>Average offshore wind turbines in California (*ESTIMATED*)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} className="h-12" />
            </TableRow>

            {/* BEGINNING OF SECOND SECTION */}
            <TableRow>
              <TableCell colSpan={4}>
                The above user input kWh electricity consumed/reduced has an equivalent emissions of:
              </TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell results={results} formulaId="electricityReductionsCO2Emissions" />
              <TableCell>Metric tons Carbon Dioxide (CO₂)</TableCell>
              <FormulaResultCell results={results} formulaId="lbsCO2MWhEmissionRate" />
              <TableCell>lbs CO₂/MWh Emission Rate</TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4}>This amount of annual emissions is equivalent to annual emissions of:</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell results={results} formulaId="effectivekWhReduced" />
              <TableCell>kWh-Reduced</TableCell>
              <FormulaResultCell results={results} formulaId="effectivekWhConsumed" />
              <TableCell>kWh-Consumed</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell results={results} formulaId="gallonsOfGasolineBurnedEquivalentCO2Emissions" />
              <TableCell>Gallons of Gasoline Burned</TableCell>
              <FormulaResultCell results={results} formulaId="gallonsOfDieselConsumedEquivalentCO2Emissions" />
              <TableCell>Gallons of Diesel Burned</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell
                results={results}
                formulaId="gasolinePoweredPassengerVehiclesPerYearEquivalentCO2Emissions"
              />
              <TableCell>Gas Powered Passenger Vehicles Per Year</TableCell>
              <FormulaResultCell
                results={results}
                formulaId="milesDrivenByTheAverageGasolinePoweredPassengerVehicleEquivalentCO2Emissions"
              />
              <TableCell>Miles Driven by Gas Passenger Vehicles</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell results={results} formulaId="thermsOfNaturalGasEquivalentCO2Emissions" />
              <TableCell>therms Natural Gas Burned</TableCell>
              <FormulaResultCell results={results} formulaId="mcfOfNaturalGasEquivalentCO2Emissions" />
              <TableCell>Mcf Natural Gas Burned</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell results={results} formulaId="barrelsOfOilConsumedEquivalentCO2Emissions" />
              <TableCell>Barrels of Oil Burned</TableCell>
              <FormulaResultCell results={results} formulaId="tankerTrucksFilledWithGasolineEquivalentEmissions" />
              <TableCell>Tanker Trucks of Oil Burned</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell results={results} formulaId="homeYearlyElectricityUseEquivalentEmissions" />
              <TableCell>Household Yearly Electricity Use</TableCell>
              <FormulaResultCell results={results} formulaId="homeYearlyTotalEnergyUseEquivalentEmissions" />
              <TableCell>Household Yearly Energy Use</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell
                results={results}
                formulaId="numberOfIncandescentBulbsSwitchedToLightEmittingDiodeBulbsInOperationForAYearEmissionsSavedEquivalentEmissions"
              />
              <TableCell>Incandescent Bulbs switched to LEDs Reduction</TableCell>
              <FormulaResultCell
                results={results}
                formulaId="numberOfUrbanTreeSeedlingsGrownFor10YearsEquivalentCarbonFixation"
              />
              <TableCell>Urban Tree Seedlings Grown for 10yr Equiv Emission Sequestering</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell
                results={results}
                formulaId="acresOfUSForestPreservedFromConversionToCroplandEquivalentEmissions"
              />
              <TableCell>Acres prevented from conversion to cropland in year of conversion</TableCell>
              <FormulaResultCell results={results} formulaId="acresOfUSForestsEquivalentCO2SequesteringForOneYear" />
              <TableCell>Average Forestry Acres Per Year Equiv Emission Sequestering</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell results={results} formulaId="propaneCylindersUsedForHomeBarbecues" />
              <TableCell>Propane cylinders used for home barbecues</TableCell>
              <FormulaResultCell results={results} formulaId="railcarsOfCoalBurned" />
              <TableCell>Railcars of coal burned</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell results={results} formulaId="poundsOfCoalBurned" />
              <TableCell>Pounds of coal burned</TableCell>
              <FormulaResultCell results={results} formulaId="trashBagsOfWasteRecycledInsteadOfLandfilled" />
              <TableCell>Trash bags of waste recycled instead of landfilled</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell results={results} formulaId="tonsOfWasteRecycledInsteadOfLandfilled" />
              <TableCell>Tons of waste recycled instead of landfilled</TableCell>
              <FormulaResultCell
                results={results}
                formulaId="numberOfGarbageTrucksOfWasteRecycledInsteadOfLandfilled"
              />
              <TableCell>Number of garbage trucks of waste recycled instead of landfilled</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell results={results} formulaId="coalFiredPowerPlantEmissionsForOneYear" />
              <TableCell>Coal-fired power plant emissions for one year</TableCell>
              <FormulaResultCell results={results} formulaId="naturalGasFiredPowerPlantEmissionsForOneYear" />
              <TableCell>Natural gas-fired power plant emissions for one year</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell results={results} formulaId="numberOfWindTurbinesRunningForAYear" />
              <TableCell>Number of wind turbines running for a year</TableCell>
              <FormulaResultCell results={results} formulaId="numberOfSmartPhonesCharged" />
              <TableCell>Number of smart phones charged</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell results={results} formulaId="resultantConcentrationCO2IncreaseInTheAtmosphere" />
              <TableCell>ppm Concentration CO₂ Increase in the Atmosphere</TableCell>
              <FormulaResultCell results={results} formulaId="resultantTemperatureRise" />
              <TableCell>°C Additional Temperature Rise</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell results={results} formulaId="additionalPeopleExposedToUnprecedentedHeatIn2070" />
              <TableCell>Additional People Exposed to Unprecedented Heat in 2070 @ UI</TableCell>
              <FormulaResultCell results={results} formulaId="additionalPeopleOutsideTheHumanNicheIn2070" />
              <TableCell>Additional People Outside Niche in 2070 (Temp+Demo) @ UI</TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4} className="h-12" />
            </TableRow>

            {/* BEGINNING OF THIRD SECTION */}

            <TableRow>
              <TableCell colSpan={2}>This amount of emissions per year results in</TableCell>
              <FormulaResultCell results={results} formulaId="lifetimeMetricTonsOfCO2" />
              <TableCell>
                Total Metric tons Carbon Dioxide (CO₂) by the end of lifetime (assuming constant grid emission rates)
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4}>Which is equivalent to the emissions of:</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell results={results} formulaId="lifetimeEffectivekWhReduced" />
              <TableCell>kWh-Reduced</TableCell>
              <FormulaResultCell results={results} formulaId="lifetimeEffectivekWhConsumed" />
              <TableCell>kWh-Consumed</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell results={results} formulaId="lifetimeGallonsOfGasolineBurnedEquivalentCO2Emissions" />
              <TableCell>Gallons of Gasoline Burned</TableCell>
              <FormulaResultCell results={results} formulaId="lifetimeGallonsOfDieselConsumedEquivalentCO2Emissions" />
              <TableCell>Gallons of Diesel Burned</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell
                results={results}
                formulaId="lifetimeGasolinePoweredPassengerVehiclesPerYearEquivalentCO2Emissions"
              />
              <TableCell>Gas Powered Passenger Vehicles Per Year</TableCell>
              <FormulaResultCell
                results={results}
                formulaId="lifetimeMilesDrivenByTheAverageGasolinePoweredPassengerVehicleEquivalentCO2Emissions"
              />
              <TableCell>Miles Driven by Gas Passenger Vehicles</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell results={results} formulaId="lifetimeThermsOfNaturalGasEquivalentCO2Emissions" />
              <TableCell>therms Natural Gas Burned</TableCell>
              <FormulaResultCell results={results} formulaId="lifetimeMcfOfNaturalGasEquivalentCO2Emissions" />
              <TableCell>Mcf Natural Gas Burned</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell results={results} formulaId="lifetimeBarrelsOfOilConsumedEquivalentCO2Emissions" />
              <TableCell>Barrels of Oil Burned</TableCell>
              <FormulaResultCell
                results={results}
                formulaId="lifetimeTankerTrucksFilledWithGasolineEquivalentEmissions"
              />
              <TableCell>Tanker Trucks of Oil Burned</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell results={results} formulaId="lifetimeHomeYearlyElectricityUseEquivalentEmissions" />
              <TableCell>Household Yearly Electricity Use</TableCell>
              <FormulaResultCell results={results} formulaId="lifetimeHomeYearlyTotalEnergyUseEquivalentEmissions" />
              <TableCell>Household Yearly Energy Use</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell
                results={results}
                formulaId="lifetimeNumberOfIncandescentBulbsSwitchedToLightEmittingDiodeBulbsInOperationForAYearEmissionsSavedEquivalentEmissions"
              />
              <TableCell>Incandescent Bulbs switched to LEDs Reduction</TableCell>
              <FormulaResultCell
                results={results}
                formulaId="lifetimeNumberOfUrbanTreeSeedlingsGrownFor10YearsEquivalentCarbonFixation"
              />
              <TableCell>Urban Tree Seedlings Grown for 10yr Equiv Emission Sequestering</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell
                results={results}
                formulaId="lifetimeAcresOfUSForestPreservedFromConversionToCroplandEquivalentEmissions"
              />
              <TableCell>Acres prevented from conversion to cropland in year of conversion</TableCell>
              <FormulaResultCell
                results={results}
                formulaId="lifetimeAcresOfUSForestsEquivalentCO2SequesteringForOneYear"
              />
              <TableCell>Average Forestry Acres Per Year Equiv Emission Sequestering</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell results={results} formulaId="lifetimePropaneCylindersUsedForHomeBarbecues" />
              <TableCell>Propane cylinders used for home barbecues</TableCell>
              <FormulaResultCell results={results} formulaId="lifetimeRailcarsOfCoalBurned" />
              <TableCell>Railcars of coal burned</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell results={results} formulaId="lifetimePoundsOfCoalBurned" />
              <TableCell>Pounds of coal burned</TableCell>
              <FormulaResultCell results={results} formulaId="lifetimeTrashBagsOfWasteRecycledInsteadOfLandfilled" />
              <TableCell>Trash bags of waste recycled instead of landfilled</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell results={results} formulaId="lifetimeTonsOfWasteRecycledInsteadOfLandfilled" />
              <TableCell>Tons of waste recycled instead of landfilled</TableCell>
              <FormulaResultCell
                results={results}
                formulaId="lifetimeNumberOfGarbageTrucksOfWasteRecycledInsteadOfLandfilled"
              />
              <TableCell>Number of garbage trucks of waste recycled instead of landfilled</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell results={results} formulaId="lifetimeCoalFiredPowerPlantEmissionsForOneYear" />
              <TableCell>Coal-fired power plant emissions for one year</TableCell>
              <FormulaResultCell results={results} formulaId="lifetimeNaturalGasFiredPowerPlantEmissionsForOneYear" />
              <TableCell>Natural gas-fired power plant emissions for one year</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell results={results} formulaId="lifetimeNumberOfWindTurbinesRunningForAYear" />
              <TableCell>Number of wind turbines running for a year</TableCell>
              <FormulaResultCell results={results} formulaId="lifetimeNumberOfSmartPhonesCharged" />
              <TableCell>Number of smart phones charged</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell
                results={results}
                formulaId="lifetimeResultantConcentrationCO2IncreaseInTheAtmosphere"
              />
              <TableCell>ppm Concentration CO₂ Increase in the Atmosphere</TableCell>
              <FormulaResultCell results={results} formulaId="lifetimeResultantTemperatureRise" />
              <TableCell>°C Additional Temperature Rise</TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4} className="h-12" />
            </TableRow>

            {/* BEGINNING OF FOURTH SECTION */}
            <TableRow>
              <TableCell colSpan={4}>These total lifetime emissions would result in:</TableCell>
            </TableRow>

            <TableRow>
              <FormulaResultCell results={results} formulaId="additionalPeopleExposedToUnprecedentedHeatIn2070" />
              <TableCell>Additional People Exposed to Unprecedented Heat in 2070 UI</TableCell>
              <FormulaResultCell results={results} formulaId="additionalPeopleOutsideTheHumanNicheIn2070" />
              <TableCell>Additional People Outside Niche in 2070 (Temp+Demo) UI</TableCell>
            </TableRow>

            <TableRow>
              <ResultCell
                value={getBaselineCWarmingCell(endOfLife, SSP.SSP1_1_9) ?? undefined}
                name="Baseline °C Warming by End of Life SSP1-1.9"
                explanation={SSP_EXPLANATION}
              />
              <TableCell>Baseline °C Warming by End of Life SSP1-1.9</TableCell>
              <ResultCell
                value={getBaselineCWarmingCell(yearOfStudy, SSP.SSP1_1_9) ?? undefined}
                name="Baseline °C Warming by Year of Study SSP1-1.9"
                explanation={SSP_EXPLANATION}
              />
              <TableCell>Baseline °C Warming by Year of Study SSP1-1.9</TableCell>
            </TableRow>

            <TableRow>
              <ResultCell
                value={getBaselineCWarmingCell(endOfLife, SSP.SSP1_2_6) ?? undefined}
                name="Baseline °C Warming by End of Life SSP1-2.6"
                explanation={SSP_EXPLANATION}
              />
              <TableCell>Baseline °C Warming by End of Life SSP1-2.6</TableCell>
              <ResultCell
                value={getBaselineCWarmingCell(yearOfStudy, SSP.SSP1_2_6) ?? undefined}
                name="Baseline °C Warming by Year of Study SSP1-2.6"
                explanation={SSP_EXPLANATION}
              />
              <TableCell>Baseline °C Warming by Year of Study SSP1-2.6</TableCell>
            </TableRow>

            <TableRow>
              <ResultCell
                value={getBaselineCWarmingCell(endOfLife, SSP.SSP2_4_5) ?? undefined}
                name="Baseline °C Warming by End of Life SSP2-4.5"
                explanation={SSP_EXPLANATION}
              />
              <TableCell>Baseline °C Warming by End of Life SSP2-4.5</TableCell>
              <ResultCell
                value={getBaselineCWarmingCell(yearOfStudy, SSP.SSP2_4_5) ?? undefined}
                name="Baseline °C Warming by Year of Study SSP2-4.5"
                explanation={SSP_EXPLANATION}
              />
              <TableCell>Baseline °C Warming by Year of Study SSP2-4.5</TableCell>
            </TableRow>

            <TableRow>
              <ResultCell
                value={getBaselineCWarmingCell(endOfLife, SSP.SSP3_7_0) ?? undefined}
                name="Baseline °C Warming by End of Life SSP3-7.0"
                explanation={SSP_EXPLANATION}
              />
              <TableCell>Baseline °C Warming by End of Life SSP3-7.0</TableCell>
              <ResultCell
                value={getBaselineCWarmingCell(yearOfStudy, SSP.SSP3_7_0) ?? undefined}
                name="Baseline °C Warming by Year of Study SSP3-7.0"
                explanation={SSP_EXPLANATION}
              />
              <TableCell>Baseline °C Warming by Year of Study SSP3-7.0</TableCell>
            </TableRow>

            <TableRow>
              <ResultCell
                value={getBaselineCWarmingCell(endOfLife, SSP.SSP5_8_5) ?? undefined}
                name="Baseline °C Warming by End of Life SSP5-8.5"
                explanation={SSP_EXPLANATION}
              />
              <TableCell>Baseline °C Warming by End of Life SSP5-8.5</TableCell>
              <ResultCell
                value={getBaselineCWarmingCell(yearOfStudy, SSP.SSP5_8_5) ?? undefined}
                name="Baseline °C Warming by Year of Study SSP5-8.5"
                explanation={SSP_EXPLANATION}
              />
              <TableCell>Baseline °C Warming by Year of Study SSP5-8.5</TableCell>
            </TableRow>

            <TableRow>
              <ResultCell
                value={getAdditionalHumanMortalityCell(endOfLife, SSP.SSP1_1_9) ?? undefined}
                name="Additional Human Mortalities by End of Life SSP1-1.9"
                explanation={SSP_EXPLANATION}
              />
              <TableCell>Additional Human Mortalities by End of Life SSP1-1.9</TableCell>
              <ResultCell
                value={getAdditionalHumanMortalityCell(yearOfStudy, SSP.SSP1_1_9) ?? undefined}
                name="Additional Human Mortalities by Year of Study SSP1-1.9"
                explanation={SSP_EXPLANATION}
              />
              <TableCell>Additional Human Mortalities by Year of Study SSP1-1.9</TableCell>
            </TableRow>

            <TableRow>
              <ResultCell
                value={getAdditionalHumanMortalityCell(endOfLife, SSP.SSP1_2_6) ?? undefined}
                name="Additional Human Mortalities by End of Life SSP1-2.6"
                explanation={SSP_EXPLANATION}
              />
              <TableCell>Additional Human Mortalities by End of Life SSP1-2.6</TableCell>
              <ResultCell
                value={getAdditionalHumanMortalityCell(yearOfStudy, SSP.SSP1_2_6) ?? undefined}
                name="Additional Human Mortalities by Year of Study SSP1-2.6"
                explanation={SSP_EXPLANATION}
              />
              <TableCell>Additional Human Mortalities by Year of Study SSP1-2.6</TableCell>
            </TableRow>

            <TableRow>
              <ResultCell
                value={getAdditionalHumanMortalityCell(endOfLife, SSP.SSP2_4_5) ?? undefined}
                name="Additional Human Mortalities by End of Life SSP2-4.5"
                explanation={SSP_EXPLANATION}
              />
              <TableCell>Additional Human Mortalities by End of Life SSP2-4.5</TableCell>
              <ResultCell
                value={getAdditionalHumanMortalityCell(yearOfStudy, SSP.SSP2_4_5) ?? undefined}
                name="Additional Human Mortalities by Year of Study SSP2-4.5"
                explanation={SSP_EXPLANATION}
              />
              <TableCell>Additional Human Mortalities by Year of Study SSP2-4.5</TableCell>
            </TableRow>

            <TableRow>
              <ResultCell
                value={getAdditionalHumanMortalityCell(endOfLife, SSP.SSP3_7_0) ?? undefined}
                name="Additional Human Mortalities by End of Life SSP3-7.0"
                explanation={SSP_EXPLANATION}
              />
              <TableCell>Additional Human Mortalities by End of Life SSP3-7.0</TableCell>
              <ResultCell
                value={getAdditionalHumanMortalityCell(yearOfStudy, SSP.SSP3_7_0) ?? undefined}
                name="Additional Human Mortalities by Year of Study SSP3-7.0"
                explanation={SSP_EXPLANATION}
              />
              <TableCell>Additional Human Mortalities by Year of Study SSP3-7.0</TableCell>
            </TableRow>

            <TableRow>
              <ResultCell
                value={getAdditionalHumanMortalityCell(endOfLife, SSP.SSP5_8_5) ?? undefined}
                name="Additional Human Mortalities by End of Life SSP5-8.5"
                explanation={SSP_EXPLANATION}
              />
              <TableCell>Additional Human Mortalities by End of Life SSP5-8.5</TableCell>
              <ResultCell
                value={getAdditionalHumanMortalityCell(yearOfStudy, SSP.SSP5_8_5) ?? undefined}
                name="Additional Human Mortalities by Year of Study SSP5-8.5"
                explanation={SSP_EXPLANATION}
              />
              <TableCell>Additional Human Mortalities by Year of Study SSP5-8.5</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ResultsTable;
