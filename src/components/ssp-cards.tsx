"use client";

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

type CardProps = React.ComponentProps<typeof Card>;

/** To-do
 * Figure out how to pass in custom variables
 * Apply tailwind styling (Text sizing, background color, etc...)
 */

interface SspCardProps extends CardProps {
  /** extend the default shadcn arguments */
  endOfLifeYear: string;
  endOfLifeValue: string | number; // e.g. "4,661"
  yearOfStudy: string;
  yearOfStudyValue: string | number; // e.g. "18,116"
}

export function BlueCard({
  endOfLifeYear,
  endOfLifeValue,
  yearOfStudy,
  yearOfStudyValue,
  className,
  ...props
}: SspCardProps) {
  return (
    <CardContent className={`flex items-center gap-3 rounded-2xl p-6 w-fit ${className ?? ""}`} {...props}>
      <div className="flex flex-col gap-4">
        <div className="space-y-1">
          <CardTitle className="text-5xl font-bold tracking-tight text-slate-600">{endOfLifeValue}</CardTitle>
          <CardTitle className="text-base font-semibold text-slate-500">Mortalities by&nbsp;{endOfLifeYear}</CardTitle>
          <CardDescription className="text-xs text-slate-400">(End&nbsp;of&nbsp;Life) SSP1-2.6</CardDescription>
        </div>

        <div className="space-y-1">
          <CardTitle className="text-5xl font-bold tracking-tight text-slate-600">{yearOfStudyValue}</CardTitle>
          <CardTitle className="text-base font-semibold text-slate-500">Mortalities by&nbsp;{yearOfStudy}</CardTitle>
          <CardDescription className="text-xs text-slate-400">(Year&nbsp;of&nbsp;Study) SSP1-2.6</CardDescription>
        </div>
      </div>
    </CardContent>
  );
}

export function RedCard({
  endOfLifeYear,
  endOfLifeValue,
  yearOfStudy,
  yearOfStudyValue,
  className,
  ...props
}: SspCardProps) {
  return (
    <CardContent className={`flex items-center gap-3 rounded-2xl p-6 w-fit ${className ?? ""}`} {...props}>
      <div className="flex flex-col gap-4">
        <div className="space-y-1">
          <CardTitle className="text-5xl font-bold tracking-tight text-[#FF928A]">{endOfLifeValue}</CardTitle>
          <CardTitle className="text-base font-semibold text-[#FF928A]">Increases by&nbsp;{endOfLifeYear}</CardTitle>
          <CardDescription className="text-xs text-[#FF928A]">(End&nbsp;of&nbsp;Life) SSP1-2.6</CardDescription>
        </div>

        <div className="space-y-1">
          <CardTitle className="text-5xl font-bold tracking-tight text-[#FF928A]">{yearOfStudyValue}</CardTitle>
          <CardTitle className="text-base font-semibold text-[#FF928A]">Increase by&nbsp;{yearOfStudy}</CardTitle>
          <CardDescription className="text-xs text-[#FF928A]">(Year&nbsp;of&nbsp;Study) SSP1-2.6</CardDescription>
        </div>
      </div>
    </CardContent>
  );
}
