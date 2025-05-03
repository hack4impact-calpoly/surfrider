"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

export const ConsumerImpactCard: React.FC<{
  value: number; //value to display
  label: string; //unit for the value
  subtext: string; //subtext for the value and unit
  tooltipText: string; //tooltip info
  icon: React.ReactNode; //icon component
  bgColor: string; //background color
}> = ({ value, label, subtext, tooltipText, icon, bgColor }) => {
  return (
    <TooltipProvider>
      <Card className={`${bgColor} relative rounded-xl py-10 px-8 shadow-sm border-none`}>
        {/* Info tooltip icon */}
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

        {/* Value and Label */}
        <div className="text-center">
          <h3 className="font-bold text-[24px] text-[#6F6F6F] p-1">{value.toLocaleString()}</h3>
          <p className="font-bold text-[24px] text-[#6F6F6F] p-1">{label}</p>
          <p className="font-light text-[14px] text-[#6F6F6F] p-2">{subtext}</p>
        </div>

        {/* Icon at the bottom */}
        <div className="mt-10 flex justify-center">{icon}</div>
      </Card>
    </TooltipProvider>
  );
};
