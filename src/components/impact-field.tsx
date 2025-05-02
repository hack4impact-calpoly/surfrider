"use client";

import * as React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

//A single accordion panel styled to match the Figma collapsed look
export const ImpactField: React.FC<{
  title: string; //title of accordion
  children: React.ReactNode; //accordion content (specific field cards)
}> = ({ title, children }) => (
  <Accordion type="single" collapsible className="w-full">
    <AccordionItem value={title} className="rounded-xl border-none shadow-2xl">
      <AccordionTrigger className="group flex items-center justify-between p-5 bg-white rounded-xl font-medium text-[24px] text-[#0F172A]">
        {title}
      </AccordionTrigger>

      <AccordionContent className="p-3 bg-white rounded-xl border-none">{children}</AccordionContent>
    </AccordionItem>
  </Accordion>
);
