"use client";

import { RedLineChart, BlueLineChart } from "@/components/ssp-charts";
import { BlueCard, RedCard } from "@/components/ssp-cards";

interface SspFieldsProps {
  endOfLifeYear: string;
  endOfLifeMortality: string;
  endOfLifeTemperature: string;
  yearOfStudy: string;
  yearOfStudyMortality: string;
  yearOfStudyTemperature: string;
}

export default function SspFields({
  endOfLifeYear,
  endOfLifeMortality,
  endOfLifeTemperature,
  yearOfStudy,
  yearOfStudyMortality,
  yearOfStudyTemperature,
}: SspFieldsProps) {
  const generateYearLabels = (startYear: number, endYear: number): string[] => {
    return Array.from({ length: endYear - startYear + 1 }, (_, i) => (startYear + i).toString());
  };

  const mortalityLabels = generateYearLabels(2015, 2099);
  const tempLabels = generateYearLabels(2015, 2099);

  const mortalityPoints = [
    1.0992, 1.1249, 1.1511, 1.1769, 1.2023, 1.2288, 1.2541, 1.2788, 1.3018, 1.3252, 1.3506, 1.3726, 1.3958, 1.4173,
    1.4398, 1.4608, 1.4805, 1.4992, 1.5176, 1.5343, 1.5498, 1.5652, 1.5795, 1.5946, 1.6095, 1.6224, 1.6352, 1.6479,
    1.6604, 1.6697, 1.6798, 1.6908, 1.7004, 1.708, 1.716, 1.7238, 1.7327, 1.7404, 1.7474, 1.754, 1.76, 1.7656, 1.7704,
    1.7744, 1.7781, 1.7827, 1.7859, 1.788, 1.7917, 1.7948, 1.7975, 1.7988, 1.7986, 1.799, 1.8012, 1.8005, 1.8002,
    1.8006, 1.7997, 1.7992, 1.7986, 1.798, 1.7963, 1.7935, 1.7922, 1.7889, 1.7868, 1.7838, 1.7806, 1.7778, 1.7746,
    1.7722, 1.769, 1.7645, 1.7608, 1.7587, 1.7543, 1.7499, 1.7463, 1.7425, 1.739, 1.7348, 1.7316, 1.7274, 1.7236,
  ];

  const tempPoints = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 22, 44, 75, 115, 164, 222, 290, 367, 455, 554, 664, 784, 916, 1060, 1214,
    1381, 1559, 1750, 1952, 2167, 2394, 2633, 2885, 3150, 3427, 3717, 4019, 4334, 4661, 4990, 5320, 5651, 5983, 6317,
    6651, 6987, 7322, 7658, 7994, 8331, 8668, 9004, 9340, 9677, 10013, 10349, 10684, 11019, 11353, 11687, 12019, 12351,
    12681, 13011, 13339, 13666, 13993, 14318, 14641, 14964, 15285, 15605, 15924, 16241, 16557, 16871,
  ];

  return (
    <section className="mx-auto max-w-6xl">
      <div className="bg-white shadow-sm">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:grid-rows-2 md:gap-x-8 md:gap-y-8">
          {/* Row 1 */}
          <div className="md:col-span-2 md:row-span-1 flex justify-center">
            <BlueLineChart
              labels={mortalityLabels}
              dataPoints={mortalityPoints}
              title="Additional Human Mortalities: SSP1-2.6"
              yLabel="Mortalities"
            />
          </div>
          <div className="md:col-span-1 md:row-span-1 flex justify-start pl-[10%]">
            <BlueCard
              endOfLifeYear={endOfLifeYear}
              endOfLifeValue={endOfLifeMortality}
              yearOfStudy={yearOfStudy}
              yearOfStudyValue={yearOfStudyMortality}
            />
          </div>

          {/* Row 2 */}
          <div className="md:col-span-2 md:row-span-1 flex justify-center">
            <RedLineChart
              labels={tempLabels}
              dataPoints={tempPoints}
              title="Baseline °C Warming SSP1-2.6"
              yLabel="Temperature (°C)"
            />
          </div>
          <div className="md:col-span-1 md:row-span-1 flex justify-start pl-[10%]">
            <RedCard
              endOfLifeYear={endOfLifeYear}
              endOfLifeValue={endOfLifeTemperature}
              yearOfStudy={yearOfStudy}
              yearOfStudyValue={yearOfStudyTemperature}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
