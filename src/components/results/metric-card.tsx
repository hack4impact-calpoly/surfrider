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
      w-full max-w-full sm:w-[340px]
      h-[120px] sm:h-[380px]
      relative
      rounded-xl
      overflow-hidden
      flex flex-row sm:flex-col
      items-center
      justify-between
      gap-4
      p-5
    `}
    >
      {/* Tooltip */}
      <TooltipProvider>
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
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

      {/* Icon: centered on desktop, left on mobile */}
      <div className="flex-shrink-0 w-[64px] sm:w-24 sm:order-last sm:mb-7">
        <div className="flex justify-center items-center w-full h-full">{icon}</div>
      </div>

      {/* Main Text Content with adjusted spacing */}
      <div className="flex-1 items-center text-center space-y-1 sm:space-y-3 sm:pt-6">
        <h3 className="font-bold text-[24px] text-[#6F6F6F]">{value.toLocaleString()}</h3>
        <p className="font-bold text-[24px] text-[#6F6F6F]">{label}</p>
        <p className="font-light text-[16px] text-[#6F6F6F]">{subtext}</p>
      </div>
    </Card>
  );
};
