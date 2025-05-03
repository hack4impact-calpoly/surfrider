"use client";

import * as React from "react";
import { ImpactField } from "@/components/impact-field";
import { ConsumerImpactCard } from "@/components/consumer-impact-card";
import GasPumpIcon from "@/assets/icons/gas_pump.svg";
import EnergyIcon from "@/assets/icons/energy.svg";
import GasolineIcon from "@/assets/icons/gasoline.svg";
import CityIcon from "@/assets/icons/heat.svg";
import OilRigIcon from "@/assets/icons/oil_rig.svg";
import CarIcon from "@/assets/icons/passenger_vehicle.svg";
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-full mx-auto px-14 py-6 space-y-4">
      <h1 className="font-bold text-[48px] leading-[48px] px-4 tracking-[-1.2] text-[#0F172A]">
        Surfrider Carbon Emissions Calculator
      </h1>
      <p className="font-normal px-4 text-[16px] text-[#64748B]">
        Welcome to the Surfrider Carbon Emissions Calculator! Below, you will find all the key metrics for your project
        based on the data you input into the form. Click the arrows under “Calculated Parameters” to expand and see more
        info related to that metric.
      </p>

      <h2 className="font-semibold px-4 text-[40px] leading-[48px] tracking-[-1.2] text-[#0F172A]">Impact Fields</h2>

      <div className="space-y-8">
        <ImpactField title="Societal Impact Fields">
          {/* Societal Impact cards will go here */}
          <ConsumerImpactCard
            value={8888888888888}
            label="Metric Name"
            subtext="Subtext goes here"
            tooltipText="Tooltip text goes here"
            icon={<Image src={GasolineIcon} alt="Gas Icon" />}
            bgColor="bg-[#88C8D2]"
          />
        </ImpactField>

        <ImpactField title="Consumer Impact Fields">
          <ConsumerImpactCard
            value={8888888888888}
            label="Metric Name"
            subtext="Subtext goes here"
            tooltipText="Tooltip text goes here"
            icon={<Image src={GasolineIcon} alt="Gas Icon" />}
            bgColor="bg-[#F3F3F3]"
          />
          <ConsumerImpactCard
            value={8888888888888}
            label="Metric Name"
            subtext="Subtext goes here"
            tooltipText="Tooltip text goes here"
            icon={<Image src={OilRigIcon} alt="Gas Icon" />}
            bgColor="bg-[#94CEEE]"
          />
          <ConsumerImpactCard
            value={8888888888888}
            label="Metric Name"
            subtext="Subtext goes here"
            tooltipText="Tooltip text goes here"
            icon={<Image src={CarIcon} alt="Gas Icon" />}
            bgColor="bg-[#F3F3F3]"
          />
          <ConsumerImpactCard
            value={8888888888888}
            label="Metric Name"
            subtext="Subtext goes here"
            tooltipText="Tooltip text goes here"
            icon={<Image src={EnergyIcon} alt="Gas Icon" />}
            bgColor="bg-[#F3F3F3]"
          />
          <ConsumerImpactCard
            value={8888888888888}
            label="Metric Name"
            subtext="Subtext goes here"
            tooltipText="Tooltip text goes here"
            icon={<Image src={GasPumpIcon} alt="Gas Icon" />}
            bgColor="bg-[#F3F3F3]"
          />
          <ConsumerImpactCard
            value={8888888888888}
            label="Metric Name"
            subtext="Subtext goes here"
            tooltipText="Tooltip text goes here"
            icon={<Image src={CityIcon} alt="Gas Icon" />}
            bgColor="bg-[#F3F3F3]"
          />
        </ImpactField>

        <ImpactField title="SSP">
          {/* SSP cards will go here */}
          <ConsumerImpactCard
            value={8888888888888}
            label="Metric Name"
            subtext="Subtext goes here"
            tooltipText="Tooltip text goes here"
            icon={<Image src={CityIcon} alt="Gas Icon" />}
            bgColor="bg-[#99CCC1]"
          />
        </ImpactField>
      </div>
    </div>
  );
}
