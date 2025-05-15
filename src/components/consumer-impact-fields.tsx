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
    <div
      className="grid gap-20 
                grid-cols-1 
                sm:grid-cols-2 
                lg:grid-cols-3 
                auto-rows-[380px]"
    >
      <MetricCard
        value={8888888888}
        label="Gallons"
        subtext="of Gasoline Burned"
        tooltipText="Equivalent CO₂ emissions expressed as the number of gallons of gasoline combusted"
        icon={<Image src={GasolineIcon} alt="Gasoline Icon" />}
        bgColor="bg-[#F3F3F3]"
      />
      <MetricCard
        value={8888888888}
        label="Barrels"
        subtext="of Oil Burned"
        tooltipText="Equivalent CO₂ emissions expressed as the number of crude-oil barrels burned"
        icon={<Image src={OilRigIcon} alt="Oil Rig Icon" />}
        bgColor="bg-[#94CEEE]"
      />
      <MetricCard
        value={8888888888}
        label="Miles"
        subtext="Driven by gas passenger vehicles"
        tooltipText="Equivalent CO₂ emissions expressed as miles driven by an average gas-powered passenger car"
        icon={<Image src={CarIcon} alt="Car Icon" />}
        bgColor="bg-[#F3F3F3]"
      />
      <MetricCard
        value={8888888888}
        label="Homes"
        subtext="of Yearly Electricity Use"
        tooltipText="Equivalent CO₂ emissions expressed as the annual electricity consumption of an average U.S. home"
        icon={<Image src={EnergyIcon} alt="Energy Icon" />}
        bgColor="bg-[#88C8D2]"
      />
      <MetricCard
        value={8888888888}
        label="Gas Powered Passenger Vehicles"
        subtext="Per Year"
        tooltipText="Number of average gas-powered cars whose yearly fuel consumption would emit the same CO₂"
        icon={<Image src={GasPumpIcon} alt="Gas Pump Icon" />}
        bgColor="bg-[#F3F3F3]"
      />
      <MetricCard
        value={8888888888}
        label="Additional People"
        subtext="Exposed to Unprecedented Heat"
        tooltipText="Projected additional people exposed to extreme‐heat events by 2070 due to these CO₂ emissions"
        icon={<Image src={CityIcon} alt="City Icon" />}
        bgColor="bg-[#99CCC1]"
      />
    </div>
  );
}
