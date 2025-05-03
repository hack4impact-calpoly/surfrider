"use client";

import * as React from "react";
import { ImpactField } from "@/components/impact-field";
import { ConsumerImpactCard } from "@/components/consumer-impact-card";
import SocietalImpactFields from "@/components/SocietalImpactFields";
import GasIcon from "@/assets/icons/gas_pump.svg";
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
          <SocietalImpactFields />
        </ImpactField>

        <ImpactField title="Consumer Impact Fields">
          <div className="space-y-8">
            <ConsumerImpactCard
              value={8888888888888}
              label="Metric Name"
              subtext="Subtext goes here"
              tooltipText="Tooltip text goes here"
              icon={<Image src={GasIcon} alt="Gas Icon" />}
              bgColor="bg-[#F3F3F3]"
            />
            <ConsumerImpactCard
              value={8888888888888}
              label="Metric Name"
              subtext="Subtext goes here"
              tooltipText="Tooltip text goes here"
              icon={<Image src={GasIcon} alt="Gas Icon" />}
              bgColor="bg-[#94CEEE]"
            />
          </div>
        </ImpactField>

        <ImpactField title="SSP">
          {/* SSP cards will go here */}
          <ConsumerImpactCard
            value={8888888888888}
            label="Metric Name"
            subtext="Subtext goes here"
            tooltipText="Tooltip text goes here"
            icon={<Image src={GasIcon} alt="Gas Icon" />}
            bgColor="bg-[#99CCC1]"
          />
        </ImpactField>
      </div>
    </div>
  );
}
