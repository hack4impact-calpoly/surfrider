"use client";

import Calculator from "@/components/calculator";
import { Spinner } from "@/components/spinner";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<Spinner />}>
      <Calculator />
    </Suspense>
  );
}
