"use client";

import CalculatorForm, {
  DEFAULT_CAPACITY_FACTOR,
  DEFAULT_LIFETIME_YEARS,
  DEFAULT_LOCATION,
  DEFAULT_POPULATION_2070,
  DEFAULT_POWER_PLANT_CLASS,
  DEFAULT_START_YEAR,
  DEFAULT_YEAR_OF_STUDY,
} from "@/components/calculator-form";
import { ErrorCard } from "@/components/error-card";
import { Results } from "@/components/results/results";
import { Spinner } from "@/components/spinner";
import { useCalculate } from "@/hooks/use-calculate";
import { cn } from "@/lib/utils";
import { CalculateInput } from "@/schema/api";
import { ChevronUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { EgridLocation, PowerPlantClass } from "@/schema/egrid";

export default function Home() {
  const { data, error, loading, getCalculateResult } = useCalculate();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [submitted, setSubmitted] = useState(false);
  const [submittedInput, setSubmittedInput] = useState<CalculateInput | null>(null);
  const [formExpanded, setFormExpanded] = useState(true);

  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const query = Object.fromEntries(searchParams.entries());
    try {
      const parsed: CalculateInput = CalculateInput.parse({
        installedCapacity: parseFloat(query.installedCapacity ?? "0"),
        powerPlantClass: (query.powerPlantClass ?? DEFAULT_POWER_PLANT_CLASS) as PowerPlantClass,
        location: (query.location ?? DEFAULT_LOCATION) as EgridLocation,
        capacityFactor: parseFloat(query.capacityFactor ?? DEFAULT_CAPACITY_FACTOR.toString()),
        population2070: parseInt(query.population2070 ?? DEFAULT_POPULATION_2070, 10),
        startYear: parseInt(query.startYear ?? DEFAULT_START_YEAR, 10),
        lifeTimeYears: parseInt(query.lifeTimeYears ?? DEFAULT_LIFETIME_YEARS, 10),
        yearOfStudy: parseInt(query.yearOfStudy ?? DEFAULT_YEAR_OF_STUDY, 10),
      });

      setSubmittedInput(parsed);
      setSubmitted(true);
      setFormExpanded(false);
      getCalculateResult(parsed);
    } catch {
      router.replace("/");
    }
  }, [searchParams, getCalculateResult, router]);

  const handleSubmit = (values: CalculateInput) => {
    setSubmittedInput(values);
    setSubmitted(true);
    setFormExpanded(false);
    getCalculateResult(values);

    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(values)) {
      params.set(key, String(value));
    }
    router.push(`/?${params.toString()}`);
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
          Surfrider Carbon Impact Calculator
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
