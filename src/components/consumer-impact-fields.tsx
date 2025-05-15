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
    <div className="grid grid-cols-3 gap-20">
      <MetricCard
        value={8888888888}
        label="Gallons"
        subtext="of Gasoline Burned"
        tooltipText=""
        icon={<Image src={GasolineIcon} alt="Gasoline Icon" />}
        bgColor="bg-[#F3F3F3]"
      />
      <MetricCard
        value={8888888888}
        label="Barrels"
        subtext="of Oil Burned"
        tooltipText=""
        icon={<Image src={OilRigIcon} alt="Oil Rig Icon" />}
        bgColor="bg-[#94CEEE]"
      />
      <MetricCard
        value={8888888888}
        label="Miles"
        subtext="Driven by gas passenger vehicles"
        tooltipText=""
        icon={<Image src={CarIcon} alt="Car Icon" />}
        bgColor="bg-[#F3F3F3]"
      />
      <MetricCard
        value={8888888888}
        label="Homes"
        subtext="of Yearly Electricity Use"
        tooltipText=""
        icon={<Image src={EnergyIcon} alt="Energy Icon" />}
        bgColor="bg-[#88C8D2]"
      />
      <MetricCard
        value={8888888888}
        label="Gas Powered Passenger Vehicles"
        subtext="Per Year"
        tooltipText=""
        icon={<Image src={GasPumpIcon} alt="Gas Pump Icon" />}
        bgColor="bg-[#F3F3F3]"
      />
      <MetricCard
        value={8888888888}
        label="Additional People"
        subtext="Exposed to Unprecedented Heat"
        tooltipText=""
        icon={<Image src={CityIcon} alt="City Icon" />}
        bgColor="bg-[#99CCC1]"
      />
    </div>
  );
}
