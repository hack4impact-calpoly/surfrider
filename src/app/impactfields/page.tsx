"use client";

import * as React from "react";
import { ImpactField } from "@/components/impact-field";
import SocietalImpactFields from "@/components/societal-impact-fields";
import ConsumerImpactFields from "@/components/consumer-impact-fields";

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
          <ConsumerImpactFields />
        </ImpactField>

        <ImpactField title="SSP">
          <ConsumerImpactFields /> {/* Placeholder for SSP */}
        </ImpactField>
      </div>
    </div>
  );
}
