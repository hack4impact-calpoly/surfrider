"use client";

import { MetricCard } from "@/components/metric-card";
import GasIcon from "@/assets/icons/natural-gas.svg";
import PlantIcon from "@/assets/icons/power-plant.svg";
import ForestIcon from "@/assets/icons/forest.svg";
import Image from "next/image";
import { CalculateResult } from "@/schema/api";

interface SocietalImpactFieldsProps {
  results: CalculateResult;
}

export default function SocietalImpactFields(props: SocietalImpactFieldsProps) {
  const { results } = props;

  return (
    <div
      className="grid gap-20 
              grid-cols-1 
              sm:grid-cols-2 
              lg:grid-cols-3 
              auto-rows-[380px]"
    >
      <MetricCard
        value={results.mcfOfNaturalGasEquivalentCO2Emissions ?? 0}
        label="Mcf"
        subtext="of Natural Gas Burned"
        tooltipText="Equivalent CO₂ emissions expressed as thousand cubic feet (Mcf) of natural gas combusted"
        icon={<Image src={GasIcon} alt="Natural gas icon" />}
        bgColor="bg-[#88C8D2]"
      />
      <MetricCard
        value={results.naturalGasFiredPowerPlantEmissionsForOneYear ?? 0}
        label="Natural Gas-Fired Power Plant Emissions"
        subtext="Per Year"
        tooltipText="Equivalent CO₂ emissions expressed as the annual output of one natural gas-fired power plant"
        icon={<Image src={PlantIcon} alt="Power plant icon" />}
        bgColor="bg-[#F3F3F3]"
      />
      <MetricCard
        value={results.acresOfUSForestsEquivalentCO2SequesteringForOneYear ?? 0}
        label="Average Forestry Acres"
        subtext="Per Year to Sequester"
        tooltipText="Equivalent CO₂ emissions expressed as acres of U.S. forest needed to sequester this amount in one year"
        icon={<Image src={ForestIcon} alt="Forest icon" />}
        bgColor="bg-[#94CEEE]"
      />
    </div>
  );
}
