"use client";

import { Suspense } from "react";
import Calculator from "@/components/calculator";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Calculator />
    </Suspense>
  );
}
