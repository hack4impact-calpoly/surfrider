"use client";

import * as React from "react";
import { ImpactField } from "@/components/impact-field";
import SocietalImpactFields from "@/components/societal-impact-fields";
import ConsumerImpactFields from "@/components/consumer-impact-fields";
import { CalculateResult } from "@/schema/api";

interface ResultsProps {
  results: CalculateResult;
}

export const Results = (props: ResultsProps) => {
  const { results } = props;

  return (
    <div className="min-w-full mx-auto px-14 py-6 space-y-4 flex flex-col items-center">
      {/* <h1 className="font-bold text-[48px] leading-[48px] px-4 tracking-[-1.2] text-slate-900">
        Surfrider Carbon Emissions Calculator
      </h1>
      <p className="font-normal px-4 text-[16px] text-[#64748B]">
        Welcome to the Surfrider Carbon Emissions Calculator! Below, you will find all the key metrics for your project
        based on the data you input into the form. Click the arrows under “Calculated Parameters” to expand and see more
        info related to that metric.
      </p> */}

      <h2 className="font-semibold px-4 text-[40px] leading-[48px] tracking-[-1.2] text-slate-900">Your Impact</h2>

      <div className="min-w-full space-y-8">
        <ImpactField title="Societal Impact">
          <SocietalImpactFields results={results} />
        </ImpactField>

        <ImpactField title="Consumer Impact">
          <ConsumerImpactFields results={results} />
        </ImpactField>

        <ImpactField title="SSP"></ImpactField>
      </div>
    </div>
  );
};
