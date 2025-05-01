"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export const ConsumerImpactCard: React.FC<{
  value: number; //value to display
  label: string; //unit for the value
  subtext: string; //subtext for the value and unit
  tooltipText: string; //tooltip info
  icon: React.ReactNode; //icon component
  bgColor: string; //background color
}> = ({ value, label, subtext, tooltipText, icon, bgColor }) => {
  return (
    <Card className={`${bgColor} relative rounded-lg p-4 shadow-sm w-64 max-w-full border border-gray-200`}>
      {/* Info tooltip icon */}
      <div className="absolute top-2 right-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-gray-500 cursor-help">ⓘ</span>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs text-sm text-gray-600">{tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Value and Label */}
      <div className="text-center">
        <h3 className="text-3xl font-bold text-gray-700">{value.toLocaleString()}</h3>
        <p className="mt-2 text-lg font-medium text-gray-700">{label}</p>
        <p className="mt-1 text-sm text-gray-500">{subtext}</p>
      </div>

      {/* Icon at the bottom */}
      <div className="mt-6 flex justify-center">{icon}</div>
    </Card>
  );
};
