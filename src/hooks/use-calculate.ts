"use client";

import { CalculateResult, CalculateInput } from "@/schema/api";
import { useState } from "react";

export const useCalculate = () => {
  const [data, setData] = useState<CalculateResult | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getCalculateResult = (input: CalculateInput): Promise<void> => {
    setLoading(true);
    setError(false);
    setData(null);

    return fetch("/api/calculate", {
      method: "POST",
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then(CalculateResult.parse)
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  return { data, error, loading, getCalculateResult };
};
