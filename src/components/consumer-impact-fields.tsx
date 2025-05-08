"use client";

import { MetricCard } from "@/components/metric-card";
import GasPumpIcon from "@/assets/icons/gas_pump.svg";
import EnergyIcon from "@/assets/icons/energy.svg";
import GasolineIcon from "@/assets/icons/gasoline.svg";
import CityIcon from "@/assets/icons/heat.svg";
import OilRigIcon from "@/assets/icons/oil_rig.svg";
import CarIcon from "@/assets/icons/passenger_vehicle.svg";
import Image from "next/image";

export default function ConsumerImpactFields() {
  return (
    <div className="grid grid-cols-3 gap-14">
      <MetricCard
        value={8888888888}
        label="Mcf Natural Gas Burned"
        subtext="Per year"
        tooltipText="This metric represents the volume of natural gas consumed."
        icon={<Image src={GasolineIcon} alt="Gasoline Icon" />}
        bgColor="bg-[#88C8D2]"
      />
      <MetricCard
        value={231}
        label="Natural Gas–Fired Pp. Emissions"
        subtext="For one year"
        tooltipText="Emissions from power plants running on natural gas."
        icon={<Image src={OilRigIcon} alt="Oil Rig Icon" />}
        bgColor="bg-[#F3F3F3]"
      />
      <MetricCard
        value={4.13e8}
        label="Average Forestry Acres"
        subtext="Per year equiv. emission sequestering"
        tooltipText="This metric estimates how many acres of forest would be needed to offset these emissions."
        icon={<Image src={CarIcon} alt="Car Icon" />}
        bgColor="bg-[#94CEEE]"
      />
      <MetricCard
        value={4.13e8}
        label="Average Forestry Acres"
        subtext="Per year equiv. emission sequestering"
        tooltipText="This metric estimates how many acres of forest would be needed to offset these emissions."
        icon={<Image src={EnergyIcon} alt="Energy Icon" />}
        bgColor="bg-[#94CEEE]"
      />
      <MetricCard
        value={4.13e8}
        label="Average Forestry Acres"
        subtext="Per year equiv. emission sequestering"
        tooltipText="This metric estimates how many acres of forest would be needed to offset these emissions."
        icon={<Image src={GasPumpIcon} alt="Gas Pump Icon" />}
        bgColor="bg-[#94CEEE]"
      />
      <MetricCard
        value={4.13e8}
        label="Average Forestry Acres"
        subtext="Per year equiv. emission sequestering"
        tooltipText="This metric estimates how many acres of forest would be needed to offset these emissions."
        icon={<Image src={CityIcon} alt="City Icon" />}
        bgColor="bg-[#94CEEE]"
      />
    </div>
  );
}
