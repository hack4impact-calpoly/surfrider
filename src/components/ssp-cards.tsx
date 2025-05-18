"use client";
/* import Image from "next/image"; */

import {
  Card,
  CardContent,
  CardDescription,
  /**CardFooter,
    CardHeader, */
  CardTitle,
} from "@/components/ui/card";

type CardProps = React.ComponentProps<typeof Card>;

/** To-do
 * Figure out how to pass in custom variables
 * Apply tailwind styling (Text sizing, background color, etc...)
 */

interface BlueCardProps extends CardProps {
  /** extend the default shadcn arguments */
  value2058: string | number; // e.g. "4,661"
  value2100: string | number; // e.g. "18,116"
}

export function BlueCard({ value2058, value2100, className, ...props }: BlueCardProps) {
  return (
    <CardContent className={`flex items-center gap-3 rounded-2xl p-6 w-fit ${className ?? ""}`} {...props}>
      <div className="flex flex-col gap-4">
        <div className="space-y-1">
          <CardTitle className="text-5xl font-bold tracking-tight text-slate-600">{value2058}</CardTitle>
          <CardTitle className="text-base font-semibold text-slate-500">Mortalities by&nbsp;2058</CardTitle>
          <CardDescription className="text-xs text-slate-400">(End&nbsp;of&nbsp;Life) SSP1-2.6</CardDescription>
        </div>

        <div className="space-y-1">
          <CardTitle className="text-5xl font-bold tracking-tight text-slate-600">{value2100}</CardTitle>
          <CardTitle className="text-base font-semibold text-slate-500">Mortalities by&nbsp;2100</CardTitle>
          <CardDescription className="text-xs text-slate-400">(Year&nbsp;of&nbsp;Study) SSP1-2.6</CardDescription>
        </div>
      </div>
    </CardContent>
  );
}

interface BlueCardProps extends React.ComponentProps<typeof CardContent> {
  value2058: string | number;
  value2100: string | number;
}

export function RedCard({ value2058, value2100, className, ...props }: BlueCardProps) {
  return (
    <CardContent className={`flex items-center gap-3 rounded-2xl p-6 w-fit ${className ?? ""}`} {...props}>
      <div className="flex flex-col gap-4">
        <div className="space-y-1">
          <CardTitle className="text-5xl font-bold tracking-tight text-[#FF928A]">{value2058}</CardTitle>
          <CardTitle className="text-base font-semibold text-[#FF928A]">Increases by&nbsp;2058</CardTitle>
          <CardDescription className="text-xs text-[#FF928A]">(End&nbsp;of&nbsp;Life) SSP1-2.6</CardDescription>
        </div>

        <div className="space-y-1">
          <CardTitle className="text-5xl font-bold tracking-tight text-[#FF928A]">{value2100}</CardTitle>
          <CardTitle className="text-base font-semibold text-[#FF928A]">Increase by&nbsp;2100</CardTitle>
          <CardDescription className="text-xs text-[#FF928A]">(Year&nbsp;of&nbsp;Study) SSP1-2.6</CardDescription>
        </div>
      </div>
    </CardContent>
  );
}
