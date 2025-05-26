"use client";

import CalculatorForm from "@/components/calculator-form";
import { ErrorCard } from "@/components/error-card";
import { Results } from "@/components/results/results";
import { Spinner } from "@/components/spinner";
import { useCalculate } from "@/hooks/use-calculate";
import { cn } from "@/lib/utils";
import { CalculateInput } from "@/schema/api";
import { ChevronUp } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const { data, error, loading, getCalculateResult } = useCalculate();
  const [submitted, setSubmitted] = useState(false);
  const [submittedInput, setSubmittedInput] = useState<CalculateInput | null>(null);
  const [formExpanded, setFormExpanded] = useState(true);

  const handleSubmit = (values: CalculateInput) => {
    setSubmittedInput(values);
    setSubmitted(true);
    setFormExpanded(false);
    getCalculateResult(values);
  };

  const handleToggleForm = () => {
    setFormExpanded(!formExpanded);
  };

  const renderResults = () => {
    if (submitted && submittedInput) {
      if (loading) return <Spinner />;
      if (error || !data) return <ErrorCard />;
      return <Results results={data} inputs={submittedInput} />;
    }
  };

  return (
    <main className="relative min-h-screen flex justify-center items-center bg-gray-100">
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

      {/* Results */}
      {renderResults()}
    </main>
  );
}
