"use client";

import * as React from "react";
import { ImpactField } from "@/components/impact-field";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="font-bold text-[48px] leading-[48px] tracking-[-1.2] text-[#0F172A]">
        Surfrider Carbon Emissions Calculator
      </h1>
      <p className="text-gray-600">
        Welcome to the Surfrider Carbon Emissions Calculator! Below, you will find all the key metrics for your project
        based on the data you input into the form. Click the arrows under “Calculated Parameters” to expand and see more
        info related to that metric.
      </p>

      <h2 className="text-2xl font-semibold text-slate-900">Impact Fields</h2>

      <div className="space-y-4">
        <ImpactField title="Societal Impact Fields">{/* Societal cards will go here */}</ImpactField>

        <ImpactField title="Consumer Impact Fields">{/* Consumer cards will go here */}</ImpactField>

        <ImpactField title="SSP">{/* SSP cards will go here */}</ImpactField>
      </div>
    </div>
  );
}
