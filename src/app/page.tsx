"use client";

import CalculatorForm from "@/components/calculator-form";
import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [formExpanded, setFormExpanded] = useState(true);

  const handleSubmit = () => {
    setSubmitted(true);
    setFormExpanded(false);
  };

  const handleToggleForm = () => {
    setFormExpanded(!formExpanded);
  };

  return (
    <main className="relative min-h-screen bg-gray-100">
      {/* Calculator form card */}
      <div
        className={cn(
          "fixed left-1/2 z-20 w-full max-w-5xl -translate-x-1/2 transition-all duration-500 ease-in-out p-6 border rounded-lg shadow-lg bg-white mx-auto items-start",
          formExpanded ? "bottom-1/2 translate-y-1/2" : "bottom-0 translate-y-0",
        )}
      >
        <h1 className="text-xl font-semibold text-slate-900 text-center col-span-full">
          Carbon Emission Reduction Impact Calculator
        </h1>
        <div
          className={cn(
            "transition-all duration-500 ease-in-out overflow-hidden",
            formExpanded ? "max-h-[100vh]" : "max-h-[0vh]",
          )}
        >
          <CalculatorForm onSubmit={handleSubmit} />
        </div>

        {/* Toggle button */}
        {submitted && (
          <div onClick={handleToggleForm} className="absolute top-5 right-11 text-gray-400 p-2 cursor-pointer">
            <ChevronUp
              className={cn(
                "w-7 h-7 transition-all duration-500 ease-in-out",
                formExpanded ? "rotate-180" : "rotate-0",
              )}
            />
          </div>
        )}
      </div>

      {submitted && <div>Results Placeholder</div>}
    </main>
  );
}
