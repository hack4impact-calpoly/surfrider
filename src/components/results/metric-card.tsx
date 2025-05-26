"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

export const MetricCard: React.FC<{
  value: number;
  label: string;
  subtext: string;
  tooltipText: string;
  icon: React.ReactNode;
  bgColor: string;
}> = ({ value, label, subtext, tooltipText, icon, bgColor }) => {
  return (
    <Card
      className={`
      ${bgColor}
      w-[340px]
      h-[380px]
      relative
      rounded-xl
      overflow-hidden
      flex
      flex-col
      justify-between
      py-6
      px-5
    `}
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
      <div className="flex flex-col items-center text-center space-y-3 pt-6">
        <h3 className="font-bold text-[24px] text-[#6F6F6F]">{value.toLocaleString()}</h3>
        <p className="font-bold text-[24px] text-[#6F6F6F]">{label}</p>
        <p className="font-light text-[16px] text-[#6F6F6F]">{subtext}</p>
      </div>

      {/* Icon slightly higher from the bottom */}
      <div className="flex justify-center items-end h-24 mb-7">{icon}</div>
    </Card>
  );
};
