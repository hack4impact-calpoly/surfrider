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
    <AccordionItem value={title} className="rounded-xl border-none shadow-2xl">
      <AccordionTrigger className="flex p-5 bg-white rounded-xl font-medium text-[24px] text-[#0F172A]">
        {title}
      </AccordionTrigger>

      <AccordionContent className="flex justify-center p-10 bg-white rounded-xl border-none">
        <div className="w-full max-w-7xl">{children}</div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
