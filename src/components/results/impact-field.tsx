"use client";

import * as React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

//A single accordion panel styled to match the Figma collapsed look
export const ImpactField: React.FC<
  React.PropsWithChildren<{
    title: string; //title of accordion
  }>
> = ({ title, children }) => (
  <Accordion type="single" collapsible className="w-full">
    <AccordionItem value={title} className="border rounded-lg shadow-lg bg-white">
      <AccordionTrigger className="flex p-5 font-medium text-[24px] text-slate-900">{title}</AccordionTrigger>

      <AccordionContent className="flex justify-center px-4 sm:px-10 sm:py-10">
        <div className="w-full max-w-7xl">{children}</div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
