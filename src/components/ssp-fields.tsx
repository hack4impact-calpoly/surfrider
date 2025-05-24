"use client";

import { useState } from "react";
import { RedLineChart, BlueLineChart } from "@/components/ssp-charts";
import { BlueCard, RedCard } from "@/components/ssp-cards";
import { CalculateInput } from "@/schema/api";
import { getAdditionalHumanMortalityColumn, getBaselineCWarmingColumn, SSP } from "@/utils/ssp-data";

interface SspFieldsProps {
  // endOfLifeYear: string; -> user input (startYear + lifeTimeYears)
  // endOfLifeMortality: string; -> hardcoded in mortalityPoints
  // endOfLifeTemperature: string; -> hardcoded in tempPoints
  // yearOfStudy: string; -> user input
  // yearOfStudyMortality: string; -> hardcoded in mortalityPoints
  // yearOfStudyTemperature: string; -> hardcoded in tempPoints
  inputs: CalculateInput;
}

export default function SspFields(props: SspFieldsProps) {
  const { inputs } = props;

  const [hoverMortalityYear, setHoverMortalityYear] = useState<string | null>(null);
  const [hoverTemperatureYear, setHoverTemperatureYear] = useState<string | null>(null);

  const endOfLifeYear = (inputs.startYear + inputs.lifeTimeYears).toString();
  const yearOfStudy = inputs.yearOfStudy.toString();

  const buildYearValueMap = (start: number, values: number[]) => {
    return values.reduce(
      (acc, value, i) => {
        const year = (start + i).toString();
        acc[year] = value;
        return acc;
      },
      {} as Record<string, number>,
    );
  };

  const getSafeValue = (data: Record<string, number>, key: string | number): string | number => {
    return key in data ? data[key] : "--";
  };

  const mortalityPoints = getAdditionalHumanMortalityColumn(SSP.SSP1_2_6);
  const tempPoints = getBaselineCWarmingColumn(SSP.SSP1_2_6);
  const mortalityData = buildYearValueMap(2015, mortalityPoints);
  const temperatureData = buildYearValueMap(2015, tempPoints);

  return (
    <section className="mx-auto max-w-6xl">
      <div className="bg-white shadow-sm">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:grid-rows-2 md:gap-x-8 md:gap-y-8">
          {/* Row 1 */}
          <div className="md:col-span-2 md:row-span-1 flex justify-center">
            <BlueLineChart
              labels={Object.keys(mortalityData)}
              dataPoints={mortalityPoints}
              title="Additional Human Mortalities: SSP1-2.6"
              yLabel="Mortalities"
              endOfLifeYear={endOfLifeYear}
              yearOfStudy={yearOfStudy}
              onHoverYearChange={setHoverMortalityYear}
            />
          </div>
          <div className="md:col-span-1 md:row-span-1 flex justify-start pl-[10%]">
            <BlueCard
              endOfLifeYear={endOfLifeYear}
              endOfLifeValue={getSafeValue(mortalityData, endOfLifeYear)}
              yearOfStudy={yearOfStudy}
              yearOfStudyValue={getSafeValue(mortalityData, yearOfStudy)}
              hoverYear={hoverMortalityYear}
            />
          </div>

          {/* Row 2 */}
          <div className="md:col-span-2 md:row-span-1 flex justify-center">
            <RedLineChart
              labels={Object.keys(temperatureData)}
              dataPoints={tempPoints}
              title="Baseline °C Warming SSP1-2.6"
              yLabel="Temperature (°C)"
              endOfLifeYear={endOfLifeYear}
              yearOfStudy={yearOfStudy}
              onHoverYearChange={setHoverTemperatureYear}
            />
          </div>
          <div className="md:col-span-1 md:row-span-1 flex justify-start pl-[10%]">
            <RedCard
              endOfLifeYear={endOfLifeYear}
              endOfLifeValue={getSafeValue(temperatureData, endOfLifeYear)}
              yearOfStudy={yearOfStudy}
              yearOfStudyValue={getSafeValue(temperatureData, yearOfStudy)}
              hoverYear={hoverTemperatureYear}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
