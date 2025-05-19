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
  hoverYear?: string | null;
}

export function BlueCard({
  endOfLifeYear,
  endOfLifeValue,
  yearOfStudy,
  yearOfStudyValue,
  hoverYear,
  className,
  ...props
}: SspCardProps) {
  // Active state of the card
  const showEndOfLifeHighlight = hoverYear === endOfLifeYear;
  const showYearOfStudyHighlight = hoverYear === yearOfStudy;

  const isHoverTargetedYear = showEndOfLifeHighlight || showYearOfStudyHighlight;
  const dimEndOfLife = hoverYear && !showEndOfLifeHighlight;
  const dimYearOfStudy = hoverYear && !showYearOfStudyHighlight;

  return (
    <CardContent className={`flex items-center gap-3 rounded-2xl p-6 w-fit ${className ?? ""}`} {...props}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 items-start min-h-[95px]">
          <div
            className={`w-1.5 min-h-[95px] rounded bg-slate-600 flex-shrink-0 transform transition-all duration-300 origin-left ${
              showEndOfLifeHighlight ? "opacity-100 translate-x-0" : "opacity-0 translate-x-0"
            }`}
          />
          <div
            className={`space-y-1 transition-all duration-300 transform ${
              !isHoverTargetedYear
                ? "opacity-100 -translate-x-3.5"
                : dimEndOfLife
                  ? "opacity-40 -translate-x-3.5"
                  : showEndOfLifeHighlight
                    ? "opacity-100 translate-x-2 "
                    : "opacity-100 -translate-x-3.5"
            }`}
          >
            <CardTitle className="text-5xl font-bold tracking-tight text-slate-600">{endOfLifeValue}</CardTitle>
            <CardTitle className="text-base font-semibold text-slate-500">
              Mortalities by&nbsp;{endOfLifeYear}
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">(End&nbsp;of&nbsp;Life) SSP1-2.6</CardDescription>
          </div>
        </div>

        <div className="flex gap-3 items-start min-h-[95px]">
          <div
            className={`w-1.5 min-h-[95px] rounded bg-slate-600 flex-shrink-0 transform transition-all duration-300 origin-left ${
              showYearOfStudyHighlight ? "opacity-100 translate-x-0" : "opacity-0 translate-x-0"
            }`}
          />
          <div
            className={`space-y-1 transition-all duration-300 transform ${
              !isHoverTargetedYear
                ? "opacity-100 -translate-x-3.5"
                : dimYearOfStudy
                  ? "opacity-40 -translate-x-3.5"
                  : showYearOfStudyHighlight
                    ? "opacity-100 translate-x-2 "
                    : "opacity-100 -translate-x-3.5"
            }`}
          >
            {showYearOfStudyHighlight && <div className="w-1 h-full bg-slate-600 rounded" />}
            <CardTitle className="text-5xl font-bold tracking-tight text-slate-600">{yearOfStudyValue}</CardTitle>
            <CardTitle className="text-base font-semibold text-slate-500">Mortalities by&nbsp;{yearOfStudy}</CardTitle>
            <CardDescription className="text-xs text-slate-400">(Year&nbsp;of&nbsp;Study) SSP1-2.6</CardDescription>
          </div>
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
  hoverYear,
  className,
  ...props
}: SspCardProps) {
  // Active state of the card
  const showEndOfLifeHighlight = hoverYear === endOfLifeYear;
  const showYearOfStudyHighlight = hoverYear === yearOfStudy;

  const isHoverTargetedYear = showEndOfLifeHighlight || showYearOfStudyHighlight;
  const dimEndOfLife = hoverYear && !showEndOfLifeHighlight;
  const dimYearOfStudy = hoverYear && !showYearOfStudyHighlight;

  return (
    <CardContent className={`flex items-center gap-3 rounded-2xl p-6 w-fit ${className ?? ""}`} {...props}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 items-start min-h-[95px]">
          <div
            className={`w-1.5 min-h-[95px] rounded bg-[#FF928A] flex-shrink-0 transform transition-all duration-300 origin-left ${
              showEndOfLifeHighlight ? "opacity-100 translate-x-0" : "opacity-0 translate-x-0"
            }`}
          />
          <div
            className={`space-y-1 transition-all duration-300 transform ${
              !isHoverTargetedYear
                ? "opacity-100 -translate-x-3.5"
                : dimEndOfLife
                  ? "opacity-40 -translate-x-3.5"
                  : showEndOfLifeHighlight
                    ? "opacity-100 translate-x-2 "
                    : "opacity-100 -translate-x-3.5"
            }`}
          >
            <CardTitle className="text-5xl font-bold tracking-tight text-[#FF928A]">{endOfLifeValue}</CardTitle>
            <CardTitle className="text-base font-semibold text-[#FF928A]">
              Mortalities by&nbsp;{endOfLifeYear}
            </CardTitle>
            <CardDescription className="text-xs text-[#FF928A]">(End&nbsp;of&nbsp;Life) SSP1-2.6</CardDescription>
          </div>
        </div>

        <div className="flex gap-3 items-start min-h-[95px]">
          <div
            className={`w-1.5 min-h-[95px] rounded bg-[#FF928A] flex-shrink-0 transform transition-all duration-300 origin-left ${
              showYearOfStudyHighlight ? "opacity-100 translate-x-0" : "opacity-0 translate-x-0"
            }`}
          />
          <div
            className={`space-y-1 transition-all duration-300 transform ${
              !isHoverTargetedYear
                ? "opacity-100 -translate-x-3.5"
                : dimYearOfStudy
                  ? "opacity-40 -translate-x-3.5"
                  : showYearOfStudyHighlight
                    ? "opacity-100 translate-x-2 "
                    : "opacity-100 -translate-x-3.5"
            }`}
          >
            {showYearOfStudyHighlight && <div className="w-1 h-full bg-[#FF928A] rounded" />}
            <CardTitle className="text-5xl font-bold tracking-tight text-[#FF928A]">{yearOfStudyValue}</CardTitle>
            <CardTitle className="text-base font-semibold text-[#FF928A]">Mortalities by&nbsp;{yearOfStudy}</CardTitle>
            <CardDescription className="text-xs text-[#FF928A]">(Year&nbsp;of&nbsp;Study) SSP1-2.6</CardDescription>
          </div>
        </div>
      </div>
    </CardContent>
  );
}
