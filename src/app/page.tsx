"use client";

import Calculator from "@/components/calculator";
import { Spinner } from "@/components/spinner";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center w-full h-screen">
          <Spinner />
        </div>
      }
    >
      <Calculator />
    </Suspense>
  );
}
