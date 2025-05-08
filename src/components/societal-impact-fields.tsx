"use client";

import { MetricCard } from "@/components/metric-card";
import GasIcon from "@/assets/icons/natural-gas.svg";
import PlantIcon from "@/assets/icons/power-plant.svg";
import ForestIcon from "@/assets/icons/forest.svg";
import Image from "next/image";

export default function SocietalImpactFields() {
  return (
    <div className="flex flex-wrap justify-evenly">
      <MetricCard
        value={6.15e9}
        label="Mcf Natural Gas Burned"
        subtext="Per year"
        tooltipText="This metric represents the volume of natural gas consumed."
        icon={<Image src={GasIcon} alt="Gas Icon" />}
        bgColor="bg-[#88C8D2]"
      />
      <MetricCard
        value={231}
        label="Natural Gas–Fired Pp. Emissions"
        subtext="For one year"
        tooltipText="Emissions from power plants running on natural gas."
        icon={<Image src={PlantIcon} alt="Plant Icon" />}
        bgColor="bg-[#F3F3F3]"
      />
      <MetricCard
        value={4.13e8}
        label="Average Forestry Acres"
        subtext="Per year equiv. emission sequestering"
        tooltipText="This metric estimates how many acres of forest would be needed to offset these emissions."
        icon={<Image src={ForestIcon} alt="Forest Icon" />}
        bgColor="bg-[#94CEEE]"
      />
    </div>
  );
}
