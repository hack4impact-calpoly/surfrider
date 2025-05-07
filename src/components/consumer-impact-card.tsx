"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

export const ConsumerImpactCard: React.FC<{
  value: number;
  label: string;
  subtext: string;
  tooltipText: string;
  icon: React.ReactNode;
  bgColor: string;
}> = ({ value, label, subtext, tooltipText, icon, bgColor }) => {
  return (
    <div className="w-full aspect-[9/12]">
      <Card
        className={`${bgColor} h-full relative rounded-xl p-6 shadow-md border-none overflow-hidden flex flex-col justify-between`}
      >
        {/* Tooltip */}
        <TooltipProvider>
          <div className="absolute top-4 right-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-[#6F6F6F] text-[18px] cursor-help">ⓘ</span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-[18px] text-[#6F6F6F]">{tooltipText}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>

        {/* Main Text Content with adjusted spacing */}
        <div className="flex flex-col items-center text-center pt-6 space-y-2">
          <h3 className="font-bold text-[24px] text-[#6F6F6F]">{value.toLocaleString()}</h3>
          <p className="font-bold text-[24px] text-[#6F6F6F]">{label}</p>
          <p className="font-light text-[14px] text-[#6F6F6F] mt-2">{subtext}</p>
        </div>

        {/* Icon slightly higher from the bottom */}
        <div className="mb-8 flex justify-center">
          <div className="max-w-[100px] max-h-[160px] w-full h-full">{icon}</div>
        </div>
      </Card>
    </div>
  );
};
