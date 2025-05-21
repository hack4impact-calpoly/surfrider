"use client";

import { useState } from "react";
import { RedLineChart, BlueLineChart } from "@/components/ssp-charts";
import { BlueCard, RedCard } from "@/components/ssp-cards";
import { CalculateInput } from "@/schema/api";

interface SspFieldsProps {
  // endOfLifeYear: string; -> user input (startYear + lifeTimeYears)
  // endOfLifeMortality: string; -> hardcoded in mortalityPoints
  // endOfLifeTemperature: string; -> hardcoded in tempPoints
  // yearOfStudy: string; -> user input
  // yearOfStudyMortality: string; -> hardcoded in mortalityPoints
  // yearOfStudyTemperature: string; -> hardcoded in tempPoints
  inputs: CalculateInput | null;
}

export default function SspFields(props: SspFieldsProps) {
  const { inputs } = props;

  const [hoverMortalityYear, setHoverMortalityYear] = useState<string | null>(null);
  const [hoverTemperatureYear, setHoverTemperatureYear] = useState<string | null>(null);

  const endOfLifeYear = (inputs!.startYear + inputs!.lifeTimeYears).toString();
  const yearOfStudy = inputs!.yearOfStudy.toString();

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

  const mortalityPoints = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 22, 44, 75, 115, 164, 222, 290, 368, 456, 555, 665, 786, 918, 1061,
    1217, 1383, 1562, 1753, 1956, 2171, 2398, 2638, 2890, 3155, 3433, 3723, 4026, 4342, 4670, 4999, 5329, 5661, 5994,
    6328, 6663, 6999, 7335, 7672, 8008, 8346, 8683, 9020, 9357, 9694, 10030, 10367, 10703, 11039, 11373, 11707, 12040,
    12372, 12703, 13033, 13362, 13690, 14017, 14343, 14667, 14990, 15312, 15633, 15952, 16270, 16586, 16901, 17215,
    17527, 17838, 18148,
  ];
  const tempPoints = [
    1.0992, 1.1249, 1.1511, 1.1769, 1.2023, 1.2288, 1.2541, 1.2788, 1.3018, 1.3252, 1.3506, 1.3726, 1.3958, 1.4173,
    1.4398, 1.4608, 1.4805, 1.4992, 1.5176, 1.5343, 1.5498, 1.5652, 1.5795, 1.5946, 1.6095, 1.6224, 1.6352, 1.6479,
    1.6604, 1.6697, 1.6798, 1.6908, 1.7004, 1.708, 1.716, 1.7238, 1.7327, 1.7404, 1.7474, 1.754, 1.76, 1.7656, 1.7704,
    1.7744, 1.7781, 1.7827, 1.7859, 1.788, 1.7917, 1.7948, 1.7975, 1.7988, 1.7986, 1.799, 1.8012, 1.8005, 1.8002,
    1.8006, 1.7997, 1.7992, 1.7986, 1.798, 1.7963, 1.7935, 1.7922, 1.7889, 1.7868, 1.7838, 1.7806, 1.7778, 1.7746,
    1.7722, 1.769, 1.7645, 1.7608, 1.7587, 1.7543, 1.7499, 1.7463, 1.7425, 1.739, 1.7348, 1.7316, 1.7274, 1.7236,
  ];
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
