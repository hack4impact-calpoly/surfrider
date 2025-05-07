"use client";

import * as React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

//A single accordion panel styled to match the Figma collapsed look
export const ImpactField: React.FC<{
  title: string; //title of accordion
  //children: React.ReactNode; //accordion content (specific field cards)
}> = ({ title }) => (
  <Accordion type="single" collapsible className="w-full">
    <AccordionItem value={title}>
      <AccordionTrigger className="group flex items-center justify-between p-5 bg-white rounded-lg shadow-lg text-slate-900 text-lg font-medium hover:shadow-xl transition-shadow">
        {title}
      </AccordionTrigger>

      <AccordionContent className="mt-2 p-4 bg-white rounded-lg border border-gray-200 shadow-inner">
        {/* {children} */}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
